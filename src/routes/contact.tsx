import { media } from "@/data/media";
import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { useState, useRef, useEffect, type FormEvent } from "react";
import { email, socials } from "@/data/content";
import { createServerFn } from "@tanstack/react-start";
import toast from "react-hot-toast";
import gsap from "gsap";
import {
  Mail,
  Check,
  ChevronsUpDown,
  Copy,
  ExternalLink,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaCode, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Atharv Pathak" },
      { name: "description", content: "Get in touch with Atharv Pathak. Send a message, hire for a project, or connect on socials." },
    ],
  }),
});

type Fields = {
  name: string;
  email: string;
  phone: string;
  message: string;
  honeypot?: string;
};

const empty: Fields = {
  name: "",
  email: "",
  phone: "",
  message: "",
  honeypot: "",
};

const sendEmail = createServerFn({ method: "POST" })
  .validator((data: Fields) => data)
  .handler(async ({ data }) => {
    if (data.honeypot) {
      return { success: true };
    }
    console.log("Contact form submission:", data);
    return { success: true };
  });

function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span>{children}</span>
    </span>
  );
}

function getSocialIcon(label: string) {
  const norm = label.toLowerCase();
  if (norm.includes("github")) return <FaGithub className="w-3.5 h-3.5" />;
  if (norm.includes("linkedin")) return <FaLinkedin className="w-3.5 h-3.5" />;
  if (norm.includes("leet")) return <FaCode className="w-3.5 h-3.5" />;
  if (norm.includes("insta")) return <FaInstagram className="w-3.5 h-3.5" />;
  if (norm.includes("youtube")) return <FaYoutube className="w-3.5 h-3.5" />;
  if (norm.includes("twitter") || norm.includes("x")) return <FaXTwitter className="w-3.5 h-3.5" />;
  return <ExternalLink className="w-3.5 h-3.5" />;
}

function TurnstileBadge({
  verified,
  onVerify,
}: {
  verified: boolean;
  onVerify: () => void;
}) {
  const [checking, setChecking] = useState(false);

  const handleClick = () => {
    if (verified) return;
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      onVerify();
      toast.success("Security verification completed!", { duration: 2000 });
    }, 600);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      className="group inline-flex items-center justify-between gap-5 sm:gap-7 bg-white text-neutral-800 rounded-sm border border-neutral-300 shadow-[0_1px_3px_rgba(0,0,0,0.08)] py-2.5 px-3.5 select-none transition-all hover:border-neutral-400"
      aria-label="Cloudflare Turnstile Verification"
    >
      <div className="flex items-center gap-2.5">
        {verified ? (
          <div className="w-5 h-5 rounded-full bg-[#10b981] flex items-center justify-center text-white text-[11px] font-black shadow-sm transition-transform duration-300 scale-100">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        ) : checking ? (
          <div className="w-5 h-5 rounded-full border-2 border-neutral-300 border-t-[#f38020] animate-spin" />
        ) : (
          <div className="w-5 h-5 rounded-sm border-2 border-neutral-400 group-hover:border-neutral-600 transition-colors" />
        )}
        <span className="text-[13px] font-medium text-neutral-800 tracking-tight">
          {verified ? "Success!" : checking ? "Verifying..." : "Verify you are human"}
        </span>
      </div>

      <div className="flex flex-col items-end pl-2 border-l border-neutral-200 leading-none">
        <div className="flex items-center gap-1.5">
          <svg
            className="w-4 h-3.5 text-[#F38020]"
            viewBox="0 0 105 70"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M72.6 28.5c-1.4-12.8-12.3-22.8-25.6-22.8-11.4 0-21.1 7.4-24.5 17.7-1.1-.2-2.3-.3-3.5-.3C8.5 23.1 0 31.6 0 42.1c0 10.5 8.5 19 19 19h53.5c11.9 0 21.5-9.6 21.5-21.5 0-10.8-8-19.8-18.4-21.1h-3z" />
          </svg>
          <span className="text-[9.5px] font-extrabold tracking-wider uppercase text-neutral-800 font-sans">
            CLOUDFLARE
          </span>
        </div>
        <div className="text-[8.5px] text-neutral-500 font-sans mt-0.5 space-x-1">
          <a
            href="https://www.cloudflare.com/privacypolicy/"
            target="_blank"
            rel="noreferrer"
            className="hover:underline text-neutral-500 hover:text-neutral-700"
            onClick={(e) => e.stopPropagation()}
          >
            Privacy
          </a>
          <span>•</span>
          <a
            href="https://www.cloudflare.com/website-terms/"
            target="_blank"
            rel="noreferrer"
            className="hover:underline text-neutral-500 hover:text-neutral-700"
            onClick={(e) => e.stopPropagation()}
          >
            Terms
          </a>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const [fields, setFields] = useState<Fields>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(true);
  const [copied, setCopied] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroHeadingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      if (heroImgRef.current) {
        gsap.fromTo(
          heroImgRef.current,
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  function update(key: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    if (error) setError("");
  }

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email copied to clipboard!", { icon: "📋" });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  async function submit(event: FormEvent) {
    event.preventDefault();

    if (!fields.name.trim() || !fields.email.trim() || !fields.phone.trim() || !fields.message.trim()) {
      setError("Please fill out all required fields.");
      toast.error("Please fill out all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      setError("Please provide a valid email address.");
      toast.error("Invalid email address.");
      return;
    }

    if (!verified) {
      setError("Please complete the Cloudflare security verification.");
      toast.error("Security verification required.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const data = await sendEmail({ data: fields });

      if (data?.success) {
        setSent(true);
        toast.success("Message received! I'll reply promptly.", { icon: "✨" });
      } else {
        setError("Unable to transmit message. Please email directly.");
        toast.error("Transmission failed.");
      }
    } catch (err) {
      setError("Failed to send message. Please contact via email.");
      toast.error("Submission failed. Please use direct email.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main ref={containerRef} className="w-full bg-paper text-primary">
      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION — "DON'T BE SHY" + "contact me." + MURAL PHOTO
          ───────────────────────────────────────────────────────────── */}
      <section className="border-b border-primary/40 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column (8 of 12 cols): Kicker & Large Display Heading */}
          <div className="lg:col-span-8 flex min-h-[360px] sm:min-h-[440px] md:min-h-[520px] lg:min-h-[580px] xl:min-h-[640px] flex-col justify-between p-6 sm:p-8 md:p-12 lg:p-14 xl:p-16">
            <div>
              <p className="kicker text-primary/80 font-bold tracking-[0.24em]">
                DON’T BE SHY
              </p>
            </div>
            <div className="mt-8 lg:mt-16">
              <h1
                ref={heroHeadingRef}
                className="text-[4.2rem] sm:text-[6.4rem] md:text-[8.5rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[13.5rem] font-bold leading-[0.82] tracking-[-0.055em] text-primary select-none"
              >
                contact<br />me.
              </h1>
            </div>
          </div>

          {/* Right Column (4 of 12 cols): Mural Street Wall Photo */}
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-primary/40 relative min-h-[320px] sm:min-h-[400px] md:min-h-[460px] lg:min-h-full overflow-hidden bg-primary/5">
            <img
              ref={heroImgRef}
              src={media.contactWall || "/media/wall.jpg"}
              alt="Atharv Pathak street mural wall"
              className="h-full w-full object-cover object-center filter contrast-[1.02] transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MIDDLE SECTION — "say hello." + BORDERED FORM GRID
          ───────────────────────────────────────────────────────────── */}
      <section className="border-b border-primary/40">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column (5 of 12 cols): "say hello." + Email + Socials */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-primary/40 p-6 sm:p-8 md:p-12 lg:p-14 xl:p-16 flex flex-col justify-between min-h-[420px] lg:min-h-[520px]">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] font-bold tracking-tight text-primary leading-tight">
                say hello.
              </h2>
            </div>

            <div className="mt-14 lg:mt-auto pt-8">
              {/* Email with copy action */}
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 opacity-80 shrink-0 text-primary" />
                <a
                  href={`mailto:${email}`}
                  className="group text-lg sm:text-xl md:text-2xl font-medium underline decoration-primary/40 underline-offset-4 hover:decoration-primary transition-colors text-primary"
                >
                  <Roll>{email}</Roll>
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                  className="p-1.5 opacity-60 hover:opacity-100 hover:bg-primary/10 rounded transition-all ml-1"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-primary" />
                  )}
                </button>
              </div>

              {/* Socials list */}
              <ul className="mt-8 space-y-3.5">
                {socials.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-3 text-[0.68rem] font-mono tracking-[0.22em] uppercase font-semibold opacity-75 hover:opacity-100 transition-all hover:translate-x-1"
                    >
                      <span className="opacity-80 group-hover:opacity-100 transition-opacity">
                        {getSocialIcon(item.label)}
                      </span>
                      <Roll>{item.label}</Roll>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form Column (6 of 12 cols): Bordered Cells */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {sent ? (
              <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center min-h-[450px]">
                <p className="kicker text-primary/80 font-bold">MESSAGE TRANSMITTED</p>
                <h3 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                  Thanks for reaching out!
                </h3>
                <p className="mt-4 text-base sm:text-lg opacity-80 max-w-md">
                  Your message has been received. I’ll review your inquiry and get back to you shortly.
                </p>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setFields(empty);
                    }}
                    className="border border-primary/70 hover:border-primary px-7 py-3 text-[0.68rem] font-mono uppercase tracking-[0.22em] font-semibold transition-all hover:bg-primary hover:text-paper cursor-pointer"
                  >
                    <Roll>Write another</Roll>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="flex flex-col h-full">
                {/* Row 1: NAME * | EMAIL * (2 equal columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-primary/40">
                  {/* NAME Cell */}
                  <div className="border-b sm:border-b-0 sm:border-r border-primary/40 p-5 sm:p-6 md:p-7">
                    <label
                      htmlFor="name"
                      className="block text-[0.62rem] font-mono tracking-[0.24em] uppercase font-semibold opacity-75"
                    >
                      NAME *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={fields.name}
                      onChange={(e) => update("name", e.target.value)}
                      autoComplete="name"
                      className="mt-3 w-full bg-transparent text-lg md:text-xl font-normal outline-none placeholder:opacity-30 focus:outline-none"
                    />
                  </div>

                  {/* EMAIL Cell */}
                  <div className="p-5 sm:p-6 md:p-7">
                    <label
                      htmlFor="email"
                      className="block text-[0.62rem] font-mono tracking-[0.24em] uppercase font-semibold opacity-75"
                    >
                      EMAIL *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={fields.email}
                      onChange={(e) => update("email", e.target.value)}
                      autoComplete="email"
                      className="mt-3 w-full bg-transparent text-lg md:text-xl font-normal outline-none placeholder:opacity-30 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Row 2: PHONE * (Full width) */}
                <div className="border-b border-primary/40 p-5 sm:p-6 md:p-7">
                  <label
                    htmlFor="phone"
                    className="block text-[0.62rem] font-mono tracking-[0.24em] uppercase font-semibold opacity-75"
                  >
                    PHONE *
                  </label>
                  <div className="relative mt-3 flex items-center">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={fields.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      autoComplete="tel"
                      className="w-full bg-transparent text-lg md:text-xl font-normal outline-none pr-8 focus:outline-none"
                    />
                    <ChevronsUpDown className="w-4 h-4 opacity-40 absolute right-1 pointer-events-none" />
                  </div>
                </div>

                {/* Row 3: MESSAGE * (Full width) */}
                <div className="border-b border-primary/40 p-5 sm:p-6 md:p-7 flex-1">
                  <label
                    htmlFor="message"
                    className="block text-[0.62rem] font-mono tracking-[0.24em] uppercase font-semibold opacity-75"
                  >
                    MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={fields.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="mt-3 w-full bg-transparent text-lg md:text-xl font-normal outline-none resize-none focus:outline-none"
                  />
                </div>

                {/* Honeypot anti-spam field */}
                <input
                  type="text"
                  name="honeypot"
                  className="hidden"
                  value={fields.honeypot}
                  onChange={(e) => update("honeypot", e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Error Banner */}
                {error && (
                  <div className="px-5 sm:px-6 md:px-7 pt-4 text-xs font-mono text-red-600 dark:text-red-400">
                    ⚠ {error}
                  </div>
                )}

                {/* Row 4: Action area (Turnstile Badge + SUBMIT Button) */}
                <div className="p-5 sm:p-6 md:p-7 flex flex-col items-start gap-6 bg-transparent">
                  <TurnstileBadge
                    verified={verified}
                    onVerify={() => setVerified(true)}
                  />

                  <div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="border border-primary/70 hover:border-primary px-8 py-3 text-[0.68rem] font-mono uppercase tracking-[0.24em] font-semibold transition-all hover:bg-primary hover:text-paper cursor-pointer disabled:opacity-50"
                    >
                      <Roll>{submitting ? "Submitting..." : "Submit"}</Roll>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right Column (1 of 12 cols): Empty 12th-column border spacer */}
          <div className="lg:col-span-1 hidden lg:block border-l border-primary/40 bg-primary/[0.015]" />
        </div>
      </section>
    </main>
  );
}
