"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
  captchaId: string;
  captchaAnswer: string;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
    captchaId: "",
    captchaAnswer: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [captchaQ, setCaptchaQ] = useState("");

  async function loadCaptcha() {
    try {
      const r = await fetch("/api/captcha");
      const d = await r.json();
      if (d.ok) {
        setFormData((p) => ({ ...p, captchaId: d.id, captchaAnswer: "" }));
        setCaptchaQ(d.question);
      }
    } catch {
      setCaptchaQ("Unavailable");
    }
  }

  useEffect(() => {
    loadCaptcha();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("submitting");
    setFeedback("");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const d = await r.json();
      if (d.ok) {
        setStatus("success");
        setFeedback(d.message || "Message sent!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          website: "",
          captchaId: "",
          captchaAnswer: "",
        });
        loadCaptcha();
        setTimeout(() => {
          setStatus("idle");
          setFeedback("");
        }, 6000);
      } else {
        setStatus("error");
        setFeedback(d.error || "Something went wrong.");
        loadCaptcha();
      }
    } catch {
      setStatus("error");
      setFeedback("Network error. Please try again or email me directly.");
      loadCaptcha();
    }
  };

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-accent/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div ref={ref} className="max-w-2xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="kicker"
          >
            Let&rsquo;s build
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-4 mb-6 font-display"
          >
            Engineer what&rsquo;s
            <br />
            next<span className="gradient-accent"> for you.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto mb-10"
          >
            Tell me where you&rsquo;re headed. I&rsquo;ll bring the engineering and a
            plan you can act on.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            className="space-y-4 max-w-lg mx-auto text-left"
          >
            <div className="flex gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="flex-1 bg-card border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="flex-1 bg-card border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject (optional)"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-card border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Tell me about your project or idea..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-card border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300 resize-none"
            />
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={handleChange}
              className="hidden"
              aria-hidden="true"
            />
            {captchaQ && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                  {captchaQ}
                </span>
                <input
                  type="text"
                  name="captchaAnswer"
                  placeholder="Answer"
                  value={formData.captchaAnswer}
                  onChange={handleChange}
                  required
                  className="w-28 bg-card border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={loadCaptcha}
                  className="text-xs text-muted-foreground hover:text-accent transition-colors"
                  title="New captcha"
                >
                  ↻
                </button>
              </div>
            )}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-soft transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/25"
              >
                {status === "submitting" ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <span className="text-lg">&rarr;</span>
                  </>
                )}
              </button>
            </div>

            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center gap-2 text-sm text-emerald-400"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feedback}
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center gap-2 text-sm text-rose-400"
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z"
                    />
                  </svg>
                  {feedback}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-6 mt-10"
          >
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {personalInfo.email}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
