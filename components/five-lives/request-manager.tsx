'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  CAPTURE_RECEIPTS_KEY,
  type CaptureReceipt,
} from '@/lib/interest-capture';
function RequestItem({
  receipt,
  removed,
}: {
  receipt: CaptureReceipt;
  removed: () => void;
}) {
  const [email, setEmail] = useState('');
  const [updates, setUpdates] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  async function act(action: 'read' | 'correct' | 'delete') {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch('/api/launch-requests', {
        method: action === 'delete' ? 'DELETE' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...receipt,
          action,
          email,
          consentUpdates: updates,
        }),
      });
      const data = (await response.json()) as {
        error?: string;
        email: string;
        consentUpdates: number;
      };
      if (!response.ok) throw new Error(data.error || 'Please try again.');
      if (action === 'delete') {
        removed();
        return;
      }
      setLoaded(true);
      setEmail(data.email);
      setUpdates(!!data.consentUpdates);
      if (action === 'correct') setMessage('Your request has been updated.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Please try again.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="managed-request">
      <p className="eyebrow">{receipt.kind}</p>
      <h2>{receipt.subject.replaceAll('-', ' ')}</h2>
      <p className="form-small">
        Requested {new Date(receipt.createdAt).toLocaleDateString('en-IN')}
      </p>
      {loaded ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void act('correct');
          }}
        >
          <label>
            Email address
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="consent-row">
            <Checkbox checked={updates} onCheckedChange={setUpdates} />
            <span>Also email me other Five Lives openings.</span>
          </label>
          <Button disabled={busy} type="submit" className="beginning-button">
            Save changes
          </Button>
        </form>
      ) : (
        <Button
          variant="outline"
          disabled={busy}
          className="secondary-action"
          onClick={() => act('read')}
        >
          View and correct my details
        </Button>
      )}
      <Button
        variant="link"
        disabled={busy}
        className="edit-five"
        onClick={() => act('delete')}
      >
        Withdraw consent and delete this request
      </Button>
      {message && <p role="status">{message}</p>}
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
export function RequestManager() {
  const [receipts, setReceipts] = useState<CaptureReceipt[]>([]);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    try {
      let saved = JSON.parse(
        localStorage.getItem(CAPTURE_RECEIPTS_KEY) || '[]',
      );
      if (!Array.isArray(saved)) saved = [];
      if (location.hash.length > 1) {
        const restored = JSON.parse(decodeURIComponent(location.hash.slice(1)));
        if (
          typeof restored.id === 'string' &&
          typeof restored.token === 'string' &&
          !saved.some((r: CaptureReceipt) => r.id === restored.id)
        )
          saved.push(restored);
        history.replaceState(null, '', location.pathname);
      }
      setReceipts(
        saved.filter(
          (r: CaptureReceipt) =>
            r &&
            typeof r.id === 'string' &&
            typeof r.token === 'string' &&
            typeof r.subject === 'string' &&
            typeof r.createdAt === 'string',
        ),
      );
    } catch {
      setMessage(
        'Your receipts could not be read. Use the management link in a downloaded receipt.',
      );
    }
    setReady(true);
  }, []);
  function remove(id: string) {
    const next = receipts.filter((r) => r.id !== id);
    setReceipts(next);
    try {
      localStorage.setItem(CAPTURE_RECEIPTS_KEY, JSON.stringify(next));
    } catch {
      /* Server data is already erased. */
    }
    setMessage('Your request and its personal details were deleted.');
  }
  return (
    <>
      <section className="editorial-hero">
        <p className="eyebrow">YOUR DATA</p>
        <h1>Manage your requests.</h1>
        <p className="editorial-intro">
          View or correct your email, change update consent, or delete a
          request. Your receipt gives you access, without a login.
        </p>
      </section>
      {!ready ? (
        <p role="status">Loading your receipts…</p>
      ) : receipts.length ? (
        receipts.map((r) => (
          <RequestItem receipt={r} key={r.id} removed={() => remove(r.id)} />
        ))
      ) : (
        <p>
          No request receipts are saved in this browser. If you have a
          downloaded receipt, open its management link to restore access here.
        </p>
      )}
      {message && <p role="status">{message}</p>}
      <Link className="beginning-text-link" href="/app/settings">
        Manage browser-saved choices
      </Link>
    </>
  );
}
