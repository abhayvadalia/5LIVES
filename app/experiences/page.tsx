import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/lib/catalog';
import { Header, Footer } from '@/components/five-lives/shell';
export const metadata = {
  title: 'Something to take home. Experiences',
  description:
    'Hosted beginnings taking shape. A song, a painting, a game. Join an interest list for confirmed details.',
};
const first = ['song', 'painting', 'cricket'];
export default function ExperiencesPage() {
  const options = categories.flatMap((c) =>
    c.options.map((o) => ({ ...o, category: c.name })),
  );
  return (
    <>
      <Header />
      <main id="main" className="page-width beginning-page">
        <section className="editorial-hero">
          <p className="eyebrow">HOSTED BY FIVE LIVES</p>
          <h1>
            An afternoon.
            <br />
            <em>Something to keep.</em>
          </h1>
          <p className="editorial-intro">
            Make something, finish it, and take a part of that life home. We are
            preparing our first hosted experiences, with people who know how to
            help you begin.
          </p>
        </section>
        <section className="experience-list">
          <div className="experience-section-title">
            <h2>First in the making.</h2>
            <p>Interest lists are open. Dates and hosts are not confirmed.</p>
          </div>
          {first.map((id, i) => {
            const o = options.find((x) => x.id === id)!;
            return (
              <Link
                key={id}
                href={`/experiences/${id}`}
                className="experience-editorial-row"
              >
                <span className="experience-number">0{i + 1}</span>
                <div>
                  <p className="eyebrow">{o.category} · COMING NEXT</p>
                  <h2>{o.title}</h2>
                  <p>{o.detail}</p>
                  <span className="take-home">TAKE HOME · {o.artifact}</span>
                </div>
                <ArrowUpRight size={28} />
              </Link>
            );
          })}
        </section>
        <section className="coming-next">
          <h2>And room for more.</h2>
          <p>
            Other beginnings we are exploring. Tell us which one you would make
            time for.
          </p>
          <div>
            {options
              .filter((o) => !first.includes(o.id))
              .map((o) => (
                <Link key={o.id} href={`/experiences/${o.id}`}>
                  <span>{o.title}</span>
                  <ArrowUpRight size={18} />
                </Link>
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
