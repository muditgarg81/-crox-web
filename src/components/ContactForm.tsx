"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-section p-8 text-center">
        <p className="text-lg font-semibold text-foreground mb-2">Thank you!</p>
        <p className="text-muted">
          Your message has been sent. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1.5">
          First Name*
        </label>
        <input
          id="firstName"
          name="firstName"
          required
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-1.5">
          Last Name*
        </label>
        <input
          id="lastName"
          name="lastName"
          required
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
          Email Address*
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-1.5">
          Company
        </label>
        <input
          id="company"
          name="company"
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
          Message*
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      </div>

      {status === "error" && (
        <p className="sm:col-span-2 text-sm text-red-600">
          Something went wrong sending your message. Please try again, or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="sm:col-span-2 justify-self-start rounded-full bg-amber px-8 py-3.5 font-semibold text-white hover:bg-amber-light transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
