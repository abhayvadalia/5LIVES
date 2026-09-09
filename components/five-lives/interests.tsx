'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { findOption } from '@/lib/catalog';
import { AppNavigation } from './participant-home';
type Interest = {
  id: string;
  option_id: string;
  city: string;
  availability: string;
  status: string;
  updated_at: string;
};
export function Interests() {
  const [items, setItems] = useState<Interest[]>([]);
  const [choices, setChoices] = useState<string[]>([]);
  const [option, setOption] = useState('');
  const [city, setCity] = useState('');
  const [availability, setAvailability] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [state, setState] = useState('loading');
  async function reload() {
    const r = await fetch('/api/interests', { cache: 'no-store' });
    const d = (await r.json()) as {
      error: string;
      interests: Interest[];
      profile: {
        choices: Record<string, string>;
        active: string | null;
      } | null;
    };
    if (!r.ok) throw new Error(d.error);
    setItems(d.interests);
  }
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const r = await fetch('/api/profile', { cache: 'no-store' });
        const d = (await r.json()) as {
          error: string;
          interests: Interest[];
          profile: {
            choices: Record<string, string>;
            active: string | null;
          } | null;
        };
        if (!mounted) return;
        if (r.status === 401) {
          setState('signed-out');
          return;
        }
        if (!r.ok) throw new Error(d.error);
        if (d.profile) {
          setChoices(
            Object.values(d.profile.choices).filter(
              (v) => v !== 'none',
            ) as string[],
          );
          setOption(d.profile.active ?? '');
        }
        await reload();
        setState('ready');
      } catch (e) {
        if (mounted) {
          setMessage(
            e instanceof Error
              ? e.message
              : 'Please reconnect to load your requests.',
          );
          setState('error');
        }
      }
    }
    void load();
    return () => {
      mounted = false;
    };
  }, []);
  async function submit(e: { preventDefault: () => void }) {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const r = await fetch('/api/interests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionId: option, city, availability }),
      });
      const d = (await r.json()) as {
        error: string;
        interests: Interest[];
        profile: {
          choices: Record<string, string>;
          active: string | null;
        } | null;
      };
      if (!r.ok) throw new Error(d.error);
      await reload();
      setMessage(
        'Interest received. This does not reserve a place or guarantee a date.',
      );
    } catch (e) {
      setMessage(
        e instanceof Error ? e.message : 'Unable to save. Please retry.',
      );
    } finally {
      setBusy(false);
    }
  }
  async function withdraw(id: string) {
    setBusy(true);
    try {
      const r = await fetch('/api/interests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const d = (await r.json()) as {
        error: string;
        interests: Interest[];
        profile: {
          choices: Record<string, string>;
          active: string | null;
        } | null;
      };
      if (!r.ok) throw new Error(d.error);
      await reload();
      setMessage('Your interest request has been withdrawn.');
    } catch (e) {
      setMessage(
        e instanceof Error ? e.message : 'Unable to withdraw. Please retry.',
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <p className="eyebrow">MAKE SPACE FOR A REAL EXPERIENCE</p>
      <h1>
        A place. A time.
        <br />A possibility.
      </h1>
      <p className="page-intro">
        Tell us what could fit into your life. Matching and joining a group are
        free. No dates are confirmed yet.
      </p>
      {state === 'loading' ? (
        <p role="status">Loading your requests…</p>
      ) : state === 'signed-out' ? (
        <div className="soft-panel">
          <h2>Save your five first.</h2>
          <p>Sign in to keep your requests connected to you.</p>
          <Link className="primary-action" href="/sign-in">
            Sign in
          </Link>
        </div>
      ) : (
        state === 'ready' && (
          <div className="detail-grid">
            <section>
              {choices.length ? (
                <form onSubmit={submit}>
                  <h2>Express interest</h2>
                  <p className="field-label">A possibility from your five</p>
                  <RadioGroup
                    value={option}
                    onValueChange={(v) => setOption(String(v))}
                    aria-label="Experience to request"
                  >
                    {choices.map((id) => (
                      <label
                        className={`choice-card ${option === id ? 'is-selected' : ''}`}
                        key={id}
                      >
                        <RadioGroupItem value={id} />
                        <strong>{findOption(id)?.title}</strong>
                      </label>
                    ))}
                  </RadioGroup>
                  <label className="field-label" htmlFor="city">
                    City or remote location
                  </label>
                  <input
                    id="city"
                    autoComplete="address-level2"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    minLength={2}
                    maxLength={80}
                    placeholder="Where would this fit for you?"
                  />
                  <label className="field-label" htmlFor="availability">
                    Practical availability
                  </label>
                  <textarea
                    id="availability"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    required
                    minLength={3}
                    maxLength={400}
                    rows={3}
                    placeholder="For example, weekend mornings or weekday evenings"
                  />
                  <p className="small-copy">
                    Please avoid medical details or other sensitive information.
                    We’re only asking about timing.
                  </p>
                  <Button
                    type="submit"
                    className="primary-action"
                    disabled={busy || !option}
                  >
                    {busy ? 'Saving…' : 'Send interest request'}
                  </Button>
                  <p className="small-copy">
                    This is an expression of interest, not a booking or a
                    promise of a date.
                  </p>
                </form>
              ) : (
                <div className="soft-panel">
                  <h2>Leave room for a possibility.</h2>
                  <p>
                    Add a non-empty choice to your saved five before asking for
                    a match.
                  </p>
                  <Link className="primary-action" href="/choose">
                    Explore my five
                  </Link>
                </div>
              )}
            </section>
            <aside>
              <h2>Your requests</h2>
              {items.length ? (
                items.map((item) => (
                  <article className="interest-card" key={item.id}>
                    <span className="tag">
                      {item.status === 'requested'
                        ? 'Interest received'
                        : item.status === 'reviewing'
                          ? 'Under review'
                          : 'Withdrawn'}
                    </span>
                    <h3>{findOption(item.option_id)?.title}</h3>
                    <p>
                      {item.city} · {item.availability}
                    </p>
                    {item.status !== 'withdrawn' && (
                      <Button
                        className="secondary-action"
                        variant="outline"
                        disabled={busy}
                        onClick={() => void withdraw(item.id)}
                      >
                        Withdraw interest
                      </Button>
                    )}
                  </article>
                ))
              ) : (
                <p className="muted">
                  No requests yet. There’s no deadline to begin.
                </p>
              )}
            </aside>
          </div>
        )
      )}
      {message && (
        <p className="notice" role="status">
          {message}
        </p>
      )}
      {state === 'error' && (
        <Button className="secondary-action" onClick={() => location.reload()}>
          Try loading again
        </Button>
      )}
      <AppNavigation />
    </>
  );
}
