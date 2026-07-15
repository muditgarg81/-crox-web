import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/site";

export default function BlogPostLayout({
  title,
  image,
  slug,
  children,
}: {
  title: string;
  image: string;
  slug: string;
  children: React.ReactNode;
}) {
  const related = blogPosts.filter((p) => p.slug !== slug);

  return (
    <>
      <section className="bg-navy py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-white">{title}</h1>
        </div>
      </section>

      <article className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="rounded-2xl overflow-hidden shadow-lg mb-10">
            <Image
              src={image}
              alt={title}
              width={1200}
              height={750}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          <div className="prose-content space-y-6 text-muted leading-relaxed">{children}</div>
        </div>
      </article>

      <section className="bg-section py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">Related posts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {related.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.slug}`}
                className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow bg-white flex gap-4 p-4"
              >
                <div className="relative w-32 h-24 shrink-0 rounded-xl overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1 group-hover:text-navy transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
