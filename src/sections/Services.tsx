"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Section from "@/components/Section";
import MagneticButton from "@/components/MagneticButton";
import {
  freelancerServices,
  freelancerProcess,
  freelancerStats,
} from "@/lib/data";

interface BookingData {
  name: string;
  email: string;
  service: string;
  timeline: string;
  details: string;
  honeypot: string;
  captchaId: string;
  captchaAnswer: string;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [modalOpen, setModalOpen] = useState(false);
  const [captchaQ, setCaptchaQ] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [booking, setBooking] = useState<BookingData>({
    name: "",
    email: "",
    service: "",
    timeline: "",
    details: "",
    honeypot: "",
    captchaId: "",
    captchaAnswer: "",
  });

  async function loadCaptcha() {
    try {
      const r = await fetch("/api/captcha");
      const d = await r.json();
      if (d.ok) {
        setBooking((p) => ({ ...p, captchaId: d.id, captchaAnswer: "" }));
        setCaptchaQ(d.question);
      }
    } catch {
      setCaptchaQ("Unavailable");
    }
  }

  function openBooking(serviceTitle: string) {
    setBooking((p) => ({ ...p, service: serviceTitle }));
    setStatus("idle");
    setFeedback("");
    setModalOpen(true);
    loadCaptcha();
  }

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking.name || !booking.email) return;
    setStatus("submitting");
    setFeedback("");
    try {
      const r = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });
      const d = await r.json();
      if (d.ok) {
        setStatus("success");
        setFeedback(d.message || "Booking received!");
        setBooking({
          name: "",
          email: "",
          service: "",
          timeline: "",
          details: "",
          honeypot: "",
          captchaId: "",
          captchaAnswer: "",
        });
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
    <Section id="services">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="kicker"
          >
            Hire me
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mt-4 font-display"
          >
            Pick a package.
            <br />
            <span className="gradient-accent">Let&rsquo;s ship.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm text-muted-foreground leading-relaxed mt-6 max-w-lg"
          >
            Transparent pricing, clear timelines, and code you own. No retainers,
            no lock-in &mdash; just a plan and a build.
          </motion.p>
        </div>

        <div ref={ref} className="grid md:grid-cols-3 gap-6 mb-20">
          {freelancerServices.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 shadow-card ${
                service.popular
                  ? "border border-accent/40 bg-gradient-to-b from-accent/[0.08] to-transparent"
                  : "border border-border bg-card/40 hover:border-accent/20"
              }`}
            >
              {service.popular && (
                <span className="absolute -top-3 right-6 px-3 py-1 text-[0.65rem] font-semibold tracking-wider uppercase rounded-full gradient-accent-solid text-white">
                  Popular
                </span>
              )}
              <div className="text-3xl mb-5">{service.icon}</div>
              <h3 className="text-lg font-bold font-display mb-2">
                {service.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                {service.description}
              </p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold font-display">
                  {service.price}
                </span>
              </div>
              <span className="text-xs text-muted-foreground mb-6 block">
                {service.timeline} turnaround
              </span>
              <div className="space-y-2.5 mb-8 flex-1">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <svg
                      className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
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
                    <span className="text-xs text-foreground/75">{feature}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => openBooking(service.title)}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-300 cursor-pointer ${
                  service.popular
                    ? "bg-accent text-white hover:bg-accent-soft shadow-lg shadow-accent/25"
                    : "border border-border text-foreground hover:border-accent/40 hover:text-accent"
                }`}
              >
                Start a project <span className="text-lg">&rarr;</span>
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-border bg-card/30 p-8 lg:p-12 mb-20"
        >
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 items-center">
            <div>
              <span className="kicker">How it works</span>
              <h3 className="text-2xl lg:text-3xl font-bold mt-4 mb-4 font-display">
                No fluff. Just a clear path from idea to launch.
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every project follows the same three steps. You always know
                what&rsquo;s happening, what&rsquo;s next, and what you&rsquo;re
                paying for.
              </p>
            </div>
            <div className="space-y-6">
              {freelancerProcess.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex gap-5"
                >
                  <span className="text-xs text-accent font-mono w-6 flex-shrink-0 mt-0.5">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {freelancerStats.map((stat) => (
            <div
              key={stat.label}
              className="text-center rounded-xl border border-border bg-card/20 py-6"
            >
              <div className="text-2xl lg:text-3xl font-bold gradient-accent font-display">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <MagneticButton
            onClick={() => openBooking("")}
            variant="primary"
            size="lg"
          >
            Tell me what you need <span className="text-lg">&rarr;</span>
          </MagneticButton>
          <p className="text-xs text-muted-foreground mt-4">
            Not sure which fits? Send me a message and I&rsquo;ll recommend the
            right scope.
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-premium-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <span className="kicker">Book a project</span>
                  <h3 className="text-lg font-bold font-display mt-1">
                    Let&rsquo;s scope your build
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-card/60 transition-colors"
                  aria-label="Close"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={booking.name}
                    onChange={handleChange}
                    required
                    className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={booking.email}
                    onChange={handleChange}
                    required
                    className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                  />
                </div>
                <input
                  type="text"
                  name="service"
                  placeholder="Service (e.g. Business Website)"
                  value={booking.service}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                />
                <input
                  type="text"
                  name="timeline"
                  placeholder="Timeline (e.g. ASAP, 2 weeks)"
                  value={booking.timeline}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                />
                <textarea
                  name="details"
                  rows={3}
                  placeholder="Tell me about your project..."
                  value={booking.details}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300 resize-none"
                />
                <input
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={booking.honeypot}
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
                      value={booking.captchaAnswer}
                      onChange={handleChange}
                      required
                      className="w-28 bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
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
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-soft transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/25"
                >
                  {status === "submitting" ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                      >
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
                      Send booking request{" "}
                      <span className="text-lg">&rarr;</span>
                    </>
                  )}
                </button>

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
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
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
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
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
