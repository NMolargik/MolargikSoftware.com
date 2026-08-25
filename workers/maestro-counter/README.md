# Maestro export counter

One Cloudflare Worker + one Durable Object. The Mac app POSTs after each
successful export; the website polls the count every 30 seconds.

## Deploy (one time, ~5 minutes)

```bash
cd workers/maestro-counter
npm install -g wrangler   # if you don't have it
wrangler login            # opens the browser, pick the molargiksoftware.com account
wrangler deploy
```

Then attach the domain the app and site already point at:
Cloudflare dash → Workers & Pages → maestro-counter → Settings →
Domains & Routes → Add → **Custom domain** → `api.molargiksoftware.com`.

Verify:

```bash
curl -X POST https://api.molargiksoftware.com/maestro/exported
curl https://api.molargiksoftware.com/maestro/count
```

## Notes

- The count lives in the Durable Object's storage — atomic increments, no
  lost writes, survives deploys.
- Per-IP limit of 30 increments/hour blunts drive-by inflation. It's a
  public vanity counter; that's proportionate.
- To seed or correct the number: temporarily add a route that sets
  `count`, or use `wrangler tail` + a quick one-off. Ask Claude.
- The website component (`src/components/ExportCounter.tsx`) and the app's
  ping both use `https://api.molargiksoftware.com/maestro/...`.
