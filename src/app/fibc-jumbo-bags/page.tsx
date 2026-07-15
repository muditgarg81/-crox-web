import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "FIBC / Jumbo Bags",
  description:
    "U-panel, four-panel, circular, baffle, and specialty FIBC bags built for safe, high-volume industrial transport.",
};

const bagStyles = [
  {
    title: "U-panel",
    image: "/images/fibc-upanel.webp",
    body: "A U-panel bag is a step up from a circular bag, as it has two pieces of fabric resembling a U shape sewn together to make the shape of the bag. It maintains its square shape much better than the circular style.",
  },
  {
    title: "Four-panel",
    image: "/images/fibc-4panel.webp",
    body: "The four-panel bag is the best bag for staying square, other than a baffle bag. It is made up of four pieces of fabric for the sides and one for the bottom, all sewn together, which resists stretching and holds the bag in a cube shape much better.",
  },
  {
    title: "Circular",
    image: "/images/fibc-circular.webp",
    body: "This style of bag is made on the loom as a tube and is the lowest standard of FIBC. It will not maintain its shape when loaded, and will bulge out in the middle. Normally it has cross corner lifting loops.",
  },
  {
    title: "Baffle",
    image: "/images/fibc-baffled.webp",
    body: "This style is the best at keeping the cube shape of your product when loaded. It has additional baffles sewn down each corner to act as a pocket, plus pockets on each side. Perfect for small-diameter products such as soybeans, and easier to stack as they form a nice square cube.",
  },
];

const loopTypes = [
  { title: "Standard lift loops", image: "/images/fibc-loop-1.webp" },
  { title: "Cross corner lift loops", image: "/images/fibc-loop-2.webp" },
  { title: "Tunnel loops", image: "/images/fibc-loop-3.webp" },
  { title: "Hood lifting loops", image: "/images/fibc-loop-4.webp" },
  { title: "Loops", image: "/images/fibc-loop-5.webp" },
  { title: "Double stevedore loops", image: "/images/fibc-loop-6.webp" },
];

export default function FibcJumboBagsPage() {
  return (
    <>
      <PageHero title="FIBC / Jumbo Bags" />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {bagStyles.map((style) => (
              <div key={style.title} className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-section">
                  <Image
                    src={style.image}
                    alt={style.title}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-foreground mb-2">{style.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{style.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-section rounded-2xl p-8 mb-16">
            <h2 className="text-xl font-bold text-foreground mb-4">Specialty bags</h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-muted text-sm">
              <li>
                <strong className="text-foreground">Pharmaceutical</strong> &mdash; similar to
                food-grade certifications
              </li>
              <li>
                <strong className="text-foreground">UN certified</strong> &mdash; undergoes many
                tests to withstand stress and eliminate spillage of hazardous material
              </li>
              <li>
                <strong className="text-foreground">Food Grade</strong> &mdash; manufactured in
                a clean room environment which is BRC or FDA approved
              </li>
              <li>
                <strong className="text-foreground">Ventilated FIBC</strong> &mdash; used for
                potatoes and other fruits/vegetables, allowing the product to breathe
              </li>
            </ul>
          </div>

          <h2 className="text-xl font-bold text-foreground mb-6">
            The most common types of FIBC lift loops
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {loopTypes.map((loop) => (
              <div key={loop.title} className="text-center">
                <div className="rounded-xl overflow-hidden bg-section mb-2">
                  <Image
                    src={loop.image}
                    alt={loop.title}
                    width={200}
                    height={200}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="text-xs text-muted">{loop.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
