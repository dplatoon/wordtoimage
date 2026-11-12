## Master Audit — Findings & Fix Plan

Scope: homepage + shared UI primitives. Based on console logs, a11y heuristics, and code scan. Backend / business logic untouched.

### Findings

**1. Runtime warning — Missing `Description`/`aria-describedby` on DialogContent**
- Source: `Warning: Missing 'Description' or 'aria-describedby={undefined}' for {DialogContent}` (console).
- Several dialogs render `DialogContent` without a `DialogDescription` or explicit `aria-describedby`.
- Affected (highest traffic first): `src/components/conversion/ExitIntentModal.tsx`, `EnhancedExitIntentModal.tsx`, `LeadMagnetSystem.tsx`, `SmartOnboardingFlow.tsx`, `ViralGrowthSystem.tsx`, `community/CreatePostModal.tsx`, `text-to-image/BrowseStylesModal.tsx`, `templates/TemplatePreviewModal.tsx`, `word-to-image/SettingsModal.tsx`, `word-to-image/EditImageModal.tsx`, `onboarding/WelcomeFlow.tsx`, `PaymentMethodModal.tsx`, `home/StylePresetsGallery.tsx`, `gallery/UserCollections.tsx`, `templates/AdvancedPromptTemplates.tsx`, `auth/form/FormFooter.tsx`.

**2. Perf — LCP reported as 128s / 130s ("poor")**
- `src/main.tsx` registers a long-running `setInterval` and injects critical CSS at runtime. The 128s figure points to a stale LCP event being reported after long idle (likely the GA `time_threshold` listener mistakenly logged as LCP, or a `PerformanceObserver` that records `largest-contentful-paint` from a deferred image swap in `AdvancedHero` carousel).
- `usePerformanceMonitoring`/`webVitalsMonitor` likely double-counts. Need to gate LCP capture to before `visibilitychange` / first interaction.

**3. Mobile viewport — `min-h-screen` instead of `min-h-dvh`**
- 20+ pages use `min-h-screen`, which breaks on iOS Safari with the dynamic toolbar (content clipped/scrolls past viewport). Pages: `Auth.tsx`, `Blog*.tsx`, `BetaLanding.tsx`, `Beta.tsx`, `About.tsx`, `AdminAuditLogs.tsx`, `BatchGenerator.tsx`, `AIUpscaler.tsx`, `AITemplates.tsx`, `API.tsx`, all `pages/blog/*`, `BlogPostDetail.tsx`, plus `Index` wrapper in `pages/Index.tsx`.

**4. A11y — `<div onClick>` without keyboard support / role**
- `src/components/gallery/UserCollections.tsx` (11), `home/StylePresetsGallery.tsx` (9), `pages/Gallery.tsx` (7), `collaboration/RealTimeCollaboration.tsx` (7), `batch/BatchProcessingEngine.tsx` (7). Convert to `<button>` or add `role="button"` + `tabIndex={0}` + `onKeyDown` Enter/Space.

**5. Homepage Index — duplicate `<main>` landmark**
- `src/pages/Index.tsx` has `<main id="main-content" role="main">`, but several sections (e.g. `HomeContent.tsx`) also render `<main id="main-content">`. While `HomeContent` isn't used by `Index`, the duplicate id pattern exists project-wide. Audit and ensure exactly one `<main>` per route.

**6. Critical CSS injection in `main.tsx` runs after React mounts**
- The `<style>` is appended inside the module body but executes post-bundle parse, defeating its anti-FOUC purpose. Move to `index.html` `<style>` block.

**7. `setInterval` blob cleanup leak risk**
- `main.tsx` revokes any `blob:` `<img src>` every 5 min — this revokes URLs that are still visually mounted, causing broken images on long sessions. Should track owned URLs only or remove.

**8. SEO/A11y minor — heading order & alt text**
- `AdvancedHero.tsx` thumbnail nav now has aria-labels (recent fix) ✅. Spot-check remaining icon-only buttons across `Nav.tsx`, `MobileOptimizedNav.tsx`, footer social icons.

**9. Hard-coded `text-white` / arbitrary grays**
- Recent fix added `text-white` on auth buttons (necessary). But across `Footer.tsx`, `BetaCTA.tsx`, blog pages, scan for remaining `text-gray-300/400/500` on light backgrounds and replace with `text-muted-foreground`.

**10. Service worker (`public/sw.js`) cache staleness**
- Confirm versioned cache name and skipWaiting to avoid serving the pre-fix bundle after publish.

### Fix Plan (ordered)

1. **Add `DialogDescription` (or `aria-describedby={undefined}` explicit opt-out) to every `DialogContent`** in the 16 affected files. Use visually-hidden description where copy doesn't fit the design.
2. **Replace `min-h-screen` → `min-h-dvh`** (and `h-screen` → `h-dvh`) across all `src/pages/**` and any layout wrappers. Keep `min-h-screen` only as a fallback class alongside `min-h-dvh` if needed.
3. **Convert `<div onClick>` to `<button>`** in the top 5 offenders (gallery, style presets, batch, collab). Where layout requires a div, add `role="button" tabIndex={0} onKeyDown` Enter/Space handler and `aria-label`.
4. **Fix LCP instrumentation** in `src/utils/performance/webVitalsMonitor.ts` and `src/hooks/usePerformanceMonitoring.ts`: stop recording LCP after `visibilitychange === 'hidden'` and after first user input, per Web Vitals spec.
5. **Move critical CSS** from `src/main.tsx` into `index.html` `<style>` and drop the runtime injection.
6. **Remove the blob revocation `setInterval`** in `main.tsx` (or scope to a tracked Set populated by uploaders), to prevent broken images.
7. **A11y sweep**: ensure each route has exactly one `<main>`; add `aria-label` to remaining icon-only buttons in `Nav.tsx`, `MobileOptimizedNav.tsx`, `Footer.tsx`.
8. **Color token sweep**: replace `text-gray-3xx/4xx` with `text-muted-foreground` on light surfaces in `Footer.tsx` and blog pages.
9. **Bump SW cache version** in `public/sw.js` so the next publish invalidates old chunks; verify `skipWaiting` + `clients.claim`.

### Technical notes

- shadcn `Dialog` uses Radix, which requires `aria-describedby` to point to a `DialogDescription` id, or be explicitly `undefined`. Adding a `<DialogDescription className="sr-only">{...}</DialogDescription>` resolves it without visual change.
- `min-h-dvh` requires Tailwind ≥ 3.4 (project uses v3, confirm version then add fallback `min-h-screen min-h-dvh` if older).
- Web Vitals: use `onLCP` from the `web-vitals` package which already handles termination correctly; if hand-rolled, mirror the same termination conditions.

### Out of scope

- Backend, edge function, RLS changes (recent migrations cover those).
- SEO scanner findings already handled in prior turns.
- Lighthouse scores — re-evaluated only after publish.

I'll execute these in the order above once you approve.