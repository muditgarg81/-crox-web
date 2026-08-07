import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { prisma } from "@/lib/prisma";
import { categoryBySlug, documentCategories } from "@/lib/investor-documents";

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function generateStaticParams() {
  return Object.values(documentCategories).map((meta) => ({ slug: meta.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) return {};
  const meta = documentCategories[category];
  return { title: meta.label, description: meta.description };
}

export default async function InvestorDocumentCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();

  const meta = documentCategories[category];
  const documents = await prisma.publicDocument.findMany({
    where: { category },
    orderBy: [{ periodLabel: "desc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <PageHero title={meta.label} subtitle={meta.description} />

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          {documents.length === 0 ? (
            <p className="text-muted">No documents have been published in this category yet.</p>
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
                      {doc.periodLabel} &middot; Published {formatDate(doc.createdAt)}
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
