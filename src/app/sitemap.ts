import type { MetadataRoute } from "next";
import { products, blogPosts } from "@/lib/site";

const siteUrl = "https://croxoilandgas.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/about-us", priority: 0.8 },
    { path: "/infrastructure", priority: 0.7 },
    { path: "/quality-and-checkpoints", priority: 0.7 },
    { path: "/contacts", priority: 0.6 },
  ].map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    priority: route.priority,
  }));

  const productRoutes = products.map((p) => ({
    url: `${siteUrl}/${p.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/${post.slug}`,
    lastModified: new Date(),
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
