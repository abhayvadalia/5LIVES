import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findOption, categories } from '@/lib/catalog';
import { Header, Footer } from '@/components/five-lives/shell';
import { InterestForm } from '@/components/five-lives/interest-form';
export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const option = findOption(slug);
  if (!option) notFound();
  const category = categories.find((c) =>
    c.options.some((o) => o.id === slug),
  )!;
  return (
    <>
      <Header />
      <main className="page-width beginning-page" id="main">
        <Link className="back-link" href="/experiences">
          ← All experiences
        </Link>
        <section className="editorial-hero">
          <p className="eyebrow">
            {category.name.toUpperCase()} · LAUNCHING SOON
          </p>
          <h1>{option.title}</h1>
          <p className="editorial-intro">{option.detail}</p>
          <a className="beginning-text-link" href="#register-interest">
            Join the waitlist →
          </a>
        </section>
        <div className="experience-detail-grid">
          <div className="legal-copy">
            <h2>What you would do</h2>
            <p>{option.detail}</p>
            <h2>What you would take home</h2>
            <p>{option.artifact}.</p>
            <h2>A moment with your people</h2>
            <p>{option.witness}</p>
            <h2>Before you decide</h2>
            <p>
              We will publish the teacher or host, photographs, place, dates,
              duration, group size and full price before bookings open. You will
              also see what is included, access information, what to bring and
              the cancellation terms.
            </p>
          </div>
          <InterestForm
            kind="experience"
            subject={slug}
            title="Be first to hear."
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const o = findOption(slug);
  return { title: o?.title ?? 'Experience not found', description: o?.detail };
}
