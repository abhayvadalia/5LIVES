'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { Header, Footer } from './shell';
import { FiveExercise } from './five-exercise';

export function BeginningHome() {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`beginning-site ${paused ? 'motion-paused' : ''}`}>
      <Header
        motionControl={
          <Button
            variant="ghost"
            className="motion-toggle"
            aria-label={paused ? 'Resume motion' : 'Pause motion'}
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
          </Button>
        }
      />
      <main id="main">
        <section className="beginning-hero page-width" id="exercise">
          <div className="beginning-heading">
            <p className="eyebrow">A LITTLE ROOM FOR THE REST OF YOU</p>
            <h1>
              Five lives.
              <br />
              <em>One beginning.</em>
            </h1>
            <p>
              You do not need a new life.
              <br />
              You need one afternoon.
            </p>
            <a href="#how-it-works" className="beginning-text-link">
              And a little company <ArrowUpRight size={18} />
            </a>
          </div>
          <FiveExercise />
        </section>
        <section className="beginning-manifesto page-width" id="how-it-works">
          <p className="eyebrow">IMAGINE FREELY. BEGIN SMALL.</p>
          <h2>
            Keep all your possibilities.
            <br />
            <em>Make room for one.</em>
          </h2>
          <p>
            A song in your own voice. A painting you put on the wall. The first
            time you walk onto a court and stay for the game. We help you begin,
            with people doing it too.
          </p>
          <Link className="beginning-text-link" href="/membership">
            Meet the membership <ArrowUpRight size={18} />
          </Link>
        </section>
        <section className="beginning-paths page-width">
          <Link href="/letter">
            <span>THE LETTER</span>
            <h2>
              A small nudge.
              <br />
              <em>Every other week.</em>
            </h2>
            <p>One life. One beginning. One question to carry with you.</p>
            <ArrowUpRight />
          </Link>
          <Link href="/membership">
            <span>THE MEMBERSHIP</span>
            <h2>
              People who know
              <br />
              <em>your name.</em>
            </h2>
            <p>
              Your circle. An introduction. A little company when you begin.
            </p>
            <ArrowUpRight />
          </Link>
          <Link href="/experiences">
            <span>THE EXPERIENCES</span>
            <h2>
              An afternoon.
              <br />
              <em>Something to keep.</em>
            </h2>
            <p>Make something, finish it, and take a part of that life home.</p>
            <ArrowUpRight />
          </Link>
        </section>
        <aside className="inspiration-note page-width">
          <p>
            Inspired by the imaginary-lives exercise in Julia Cameron’s{' '}
            <cite>The Artist’s Way</cite>,{' '}
            <a href="https://www.helenunwincoaching.com/post/if-you-had-5-lives-what-would-you-do-with-them">
              Helen Unwin’s reflection on five lives
            </a>
            , and Azim Rushdi’s essay on trying a small part of an imagined
            life. Five Lives is independent of these authors.
          </p>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
