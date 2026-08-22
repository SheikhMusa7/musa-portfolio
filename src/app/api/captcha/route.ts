import { NextResponse } from "next/server";
import { createChallenge } from "@/lib/captcha";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  const { id, question } = createChallenge();
  return NextResponse.json({ ok: true, id, question });
}
