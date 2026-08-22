import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { appendFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { bookingSchema } from "@/lib/validations";
import { verifyChallenge } from "@/lib/captcha";
import { rateAllowed, clientIp } from "@/lib/rate-limit";
import {
  renderBookingEmailHtml,
  renderBookingEmailText,
  type BookingEmailPayload,
} from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL || "musaahmaddd29@gmail.com";
const FROM_EMAIL =
  process.env.FROM_EMAIL || "Musa Ahmad <onboarding@resend.dev>";

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;
const RATE_BAN_MS = 60_000;

function logBackup(payload: Record<string, unknown>, ip: string) {
  const entry = { ...payload, ip, _at: new Date().toISOString() };
  const line = JSON.stringify(entry) + "\n";
  console.log("[booking] backing up:", line.trim());
  try {
    const logDir = join(process.cwd(), "logs");
    if (!existsSync(logDir)) mkdirSync(logDir, { recursive: true });
    appendFileSync(join(logDir, "bookings.jsonl"), line, "utf8");
  } catch (err) {
    console.error("[booking] file backup failed:", err);
  }
}

async function sendViaResend(payload: BookingEmailPayload): Promise<{
  ok: boolean;
  error?: string;
}> {
  if (!RESEND_API_KEY) {
    console.warn("[booking] RESEND_API_KEY missing - skipping email send");
    return { ok: false, error: "no-api-key" };
  }
  try {
    const resend = new Resend(RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: payload.email,
      subject: `New booking - ${payload.service}`,
      html: renderBookingEmailHtml(payload),
      text: renderBookingEmailText(payload),
      tags: [{ name: "source", value: "portfolio-booking" }],
    });
    if (error) {
      console.error("[booking] Resend error:", error);
      return { ok: false, error: String(error.message ?? error) };
    }
    console.log("[booking] email sent. id=", data?.id);
    return { ok: true };
  } catch (err) {
    console.error("[booking] Resend threw:", err);
    return { ok: false, error: String(err) };
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = clientIp(req);

    if (!rateAllowed("booking:" + ip, RATE_MAX, RATE_WINDOW_MS, RATE_BAN_MS)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many booking requests. Please wait a minute and try again.",
        },
        { status: 429 },
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid request body." },
        { status: 400 },
      );
    }

    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      const first =
        flat.formErrors[0] ||
        Object.values(flat.fieldErrors)[0]?.[0] ||
        "Please check the form fields.";
      return NextResponse.json(
        { ok: false, error: first },
        { status: 400 },
      );
    }
    const data = parsed.data;

    if (data.honeypot && data.honeypot.trim().length > 0) {
      console.log("[booking] honeypot tripped - silent success");
      return NextResponse.json({
        ok: true,
        message: "Booking received. I'll confirm within 24 hours.",
      });
    }

    if (!verifyChallenge(data.captchaId, data.captchaAnswer)) {
      console.log("[booking] captcha failed");
      return NextResponse.json(
        { ok: false, error: "Captcha answer is wrong or expired. Please try again." },
        { status: 400 },
      );
    }

    const payload: BookingEmailPayload = {
      name: data.name,
      email: data.email,
      service: data.service,
      timeline: data.timeline,
      details: data.details,
      ip,
    };

    logBackup({ ...payload }, ip);

    const send = await sendViaResend(payload);
    if (!send.ok) {
      console.warn("[booking] email send failed - logged as backup. reason:", send.error);
    }

    return NextResponse.json({
      ok: true,
      message: "Booking received. I'll confirm within 24 hours with a tailored plan.",
    });
  } catch (err) {
    console.error("[booking] uncaught error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Something went wrong on our end. Please try again, or email me directly.",
      },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json(
    { ok: true, service: "Musa Ahmad - booking endpoint" },
    { status: 200 },
  );
}
