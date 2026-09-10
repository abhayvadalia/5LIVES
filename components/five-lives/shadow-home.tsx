'use client';
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react';
import { Header, Footer } from './shell';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/catalog';
import { shadowMotion } from '@/lib/shadow-motion';
const subscribe = (callback: () => void) => {
  const q = matchMedia('(prefers-reduced-motion: reduce)');
  q.addEventListener('change', callback);
  return () => q.removeEventListener('change', callback);
};
const getReduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const lives = [
  {
    name: 'The player.',
    line: 'For the joy of being in the game.',
    verb: 'Play.',
    category: 'Sports',
    slug: 'sports',
    color: '#b9d7bc',
    x: -2,
    y: 0.08,
  },
  {
    name: 'The artist.',
    line: 'For the things only you can make.',
    verb: 'Create.',
    category: 'Art',
    slug: 'art',
    color: '#e5b7a6',
    x: -1,
    y: -0.08,
  },
  {
    name: 'The stronger you.',
    line: 'For a capability you want to discover.',
    verb: 'Feel.',
    category: 'Health',
    slug: 'health',
    color: '#c5bfdf',
    x: 0,
    y: -0.42,
  },
  {
    name: 'The explorer.',
    line: 'For somewhere you’ve never been.',
    verb: 'Go.',
    category: 'Travel',
    slug: 'travel',
    color: '#e4d29c',
    x: 1,
    y: -0.08,
  },
  {
    name: 'The maker.',
    line: 'For the idea you could bring to life.',
    verb: 'Build.',
    category: 'Tech',
    slug: 'tech',
    color: '#a4cddd',
    x: 2,
    y: 0.08,
  },
] as const;
const crops = [
  [0, 330],
  [360, 330],
  [700, 355],
  [1030, 425],
  [1460, 340],
  [1800, 372],
] as const;
const cropStyle = (index: number) => {
  const [left, width] = crops[index];
  return {
    '--crop-width': width,
    '--crop-position': `${(left / (2172 - width)) * 100}%`,
    '--crop-mask':
      index === 2
        ? 'polygon(0 0,100% 0,100% 65%,90% 65%,90% 100%,0 100%)'
        : index === 3
          ? 'polygon(12% 0,100% 0,100% 100%,0 100%,0 45%,12% 45%)'
          : 'none',
  };
};
const vars = (value: Record<string, string | number>) => value as CSSProperties;
export function ShadowHome() {
  const reduced = useSyncExternalStore(subscribe, getReduced, () => false);
  const [userPaused, setUserPaused] = useState(false);
  const paused = reduced || userPaused;
  const stage = useRef<HTMLElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = stage.current,
      element = root.current;
    if (!section || !element) return;
    let frame = 0;
    const render = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const p = paused
        ? 1
        : Math.max(
            0,
            Math.min(
              1,
              -rect.top / Math.max(section.offsetHeight - innerHeight, 1),
            ),
          );
      const m = shadowMotion(p);
      for (const [key, value] of Object.entries(m))
        section.style.setProperty('--' + key, String(value));
      section.style.setProperty('--progress', String(p));
      for (const item of element.querySelectorAll<HTMLElement>(
        '[data-kinetic]',
      )) {
        const r = item.getBoundingClientRect();
        const position = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        const distance = Math.abs(position);
        const zoom = paused ? 1 : 1 + Math.max(0, 0.34 - distance) * 0.36;
        const blur = paused ? 0 : Math.max(0, distance - 0.38) * 9;
        item.style.setProperty('--type-scale', String(zoom));
        item.style.setProperty('--type-blur', `${Math.min(blur, 7)}px`);
        item.style.setProperty('--type-y', `${paused ? 0 : position * -40}px`);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    schedule();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
    };
  }, [paused]);
  return (
    <div ref={root} className={`shadow-home ${paused ? 'shadow-paused' : ''}`}>
      <Header
        motionControl={
          <Button
            variant="ghost"
            className="shadow-motion-toggle"
            aria-label={paused ? 'Resume motion' : 'Pause motion'}
            aria-pressed={paused}
            disabled={reduced}
            onClick={() => setUserPaused((v) => !v)}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
            <span>
              {reduced
                ? 'Reduced motion'
                : paused
                  ? 'Play motion'
                  : 'Pause motion'}
            </span>
          </Button>
        }
      />
      <main id="main">
        <section
          className="selves-sequence"
          ref={stage}
          aria-label="One person, five possible lives"
        >
          <div className="selves-stage">
            <div className="stage-atmosphere" aria-hidden="true" />
            <div className="opening-type">
              <p className="eyebrow">THERE IS MORE TO YOU THAN YOU THINK</p>
              <h1>
                One you.
                <br />
                <em>Five lives.</em>
              </h1>
            </div>
            <div className="vision-type" aria-hidden="true">
              <span>Not someone else.</span>
              <strong>
                More of <em>you.</em>
              </strong>
            </div>
            <div className="final-type">
              <p className="eyebrow">THEY’VE BEEN HERE ALL ALONG</p>
              <h2>
                Let them
                <br />
                <em>step into the light.</em>
              </h2>
            </div>
            <div
              className="selves-tableau"
              role="img"
              aria-label="An adult with five shadow selves separating into a player, an artist, a person practising yoga, an explorer, and a maker at a laptop."
            >
              {lives.map((life, index) => (
                <div
                  key={life.slug}
                  className={`shadow-self shadow-self-${index}`}
                  style={vars({
                    '--self-x': life.x,
                    '--self-y': life.y,
                    '--self-color': life.color,
                    ...cropStyle(index + 1),
                  })}
                >
                  <div className="self-sprite" />
                  <div className="self-label">
                    <span>{life.category}</span>
                    <strong>{life.name}</strong>
                  </div>
                </div>
              ))}
              <div className="original-self" style={vars(cropStyle(0))}>
                <div className="self-sprite" />
                <span className="original-label">YOU</span>
              </div>
            </div>
            <div className="stage-bottom">
              <a href="#five-visions" className="scroll-prompt">
                <ArrowDown size={18} />
                <span>SCROLL. MEET THE REST OF YOU.</span>
              </a>
              <Link className="shadow-cta" href="/choose">
                Find my five <ArrowUpRight size={21} />
              </Link>
            </div>
            <span className="scene-credit">
              A visual metaphor for your possibilities.
            </span>
          </div>
        </section>
        <section className="selves-introduction page-width" id="five-visions">
          <p className="eyebrow">ONE LIFE CAN HOLD SO MUCH MORE</p>
          <h2 data-kinetic>
            You don’t need
            <br />
            to become
            <br />
            <em>someone else.</em>
          </h2>
          <p>
            You can make a little room for
            <br />
            the people you already carry inside.
          </p>
        </section>
        <section
          className="visions-list"
          aria-label="Five visions of your life"
        >
          {lives.map((life, index) => (
            <article
              className="vision-row page-width"
              key={life.slug}
              style={vars({ '--vision-color': life.color })}
            >
              <div className="vision-row-heading">
                <span className="vision-index">
                  0{index + 1} / {life.category.toUpperCase()}
                </span>
                <h2 data-kinetic>{life.verb}</h2>
                <p>{life.line}</p>
                <Link href={`/categories/${life.slug}`}>
                  Meet {life.category.toLowerCase()} <ArrowUpRight size={18} />
                </Link>
              </div>
              <div
                className="vision-portrait"
                aria-hidden="true"
                style={vars({ ...cropStyle(index + 1) })}
              >
                <div className="self-sprite" />
              </div>
            </article>
          ))}
        </section>
        <section className="selves-closing page-width" id="how-it-works">
          <p className="eyebrow">FIVE POSSIBILITIES. ONE PLACE TO BEGIN.</p>
          <h2 data-kinetic>
            Finally make room
            <br />
            for this part
            <br />
            of <em>yourself.</em>
          </h2>
          <p>
            A few questions. A little space to imagine.
            <br />
            Choose something in each category. Begin with just one.
          </p>
          <Link className="shadow-cta" href="/choose">
            Find my five <ArrowUpRight size={22} />
          </Link>
          <span>Free to explore. Your own pace.</span>
          <div className="closing-categories">
            {categories.map((c) => (
              <Link href={`/categories/${c.id}`} key={c.id}>
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
