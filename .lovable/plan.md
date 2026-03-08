

## Plan: Fix Build Error + Address Audit Findings

### 1. Fix Build Error in OnboardingManager.tsx (line 210)

The `React.cloneElement` call tries to pass `onboardingContext` as a prop to `children`, but TypeScript can't verify this prop exists on the child component type. 

**Fix:** Replace the `cloneElement` pattern with simply rendering `{children}` directly. The onboarding context is already available via the `useOnboarding` hook exported from the same file, so passing it via `cloneElement` is unnecessary.

```tsx
// Before:
{React.cloneElement(children as React.ReactElement, { onboardingContext })}

// After:
{children}
```

### 2. Acknowledge GitHub Audit Fixes

The user performed an external audit on GitHub covering:
- `.env` exposure fix (`.gitignore` updated)
- React 19 type mismatches fixed
- Build tools moved to devDependencies
- Capacitor packages removed
- `AuthContext.tsx` modernized

The `.env.example` and `AuthContext.tsx` changes have already synced into the Lovable project (visible in the last diff). The `package.json` dependency reorganization may need verification after sync.

### 3. Security Note

The user should rotate their Supabase anon key since it was publicly exposed. However, since this is a Lovable Cloud project, the keys are managed automatically and the anon key is inherently public (it's the publishable key). No rotation is strictly required for the anon key, but if a service role key was ever exposed, that would need immediate rotation.

