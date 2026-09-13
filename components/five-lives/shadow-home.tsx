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
import { InterestForm } from './interest-form';
import { FounderNote } from './founder-note';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/catalog';
import { shadowMotion } from '@/lib/shadow-motion';
import { cropStyle } from '@/lib/selves';
const subscribe = (callback: () => void) => {
  const q = matchMedia('(prefers-reduced-motion: reduce)');
  q.addEventListener('change', callback);
  return () => q.removeEventListener('change', callback);
};
const getReduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const lives = [
  {
    name: 'I could play again.',
    line: 'For the joy of being in the game.',
    verb: 'Play.',
    category: 'Sports',
    slug: 'sports',
    color: '#b9d7bc',
    x: -2,
    y: 0.08,
  },
  {
    name: 'I could make something.',
    line: 'For the things only you can make.',
    verb: 'Create.',
    category: 'Art',
    slug: 'art',
    color: '#e5b7a6',
    x: -1,
    y: -0.08,
  },
  {
    name: 'I could feel stronger.',
    line: 'For a capability you want to discover.',
    verb: 'Feel.',
    category: 'Health',
    slug: 'health',
    color: '#c5bfdf',
    x: 0,
    y: -0.42,
  },
  {
    name: 'I could explore.',
    line: 'For somewhere you’ve never been.',
    verb: 'Go.',
    category: 'Travel',
    slug: 'travel',
    color: '#e4d29c',
    x: 1,
    y: -0.08,
  },
  {
    name: 'I could build something.',
    line: 'For the idea you could bring to life.',
    verb: 'Build.',
    category: 'Tech',
    slug: 'tech',
    color: '#a4cddd',
    x: 2,
    y: 0.08,
  },
] as const;
const vars = (value: Record<string, string | number>) => value as CSSProperties;
export function ShadowHome({
  variant = 'imagined',
}: {
  variant?: 'original' | 'imagined';
}) {
  const imagined = variant === 'imagined';
  const questions = [
    'Is it the play, the challenge, or being part of a team?',
    'Is there something you’ve wanted to say, sing, or make?',
    'How would it feel to move with a little more ease?',
    'Is it a new place you’re drawn to, or a fresh way of seeing?',
    'What would you make if curiosity could take the lead?',
  ];
  const reduced = useSyncExternalStore(subscribe, getReduced, () => false);
  const [userPaused, setUserPaused] = useState(false);
  const [figuresReady, setFiguresReady] = useState(false);
  const paused = reduced || userPaused;
  const readyRef = useRef(false);
  const stage = useRef<HTMLElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = stage.current,
      element = root.current;
    if (!section || !element) return;
    let frame = 0;
    let lookX = 0,
      lookY = 0;
    const render = () => {
      frame = 0;
      section.style.setProperty('--look-x', `${paused ? 0 : lookX}deg`);
      section.style.setProperty('--look-y', `${paused ? 0 : lookY}deg`);
      const rect = section.getBoundingClientRect();
      const p =
        paused || matchMedia('(max-height: 530px)').matches
          ? 1
          : Math.max(
              0,
              Math.min(
                1,
                -rect.top / Math.max(section.offsetHeight - innerHeight, 1),
              ),
            );
      const m = shadowMotion(p);
      if (readyRef.current !== p >= 0.53) {
        readyRef.current = p >= 0.53;
        setFiguresReady(readyRef.current);
      }
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
    const point = (event: PointerEvent) => {
      if (
        paused ||
        event.pointerType !== 'mouse' ||
        !matchMedia('(hover: hover) and (pointer: fine)').matches
      )
        return;
      lookX = (event.clientX / innerWidth - 0.5) * 5;
      lookY = (event.clientY / innerHeight - 0.5) * -3;
      schedule();
    };
    const resetLook = () => {
      lookX = 0;
      lookY = 0;
      schedule();
    };
    section.addEventListener('pointermove', point, { passive: true });
    section.addEventListener('pointerleave', resetLook);
    schedule();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener('pointermove', point);
      section.removeEventListener('pointerleave', resetLook);
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
    };
  }, [paused]);
  return (
    <div
      ref={root}
      className={`shadow-home ${paused ? 'shadow-paused' : ''} ${imagined ? 'imagined-home' : ''}`}
    >
      <link rel="preload" as="image" href="/images/five-selves-sprite.png" />
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
              <p className="eyebrow">
                {imagined
                  ? 'WHAT HAVE YOU ALWAYS WANTED TO TRY?'
                  : 'THERE IS MORE TO YOU THAN YOU THINK'}
              </p>
              <h1>
                {imagined ? 'One life.' : 'One you.'}
                <br />
                <em>{imagined ? 'More you.' : 'Five lives.'}</em>
              </h1>
            </div>
            <p className="scene-invitation">
              A lesson. A journey. A different kind of afternoon.
              <span>
                Find the guidance and experiences to make it part of your life.
              </span>
            </p>
            <div className="vision-type" aria-hidden="true">
              <span>
                {imagined
                  ? 'Look beneath the life you imagine.'
                  : 'Not someone else.'}
              </span>
              <strong>
                {imagined ? 'Find your ' : 'More of '}
                <em>{imagined ? 'why.' : 'you.'}</em>
              </strong>
            </div>
            <div className="final-type">
              <p className="eyebrow">
                {imagined
                  ? 'A POSSIBILITY YOU CAN FEEL TODAY'
                  : 'THEY’VE BEEN HERE ALL ALONG'}
              </p>
              <h2>
                {imagined ? 'Bring a little' : 'Let them'}
                <br />
                <em>{imagined ? 'into this life.' : 'step into the light.'}</em>
              </h2>
            </div>
            <div className="selves-camera">
              <div
                className="selves-tableau"
                role="group"
                aria-label="Explore five possible lives"
              >
                {lives.map((life, index) => (
                  <Link
                    href={`/categories/${life.slug}`}
                    aria-label={`Explore ${life.category}: ${life.name}`}
                    tabIndex={figuresReady ? 0 : -1}
                    aria-hidden={!figuresReady}
                    key={life.slug}
                    className={`shadow-self shadow-self-${index} ${figuresReady ? 'figure-ready' : ''}`}
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
                  </Link>
                ))}
                <div
                  className="original-self"
                  aria-hidden="true"
                  style={vars(cropStyle(0))}
                >
                  <div className="self-sprite" />
                  <span className="original-label">YOU</span>
                </div>
              </div>
            </div>
            <div className="stage-bottom">
              <a href="#five-visions" className="scroll-prompt">
                <ArrowDown size={18} />
                <span>
                  {imagined
                    ? 'SCROLL. LET YOUR MIND WANDER.'
                    : 'SCROLL. MEET THE REST OF YOU.'}
                </span>
              </a>
              <Link className="shadow-cta" href="/choose?start=five">
                Find my five <ArrowUpRight size={21} />
              </Link>
            </div>
          </div>
        </section>
        <section className="selves-introduction page-width" id="five-visions">
          {imagined ? (
            <>
              <p className="eyebrow">START WITH A LITTLE IMAGINATION</p>
              <h2 data-kinetic>
                Imagine freely.
                <br />
                Notice what
                <br />
                <em>lights you up.</em>
              </h2>
              <p>
                A musician. A traveller. A teacher. Someone entirely unexpected.
                <br />
                Let five lives come to mind. They can be playful, unfinished,
                even contradictory.
              </p>
            </>
          ) : (
            <>
              <p className="eyebrow">ONE LIFE CAN HOLD SO MUCH MORE</p>
              <h2 data-kinetic>
                You don’t need
                <br />
                to become
                <br />
                <em>someone else.</em>
              </h2>
              <p>
                A little guidance. The right people. An experience that opens a
                door.
                <br />
                We help you find a way to live the possibilities you carry
                inside.
              </p>
            </>
          )}
        </section>
        {imagined && (
          <section
            className="imagination-prompts page-width"
            aria-label="From an imagined life to a small beginning"
          >
            <article>
              <span>01 / IMAGINE</span>
              <h2>Name your five.</h2>
              <p>
                A singer. A gardener. A teacher by the sea. Write down five
                lives you would love to try. There’s room to surprise yourself.
              </p>
            </article>
            <article>
              <span>02 / CHOOSE</span>
              <h2>Follow one feeling.</h2>
              <p>
                Choose the life that draws you in today. Notice what you want
                from it: freedom, belonging, the pleasure of making something.
              </p>
            </article>
            <article>
              <span>03 / BEGIN</span>
              <h2>Make it part of life.</h2>
              <p>
                Find a first step that fits your week. We’re bringing together
                lessons, guides and shared experiences to help you begin.
              </p>
            </article>
            <p className="imagination-bridge">
              These are only possibilities. Your five can be anything.
            </p>
          </section>
        )}
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
                <p>{imagined ? questions[index] : life.line}</p>
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
          <span id="exercise" aria-hidden="true" />
          {imagined ? (
            <>
              <p className="eyebrow">ONE SMALL BEGINNING IS ENOUGH</p>
              <h2 data-kinetic>
                A little of
                <br />
                that life.
                <br />
                <em>This week.</em>
              </h2>
              <p>
                A song in your own voice. A coach who helps you begin. People
                making room for the same thing.
              </p>
            </>
          ) : (
            <>
              <p className="eyebrow">FIVE POSSIBILITIES. ONE PLACE TO BEGIN.</p>
              <h2 data-kinetic>
                Finally make room
                <br />
                for this part
                <br />
                of <em>yourself.</em>
              </h2>
              <p>
                Tell us what you dream of doing.
                <br />
                We help you discover the guidance, connections and experiences
                that make a beginning possible.
              </p>
            </>
          )}
          <Link className="shadow-cta" href="/choose?start=five">
            Find my five <ArrowUpRight size={22} />
          </Link>

          <div className="closing-categories">
            {categories.map((c) => (
              <Link href={`/categories/${c.id}`} key={c.id}>
                {c.name}
              </Link>
            ))}
          </div>
        </section>
        <FounderNote />
      </main>
      <section
        className="home-letter page-width"
        aria-labelledby="home-letter-title"
      >
        <div className="home-letter-story">
          <p className="eyebrow">A LETTER FOR YOUR OTHER LIVES</p>
          <h2 id="home-letter-title">
            Keep a little
            <br />
            <em>possibility close.</em>
          </h2>
          <p>
            For the song you keep humming. The place you keep saving. The part
            of yourself you’d like to spend more time with.
          </p>
          <p>
            Stories of people making room. Something to try. A question to take
            into your week.
          </p>
          <Link className="text-action" href="/letter">
            A taste of what’s to come <ArrowUpRight size={18} />
          </Link>
          <span className="letter-frequency">
            Every other week, once we begin.
          </span>
        </div>
        <InterestForm
          kind="letter"
          subject="first-letter"
          source="/"
          title="Let me know when it begins."
        />
      </section>
      <Footer />
    </div>
  );
}
