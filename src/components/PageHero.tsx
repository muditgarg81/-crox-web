export default function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-navy py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-white">{title}</h1>
        {subtitle && <p className="mt-3 text-white/70 max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
}
