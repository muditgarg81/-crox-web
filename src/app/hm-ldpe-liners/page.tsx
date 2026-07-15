import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "HM/LDPE Liners",
  description:
    "HM/LDPE+LLDPE liner bags for industrial packaging and waste collection — moisture-resistant, waterproof, and elastic.",
};

const specs = [
  { label: "Material", value: "HDPE, LDPE" },
  { label: "Color", value: "Transparent" },
  { label: "Thickness", value: "All" },
  { label: "Usage/Application", value: "Industrial Packaging" },
  { label: "Pattern", value: "Plain" },
  { label: "Handle Type", value: "No Handle" },
  { label: "Property", value: "Recyclable, Transparent, Moisture Proof" },
  { label: "Surface Finish", value: "Glossy, Embossed, Matte" },
  { label: "Virgin Quality", value: "100% Virgin" },
  { label: "Country of Origin", value: "Made in India" },
];

const properties = [
  {
    title: "Moisture resist",
    image: "/images/liner-moisture-resist.webp",
    body: "Moisture-resistant materials have become a cornerstone in packaging, safeguarding products from the potentially damaging effects of humidity during storage and transportation — from food freshness to pharmaceuticals to electronic components.",
  },
  {
    title: "Water proof",
    image: "/images/liner-water-proof.webp",
    body: "Waterproof bags often feature sealed seams and secure closures, adding an extra layer of protection. Their versatility extends across sports and recreation, camping, and water-based activities, offering a lightweight and durable solution.",
  },
  {
    title: "Elasticity",
    image: "/images/liner-elasticity.webp",
    body: "Elasticity describes a material's ability to deform or stretch under force and return to its original shape when the force is removed — crucial for liners that need to conform without losing integrity over time.",
  },
];

export default function HmLdpeLinersPage() {
  return (
    <>
      <PageHero title="HM/LDPE + LLDPE Liners" />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Product Specification</h2>
              <dl className="divide-y divide-gray-100">
                {specs.map((s) => (
                  <div key={s.label} className="flex justify-between py-2.5 text-sm">
                    <dt className="text-muted">{s.label}</dt>
                    <dd className="font-medium text-foreground text-right">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="text-muted leading-relaxed">
              <p>
                We have marked a distinct position in the market by providing HM/LDPE Liner
                Bags. These bags are used for packaging materials in various industries as well
                as for collecting waste. We understand the requirements of our clients and try
                to cater to them with unmatched products in various sizes. The offered bags are
                extensively demanded in the market, and we offer them at a reasonable price.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {properties.map((p) => (
              <div key={p.title} className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-section">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
