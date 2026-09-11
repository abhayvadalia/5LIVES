import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Bookmark, Users, CalendarDays } from 'lucide-react';
import { findOption, categories } from '@/lib/catalog';
import { Header, Footer } from '@/components/five-lives/shell';
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
      <main className="page-width content-page" id="main">
        <Link className="back-link" href="/experiences">
          ← All possibilities
        </Link>
        <span className="tag" style={{ background: category.color }}>
          {category.name}
        </span>
        <div className="detail-grid">
          <section>
            <h1>{option.title}</h1>
            <p className="page-intro">{option.detail}</p>
            <div className="detail-fact">
              <Bookmark />
              <div>
                <h2>Something to keep</h2>
                <p>{option.artifact}.</p>
              </div>
            </div>
            <div className="detail-fact">
              <Users />
              <div>
                <h2>A moment to share</h2>
                <p>{option.witness}</p>
              </div>
            </div>
            <div className="detail-fact">
              <CalendarDays />
              <div>
                <h2>A little support. A real beginning.</h2>
                <p>
                  We’re shaping the guidance and experiences that can help you
                  take this step. When an opportunity is ready, you’ll see who’s
                  guiding it, what to expect, where it happens and the full
                  price.
                </p>
              </div>
            </div>
          </section>
          <aside className="soft-panel">
            <p className="eyebrow">IN DEVELOPMENT</p>
            <h2>
              A possibility.
              <br />A date to come.
            </h2>
            <p>
              We’re working on ways to bring this possibility to life. Keep it
              in your five while we develop the right opportunities. No dates
              are confirmed yet.
            </p>
            <Link
              className="primary-action"
              href={`/choose?category=${category.id}`}
            >
              Choose my five <ArrowRight size={18} />
            </Link>
            <p className="small-copy">
              Choosing does not reserve a place or commit you to a purchase.
            </p>
          </aside>
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
