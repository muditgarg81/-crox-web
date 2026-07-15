import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Quality and Checkpoints",
  description:
    "Advanced testing equipment and stringent quality control at every stage, from raw material procurement to final delivery. ISO certified.",
};

const commitments = [
  "Advanced equipment and stringent quality measurement",
  "Integrate suitable techniques for quality improvement",
  "Our quality policy articulates our commitment of quality assurance",
  "Uncompromising attitude towards quality and customer satisfaction",
  "Our commitment to hygiene and cleanliness ensures food grade FIBCs",
  "Our superior rating since inception endorses our commitment to hygiene",
  "Quality assurance and customer-centric approach lead us in the industry",
  "Achieve customer satisfaction by adhering to customer's requirements",
];

const testSpecs = [
  { label: "Effective tensile stroke", value: "600 to 1000mm" },
  { label: "Maximum load", value: "100KN" },
  { label: "Accuracy class", value: "1.0/.05" },
  { label: "Effective measuring range", value: "2% to 100%" },
  { label: "Measuring accuracy", value: "±1 of load or 0.2% of full scale" },
  { label: "Tester resolution", value: "4000 count in each measuring range" },
  { label: "Effective testing width", value: "450mm" },
  { label: "Range of testing speed", value: "10% to 100%" },
];

const checkpoints = [
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
    body: "We understand the importance of safety in day-to-day operations and value human life. Our facility has a dedicated fire hydrant system with a pump house, and ABC-type fire extinguishers placed at regular points for easy access to workers.",
  },
  {
    title: "Production process control",
    body: "A team of dedicated quality staff checks for size, strength, and denier variation of tapes and fabric every 2 hours. Each bag undergoes visual inspection for fabric damages, correct prints, and attachments, with random sampling for size and weight consistency.",
  },
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        title="Quality and Checkpoints"
        subtitle="Stringent quality control from raw material procurement to final delivery."
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <p className="text-muted leading-relaxed max-w-3xl mb-10">
            We at CROX always try to maintain the best quality in our PP Woven products. We
            provide a comprehensive range of Polyethylene and Polypropylene packing bags and
            sacks that conform to the requisite quality standards. To maintain quality in our
            products, we follow a stringent quality control process from procurement of raw
            material through manufacturing to final delivery. Our quality control team monitors
            processing methods and supervises every process to maintain quality across
            performance, material strength, weight-carrying capacity, printing, and more.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-16">
            {commitments.map((c) => (
              <div key={c} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-amber shrink-0" />
                <span className="text-muted text-sm leading-relaxed">{c}</span>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-section">
              <Image
                src="/images/quality-autm.webp"
                alt="Advance Universal Testing Machine"
                width={700}
                height={500}
                className="w-full h-auto object-contain p-6"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Advance Universal Testing Machine
              </h2>
              <dl className="grid grid-cols-2 gap-y-3 text-sm">
                {testSpecs.map((s) => (
                  <div key={s.label} className="contents">
                    <dt className="text-muted">{s.label}</dt>
                    <dd className="font-medium text-foreground">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Muffle Furnace</h2>
              <p className="text-muted leading-relaxed">
                A muffle furnace is a front-loading box-type oven used for high-temperature
                applications such as fusing glass, creating enamel coatings, ceramics, and
                soldering and brazing articles. We use it in our test labs to determine what
                proportion of a raw material sample is non-combustible and non-volatile (i.e.
                ash content) &mdash; a key step in verifying raw material quality before it
                enters production.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg bg-section">
              <Image
                src="/images/quality-muffle-furnace.webp"
                alt="Muffle furnace"
                width={700}
                height={500}
                className="w-full h-auto object-contain p-6"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {checkpoints.map((point) => (
              <div key={point.title} className="rounded-xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-foreground mb-2">{point.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{point.body}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <Image
              src="/images/quality-iso.jpeg"
              alt="ISO certification"
              width={220}
              height={220}
              className="rounded-xl shadow-lg"
            />
            <p className="font-semibold text-navy">ISO Certified</p>
          </div>
        </div>
      </section>
    </>
  );
}
