/* oxlint-disable next/no-html-link-for-pages -- Dispatch-owned sign-out requires a top-level navigation, never a prefetched Link. */
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AppNavigation } from './participant-home';
import { DRAFT_KEY } from '@/lib/intake';
export function AccountSettings({ name }: { name: string | null }) {
  const [message, setMessage] = useState('');
  return (
    <>
      <p className="eyebrow">YOUR SPACE</p>
      <h1>Account & privacy</h1>
      <p className="page-intro">
        {name ? `Signed in as ${name}` : 'You’re browsing with a local draft.'}
      </p>
      <div className="offering-grid">
        <section className="soft-panel">
          <h2>Your choices</h2>
          <p>
            Review your five or check your interest requests. Choosing never
            purchases an experience.
          </p>
          <Link className="text-action" href="/app/my-five">
            Review my five →
          </Link>
          <br />
          <Link className="text-action" href="/app/interests">
            My interest requests →
          </Link>
        </section>
        <section className="soft-panel">
          <h2>On this device</h2>
          <p>
            Local drafts expire after seven days. Your private scene is only
            included if you explicitly choose to keep it here.
          </p>
          <Button
            variant="outline"
            className="secondary-action"
            onClick={() => {
              try {
                localStorage.removeItem(DRAFT_KEY);
                setMessage(
                  'The local draft was cleared from this device. Account-saved choices are unchanged.',
                );
              } catch {
                setMessage(
                  'This browser could not clear local storage. Use your browser’s site-data settings.',
                );
              }
            }}
          >
            Clear local draft
          </Button>
        </section>
      </div>
      <section className="soft-panel spaced">
        <h2>Install Five Lives</h2>
        <p>
          On a supported browser, open its menu and choose “Install app” or “Add
          to Home Screen.” On iPhone, use Safari’s Share menu, then “Add to Home
          Screen.” Installation is available on the hosted build; ordinary
          browser use works too.
        </p>
        <p>
          Offline mode provides a neutral fallback. Account data, bookings and
          private scenes are never kept in the app’s offline cache.
        </p>
      </section>
      {message && (
        <p className="notice" role="status">
          {message}
        </p>
      )}
      <div className="action-row">
        {name ? (
          <a
            className="secondary-action text-action"
            href="/signout-with-chatgpt?return_to=%2F"
            target="_top"
            onClick={() => {
              try {
                localStorage.removeItem(DRAFT_KEY);
              } catch {
                /* Browser site-data settings remain available. */
              }
            }}
          >
            Sign out
          </a>
        ) : (
          <Link className="primary-action" href="/sign-in">
            Sign in to save
          </Link>
        )}
        <Link className="text-action" href="/privacy">
          Privacy in this preview
        </Link>
      </div>
      <AppNavigation current="account" />
    </>
  );
}
