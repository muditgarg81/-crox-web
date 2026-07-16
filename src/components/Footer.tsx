import Image from "next/image";
import Link from "next/link";
import { company, products } from "@/lib/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Quality and checkpoints", href: "/quality-and-checkpoints" },
  { label: "Contact us", href: "/contacts" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white mt-auto">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/crox_logo_white.png"
            alt="CROX Oil & Gas logo"
            width={160}
            height={48}
            className="h-11 w-auto mb-4"
          />
          <p className="text-white/60 text-sm leading-relaxed">
            A leading manufacturer of PP/HDPE woven sacks, fabrics, and FIBC bags based in
            Nagpur, India.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/70">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-amber-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Products</h3>
          <ul className="space-y-2 text-sm text-white/70">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className="hover:text-amber-light">
                  {p.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>{company.address}</li>
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-amber-light">
                {company.email}
              </a>
            </li>
            <li>
              <a href={`tel:${company.phoneHref}`} className="hover:text-amber-light">
                {company.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-center text-xs text-white/50">
        <span>© {new Date().getFullYear()} {company.name}</span>
        <Link href="/intralink" className="hover:text-amber-light">
          Employee Login
        </Link>
      </div>
    </footer>
  );
}
