"use client";

import { useActionState, useState } from "react";
import { sendOtp, verifyOtp } from "@/lib/actions/otp-actions";

export default function PhoneOtpForm() {
  const [phoneState, phoneAction, phonePending] = useActionState(sendOtp, undefined);
  const [codeState, codeAction, codePending] = useActionState(verifyOtp, undefined);
  const [phoneForResend, setPhoneForResend] = useState("");

  // Prefer the most recently updated state between the two steps.
  const active = codeState ?? phoneState;

  if (active?.step === "pending-approval") {
    return (
      <div className="rounded-xl bg-section p-6 text-center">
        <p className="font-semibold text-foreground mb-1">Almost there</p>
        <p className="text-sm text-muted">{active.message}</p>
      </div>
    );
  }

  if (active?.step === "rejected") {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-center">
        <p className="font-semibold text-foreground mb-1">Sign-in unavailable</p>
        <p className="text-sm text-red-600">{active.message}</p>
      </div>
    );
  }

  if (active?.step === "enter-code") {
    return (
      <div className="space-y-4">
        <form
          action={(formData) => {
            setPhoneForResend(active.phone);
            codeAction(formData);
          }}
          className="space-y-4"
        >
          <input type="hidden" name="phone" value={active.phone} />
          <p className="text-sm text-muted">
            Enter the code sent to <span className="font-medium text-foreground">{active.phone}</span>
          </p>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
              Full Name <span className="text-muted font-normal">(new accounts only)</span>
            </label>
            <input
              id="name"
              name="name"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
            />
          </div>
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-foreground mb-1.5">
              Verification Code
            </label>
            <input
              id="code"
              name="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 tracking-widest"
            />
          </div>

          {active.info && <p className="text-sm text-red-600">{active.info}</p>}

          <button
            type="submit"
            disabled={codePending}
            className="w-full rounded-full bg-amber px-6 py-3 font-semibold text-white hover:bg-amber-light transition-colors disabled:opacity-60"
          >
            {codePending ? "Verifying…" : "Verify & Continue"}
          </button>
        </form>

        <form action={phoneAction}>
          <input type="hidden" name="phone" value={phoneForResend || active.phone} />
          <button type="submit" disabled={phonePending} className="text-sm text-navy hover:text-amber">
            {phonePending ? "Resending…" : "Resend code"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <form action={phoneAction} className="space-y-4">
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="98765 43210"
          required
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      </div>

      {phoneState?.step === "enter-phone" && phoneState.error && (
        <p className="text-sm text-red-600">{phoneState.error}</p>
      )}

      <button
        type="submit"
        disabled={phonePending}
        className="w-full rounded-full border border-navy text-navy px-6 py-3 font-semibold hover:bg-navy hover:text-white transition-colors disabled:opacity-60"
      >
        {phonePending ? "Sending…" : "Send Code"}
      </button>
    </form>
  );
}
