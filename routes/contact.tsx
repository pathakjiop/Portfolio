import { media } from "@/data/media";
import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { useState, type FormEvent } from "react";
import { email, socials } from "@/data/content";

export const Route = createFileRoute("/contact")({ 
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Atharv Pathak" },
      { name: "description", content: "Get in touch with me." }
    ]
  })
});

type Fields = { name: string; email: string; phone: string; message: string; honeypot?: string };

const empty: Fields = { name: "", email: "", phone: "", message: "", honeypot: "" };

import { createServerFn } from "@tanstack/react-start";

const sendEmail = createServerFn({ method: "POST" })
  .validator((data: Fields) => data)
  .handler(async ({ data }) => {
    if (data.honeypot) {
      return { success: true };
    }
    console.log("Contact form submission:", data);
    return { success: true };
  });

function Contact() {
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [fields, setFields] = useState<Fields>(empty);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function update(key: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!fields.name.trim() || !fields.email.trim() || !fields.phone.trim() || !fields.message.trim()) {
      setError("Every field is required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      setError("That email doesn’t look right.");
      return;
    }
    setError("");
    setSubmitting(true);
    
    try {
      const data = await sendEmail({ data: fields });
      
      if (data.success) {
        setSent(true);
      } else {
        setError("Something went wrong.");
      }
    } catch (err) {
      setError("Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="frame pt-10 pb-20 md:pt-16">
      <p className="kicker">Don’t be shy</p>
      <h1 className="display">contact me.</h1>

      <div className="mt-10 grid border-y border-primary/40 lg:grid-cols-12">
        <div className="border-primary/40 p-6 lg:col-span-5 lg:border-r lg:p-10">
          <p className="text-3xl font-medium tracking-tight md:text-4xl">say hello.</p>
          <a href={`mailto:${email}`} className="mt-6 block text-xl underline decoration-primary/40 underline-offset-4">
            {email}
          </a>
          <ul className="mt-8 space-y-3">
            {socials.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer" className="kicker">
                  {item.label} →
                </a>
              </li>
            ))}
          </ul>
          <img
            src={media.contactWall || "/media/square.webp"}
            alt="Atharv Pathak"
            className="mt-10 hidden aspect-square w-full object-contain lg:block"
          />
        </div>

        <form onSubmit={submit} className="p-6 lg:col-span-7 lg:p-10" noValidate>
          {sent ? (
            <div className="flex min-h-80 flex-col justify-end">
              <p className="kicker">Message sent</p>
              <p className="mt-4 max-w-md text-3xl leading-tight font-medium tracking-tight">
                Thanks for reaching out! I'll get back to you soon.
              </p>
              <button type="button" className="btn mt-8 w-fit" onClick={() => setSent(false)}>
                Write another
              </button>
            </div>
          ) : (
            <>
              {(
                [
                  ["name", "Name"],
                  ["email", "Email"],
                  ["phone", "Phone"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="block border-b border-primary/40 py-5">
                  <span className="kicker">
                    {label} <span aria-hidden>*</span>
                  </span>
                  <input
                    required
                    type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                    value={fields[key]}
                    onChange={(event) => update(key, event.target.value)}
                    className="mt-2 w-full bg-transparent text-xl outline-none"
                    autoComplete={key}
                  />
                </label>
              ))}
              <label className="block border-b border-primary/40 py-5">
                <span className="kicker">
                  Message <span aria-hidden>*</span>
                </span>
                <textarea
                  required
                  rows={5}
                  value={fields.message}
                  onChange={(event) => update("message", event.target.value)}
                  className="mt-2 w-full resize-y bg-transparent text-xl outline-none"
                />
              </label>
              {error && <p className="mt-4 text-sm">{error}</p>}
              <input 
                type="text" 
                name="honeypot" 
                className="hidden" 
                value={fields.honeypot} 
                onChange={(event) => update("honeypot", event.target.value)} 
                tabIndex={-1} 
                autoComplete="off" 
              />
              <button type="submit" disabled={submitting} className="btn mt-8">
                {submitting ? "Sending..." : "Submit"}
              </button>
            </>
          )}
        </form>
      </div>
    </main>
  );
}
