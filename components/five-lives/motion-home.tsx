/* oxlint-disable next/no-img-element -- Original, compressed local illustration with reserved dimensions. */
'use client';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Pause,
  Play,
  Trophy,
  Palette,
  Waves,
  Compass,
  Code2,
} from 'lucide-react';
import { Header, Footer } from './shell';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/catalog';
import { PossibilityScene } from './possibility-scene';
import { storyProgress, storyChapter } from '@/lib/motion';
const icons = [Trophy, Palette, Waves, Compass, Code2];
const subscribe = (callback: () => void) => {
  const query = matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
};
const getReduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const compactQuery = '(max-width: 760px), (max-height: 600px)';
const subscribeCompact = (callback: () => void) => {
  const query = matchMedia(compactQuery);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
};
const getCompact = () => matchMedia(compactQuery).matches;
const chapters = [
  {
    eyebrow: '01 / THE POSSIBILITY',
    question: 'What keeps coming back to you?',
    copy: 'The game. The song. The place. Some possibilities have a way of staying with us.',
    note: 'You don’t need to have it all figured out.',
  },
  {
    eyebrow: '02 / THE BEGINNING',
    question: 'What if you started with something small?',
    copy: 'One proper match. One finished song. One trip you’ve kept talking about. Choose five possibilities. Begin with just one.',
    note: 'A complete small thing. At your own pace.',
  },
  {
    eyebrow: '03 / THE MOMENT',
    question: 'What would it feel like to say, “I did that”?',
    copy: 'People you care about, there to witness it. Something real to keep. A little more of you, out in the world.',
    note: 'A printed scorecard. A recording. A memory made real.',
  },
];
export function MotionHome() {
  const reduced = useSyncExternalStore(subscribe, getReduced, () => false);
  const [userPaused, setUserPaused] = useState(false);
  const paused = reduced || userPaused;
  const compact = useSyncExternalStore(
    subscribeCompact,
    getCompact,
    () => false,
  );
  const linearStory = paused || compact;
  const root = useRef<HTMLDivElement>(null);
  const story = useRef<HTMLElement>(null);
  const [chapter, setChapter] = useState(0);
  useEffect(() => {
    const element = root.current;
    const section = story.current;
    if (!element || !section) return;
    let frame = 0;
    let previous = -1;
    const update = () => {
      frame = 0;
      if (paused) {
        element.style.setProperty('--hero-scroll', '0');
        return;
      }
      const rect = section.getBoundingClientRect();
      const progress = storyProgress(
        rect.top,
        section.offsetHeight,
        innerHeight,
      );
      element.style.setProperty(
        '--hero-scroll',
        String(Math.min(scrollY / innerHeight, 1)),
      );
      section.style.setProperty('--story-progress', String(progress));
      const next = storyChapter(progress, chapters.length);
      if (next !== previous) {
        previous = next;
        setChapter(next);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.12 },
    );
    element
      .querySelectorAll('[data-reveal]')
      .forEach((item) => observer.observe(item));
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      observer.disconnect();
    };
  }, [paused]);
  return (
    <div
      ref={root}
      className={`motion-home ${paused ? 'motion-paused' : ''} ${linearStory ? 'linear-story' : ''}`}
    >
      <Header
        motionControl={
          <Button
            variant="ghost"
            className="motion-toggle"
            aria-label={
              userPaused ? 'Resume ambient motion' : 'Pause ambient motion'
            }
            aria-pressed={paused}
            disabled={reduced}
            onClick={() => setUserPaused((v) => !v)}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
            <span>
              {reduced
                ? 'Motion reduced'
                : userPaused
                  ? 'Play motion'
                  : 'Pause motion'}
            </span>
          </Button>
        }
      />
      <main id="main">
        <section className="motion-hero page-width">
          <div className="motion-hero-copy">
            <p className="eyebrow hero-arrival">A LITTLE ROOM FOR ALL OF YOU</p>
            <h1>
              <span className="hero-line">Finally make room</span>
              <span className="hero-line">for this part</span>
              <span className="hero-line">
                of <em>yourself.</em>
              </span>
            </h1>
            <p className="motion-hero-description hero-arrival">
              For the things you still want to do.
              <br />
              And the parts of you waiting to begin.
            </p>
            <div className="hero-arrival">
              <Link className="primary-action motion-cta" href="/choose">
                Find my five{' '}
                <span>
                  <ArrowUpRight size={20} />
                </span>
              </Link>
              <p className="motion-footnote">
                Five possibilities. Your own pace. Free to explore.
              </p>
            </div>
          </div>
          <div className="sculpture-stage">
            <PossibilityScene paused={paused} />
            <div className="sculpture-category-labels">
              {categories.map((c, i) => (
                <Link
                  className={`sculpture-label sculpture-label-${i}`}
                  href={`/categories/${c.id}`}
                  key={c.id}
                >
                  <span style={{ background: c.color }} />
                  {c.name}
                  <ArrowUpRight size={11} />
                </Link>
              ))}
            </div>
            <p className="sculpture-caption">
              FIVE POSSIBILITIES. <span>ALL PART OF YOU.</span>
            </p>
          </div>
          <a className="scroll-invitation" href="#how-it-works">
            <span>There’s a little more to you.</span>
            <ArrowDown size={16} />
          </a>
        </section>
        <section className="possibility-ribbon" aria-label="Five categories">
          {categories.map((c) => (
            <Link href={`/categories/${c.id}`} key={c.id}>
              {c.name}
              <span aria-hidden="true">✳</span>
            </Link>
          ))}
        </section>
        <section className="scroll-story" id="how-it-works" ref={story}>
          <div className="story-sticky page-width">
            <div className="story-writing">
              <p className="eyebrow story-overline">
                FROM “ONE DAY” TO A REAL DAY
              </p>
              <div className="story-chapters">
                {chapters.map((item, i) => (
                  <article
                    className={`story-chapter ${chapter === i ? 'active' : ''}`}
                    key={item.eyebrow}
                    aria-hidden={!linearStory && chapter !== i}
                  >
                    <span className="chapter-number">{item.eyebrow}</span>
                    <h2>{item.question}</h2>
                    <p>{item.copy}</p>
                    <small>{item.note}</small>
                  </article>
                ))}
              </div>
              <div className="story-track" aria-hidden="true">
                <span />
              </div>
            </div>
            <div className="story-evidence">
              <div className="story-photo">
                <img
                  src="/images/cricket-moment.jpg"
                  alt="Illustration of adults sharing a moment after a friendly cricket match"
                  width={1200}
                  height={800}
                  loading="lazy"
                />
                <span className="story-photo-label">
                  THE JOY OF PLAYING AGAIN.
                </span>
              </div>
              <div className="evidence-caption">
                <Trophy size={22} />
                <div>
                  <span>Imagine the moment.</span>
                  <strong>Your name. On a real scorecard.</strong>
                </div>
              </div>
              <p className="image-note-inline">
                Illustrative image · experiences in development
              </p>
            </div>
          </div>
        </section>
        <section className="motion-categories page-width">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">
                FIVE WAYS TO FEEL A LITTLE MORE LIKE YOU
              </p>
              <h2>
                What are you
                <br />
                <em>making room for?</em>
              </h2>
            </div>
            <p>
              Something that moves you.
              <br />
              Something you make. Somewhere you go.
            </p>
          </div>
          <div className="motion-category-list">
            {categories.map((c, i) => {
              const Icon = icons[i];
              return (
                <Link
                  href={`/categories/${c.id}`}
                  key={c.id}
                  className="motion-category-row"
                  data-reveal
                >
                  <span className="row-index">0{i + 1}</span>
                  <span className="row-icon" style={{ background: c.color }}>
                    <Icon size={24} strokeWidth={1.4} />
                  </span>
                  <h3>{c.name}</h3>
                  <p>{c.cue}</p>
                  <ArrowUpRight className="row-arrow" size={24} />
                </Link>
              );
            })}
          </div>
        </section>
        <section className="motion-closing page-width" data-reveal>
          <p className="eyebrow">LET’S START WITH A QUESTION</p>
          <h2>
            What’s the thing
            <br />
            you <em>still want to do?</em>
          </h2>
          <p>
            There’s no perfect answer.
            <br />
            Just a little space to listen to yourself.
          </p>
          <Link className="primary-action motion-cta" href="/choose">
            Find my five{' '}
            <span>
              <ArrowUpRight size={20} />
            </span>
          </Link>
          <span className="closing-note">
            Choose five possibilities. Start with one.
          </span>
          <Link href="/experiences" className="browse-link">
            Or take a look around first <ArrowRight size={15} />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
