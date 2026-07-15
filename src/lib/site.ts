export const company = {
  name: "CROX OIL & GAS PVT. LTD",
  tagline: "Quality Woven Sack Bags & FIBC Bags at Affordable Prices",
  address: "A-42/1, MIDC Industrial Area Bidganeshpur, Butibori, Nagpur 441122",
  email: "muditg@croxoilandgas.com",
  phone: "+91 73855 59440",
  phoneHref: "+917385559440",
};

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  icon: string;
};

export const products: Product[] = [
  {
    slug: "polypropylene-fab",
    name: "Polypropylene Fabric",
    shortName: "PP Fabrics",
    summary:
      "Economical, strong, and tear-resistant fabric ideal for heavy-duty industrial packaging.",
    icon: "/images/fabric.png",
  },
  {
    slug: "fibc-jumbo-bags",
    name: "FIBC / Jumbo Bags",
    shortName: "Fibc/Jumbo Bags",
    summary:
      "Flexible Intermediate Bulk Containers built for safe, high-volume industrial transport.",
    icon: "/images/jumbo.png",
  },
  {
    slug: "hm-ldpe-liners",
    name: "HM/LDPE Liners",
    shortName: "Hm/Ldpe Liners",
    summary:
      "Moisture-proof liner bags used across industries for packaging and waste collection.",
    icon: "/images/liner.png",
  },
  {
    slug: "pp-woven-sacks",
    name: "PP Woven Sacks",
    shortName: "PP Woven Sacks",
    summary:
      "Economical, strong, tear-resistant woven sacks built for heavy-duty daily use.",
    icon: "/images/pp.png",
  },
];

export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  {
    label: "Products",
    href: "#",
    children: products.map((p) => ({ label: p.shortName, href: `/${p.slug}` })),
  },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Quality and checkpoints", href: "/quality-and-checkpoints" },
  { label: "Contact Us", href: "/contacts" },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "top-trends-in-fibc-bags-manufacturing",
    title: "Top Trends in FIBC Bags Manufacturing",
    excerpt:
      "Flexible Intermediate Bulk Containers (FIBCs), commonly known as bulk bags or big bags, have revolutionized the packaging industry with their ability to handle large quantities of materials efficiently.",
    image: "/images/pp-fab-8-cutting.webp",
  },
  {
    slug: "uses-and-benefits-of-pp-bags",
    title: "Uses and Benefits of PP Bags",
    excerpt:
      "Polypropylene (PP) bags, also known as poly bags, are versatile packaging solutions that have become indispensable across various industries.",
    image: "/images/blog-agri-use.webp",
  },
  {
    slug: "how-to-recycle-hdpe-ldpe-bags",
    title: "How to Recycle HDPE & LDPE Bags",
    excerpt:
      "Plastic bags, particularly those made from High-Density Polyethylene (HDPE) and Low-Density Polyethylene (LDPE), have become ubiquitous in our daily lives.",
    image: "/images/blog-hdpe.webp",
  },
];
