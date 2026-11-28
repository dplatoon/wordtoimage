import { readFileSync } from "node:fs";
import { webcrypto } from "node:crypto";
import { runInNewContext } from "node:vm";
import { transpileModule, ModuleKind, ScriptTarget } from "typescript";
import { describe, expect, it, vi } from "vitest";
import { hasPaidStyleAccess } from "../../supabase/functions/_shared/styleEntitlement";

type Handler = (request: Request) => Promise<Response>;

// Run the real handlers, mocking only external services and runtime bindings.
function loadHandler(name: string, dependencies: Record<string, unknown>): Handler {
  let handler: Handler | undefined;
  const source = readFileSync(new URL(`../../supabase/functions/${name}/index.ts`, import.meta.url), "utf8")
    .replace(/^import .*;\s*$/gm, "");
  const compiled = transpileModule(source, {
    compilerOptions: { target: ScriptTarget.ES2022, module: ModuleKind.None },
  }).outputText;
  runInNewContext(compiled, {
    serve: (callback: Handler) => { handler = callback; },
    Deno: { env: { get: () => "test-configuration" } },
    console: { log: vi.fn(), error: vi.fn() },
    Request, Response, Headers, TextEncoder, Uint8Array, crypto: webcrypto, btoa,
    hasPaidStyleAccess,
    ...dependencies,
  });
  if (!handler) throw new Error("Handler was not registered");
  return handler;
}

const request = (body: Record<string, unknown>) => new Request("https://example.test/generate", {
  method: "POST",
  headers: { Authorization: "Bearer test-session", "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
const auth = { getUser: async () => ({ data: { user: { id: "verified-user" } }, error: null }) };

describe("secure image allowance enforcement", () => {
  it.each([402, 429, 409])("blocks the provider when allowance is denied with %s", async (status) => {
    const fetch = vi.fn();
    const rpc = vi.fn().mockResolvedValue({ data: { allowed: false, status }, error: null });
    const handler = loadHandler("secure-image-generation", { createClient: () => ({ auth, rpc }), fetch });
    const response = await handler(request({ prompt: "A green meadow", requestId: "request-one", userId: "other-user" }));
    expect(response.status).toBe(status);
    expect(rpc).toHaveBeenCalledWith("reserve_secure_generation", {
      p_user_id: "verified-user", p_request_id: "request-one",
    });
    expect(fetch).not.toHaveBeenCalled();
  });
  it("fails closed when the usage check is unavailable", async () => {
    const fetch = vi.fn();
    const rpc = vi.fn().mockResolvedValue({ data: null, error: { message: "unavailable" } });
    const handler = loadHandler("secure-image-generation", { createClient: () => ({ auth, rpc }), fetch });
    expect((await handler(request({ prompt: "A green meadow", requestId: "request-one" }))).status).toBe(503);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("calls the provider only after reserving allowance", async () => {
    const order: string[] = [];
    const rpc = vi.fn(async () => {
      order.push("reserve");
      return { data: { allowed: true }, error: null };
    });
    const fetch = vi.fn(async () => {
      order.push("provider");
      return new Response(JSON.stringify({ id: "prediction-one", status: "starting" }));
    });
    const handler = loadHandler("secure-image-generation", { createClient: () => ({ auth, rpc }), fetch });
    const response = await handler(request({ prompt: "A green meadow", requestId: "request-one" }));
    expect(response.status).toBe(200);
    expect(order).toEqual(["reserve", "provider"]);
    expect((await response.json()).predictionId).toBe("prediction-one");
  });
});

describe("paid style entitlement", () => {
  const now = Date.parse("2026-11-28T07:00:00Z");
  it.each(["standard", "pro", "business"])("allows active unexpired %s subscriptions", (tier) => {
    expect(hasPaidStyleAccess({ subscribed: true, subscription_tier: tier, subscription_end: "2026-12-01T00:00:00Z" }, now)).toBe(true);
  });
  it.each([
    null,
    { subscribed: false, subscription_tier: "pro", subscription_end: "2026-12-01T00:00:00Z" },
    { subscribed: true, subscription_tier: "free", subscription_end: "2026-12-01T00:00:00Z" },
    { subscribed: true, subscription_tier: "pro", subscription_end: "2026-11-27T00:00:00Z" },
    { subscribed: true, subscription_tier: "pro", subscription_end: null },
  ])("denies missing, unpaid, expired, or incomplete plans: %j", (subscription) => {
    expect(hasPaidStyleAccess(subscription, now)).toBe(false);
  });
  it("rejects a forged premium style before spending provider funds", async () => {
    const fetch = vi.fn();
    const from = (table: string) => {
      const result = table === "profiles" ? { credits: 10, subscription_tier: "pro" }
        : table === "style_templates" ? { prompt_template: "Premium {prompt}", is_premium: true } : null;
      const query = { select: () => query, eq: () => query,
        single: async () => ({ data: result, error: null }),
        maybeSingle: async () => ({ data: result, error: null }) };
      return query;
    };
    const handler = loadHandler("generate-image", { createClient: () => ({ auth, from }), fetch });
    const response = await handler(request({ prompt: "A green meadow", style: "Premium" }));
    expect(response.status).toBe(403);
    expect((await response.json()).code).toBe("PREMIUM_STYLE_REQUIRED");
    expect(fetch).not.toHaveBeenCalled();
  });
});

describe("Runware durable daily limits", () => {
  it.each([{ firstDay: true, count: "3" }, { firstDay: false, count: "1" }])(
    "blocks exhausted usage after image deletion: %j", async ({ firstDay, count }) => {
      const generateDalleImage = vi.fn();
      const fetch = vi.fn(async (url: string, options: RequestInit) => {
        expect(url).toContain("/generation_usage?");
        if (options.method === "HEAD") {
          expect(options.headers).toMatchObject({ Prefer: "count=exact" });
          return new Response(null, { headers: { "Content-Range": `*/${count}` } });
        }
        const date = firstDay ? new Date() : new Date(Date.now() - 172800000);
        return new Response(JSON.stringify([{ created_at: date.toISOString() }]));
      });
      const handler = loadHandler("generate-runware-image", { createClient: () => ({ auth }), fetch, generateDalleImage });
      expect((await handler(request({ prompt: "A green meadow" }))).status).toBe(429);
      expect(generateDalleImage).not.toHaveBeenCalled();
    },
  );
  it("does not mistake an unavailable count for zero usage", async () => {
    const generateDalleImage = vi.fn();
    const fetch = vi.fn(async (_url: string, options: RequestInit) => options.method === "HEAD"
      ? new Response(null) : new Response("[]"));
    const handler = loadHandler("generate-runware-image", { createClient: () => ({ auth }), fetch, generateDalleImage });
    expect((await handler(request({ prompt: "A green meadow" }))).status).toBe(500);
    expect(generateDalleImage).not.toHaveBeenCalled();
  });
});