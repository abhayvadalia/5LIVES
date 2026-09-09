'use client';
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
        ['account', '/app/settings', 'Account', User],
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
  const [requests, setRequests] = useState(0);
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const r = await fetch('/api/profile', { cache: 'no-store' });
        const d = (await r.json()) as { profile: Intake | null };
        if (!active) return;
        if (r.ok && d.profile) {
          setIntake(d.profile);
          setStatus('saved');
          const ir = await fetch('/api/interests', { cache: 'no-store' });
          if (ir.ok) {
            const data = (await ir.json()) as {
              interests: { status: string }[];
            };
            if (active)
              setRequests(
                data.interests.filter(
                  (i: { status: string }) => i.status !== 'withdrawn',
                ).length,
              );
          }
        } else {
          const draft = parseDraft(localStorage.getItem(DRAFT_KEY));
          if (draft) setIntake(draft.intake);
          setStatus(r.status === 401 ? 'local' : r.ok ? 'new' : 'error');
        }
      } catch {
        if (active) {
          try {
            const draft = parseDraft(localStorage.getItem(DRAFT_KEY));
            if (draft) setIntake(draft.intake);
          } catch {
            /* Storage unavailable. */
          }
          setStatus('offline');
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
          We couldn’t load your saved list. Please reload when your connection
          is ready.
        </p>
      )}
      {status === 'offline' && (
        <p className="notice">
          You’re offline. Any choices below are your local draft, not your
          latest saved account list.
        </p>
      )}
      <section className="next-action">
        <div>
          <p className="eyebrow">
            {requests
              ? 'YOUR NEXT STEP'
              : choice
                ? 'YOUR STARTING POINT'
                : 'ONE PLACE TO BEGIN'}
          </p>
          <h2>
            {requests
              ? 'A little room for what comes next.'
              : (choice?.title ?? 'What would you like to try?')}
          </h2>
          <p>
            {requests
              ? `${requests} active interest request${requests === 1 ? '' : 's'}. No date or place is promised yet.`
              : choice
                ? 'Your starting choice is a possibility, not a booking. Tell us where and when a suitable experience could fit.'
                : 'Choose something in each category, including “Nothing here yet.” Then begin with one.'}
          </p>
        </div>
        <Link
          className="primary-action"
          href={status === 'saved' && choice ? '/app/interests' : '/choose'}
        >
          {requests
            ? 'View my requests'
            : status === 'saved' && choice
              ? 'Express interest'
              : 'Find my five'}
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
          ? 'Saved to your account.'
          : 'Choices shown here are a local draft only. Sign in and save to use them across devices.'}
      </p>
      <AppNavigation />
    </>
  );
}
