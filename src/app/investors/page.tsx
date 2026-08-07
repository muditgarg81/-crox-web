import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Investors",
  description: "Investor relations for CROX OIL & GAS PVT. LTD, including statutory filings and annual returns.",
};

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        title="Investors"
        subtitle="Statutory filings and corporate disclosures for CROX OIL & GAS PVT. LTD."
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            <Link
              href="/investors/annual-returns"
              className="block bg-white rounded-2xl shadow-sm p-8 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-bold text-foreground mb-2">Annual Returns</h2>
              <p className="text-muted">
                Annual Returns filed with the Registrar of Companies, available for download by
                financial year.
              </p>
              <span className="inline-block mt-4 text-navy font-semibold">View filings &rarr;</span>
            </Link>
          </div>

          <div className="mt-12 text-sm text-muted">
            For any investor queries, please write to{" "}
            <a href={`mailto:${company.email}`} className="text-navy hover:text-amber">
              {company.email}
            </a>
            .
          </div>
        </div>
      </section>
    </>
  );
}
