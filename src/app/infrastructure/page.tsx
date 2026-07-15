import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Infrastructure",
  description:
    "A 90,000 sq. ft. facility with 60,000 sq. ft. of constructed area, producing approximately 400MT of Big Bags & PP woven sacks per month.",
};

const machinery = [
  {
    title: "Tape Stretching Lines",
    image: "/images/infra-tape-stretching.png",
    body: "02 nos. Tape Stretching Lines (350 kgs & 450 kgs) from LOHIA CORP LIMITED have been developed to produce PP/HDPE tapes for many applications such as Woven/Knitted Bags, Flexible Intermediate Bulk Containers (FIBC), Carpet Backing, Tarpaulins, Wrapping Fabrics, Jumbo Bags and many more. High-speed tape stretching lines incorporate state-of-the-art technology, designed to meet the highest performance and quality requirements with maximum efficiency and flexibility while using minimum raw material and energy.",
  },
  {
    title: "Circular Looms",
    image: "/images/infra-circular-loom.png",
    body: "We have circular looms covering a large range of PP/HDPE woven fabric requirements for a wide range of applications. These circular looms from LOHIA CORP LIMITED combine the latest technology with lower energy consumption and lower maintenance. Circular looms with electronic control systems produce fabric with almost zero-defect quality. Magnetic and colour sensors help maintain fabric quality, and the machine controller system indicates shift-wise and cumulative production, machine efficiency, running time, and warp/weft breakage data.",
  },
  {
    title: "Extrusion Coating Lines",
    image: "/images/infra-extrusion-coating.png",
    body: "JP EXTRUSIONTECH PVT. LTD. lines coat a thin layer of polyolefins (mainly LDPE/PP) on substrates like paper, cotton cloth, woven fabrics, jute fabric, aluminum foil, and BOPP/polyester film, up to 1600mm web width. Our Tandem Lamination Plant coats circular woven fabric, producing multi-layer laminates up to 5 layers with various substrates.",
  },
  {
    title: "Colour Printing Machines",
    image: "/images/infra-color-printing.png",
    body: "4-colour and 3-colour Flexographic Printing Machines from JP EXTRUSIONTECH and NAVJIVAN print HDPE/PP woven sacks, Jute and Laminated Jute bags, Kraft paper bags, and LLDPE bags. The flexographic printing system transfers images through rubber/nylon/photo-polymer stereos of 3mm to 5mm thickness.",
  },
  {
    title: "Flexographic Printing",
    image: "/images/infra-flexographic.webp",
    body: "Multipurpose flexographic printing for HDPE/PP woven sacks and laminated packaging, used for high-quality multi-colour branding on bags.",
  },
  {
    title: "BCS Conversion Line",
    image: "/images/infra-bcs-machine.webp",
    body: "Lohia's BCS series is a high-speed conversion line for cross-cutting, bottom folding, sewing, and stacking of finished HDPE/PP woven fabric bags in one continuous operation. Used for bag conversion from plain woven (coated or non-coated) and leno fabric, with special attachments for gusseted bags, perforated bags, and easy-open top stitch bags.",
  },
  {
    title: "FIBC Jumbo Bag Cutting Machine",
    image: "/images/infra-jumbo-cutting.webp",
    body: "Model JUMBO:88 — Length 4000mm, Width 2200mm, Speed 25 mtr/min.",
  },
  {
    title: "Double Needle, Four Thread Chain Stitch Sewing Machines",
    image: "/images/infra-sewing-st502.webp",
    body: "For seaming and hemming of light to heavy weight fabrics such as PP/PE woven cloth — most suitable for making components of Container Bags. 15 machines on the floor. Models include ST 502 JHD (seaming & hemming), ST 602 HR (overedging/Hiracle stitch), ST 603 DR (seaming, hemming, top sewing, filler cord stitching), and ST 802 VMC (overedging stitch).",
  },
  {
    title: "HM/LLDPE/LDPE Liner Plant",
    image: "/images/infra-hm-liner-plant.png",
    body: "40mm extruder, Parth make, for HM/LLDPE and LDPE tube making.",
  },
  {
    title: "Micro Processor Double Decker Bottom Sealing & Cutting Machine",
    image: "/images/infra-dd-sealing.png",
    body: "For HM/LLDPE and LDPE sealing and bag making.",
  },
];

export default function InfrastructurePage() {
  return (
    <>
      <PageHero
        title="Our Infrastructure"
        subtitle="A state-of-the-art facility spread across 90,000 sq. ft., with 60,000 sq. ft. of constructed area."
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <p className="text-muted leading-relaxed max-w-3xl mb-16">
            With our state-of-the-art facility spread across an area of 90,000 sq. ft. with
            60,000 sq. ft. of constructed area, we have an installed capacity of producing
            approximately 400MT of Big Bags &amp; PP woven sacks per month. Below is a brief
            list of plant &amp; machinery installed at our factory.
          </p>

          <div className="space-y-16">
            {machinery.map((m, i) => (
              <div
                key={m.title}
                className={`grid lg:grid-cols-2 gap-10 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="rounded-2xl overflow-hidden shadow-lg bg-section">
                  <Image
                    src={m.image}
                    alt={m.title}
                    width={700}
                    height={500}
                    className="w-full h-auto object-contain p-6"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-3">{m.title}</h2>
                  <p className="text-muted leading-relaxed">{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
