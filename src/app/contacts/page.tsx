import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with CROX OIL & GAS PVT. LTD for enquiries about our products and services.",
};

export default function ContactsPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Our dedicated team is ready to assist you promptly. Whether you have questions about our products, services, or partnerships, your satisfaction is our priority."
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-bold text-foreground mb-1">Address</h2>
              <p className="text-muted">{company.address}</p>
            </div>
            <div>
              <h2 className="font-bold text-foreground mb-1">Email</h2>
              <a href={`mailto:${company.email}`} className="text-navy hover:text-amber">
                {company.email}
              </a>
            </div>
            <div>
              <h2 className="font-bold text-foreground mb-1">Phone</h2>
              <a href={`tel:${company.phoneHref}`} className="text-navy hover:text-amber">
                {company.phone}
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
