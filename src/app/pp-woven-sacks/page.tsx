import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "PP Woven Sacks",
  description:
    "Unlaminated, liner, and laminated PP woven sack bags — economical, strong, and tear-resistant for heavy-duty use.",
};

const types = [
  {
    title: "Unlaminated bags",
    image: "/images/woven-unlaminated.webp",
    body: "Unlaminated bags, often referred to as non-coated bags, stand out for their simplicity and versatility. Crafted without additional layers of coating or lamination, they offer a straightforward packaging solution for a wide range of applications, with breathability and flexibility for industries where specific material properties are essential.",
  },
  {
    title: "Liner bags",
    image: "/images/woven-liner.webp",
    body: "Liner bags play a crucial role in bulk packaging, safeguarding goods during transportation and storage. These specialized bags fit snugly within larger containers, such as FIBCs or drums, creating an additional protective barrier for the contents.",
  },
  {
    title: "Laminated bags",
    image: "/images/woven-laminated.webp",
    body: "Laminated bags are a sophisticated and versatile packaging solution, integral across industries due to their exceptional strength, durability, and enhanced barrier properties. They are crafted by bonding multiple layers of materials, often including films such as polyethylene, polypropylene, or polyester.",
  },
];

export default function PpWovenSacksPage() {
  return (
    <>
      <PageHero title="Woven Sack Bags" />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 grid md:grid-cols-3 gap-8">
          {types.map((t) => (
            <div key={t.title} className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-section">
                <Image
                  src={t.image}
                  alt={t.title}
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-foreground mb-2">{t.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
