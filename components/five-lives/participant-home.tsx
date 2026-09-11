'use client';
import { readBrowserProfile } from '@/lib/browser-profile';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Home, List, Compass, User } from 'lucide-react';
import { FiveSummary } from './intake-flow';
import { findOption } from '@/lib/catalog';
import { DRAFT_KEY, emptyIntake, parseDraft, type Intake } from '@/lib/intake';
export function AppNavigation({ current = 'home' }: { current?: string }) {
  return (
    <nav className="app-navigation" aria-label="Your Five Lives">
      {[
        ['home', '/app', 'Home', Home],
        ['five', '/app/my-five', 'My five', List],
        ['experiences', '/experiences', 'Experiences', Compass],
        ['account', '/app/settings', 'Your space', User],
      ].map(([id, href, label, Icon]) => {
        const I = Icon as typeof Home;
        return (
          <Link
            href={String(href)}
            key={String(id)}
            aria-current={current === id ? 'page' : undefined}
          >
            <I size={18} />
            {String(label)}
          </Link>
        );
      })}
    </nav>
  );
}
export function ParticipantHome() {
  const [intake, setIntake] = useState<Intake>(emptyIntake);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const profile = readBrowserProfile(localStorage);
        if (!active) return;
        if (profile) {
          setIntake(profile);
          setStatus('saved');
        } else {
          const draft = parseDraft(localStorage.getItem(DRAFT_KEY));
          if (draft) setIntake(draft.intake);
          setStatus(draft ? 'local' : 'new');
        }
      } catch {
        if (active) {
          try {
            const draft = parseDraft(localStorage.getItem(DRAFT_KEY));
            if (draft) setIntake(draft.intake);
          } catch {
            /* Storage unavailable. */
          }
          setStatus('error');
        }
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, []);
  if (status === 'loading') return <p role="status">Opening your home…</p>;
  const choice = findOption(intake.active ?? '');
  return (
    <>
      <p className="eyebrow">A LITTLE ROOM FOR YOU</p>
      <h1>
        {status === 'saved'
          ? 'Welcome to your five.'
          : 'Your possibilities start here.'}
      </h1>
      <p className="page-intro">
        No rush. No catching up. Just a little space for the part of you that’s
        curious.
      </p>
      {status === 'error' && (
        <p className="notice" role="alert">
          We couldn’t read this browser’s saved list. Your current draft is
          shown if available; check Your space for storage options.
        </p>
      )}
      <section className="next-action">
        <div>
          <p className="eyebrow">
            {choice ? 'YOUR STARTING POINT' : 'ONE PLACE TO BEGIN'}
          </p>
          <h2>{choice?.title ?? 'What would you like to try?'}</h2>
          <p>
            {choice
              ? 'Every lived dream begins somewhere. Explore the support and experiences taking shape around your choice.'
              : 'Choose what calls to you in each category. We’ll help you see a way to begin.'}
          </p>
        </div>
        <Link
          className="primary-action"
          href={choice ? `/experiences/${choice.id}` : '/choose'}
        >
          {choice ? 'Explore my next step' : 'Find my five'}
          <ArrowRight size={18} />
        </Link>
      </section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR LIST, WITH ROOM TO GROW</p>
          <h2>My five</h2>
        </div>
        <Link className="text-action" href="/app/my-five">
          Review & edit <ArrowRight size={17} />
        </Link>
      </div>
      <FiveSummary intake={intake} />
      <p className="small-copy">
        {status === 'saved'
          ? 'Saved in this browser.'
          : 'This is your browser draft. Review and save it here when you’re ready.'}
      </p>
      <AppNavigation />
    </>
  );
}
