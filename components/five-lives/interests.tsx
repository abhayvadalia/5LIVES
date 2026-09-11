'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readBrowserProfile } from '@/lib/browser-profile';
import { DRAFT_KEY, parseDraft } from '@/lib/intake';
import { findOption } from '@/lib/catalog';
import { AppNavigation } from './participant-home';
export function Interests() {
  const [choices, setChoices] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const profile =
          readBrowserProfile(localStorage) ??
          parseDraft(localStorage.getItem(DRAFT_KEY))?.intake;
        setChoices(
          Object.values(profile?.choices ?? {}).filter((v) => v !== 'none'),
        );
      } catch {
        /* The empty state keeps exploration available when storage is blocked. */
      }
      setLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <p className="eyebrow">FROM SOMEDAY TO A FIRST STEP</p>
      <h1>
        Your dreams.
        <br />
        <em>A way into them.</em>
      </h1>
      <p className="page-intro">
        The right teacher, a little guidance, a thoughtfully planned experience.
        We’re shaping ways to help you live the possibilities you choose.
      </p>
      <p className="catalog-note">
        These opportunities are being developed. There are no confirmed dates or
        bookings yet, and your browser choices have not been sent as requests.
      </p>
      {!loaded ? (
        <p role="status">Opening your possibilities…</p>
      ) : choices.length ? (
        <div className="offering-grid">
          {choices.map((id) => {
            const option = findOption(id);
            return option ? (
              <Link
                key={id}
                href={`/experiences/${id}`}
                className="offering-card"
              >
                <span className="tag">A place to begin</span>
                <h2>{option.title}</h2>
                <p>{option.detail}</p>
                <span className="text-action">Explore this possibility →</span>
              </Link>
            ) : null;
          })}
        </div>
      ) : (
        <Link href="/choose" className="primary-action">
          Find my five
        </Link>
      )}
      <AppNavigation />
    </>
  );
}
