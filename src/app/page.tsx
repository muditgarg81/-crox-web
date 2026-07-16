import Image from "next/image";
import Link from "next/link";
import { company, products, blogPosts } from "@/lib/site";

const stats = [
  { value: "15 years", label: "Experience in the field" },
  { value: "50000+", label: "Metric tons of production delivered" },
  { value: "20,00,00,000+", label: "Bags manufactured" },
  { value: "70000+", label: "Man months of labour employed" },
];

export default function Home() {
  return (
    <>
      <section className="relative bg-navy overflow-hidden">
        <h1 className="sr-only">
          Quality Woven Sack Bags &amp; FIBC Bags at Affordable Prices &mdash; {company.name}
        </h1>
        <Image
          src="/images/hero-industrial-dusk-v2.jpg"
          alt="Quality Woven Sack Bags & FIBC Bags at Affordable Prices — CROX OIL & GAS PVT. LTD"
          width={3134}
          height={1258}
          className="w-full h-auto"
          priority
        />
        <div className="bg-navy-dark py-6">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contacts"
              className="rounded-full bg-amber px-7 py-3.5 font-semibold text-white hover:bg-amber-light transition-colors"
            >
              Request a Quote
            </Link>
            <Link
              href="/contacts"
              className="rounded-full border border-white/40 px-7 py-3.5 font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-section py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/pallet-bags.jpg"
              alt="Palletised woven sack bags ready for dispatch"
              width={1600}
              height={872}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Quality assurance</h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                The Group&apos;s well-trained and experienced staff and associates ensure that
                all the products are made from the finest material and adopt stringent quality
                control measures throughout the production process.
              </p>
              <p>
                We at CROX always try to maintain the best quality in our PP Woven products. We
                provide a comprehensive range of Polyethylene and Polypropylene packing bags
                and sacks that conform to the requisite quality standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="uppercase tracking-widest text-amber font-semibold mb-3">
              What we make
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Our products &amp; services
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="group rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow p-8 flex flex-col items-start"
              >
                <Image src={p.icon} alt="" width={56} height={56} className="mb-5" />
                <h3 className="text-lg font-bold text-foreground mb-2">{p.name}</h3>
                <p className="text-sm text-muted mb-5 leading-relaxed">{p.summary}</p>
                <span className="mt-auto text-navy font-semibold group-hover:text-amber transition-colors">
                  View more +
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <p className="uppercase tracking-widest text-amber font-semibold mb-4">About</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
              CROX OIL &amp; GAS PVT. LTD
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              We are a leading manufacturer of PP/FIBC woven sacks and fabrics. The company
              is located at Nagpur, and possesses a fully capable production plant
              established near Nagpur itself.
            </p>
            <p className="text-white/80 leading-relaxed mb-8">
              The company endeavors to serve the industry with optimum quality latest
              products available in the market at the most competitive prices.
            </p>
            <Link
              href="/about-us"
              className="inline-block rounded-full bg-amber px-7 py-3.5 font-semibold text-white hover:bg-amber-light transition-colors"
            >
              About us
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-2xl lg:text-3xl font-bold text-amber mb-2">{s.value}</div>
                <div className="text-sm text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="uppercase tracking-widest text-amber font-semibold mb-3">Blog</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our latest posts</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.slug}`}
                className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-navy transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted line-clamp-3">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amber">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-white text-center lg:text-left">
            Ready to talk packaging? Let&apos;s discuss your requirements.
          </h2>
          <Link
            href="/contacts"
            className="shrink-0 rounded-full bg-navy px-8 py-4 font-semibold text-white hover:bg-navy-dark transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
