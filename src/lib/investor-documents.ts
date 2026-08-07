import type { PublicDocumentCategory } from "@/generated/prisma/client";

export type CategoryMeta = {
  slug: string;
  label: string;
  description: string;
};

export const documentCategories: Record<PublicDocumentCategory, CategoryMeta> = {
  ANNUAL_RETURN: {
    slug: "annual-returns",
    label: "Annual Returns",
    description: "Annual Returns filed with the Registrar of Companies, by financial year.",
  },
  FINANCIAL_STATEMENT: {
    slug: "financial-statements",
    label: "Financial Statements",
    description: "Audited financial statements and related filings.",
  },
  BOARD_RESOLUTION: {
    slug: "board-resolutions",
    label: "Board Resolutions",
    description: "Resolutions passed by the Board of Directors.",
  },
  SHAREHOLDING_PATTERN: {
    slug: "shareholding-pattern",
    label: "Shareholding Pattern",
    description: "Statements of shareholding pattern.",
  },
  OTHER: {
    slug: "other-filings",
    label: "Other Filings",
    description: "Other statutory and compliance documents.",
  },
};

export function categoryBySlug(slug: string): PublicDocumentCategory | undefined {
  const entry = Object.entries(documentCategories).find(([, meta]) => meta.slug === slug);
  return entry ? (entry[0] as PublicDocumentCategory) : undefined;
}
