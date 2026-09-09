import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/lib/catalog';
import { Header, Footer } from '@/components/five-lives/shell';
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.id === slug);
  if (!category) notFound();
  return (
    <>
      <Header />
      <main className="page-width content-page" id="main">
        <Link className="back-link" href="/experiences">
          ← All possibilities
        </Link>
        <p className="eyebrow">{category.name.toUpperCase()}</p>
        <h1>{category.cue}</h1>
        <p className="page-intro">{category.description}</p>
        <div className="offering-grid">
          {category.options.map((o) => (
            <Link
              href={`/experiences/${o.id}`}
              key={o.id}
              className="offering-card"
            >
              <span className="tag" style={{ background: category.color }}>
                In development
              </span>
              <h2>{o.title}</h2>
              <p>{o.detail}</p>
              <div className="artifact-line">
                {o.artifact}
                <ArrowRight size={18} />
              </div>
            </Link>
          ))}
        </div>
        <Link className="primary-action spaced" href="/choose">
          Make my list <ArrowRight size={18} />
        </Link>
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
  const c = categories.find((c) => c.id === slug);
  return {
    title: c?.name ?? 'Category not found',
    description: c?.description,
  };
}
