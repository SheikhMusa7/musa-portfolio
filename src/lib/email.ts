import { sanitize } from "@/lib/validations";

const BG = "#0a0a0f";
const CARD = "#14141b";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT = "#ededf2";
const MUTED = "#8b8b96";
const ACCENT = "#a78bfa";

export type ContactEmailPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget: string;
  ip: string;
};

export type BookingEmailPayload = {
  name: string;
  email: string;
  service: string;
  timeline: string;
  details: string;
  ip: string;
};

function row(label: string, value: string): string {
  return `<tr><td style="padding:7px 0; vertical-align:top; font-family:ui-monospace,Menlo,monospace; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:${MUTED}; width:32%;">${label}</td><td style="padding:7px 0; font-family:Inter,Arial,sans-serif; font-size:14px; color:${TEXT}; line-height:1.5;">${value || "—"}</td></tr>`;
}

function shell(title: string, bodyHtml: string, footer: string): string {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0; padding:0; background:${BG};">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG}; padding:36px 0;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:${CARD}; border:1px solid ${BORDER}; border-radius:14px; overflow:hidden;">
          <tr><td style="padding:26px 32px 18px; border-bottom:1px solid ${BORDER};">
            <p style="margin:0 0 4px; font-family:ui-monospace,Menlo,monospace; font-size:10px; letter-spacing:0.3em; text-transform:uppercase; color:${ACCENT};">${title}</p>
            <h1 style="margin:0; font-family:Inter,Arial,sans-serif; font-weight:700; font-size:22px; color:${TEXT}; letter-spacing:-0.01em;">Musa Sheikh</h1>
          </td></tr>
          <tr><td style="padding:22px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${bodyHtml}
            </table>
          </td></tr>
          <tr><td style="padding:14px 32px 22px; border-top:1px solid ${BORDER};">
            <p style="margin:0; font-family:ui-monospace,Menlo,monospace; font-size:10px; letter-spacing:0.14em; text-transform:uppercase; color:${MUTED};">${footer}</p>
          </td></tr>
        </table>
        <p style="margin:16px 0 0; font-family:Inter,Arial,sans-serif; font-size:12px; color:${MUTED};">Reply directly to this email to respond — their address is in the Reply-To.</p>
      </td></tr>
    </table>
  </body>
</html>`;
}

export function renderContactEmailHtml(p: ContactEmailPayload): string {
  const body = `
    ${row("Name", sanitize(p.name))}
    ${row("Email", sanitize(p.email))}
    ${row("Subject", sanitize(p.subject))}
    ${p.budget ? row("Budget", sanitize(p.budget)) : ""}
    ${row("Note", "Details below.")}
  `;
  const meta = `From IP ${sanitize(p.ip)} · ${new Date().toISOString()}`;
  const noteBlock = `<tr><td colspan="2" style="padding:14px 0 0;"><div style="padding:16px 18px; background:${BG}; border:1px solid ${BORDER}; border-radius:10px;"><p style="margin:0; font-family:Inter,Arial,sans-serif; font-size:14px; line-height:1.6; color:${TEXT}; white-space:pre-wrap;">${sanitize(p.message)}</p></div></td></tr>`;
  return shell("New contact message", body + noteBlock, meta);
}

export function renderContactEmailText(p: ContactEmailPayload): string {
  return [
    `New contact message — Musa Sheikh`,
    ``,
    `Name:    ${p.name}`,
    `Email:   ${p.email}`,
    `Subject: ${p.subject}`,
    p.budget ? `Budget:  ${p.budget}` : "",
    `IP:      ${p.ip}`,
    `Date:    ${new Date().toISOString()}`,
    ``,
    `Message:`,
    p.message,
    ``,
    `Reply directly to this email to respond.`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function renderBookingEmailHtml(p: BookingEmailPayload): string {
  const body = `
    ${row("Name", sanitize(p.name))}
    ${row("Email", sanitize(p.email))}
    ${row("Service", sanitize(p.service))}
    ${p.timeline ? row("Timeline", sanitize(p.timeline)) : ""}
    ${row("Note", "Details below.")}
  `;
  const meta = `From IP ${sanitize(p.ip)} · ${new Date().toISOString()}`;
  const noteBlock = `<tr><td colspan="2" style="padding:14px 0 0;"><div style="padding:16px 18px; background:${BG}; border:1px solid ${BORDER}; border-radius:10px;"><p style="margin:0; font-family:Inter,Arial,sans-serif; font-size:14px; line-height:1.6; color:${TEXT}; white-space:pre-wrap;">${sanitize(p.details)}</p></div></td></tr>`;
  return shell("New booking request", body + noteBlock, meta);
}

export function renderBookingEmailText(p: BookingEmailPayload): string {
  return [
    `New booking request — Musa Sheikh`,
    ``,
    `Name:     ${p.name}`,
    `Email:    ${p.email}`,
    `Service:  ${p.service}`,
    p.timeline ? `Timeline: ${p.timeline}` : "",
    `IP:       ${p.ip}`,
    `Date:     ${new Date().toISOString()}`,
    ``,
    `Details:`,
    p.details,
    ``,
    `Reply directly to this email to respond.`,
  ]
    .filter(Boolean)
    .join("\n");
}
