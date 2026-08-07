import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Annual Returns",
  description: "Annual Returns filed by CROX OIL & GAS PVT. LTD, available for download by financial year.",
};

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function AnnualReturnsPage() {
  const documents = await prisma.publicDocument.findMany({
    where: { category: "ANNUAL_RETURN" },
    orderBy: { financialYear: "desc" },
  });

  return (
    <>
      <PageHero
        title="Annual Returns"
        subtitle="Annual Returns filed by CROX OIL & GAS PVT. LTD with the Registrar of Companies."
      />

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          {documents.length === 0 ? (
            <p className="text-muted">No annual returns have been published yet.</p>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-xl shadow-sm p-6 flex flex-wrap items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold text-foreground">{doc.title}</p>
                    <p className="text-sm text-muted">
                      {doc.financialYear} &middot; Published {formatDate(doc.createdAt)}
                    </p>
                  </div>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-navy-dark transition-colors"
                  >
                    Download PDF
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
