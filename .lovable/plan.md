

## UI/UX Audit Fix Plan

### Issues Identified

1. **Focus-visible ring color is green (#06d6a0)** in `base.css` — clashes with the orange/coral brand theme
2. **Gallery skeleton** uses off-brand blue/purple gradient (`from-blue-100 to-purple-100`, `border-blue-200 border-t-blue-500`)
3. **No text-shadow/overlay on hero text** for legibility over background imagery (partially addressed by `neon-text` class but only on "Stunning Images")
4. **Inconsistent card padding** across Pricing (`p-4 md:p-6`), Blog (`p-6`, `p-8`), and Features (`p-6 md:p-8`)
5. **Missing micro-interactions** — buttons lack consistent `hover:scale` effects
6. **No visual dividers between footer link sections**
7. **Gallery images lack consistent aspect-ratio containers** — some use `aspect-square`, some use `aspect-[4/5]`, some use `aspect-video`
8. **Loading skeleton for AI generation** uses basic blue spinner, needs branded pulsing gradient
9. **No blur-up image loading** for gallery items
10. **Subtle background texture** missing — flat dark backgrounds lack depth

### Implementation Plan

#### High Priority

**A. Fix focus-visible to match brand (base.css)**
- Change `#06d6a0` to `hsl(var(--primary))` (orange/coral) for the global `*:focus-visible` rule
- Update `mobile-first.css` mobile focus ring similarly

**B. Hero text legibility (AdvancedHero.tsx)**
- Add `text-shadow: 0 2px 30px hsl(0 0% 0% / 0.8)` to the hero h1 via inline style or a utility class
- Add text-shadow to the description paragraphs as well

**C. Branded gallery loading skeleton (GallerySkeleton.tsx)**
- Replace `from-blue-100 to-purple-100` with `from-primary/20 to-accent/10`
- Replace blue spinner with primary-colored spinner
- Add shimmer/pulsing gradient animation matching the brand

**D. Consistent aspect-ratio containers**
- Standardize gallery images in `ShowcaseGrid`, `ImageShowcaseGrid`, and word-to-image gallery to `aspect-square` with `object-cover`

#### Medium Priority

**E. Standardize card padding**
- Normalize all card padding to `p-6 md:p-8` across Pricing (`OptimizedPlanCard`), Blog cards, and Feature cards

**F. Add micro-interactions**
- Add `hover:scale-[1.02] active:scale-[0.98] transition-transform` to all CTA buttons globally via enhanced-theme.css `.btn-neon` and similar classes
- Add subtle `hover:translate-y-[-2px]` to cards that don't already have it

**G. Footer visual dividers (AdvancedFooter.tsx)**
- Add `border-l border-white/10` separators between link columns on desktop (lg breakpoint)
- Add subtle `Separator` component or `<hr>` with `border-white/5` between mobile stacked sections

**H. Blur-up image loading**
- Add a CSS class `blur-up` that starts with `filter: blur(10px)` and transitions to `filter: blur(0)` on load
- Apply to `LazyImage` component and gallery image components

#### Low Priority

**I. Background texture/grain**
- Add a subtle noise texture overlay to `enhanced-theme.css` body background using a CSS `url()` pattern or SVG noise filter at very low opacity (0.02-0.03)

**J. Custom scrollbar already implemented** — confirmed in enhanced-theme.css. No changes needed.

### Files to Edit

| File | Changes |
|------|---------|
| `src/styles/base.css` | Fix focus-visible color to `hsl(var(--primary))` |
| `src/styles/mobile-first.css` | Fix mobile focus ring color |
| `src/styles/enhanced-theme.css` | Add `.blur-up` class, noise texture to body, micro-interaction utilities |
| `src/components/home/AdvancedHero.tsx` | Add text-shadow to h1 and description |
| `src/components/word-to-image/gallery/GallerySkeleton.tsx` | Brand the skeleton colors and spinner |
| `src/components/home/AdvancedFooter.tsx` | Add dividers between link columns |
| `src/components/pricing/OptimizedPlanCard.tsx` | Normalize padding to `p-6 md:p-8` |
| `src/components/home/AdvancedFeatures.tsx` | Add `hover:scale-[1.02]` to CTA button |
| `src/components/common/LazyImage.tsx` | Add blur-up loading transition |

