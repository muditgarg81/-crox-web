import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Polypropylene Fabric",
  description:
    "Polypropylene bags and fabrics engineered for strength, durability, and adaptability across industrial packaging applications.",
};

export default function PolypropyleneFabPage() {
  return (
    <>
      <PageHero title="Polypropylene Fabrics" />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              In the dynamic landscape of industrial packaging, where precision, reliability,
              and durability are paramount, selecting the right materials for various
              applications is crucial. CROX OIL &amp; GAS PVT. LTD, a leading manufacturer in
              the sector, understands the significance of packaging solutions that can
              withstand the challenges posed by the transportation and storage of critical
              materials.
            </p>
            <p>
              The utilization of polypropylene bags and fabrics has emerged as a game-changer,
              offering a range of benefits that align seamlessly with the demands of industry.
              Polypropylene bags and fabrics are crafted from a versatile polymer known for its
              exceptional strength, resistance to wear and tear, and adaptability to various
              environmental conditions.
            </p>
            <p>
              As a trusted packaging partner, CROX OIL &amp; GAS PVT. LTD recognizes the unique
              properties of polypropylene and has seamlessly integrated these materials into
              its operations.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg bg-section">
            <Image
              src="/images/pp-fab-4.webp"
              alt="Polypropylene fabric"
              width={700}
              height={700}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-12 grid sm:grid-cols-3 gap-6">
          {["pp-fab-5", "pp-fab-7", "pp-fab-8-cutting"].map((img) => (
            <div key={img} className="rounded-2xl overflow-hidden shadow-sm bg-section">
              <Image
                src={`/images/${img}.webp`}
                alt="Polypropylene fabric production"
                width={500}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
