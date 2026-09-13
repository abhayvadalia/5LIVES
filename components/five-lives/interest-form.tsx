'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CAPTURE_RECEIPTS_KEY,
  PRICE_BANDS,
  type CaptureReceipt,
} from '@/lib/interest-capture';

export function InterestForm({
  kind,
  subject,
  source,
  title = 'A place on the list.',
}: {
  kind: 'membership' | 'letter' | 'experience';
  subject: string;
  source?: '/';
  title?: string;
}) {
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState<string | null>(null);
  const [adult, setAdult] = useState(false);
  const [consent, setConsent] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [busy, setBusy] = useState(false);
  const [receipt, setReceipt] = useState<CaptureReceipt | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/launch-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind,
          subject,
          source,
          email,
          expectedPrice: price,
          adult,
          consentRequest: consent,
          consentUpdates: updates,
          website: new FormData(event.currentTarget).get('website'),
        }),
      });
      const result = (await response.json()) as CaptureReceipt & {
        error?: string;
      };
      if (!response.ok)
        throw new Error(
          result.error || 'Your request could not be saved. Please try again.',
        );
      setReceipt(result);
      try {
        const existing = JSON.parse(
          localStorage.getItem(CAPTURE_RECEIPTS_KEY) || '[]',
        );
        localStorage.setItem(
          CAPTURE_RECEIPTS_KEY,
          JSON.stringify([
            ...(Array.isArray(existing) ? existing : []),
            result,
          ]),
        );
      } catch {
        setMessage(
          'Your request is saved. Download your receipt to keep the removal link, as this browser could not keep it.',
        );
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Please try again.');
    } finally {
      setBusy(false);
    }
  }
  async function withdraw() {
    if (!receipt) return;
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/launch-requests', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(receipt),
      });
      if (!response.ok)
        throw new Error('Your request could not be removed. Please try again.');
      try {
        const existing = JSON.parse(
          localStorage.getItem(CAPTURE_RECEIPTS_KEY) || '[]',
        );
        localStorage.setItem(
          CAPTURE_RECEIPTS_KEY,
          JSON.stringify(
            existing.filter((x: CaptureReceipt) => x.id !== receipt.id),
          ),
        );
      } catch {
        /* Server deletion succeeded. */
      }
      setReceipt(null);
      setMessage('Your request and email address have been removed.');
      setConsent(false);
      setUpdates(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Please try again.');
    } finally {
      setBusy(false);
    }
  }
  function download() {
    if (!receipt) return;
    const url = URL.createObjectURL(
      new Blob(
        [
          JSON.stringify(
            {
              ...receipt,
              email,
              expectedPrice: price,
              consentUpdates: updates,
              manageUrl: `${location.origin}/requests#${encodeURIComponent(JSON.stringify(receipt))}`,
            },
            null,
            2,
          ),
        ],
        { type: 'application/json' },
      ),
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = 'five-lives-request.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <section className="interest-form" id="register-interest">
      <p className="eyebrow">
        {kind === 'letter' ? 'THE FIVE LIVES LETTER · FREE' : 'OPENING SOON'}
      </p>
      <h2>
        {receipt
          ? kind === 'letter'
            ? 'Your invitation request is saved.'
            : 'You are on the list.'
          : title}
      </h2>
      {receipt ? (
        <div role="status">
          <p>
            {kind === 'letter'
              ? 'We can contact you when the first letter is ready. You’ll confirm separately before receiving future issues. No email has been sent yet.'
              : 'Your interest has been saved. This is not a booking or paid membership. We can contact you about this opening when details are ready.'}
          </p>
          <Button
            variant="outline"
            className="secondary-action"
            onClick={download}
          >
            Download my receipt
          </Button>
          <Button
            variant="link"
            className="edit-five"
            disabled={busy}
            onClick={withdraw}
          >
            Remove my request
          </Button>
          <p className="form-small">
            Keep your receipt to manage this request from another browser.
          </p>
        </div>
      ) : (
        <form onSubmit={submit}>
          <p>
            {kind === 'letter'
              ? 'An invitation when the first issue is ready. You’ll confirm before receiving future letters.'
              : kind === 'membership'
                ? 'Leave your email to hear when founding membership opens. Joining this list does not reserve a founding place or authorise a payment.'
                : 'Hear when the host, place, price and date are confirmed. Joining the list does not reserve a place.'}
          </p>
          <label>
            Email address
            <Input
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>
          {kind === 'experience' && (
            <label>
              What would you expect to spend?
              <Select value={price} onValueChange={setPrice} required>
                <SelectTrigger className="capture-select">
                  <SelectValue placeholder="Choose a price range" />
                </SelectTrigger>
                <SelectContent>
                  {PRICE_BANDS.map((band) => (
                    <SelectItem value={band} key={band}>
                      {band}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
          )}
          <label className="capture-honeypot" aria-hidden="true">
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
          <label className="consent-row">
            <Checkbox checked={adult} onCheckedChange={setAdult} required />
            <span>I am 18 or older.</span>
          </label>
          <label className="consent-row">
            <Checkbox checked={consent} onCheckedChange={setConsent} required />
            <span>
              Save my email{kind === 'experience' ? ' and price range' : ''},
              and contact me about this{' '}
              {kind === 'letter'
                ? 'letter invitation'
                : kind === 'membership'
                  ? 'membership opening'
                  : 'experience'}
              .
            </span>
          </label>
          <label className="consent-row">
            <Checkbox checked={updates} onCheckedChange={setUpdates} />
            <span>Also email me other Five Lives openings. Optional.</span>
          </label>
          <p className="form-small">
            Your information stays with Five Lives. Manage or remove this
            request with your receipt.{' '}
            <Link href="/privacy">Read the data notice</Link>.
          </p>
          <Button
            type="submit"
            className="beginning-button"
            disabled={
              busy || !consent || !adult || (kind === 'experience' && !price)
            }
          >
            {busy
              ? 'Saving…'
              : kind === 'letter'
                ? 'Keep me in the loop'
                : 'Register my interest'}
            <ArrowRight />
          </Button>
        </form>
      )}
      {message && (
        <p className="form-small" role="status">
          <Check size={16} /> {message}
        </p>
      )}
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
