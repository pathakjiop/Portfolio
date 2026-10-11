import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  message: z.string().min(1, "Message is required"),
});

export const submitContactForm = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSchema.parse(data))
  .handler(async (ctx) => {
    const { name, email, phone, message } = ctx.data;
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.log("Contact submission (dev):", { name, email, phone, message });
      return { success: true };
    }

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: "Contact Form <onboarding@resend.dev>",
          to: "atharvpathak248@gmail.com",
          subject: `New message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send email");
      }
      return { success: true };
    } catch (error) {
      console.error("Resend error:", error);
      throw new Error("Failed to submit form");
    }
  });
