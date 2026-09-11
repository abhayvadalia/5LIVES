/* oxlint-disable next/no-html-link-for-pages -- Dispatch-owned sign-out requires a top-level navigation, never a prefetched Link. */
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AppNavigation } from './participant-home';
import { BROWSER_PROFILE_KEY } from '@/lib/browser-profile';
import { DRAFT_KEY } from '@/lib/intake';
export function AccountSettings() {
  const [message, setMessage] = useState('');
  return (
    <>
      <p className="eyebrow">YOUR SPACE</p>
      <h1>Your space</h1>
      <p className="page-intro">No login. Your choices stay in this browser.</p>
      <div className="offering-grid">
        <section className="soft-panel">
          <h2>Your choices</h2>
          <p>
            Return to your five, make room for a new possibility, or explore
            your next step.
          </p>
          <Link className="text-action" href="/app/my-five">
            Review my five →
          </Link>
          <br />
          <Link className="text-action" href="/app/interests">
            My next steps →
          </Link>
        </section>
        <section className="soft-panel">
          <h2>On this device</h2>
          <p>
            Drafts expire seven days after an edit. Lists you explicitly save
            stay until you clear them or clear your browser’s site data. An
            optional scene is kept only with your consent. Anyone using this
            browser can see these choices.
          </p>
          <Button
            variant="outline"
            className="secondary-action"
            onClick={() => {
              try {
                localStorage.removeItem(DRAFT_KEY);
                localStorage.removeItem(BROWSER_PROFILE_KEY);
                setMessage(
                  'Your saved five and local draft were cleared from this browser.',
                );
              } catch {
                setMessage(
                  'This browser could not clear local storage. Use your browser’s site-data settings.',
                );
              }
            }}
          >
            Clear my choices
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
          Offline mode provides a neutral fallback. Saved choices are kept in
          browser storage, separately from the app’s offline cache.
        </p>
      </section>
      {message && (
        <p className="notice" role="status">
          {message}
        </p>
      )}
      <div className="action-row">
        <Link className="text-action" href="/privacy">
          Your data
        </Link>
      </div>
      <AppNavigation current="account" />
    </>
  );
}
