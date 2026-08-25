// Maestro export counter.
//   POST /maestro/exported  -> +1 (called by the app after a successful export)
//   GET  /maestro/count     -> { "count": N } (polled by the website)
//
// A Durable Object keeps the increment atomic (KV would drop concurrent
// writes). Light per-IP rate limiting keeps drive-by inflation boring.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }

    const stub = env.COUNTER.get(env.COUNTER.idFromName("global"));

    if (request.method === "GET" && url.pathname === "/maestro/count") {
      const count = await stub.getCount();
      return Response.json({ count }, {
        headers: { ...CORS, "Cache-Control": "public, max-age=15" },
      });
    }

    if (request.method === "POST" && url.pathname === "/maestro/exported") {
      const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
      const count = await stub.increment(ip);
      return Response.json({ count }, { headers: CORS });
    }

    return new Response("Not found", { status: 404, headers: CORS });
  },
};

import { DurableObject } from "cloudflare:workers";

export class Counter extends DurableObject {
  async getCount() {
    return (await this.ctx.storage.get("count")) ?? 0;
  }

  /** Increment, unless this IP has been hammering (30/hour is far more
   *  exports than any human produces). */
  async increment(ip) {
    const hour = Math.floor(Date.now() / 3_600_000);
    const rateKey = `rate:${ip}:${hour}`;
    const used = (await this.ctx.storage.get(rateKey)) ?? 0;
    let count = (await this.ctx.storage.get("count")) ?? 0;
    if (used < 30) {
      count += 1;
      await this.ctx.storage.put("count", count);
      await this.ctx.storage.put(rateKey, used + 1);
    }
    // Old rate buckets are tiny; sweep occasionally.
    if (Math.random() < 0.01) {
      const all = await this.ctx.storage.list({ prefix: "rate:" });
      for (const key of all.keys()) {
        if (!key.endsWith(`:${hour}`)) await this.ctx.storage.delete(key);
      }
    }
    return count;
  }
}
