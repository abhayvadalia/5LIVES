'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FIVE_DRAFT_KEY,
  readFive,
  saveFive,
  suggestedBeginning,
  type Five,
} from '@/lib/beginnings';

const prompts = [
  'Let the first thing that comes to mind stay.',
  'Something you keep saving for later.',
  'A different rhythm. An ordinary day you would love.',
  'Something you would try if being good did not matter.',
  'Leave room for the unexpected.',
];
export function FiveExercise() {
  const [lives, setLives] = useState(['', '', '', '', '']);
  const [step, setStep] = useState(0);
  const [adult, setAdult] = useState(false);
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState<Five | null>(null);
  const [error, setError] = useState('');
  const focus = useRef<HTMLDivElement>(null);
  const interacted = useRef(false);
  useEffect(() => {
    try {
      const existing = readFive(localStorage);
      if (existing) {
        setSaved(existing);
        setLives(existing.lives);
        setStep(existing.first === null ? 6 : 7);
        setAdult(true);
      } else {
        const raw = localStorage.getItem(FIVE_DRAFT_KEY);
        if (raw) {
          const draft = JSON.parse(raw);
          if (
            Date.now() - draft.updatedAt < 7 * 86400000 &&
            Array.isArray(draft.lives) &&
            draft.lives.length === 5 &&
            draft.lives.every(
              (x: unknown) => typeof x === 'string' && x.length <= 160,
            ) &&
            Number.isInteger(draft.step) &&
            draft.step >= 0 &&
            draft.step <= 5
          ) {
            setLives(draft.lives);
            setStep(draft.step);
            setAdult(true);
          } else localStorage.removeItem(FIVE_DRAFT_KEY);
        }
      }
    } catch {
      setError(
        'Browser storage is unavailable or your saved list cannot be read. Your answers here will stay only while this page is open.',
      );
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready || !adult || saved) return;
    try {
      localStorage.setItem(
        FIVE_DRAFT_KEY,
        JSON.stringify({
          lives,
          step: Math.min(step, 5),
          updatedAt: Date.now(),
        }),
      );
    } catch {
      setError(
        'This browser cannot keep your draft. Keep this page open until you have finished.',
      );
    }
  }, [lives, step, adult, ready, saved]);
  useEffect(() => {
    if (interacted.current) focus.current?.focus({ preventScroll: true });
  }, [step]);
  function advance(next: number) {
    interacted.current = true;
    setError('');
    setStep(next);
  }
  function keep(first: number | null) {
    try {
      const next = saveFive(
        localStorage,
        {
          version: 2,
          lives: lives.map((x) => x.trim()),
          first,
          completed: saved?.completed ?? [],
          note: saved?.note ?? '',
        },
        saved?.revision ?? 0,
      );
      setSaved(next);
      localStorage.removeItem(FIVE_DRAFT_KEY);
      advance(first === null ? 6 : 7);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : 'Your five could not be saved. Please try again.',
      );
    }
  }
  const next =
    saved?.first != null ? suggestedBeginning(saved.lives[saved.first]) : null;
  return (
    <div className="exercise-paper" aria-busy={!ready}>
      <div className="exercise-top">
        <span>THE FIVE LIVES EXERCISE</span>
        <span>{step < 5 ? `${step + 1} / 5` : 'YOURS TO KEEP'}</span>
      </div>
      <div ref={focus} tabIndex={-1} className="exercise-focus" key={step}>
        {step < 5 ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (adult && lives[step].trim()) advance(step + 1);
            }}
          >
            <p className="exercise-question">
              If you had five other lives,
              <br />
              <em>who would you be?</em>
            </p>
            <label htmlFor="aspiration">In this life, I would be…</label>
            <Input
              id="aspiration"
              className="aspiration-input"
              maxLength={160}
              required
              value={lives[step]}
              placeholder={
                [
                  'a musician, a mountain walker…',
                  'a baker, a language teacher…',
                  'a gardener, a traveller…',
                  'a painter, a tennis player…',
                  'someone entirely unexpected…',
                ][step]
              }
              onChange={(e) =>
                setLives(
                  lives.map((life, i) => (i === step ? e.target.value : life)),
                )
              }
            />
            <p className="exercise-hint">{prompts[step]}</p>
            {step === 0 && (
              <label className="consent-row">
                <Checkbox
                  checked={adult}
                  onCheckedChange={(checked) => setAdult(checked)}
                  required
                />
                <span>I am 18 or older.</span>
              </label>
            )}
            <div className="exercise-actions">
              <Button
                variant="ghost"
                disabled={step === 0}
                onClick={() => advance(step - 1)}
                aria-label="Previous life"
              >
                <ArrowLeft />
              </Button>
              <Button
                type="submit"
                disabled={!ready || !adult || !lives[step].trim()}
                className="beginning-button"
              >
                {step === 4 ? 'Keep my five' : 'Keep this life'}
                <ArrowRight />
              </Button>
            </div>
          </form>
        ) : step === 5 ? (
          <div>
            <h2>
              Save your five.
              <br />
              <em>Leave room for later.</em>
            </h2>
            <p className="exercise-hint">
              Keep them in this browser for now, without an account. Saving by
              email is coming with the letter.
            </p>
            <Button className="beginning-button" onClick={() => keep(null)}>
              Save in this browser <ArrowRight />
            </Button>
            <Button
              variant="link"
              className="edit-five"
              onClick={() => advance(0)}
            >
              Edit my answers
            </Button>
          </div>
        ) : step === 6 ? (
          <div>
            <h2>
              Which one would
              <br />
              <em>you begin first?</em>
            </h2>
            <p className="exercise-hint">
              The others can wait. They are still yours.
            </p>
            <div className="first-life-options">
              {lives.map((life, i) => (
                <Button
                  variant="outline"
                  key={i}
                  disabled={saved?.completed.includes(i)}
                  onClick={() => keep(i)}
                >
                  <span>{life}</span>
                  {saved?.completed.includes(i) ? <Check /> : <ArrowRight />}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p className="eyebrow">ONE PLACE TO BEGIN</p>
            <h2 className="chosen-life">
              {saved?.first != null
                ? saved.lives[saved.first]
                : 'A little room for you.'}
            </h2>
            <p className="exercise-hint">{next?.text}</p>
            {next && (
              <Link className="beginning-button" href={next.href}>
                {next.label}
                <ArrowRight />
              </Link>
            )}
            <Link className="beginning-text-link edit-five" href="/my-five">
              Open my five
            </Link>
          </div>
        )}
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error} <Link href="/app/settings">Your space</Link>
        </p>
      )}
      {step < 5 && (
        <div className="exercise-progress" aria-hidden="true">
          {lives.map((life, i) => (
            <span key={i} className={life.trim() ? 'filled' : ''} />
          ))}
        </div>
      )}
      <p className="exercise-footnote">
        {step < 5
          ? 'No right answers. No plan required.'
          : 'Private to this browser. Clear your choices in Your space.'}
      </p>
    </div>
  );
}
