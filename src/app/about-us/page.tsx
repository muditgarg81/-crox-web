import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "CROX OIL & GAS PVT. LTD is a growing manufacturer of PP/FIBC woven sacks and fabrics based in Nagpur, India.",
};

const qualityPoints = [
  {
    title: "Machine tune-ups and quality checks",
    body: "Preventive maintenance is an ongoing process of all machines and electricals to minimise wear and tear of parts resulting in better quality products during production.",
  },
  {
    title: "Pre-despatch quality control",
    body: "All goods undergo pre-dispatch inspection by our quality team to ensure the correct counting of bags, correct labeling of packages, and correct weights.",
  },
  {
    title: "Wastage handling process",
    body: "Being an environment-friendly company and following PWM management rules laid by MPCB, all our wastage goes to re-processors to ensure there is lesser impact on the environment.",
  },
  {
    title: "Time and quality commitment",
    body: "Our experienced team and daily planning ensures we meet deadlines with our clients because we understand how important packaging is for the smooth running of their operations.",
  },
  {
    title: "Safety focus and manpower care practices",
    body: "We understand the importance of safety in day-to-day operations and value human life. Our entire facility has a dedicated fire hydrant system with a pump house to battle any fire situations. ABC-type fire extinguishers are placed at regular points for easy access to workers.",
  },
  {
    title: "Production process control",
    body: "A team of dedicated quality staff checks for size, strength, and denier variation of tapes and fabric every 2 hours. During the bag-making stage, each bag undergoes visual inspection for fabric damages, correct prints, and attachments. Through random sampling, bags are also checked for size and weight consistency, ensuring our clients consistently get the correct material.",
  },
];

export default function AboutUsPage() {
  return (
    <>
      <PageHero title="About Us" subtitle="Welcome to CROX OIL & GAS PVT. LTD" />

      <section>
        <div className="relative">
          <Image
            src="/images/facility-illustrative.jpg"
            alt="Illustrative rendering of an industrial manufacturing facility"
            width={2816}
            height={1536}
            className="w-full h-auto object-cover max-h-[420px]"
            priority
          />
          <p className="absolute bottom-2 right-3 text-[11px] text-white/80 bg-black/40 rounded px-2 py-0.5">
            Illustrative rendering, not an actual photograph of our facility
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              It is an endeavour to provide &ldquo;Quality Woven Sack Bags &amp; FIBC bags at
              affordable prices&rdquo; to customers.
            </p>
            <p>
              We are a growing manufacturer of PP/FIBC woven sacks and fabrics. The company is
              located at Nagpur, and possesses a fully capable production plant established
              near Nagpur itself. There is a growing demand for PP/HDPE fabric for packing
              different products in the field of fertilizers, cement, polymers, chemicals,
              textiles, machinery, automobiles, etc. To cope with the growing demand, we at
              CROX are capable of successfully producing various qualities of bags.
            </p>
            <p>
              The company endeavors to serve the industry with optimum quality latest products
              available in the market at the most competitive prices. It is the quality of the
              products and the attitude of our company towards its customers that has helped it
              scale great heights.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-lg bg-section">
            <video
              src="/videos/circular-loom-process.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto"
            />
            <p className="absolute bottom-2 right-3 text-[11px] text-white/80 bg-black/40 rounded px-2 py-0.5">
              Illustrative animation of the weaving process
            </p>
          </div>
        </div>
      </section>

      <section className="bg-section py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl shadow-lg order-2 lg:order-1 bg-white flex items-center justify-center p-16">
            <svg
              viewBox="0 0 120 120"
              className="w-40 h-40"
              role="img"
              aria-label="Quality assurance badge"
            >
              <circle cx="60" cy="60" r="56" fill="var(--section-bg)" />
              <path
                d="M60 14 L96 28 V58 C96 82 81 98 60 108 C39 98 24 82 24 58 V28 Z"
                fill="none"
                stroke="var(--navy)"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M42 60 L54 72 L80 46"
                fill="none"
                stroke="var(--amber)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-bold text-foreground mb-4">Quality assurance</h2>
            <p className="text-muted leading-relaxed">
              The Group&apos;s well-trained and experienced staff and associates ensure that
              all the products are made from the finest material and adopt stringent quality
              control measures throughout the production process. Quality control is applied
              at every stage of manufacture and storage, leading to the delivery of top quality
              material. An important part of our quality control is minimal wastage of the raw
              material &mdash; less than 2&ndash;3%, which gives us an opportunity to keep
              prices under control.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 text-center">
            We understand that a quality product can only be made from quality raw materials
          </h2>
          <p className="text-muted text-center max-w-3xl mx-auto mb-12">
            Based on this philosophy, all raw materials are checked for quality and consistency
            in our test labs by undergoing ash content testing and MFI.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {qualityPoints.map((point) => (
              <div key={point.title} className="rounded-xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-foreground mb-2">{point.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
