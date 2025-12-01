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
 * Cloudflare Worker to fetch unique viewers (IPs) for the last 24 hours (current day).
 * Matches dashboard's "Unique Viewers" metric.
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname !== '/cf-requests') {
      return new Response('Not Found', { status: 404 });
    }

    // Simple edge cache (1 hour at edge, 5 min for browsers—uniques update slowly)
    const cache = caches.default;
    const cached = await cache.match(request);
    if (cached) return cached;

    // Get current day (UTC midnight to end)
    const now = new Date();
    const today = now.toISOString().split('T')[0];  // YYYY-MM-DD format for date filter

    // Main query: Use 1dGroups for uniques (required for uniq aggregation)
    let query = `
      query GetUniqueVisitors($zone: String!, $date: Date!) {
        viewer {
          zones(filter: { zoneTag: $zone }) {
            httpRequests1dGroups(
              filter: { date: $date }
              limit: 1
            ) {
              uniq {
                uniques  # Unique IP addresses (visitors)
              }
              sum {
                requests  # Total requests (for comparison)
                pageViews # Uncached page views
              }
            }
          }
        }
      }`;
    const variables = {
      zone: env.CF_ZONE_ID,
      date: today,
    };

    let { resp, json } = await cfGqlFetch(env, query, variables);

    // Fallback: If 1dGroups unauthorized (unlikely on paid plans), use 1hGroups for totals only
    const hasAuthzError = !resp.ok ||
      !json?.data?.viewer?.zones?.[0] ||
      (Array.isArray(json?.errors) &&
       json.errors.some(e =>
         e?.extensions?.code === 'authz' ||
         /does not have access to the path/i.test(e?.message || '')
       ));
    if (hasAuthzError) {
      query = `
        query GetTrafficFallback($zone: String!, $start: DateTime!, $end: DateTime!) {
          viewer {
            zones(filter: { zoneTag: $zone }) {
              httpRequests1hGroups(
                filter: { datetime_geq: $start, datetime_leq: $end }
                limit: 24  # ~24 hours
              ) {
                sum {
                  requests
                  pageViews
                }
              }
            }
          }
        }`;
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const end = now;
      variables.start = start.toISOString();
      variables.end = end.toISOString();
      delete variables.date;  // Clean up
      ({ resp, json } = await cfGqlFetch(env, query, variables));

      // For fallback, aggregate totals (no uniques available)
      const z = json.data.viewer.zones[0];
      const groups = z.httpRequests1hGroups ?? [];
      const totals = groups.reduce(
        (acc, g) => {
          acc.requests += g?.sum?.requests || 0;
          acc.pageViews += g?.sum?.pageViews || 0;
          return acc;
        },
        { requests: 0, pageViews: 0, uniques: null }  // No uniques in fallback
      );
      totals.error = "Fallback: Uniques unavailable in hourly data. Upgrade plan or use daily query.";

      const out = new Response(JSON.stringify(totals), {
        status: 200,
        headers: {
          "content-type": "application/json",
          "Cache-Control": "public, max-age=300, s-maxage=3600"  // 5 min / 1 hour
        }
      });
      ctx.waitUntil(cache.put(request, out.clone()));
      return out;
    }

    // Success: Extract from 1dGroups (single group for the day)
    const group = json.data.viewer.zones[0].httpRequests1dGroups[0];
    if (!group) {
      return new Response(JSON.stringify({ error: "No data for today" }), {
        status: 404,
        headers: { "content-type": "application/json", "Cache-Control": "no-store" }
      });
    }

    const totals = {
      uniques: group.uniq?.uniques || 0,  // Unique viewers (IPs)
      requests: group.sum?.requests || 0,
      pageViews: group.sum?.pageViews || 0,
      date: today  // For reference
    };

    const out = new Response(JSON.stringify(totals), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "Cache-Control": "public, max-age=300, s-maxage=3600"
      }
    });
    ctx.waitUntil(cache.put(request, out.clone()));
    return out;
  },
};