import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "musa-portfolio API",
    time: new Date().toISOString(),
    endpoints: ["/api/health", "/api/captcha", "/api/contact", "/api/booking"],
  });
}
