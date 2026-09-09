/* oxlint-disable next/no-img-element -- Local, pre-sized compressed illustration; no remote optimization or user uploads. */
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Trophy,
  Palette,
  Waves,
  Compass,
  Code2,
  Check,
} from 'lucide-react';
import { Header, Footer } from '@/components/five-lives/shell';
import { categories } from '@/lib/catalog';
const icons = [Trophy, Palette, Waves, Compass, Code2];
export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="hero page-width">
          <div className="hero-copy">
            <p className="eyebrow">FIVE POSSIBILITIES. ONE PLACE TO BEGIN.</p>
            <h1>
              Finally make room
              <br className="wide-break" /> for this part
              <br className="wide-break" /> of <span>yourself.</span>
            </h1>
            <p className="hero-description">
              The game you still want to play. The song you want to sing. The
              place you keep thinking about.
              <br />
              There’s room for all of it. Let’s start with one.
            </p>
            <div className="hero-actions">
              <Link className="primary-action" href="/choose">
                Find my five <ArrowRight size={19} />
              </Link>
              <span>Five categories. Your own pace.</span>
            </div>
            <p className="micro-copy">
              <Check size={15} /> Free to explore. No five-part commitment.
            </p>
          </div>
          <div className="hero-visual">
            <div className="hero-photo">
              <img
                src="/images/cricket-moment.jpg"
                alt="Illustration of adults sharing a joyful moment after a friendly cricket match"
                width="960"
                height="1100"
              />
              <span className="photo-label">
                A POSSIBILITY WORTH MAKING ROOM FOR
              </span>
            </div>
            <div className="hero-caption">
              <div className="caption-icon">
                <Trophy size={22} />
              </div>
              <div>
                <span>That cricketer in you?</span>
                <strong>Still very much there.</strong>
              </div>
              <ArrowUpRight size={24} />
            </div>
            <span className="image-note">
              Illustrative image · experiences are in development
            </span>
          </div>
        </section>
        <section className="category-section page-width" id="possibilities">
          <div className="section-heading">
            <div>
              <p className="eyebrow">MEET YOUR POSSIBILITIES</p>
              <h2>One you. More to experience.</h2>
            </div>
            <p>
              You don’t need a new life.
              <br />
              Just a little space in this one.
            </p>
          </div>
          <div className="category-grid">
            {categories.map((c, i) => {
              const Icon = icons[i];
              return (
                <Link
                  key={c.id}
                  href={`/categories/${c.id}`}
                  className="category-card"
                >
                  <span
                    className="category-icon"
                    style={{ background: c.color }}
                  >
                    <Icon size={25} strokeWidth={1.5} />
                  </span>
                  <h3>
                    {c.name}
                    <ArrowUpRight size={18} />
                  </h3>
                  <p>{c.cue}</p>
                </Link>
              );
            })}
          </div>
        </section>
        <section className="how-section" id="how-it-works">
          <div className="page-width">
            <p className="eyebrow">FROM “ONE DAY” TO A REAL DAY</p>
            <h2>
              Small beginnings.
              <br />
              Something real to keep.
            </h2>
            <div className="how-grid">
              {[
                [
                  '01',
                  'Make your list',
                  'Choose something specific in each category. “Nothing here yet” is an answer too.',
                ],
                [
                  '02',
                  'Start with just one',
                  'Pick the possibility that feels closest. A suitable hosted experience comes next.',
                ],
                [
                  '03',
                  'Live it. Keep a piece of it.',
                  'A finished song. A printed scorecard. Something tangible that says: I did this.',
                ],
              ].map(([n, t, d]) => (
                <div key={n}>
                  <span className="step-number">{n}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="closing page-width">
          <p className="eyebrow">NO NEED TO HAVE IT ALL FIGURED OUT</p>
          <h2>
            What would you like to
            <br />
            make a little room for?
          </h2>
          <Link className="primary-action" href="/choose">
            Find my five <ArrowRight size={18} />
          </Link>
          <p>Choosing is free. You only pay for a real, dated experience.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
