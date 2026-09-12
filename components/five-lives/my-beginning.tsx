'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  readFive,
  saveFive,
  suggestedBeginning,
  type Five,
} from '@/lib/beginnings';
export function MyBeginning() {
  const [five, setFive] = useState<Five | null>(null);
  const [ready, setReady] = useState(false);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [finishing, setFinishing] = useState(false);
  useEffect(() => {
    try {
      const saved = readFive(localStorage);
      setFive(saved);
      setNote(saved?.note ?? '');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load your choices.');
    }
    setReady(true);
  }, []);
  function update(value: Omit<Five, 'revision'>) {
    try {
      const next = saveFive(localStorage, value, five?.revision ?? 0);
      setFive(next);
      setNote(next.note);
      setError('');
      return true;
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Your changes could not be saved.',
      );
      return false;
    }
  }
  if (!ready) return <p role="status">Opening your five…</p>;
  if (!five)
    return (
      <section className="editorial-hero">
        <p className="eyebrow">YOUR FIVE</p>
        <h1>
          A little room
          <br />
          <em>for possibility.</em>
        </h1>
        <p className="editorial-intro">
          Begin with the free exercise. Your answers will stay in this browser,
          ready for you to choose one.
        </p>
        {error && (
          <p className="form-error" role="alert">
            {error} <Link href="/app/settings">Your space</Link>
          </p>
        )}
        <Link href="/#exercise" className="beginning-button">
          Find my five <ArrowRight />
        </Link>
      </section>
    );
  const active = five.first;
  const next = active === null ? null : suggestedBeginning(five.lives[active]);
  return (
    <>
      <section className="editorial-hero">
        <div className="my-five-top">
          <p className="eyebrow">YOUR BEGINNING · SAVED IN THIS BROWSER</p>
          <Link href="/app/settings" className="beginning-text-link">
            Your space
          </Link>
        </div>
        <h1>
          {active === null ? (
            <>
              Make room
              <br />
              <em>for the next one.</em>
            </>
          ) : (
            five.lives[active]
          )}
        </h1>
        <p className="editorial-intro">
          {active === null
            ? 'Your other possibilities are still here. Choose one when you are ready.'
            : 'One thing to give a little time to. The others can wait.'}
        </p>
      </section>
      {active === null ? (
        <div className="first-life-options next-life-options">
          {five.lives.map((life, i) => (
            <Button
              key={i}
              variant="outline"
              disabled={five.completed.includes(i)}
              onClick={() => update({ ...five, first: i, note: '' })}
            >
              <span>{life}</span>
              {five.completed.includes(i) ? (
                <>
                  <span>Completed</span>
                  <Check />
                </>
              ) : (
                <ArrowRight />
              )}
            </Button>
          ))}
          {five.completed.length === five.lives.length && (
            <p>
              You have made room for every life on this list. Keep it as a
              record, or clear it in Your space to imagine again.
            </p>
          )}
        </div>
      ) : (
        <>
          {next && (
            <section className="one-next-step">
              <div>
                <p className="eyebrow">A LITTLE COMPANY</p>
                <h2>{next.label}</h2>
                <p>{next.text}</p>
              </div>
              <Link href={next.href} className="beginning-button">
                Take a look <ArrowRight />
              </Link>
            </section>
          )}
          <section className="private-note">
            <div>
              <p className="eyebrow">THIS WEEK</p>
              <h2>Something you did.</h2>
              <p>
                A sentence is enough. This note stays in your browser; it is not
                a member thread.
              </p>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (update({ ...five, note }))
                  setMessage('Your note is saved in this browser.');
              }}
            >
              <label htmlFor="weekly-note">Your private note</label>
              <Textarea
                id="weekly-note"
                maxLength={2000}
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                  setMessage('');
                }}
                placeholder="I made time for…"
              />
              <Button className="beginning-button" type="submit">
                Keep this note
              </Button>
              {message && (
                <p role="status" className="form-small">
                  {message}
                </p>
              )}
            </form>
          </section>
          <div className="completion-action">
            {finishing ? (
              <>
                <p>
                  Mark this beginning complete? Your note will be cleared when
                  you start the next one.
                </p>
                <Button
                  className="beginning-button"
                  onClick={() => {
                    if (
                      update({
                        ...five,
                        first: null,
                        completed: [...five.completed, active],
                      })
                    )
                      setFinishing(false);
                  }}
                >
                  Mark complete <Check />
                </Button>
                <Button variant="link" onClick={() => setFinishing(false)}>
                  Keep going
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                className="secondary-action"
                onClick={() => setFinishing(true)}
              >
                I have finished this beginning <Check />
              </Button>
            )}
          </div>
        </>
      )}
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <details className="kept-lives">
        <summary>
          The other lives, kept for later <Plus size={18} />
        </summary>
        <ul>
          {five.lives.map((life, i) =>
            i !== active ? (
              <li key={i}>
                {life}
                {five.completed.includes(i) && <span>Completed</span>}
              </li>
            ) : null,
          )}
        </ul>
      </details>
    </>
  );
}
