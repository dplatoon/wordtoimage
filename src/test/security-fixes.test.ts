import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readFunction = (name: string) =>
  readFileSync(new URL(`../../supabase/functions/${name}/index.ts`, import.meta.url), "utf8");

describe("security regression checks", () => {
  it("does not allow clients to add or reset their own credits", () => {
    const source = readFunction("manage-user-credits");

    expect(source).toContain('const validActions = ["get", "deduct"];');
    expect(source).not.toMatch(/case "(add|reset)"/);
  });

  it("does not write billing portal capability URLs to server logs", () => {
    const source = readFunction("customer-portal");

    expect(source).toContain(
      'logStep("Customer portal session created", { sessionId: portalSession.id });',
    );
    expect(source).toContain('JSON.stringify({ url: portalSession.url })');
  });

  it("checks subscriptions through the authenticated account ID instead of email", () => {
    const source = readFunction("check-subscription");

    expect(source).toContain('.eq("user_id", user.id)');
    expect(source).toContain("query: `metadata['user_id']:'${user.id}'`");
    expect(source).not.toContain("stripe.customers.list({ email:");
  });

  it("carries the authenticated account ID through checkout and fulfillment", () => {
    const checkout = readFunction("create-checkout");
    const webhook = readFunction("stripe-webhook");

    expect(checkout).toContain("client_reference_id: user.id");
    expect(webhook).toContain("checkoutSession.client_reference_id");
    expect(webhook).toContain("supabase.auth.admin.getUserById(userId)");
    expect(webhook).not.toContain("supabase.auth.admin.listUsers()");
  });
});
