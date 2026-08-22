import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is too short")
    .max(80, "Name is too long")
    .refine((v) => !/https?:\/\//i.test(v), "Links aren't allowed in the name"),
  email: z
    .string()
    .trim()
    .max(120, "Email is too long")
    .email("Please enter a valid email"),
  subject: z
    .string()
    .trim()
    .min(2, "Subject is too short")
    .max(120, "Subject is too long")
    .optional()
    .default("General inquiry"),
  message: z
    .string()
    .trim()
    .min(10, "Please share a bit more detail")
    .max(4000, "Message is too long (4000 chars max)"),
  budget: z
    .string()
    .trim()
    .max(60)
    .optional()
    .default(""),
  website: z
    .string()
    .max(200, "Too long")
    .optional()
    .default(""),
  captchaId: z
    .string()
    .min(8, "Missing captcha id")
    .max(64, "Invalid captcha id")
    .regex(/^[a-z0-9]+$/i, "Invalid captcha id"),
  captchaAnswer: z
    .string()
    .trim()
    .min(1, "Please answer the captcha")
    .max(8, "Captcha answer too long"),
});

export type ContactPayload = z.infer<typeof contactSchema>;

export const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is too short")
    .max(80, "Name is too long"),
  email: z
    .string()
    .trim()
    .max(120, "Email is too long")
    .email("Please enter a valid email"),
  service: z
    .string()
    .trim()
    .min(2, "Please pick a service")
    .max(80, "Service too long"),
  timeline: z
    .string()
    .trim()
    .max(60)
    .optional()
    .default(""),
  details: z
    .string()
    .trim()
    .max(4000, "Details too long")
    .optional()
    .default(""),
  honeypot: z
    .string()
    .max(200)
    .optional()
    .default(""),
  captchaId: z
    .string()
    .min(8, "Missing captcha id")
    .max(64, "Invalid captcha id")
    .regex(/^[a-z0-9]+$/i, "Invalid captcha id"),
  captchaAnswer: z
    .string()
    .trim()
    .min(1, "Please answer the captcha")
    .max(8, "Captcha answer too long"),
});

export type BookingPayload = z.infer<typeof bookingSchema>;

export function sanitize(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
