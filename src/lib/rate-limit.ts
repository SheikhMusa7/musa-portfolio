type Entry = { count: number; expires: number; banUntil: number };

const buckets = new Map<string, Entry>();

export function rateAllowed(
  key: string,
  max: number,
  windowMs: number,
  banMs: number,
): boolean {
  const now = Date.now();
  const e = buckets.get(key);
  if (e?.banUntil && e.banUntil > now) return false;
  if (!e || e.expires < now) {
    buckets.set(key, { count: 1, expires: now + windowMs, banUntil: 0 });
    return true;
  }
  e.count += 1;
  if (e.count > max) {
    e.banUntil = now + banMs;
    return false;
  }
  return true;
}

export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
