// Helper to call Cloudflare GraphQL API
async function cfGqlFetch(env, query, variables) {
  const resp = await fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${env.CF_API_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await resp.json();
  return { resp, json };
}
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname !== '/cf-requests') {
      return new Response('Not Found', { status: 404 });
    }

    // Simple edge cache (5 min at edge, 1 min for browsers)
    const cache = caches.default;
    const cached = await cache.match(request);
    if (cached) return cached;

    // Query analytics data for the current calendar day (midnight to now)
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = now;

    // First, try minute-level dataset (may require extra permissions/plan).
    let query = `
      query GetTraffic($zone: String!, $start: Time!, $end: Time!) {
        viewer {
          zones(filter: { zoneTag: $zone }) {
            httpRequests1mGroups(
              filter: { datetime_geq: $start, datetime_leq: $end }
              limit: 2000
            ) {
              sum {
                requests
                pageViews
              }
            }
          }
        }
      }`;

    const variables = {
      zone: env.CF_ZONE_ID,
      start: start.toISOString(),
      end: end.toISOString(),
    };

    let { resp, json } = await cfGqlFetch(env, query, variables);

    // If minute-level is unauthorized for this zone/token, fall back to 1-hour groups.
    const hasAuthzError =
      !resp.ok ||
      !json?.data?.viewer?.zones?.[0] ||
      Array.isArray(json?.errors) &&
      json.errors.some(e =>
        e?.extensions?.code === 'authz' ||
        /does not have access to the path/i.test(e?.message || '')
      );

    if (hasAuthzError) {
      query = `
        query GetTrafficFallback($zone: String!, $start: Time!, $end: Time!) {
          viewer {
            zones(filter: { zoneTag: $zone }) {
              httpRequests1hGroups(
                filter: { datetime_geq: $start, datetime_leq: $end }
                limit: 1000
              ) {
                sum {
                  requests
                  pageViews
                }
              }
            }
          }
        }`;
      ({ resp, json } = await cfGqlFetch(env, query, variables));
    }

    if (!resp.ok || !json?.data?.viewer?.zones?.[0]) {
      return new Response(JSON.stringify({
        error: "Cloudflare API error",
        details: json?.errors ?? null
      }), {
        status: 502,
        headers: { "content-type": "application/json", "Cache-Control": "no-store" }
      });
    }

    const z = json.data.viewer.zones[0];
    const groups = z.httpRequests1mGroups ?? z.httpRequests1hGroups ?? [];
	const totals = groups.reduce(
      (acc, g) => {
        acc.requests += g?.sum?.requests || 0;
        acc.pageViews += g?.sum?.pageViews || 0;
        return acc;
      },
      { requests: 0, pageViews: 0 }
    );

    const out = new Response(JSON.stringify(totals), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "Cache-Control": "public, max-age=20, s-maxage=120"
      }
    });

    ctx.waitUntil(cache.put(request, out.clone()));
    return out;
  },
};
