# Selected security fixes

- [x] Enforce durable plan allowance before secure image requests.
- [x] Restrict paid template content to active subscribers.
- [x] Reject paid styles for accounts without paid access.
- [x] Count Runware usage independently of deletable image history.
- [x] Test protections, deploy affected functions, and close selected findings.

Verification: 21 tests passed; live public reads hide paid templates and preserve free templates; the preview builds successfully. Signed-in live checks were unavailable because test-account sign-in was interrupted.