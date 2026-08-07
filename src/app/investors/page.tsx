import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { company } from "@/lib/site";
import { prisma } from "@/lib/prisma";
import { documentCategories } from "@/lib/investor-documents";
import type { PublicDocumentCategory } from "@/generated/prisma/client";

export const metadata: Metadata = {
  title: "Investors",
  description: "Investor relations for CROX OIL & GAS PVT. LTD, including statutory filings and compliance documents.",
};

export default async function InvestorsPage() {
  const counts = await prisma.publicDocument.groupBy({
    by: ["category"],
    _count: { _all: true },
  });
  const countByCategory = Object.fromEntries(
    counts.map((c) => [c.category, c._count._all])
  ) as Record<PublicDocumentCategory, number>;

  return (
    <>
      <PageHero
        title="Investors"
        subtitle="Statutory filings and corporate disclosures for CROX OIL & GAS PVT. LTD."
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(documentCategories).map(([category, meta]) => {
              const count = countByCategory[category as PublicDocumentCategory] ?? 0;
              return (
                <Link
                  key={meta.slug}
                  href={`/investors/${meta.slug}`}
                  className="block bg-white rounded-2xl shadow-sm p-8 hover:shadow-md transition-shadow"
                >
                  <h2 className="text-xl font-bold text-foreground mb-2">{meta.label}</h2>
                  <p className="text-muted">{meta.description}</p>
                  <span className="inline-block mt-4 text-navy font-semibold">
                    {count > 0 ? `View ${count} filing${count === 1 ? "" : "s"} →` : "No filings yet →"}
                  </span>
                </Link>
              );
            })}
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
