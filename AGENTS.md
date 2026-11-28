# Architecture rules

- Reserve secure-provider usage and free credits atomically through a service-only database function before provider calls; locking the profile prevents concurrent allowance bypasses.
- Resolve paid-style access from active, unexpired account-linked subscription records on the server and in database policies; client selections and profile labels cannot grant paid access.
- Count generation limits from the append-only usage ledger, not removable image history; deleting images must not restore allowance.