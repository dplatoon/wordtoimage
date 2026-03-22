

## Plan: Fix 24 Build Errors + Test UI Improvements

### Step 1: Fix Edge Function TypeScript Errors

All 24 errors are in 5 edge function files — they fall into 3 categories:

**A. `error` is of type `unknown`** (20 errors across 4 files)
Every `catch (error)` and `catch (err)` block accesses `.message`, `.stack`, `.response`, `.errorData` etc. without type narrowing. Fix by casting to `Error` or using `instanceof` checks.

| File | Fix |
|------|-----|
| `check-generation-status/index.ts` (line 64) | `(error as Error).message` |
| `generate-replicate-image/index.ts` (lines 264-294) | Cast `err` as `Error`, cast outer `error` as `Error` |
| `generate-runware-image/index.ts` (lines 269-402) | Cast `err` as `any` (uses `.isOpenAI`, `.errorData`, `.response` — non-standard props), cast outer `error` as `Error` |
| `stripe-webhook/index.ts` (lines 40-41, 171-173) | Cast `err` and `error` as `Error` |

**B. `string | undefined` not assignable to `string`** (1 error)
- `api-optimization/index.ts` line 116: `cacheStore.keys().next().value` may be `undefined`
- Fix: Add `if (oldestKey)` guard before `cacheStore.delete(oldestKey)`

**C. `EdgeRuntime` not found** (1 error)
- `api-optimization/index.ts` line 174: `EdgeRuntime.waitUntil()` doesn't exist in Deno
- Fix: Replace with a simple `await` or wrap in a fire-and-forget `Promise` since it's just background logging

### Step 2: Test UI Improvements

After the build succeeds, navigate the app at desktop (1525px) and mobile (390px) viewports to verify:
- Focus rings use purple/primary color (tab through interactive elements)
- Hero text is legible with text-shadow over background imagery
- Footer has visual dividers between link columns on desktop
- Gallery skeleton uses branded purple gradient (if visible)

