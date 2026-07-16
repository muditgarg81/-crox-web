import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intralink",
  description: "CROX employee intranet — leave requests, notices, and grievances.",
};

export default function IntralinkLandingPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-navy flex items-center justify-center px-6 py-20">
      <div className="max-w-xl text-center text-white">
        <p className="uppercase tracking-widest text-amber font-semibold mb-4">
          CROX OIL &amp; GAS PVT. LTD
        </p>
        <h1 className="text-4xl font-bold mb-4">Intralink</h1>
        <p className="text-white/70 mb-10">
          The internal portal for leave requests, company notices, grievances, the employee
          directory, and shared documents.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/intralink/login"
            className="rounded-full bg-amber px-7 py-3.5 font-semibold text-white hover:bg-amber-light transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/intralink/signup"
            className="rounded-full border border-white/40 px-7 py-3.5 font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
