'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { findOption } from '@/lib/catalog';
type Row = {
  id: string;
  option_id: string;
  city: string;
  availability: string;
  status: string;
  updated_at: string;
};
export function AdminQueue({ rows }: { rows: Row[] }) {
  const [items, setItems] = useState(rows);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  async function review(id: string) {
    setBusy(true);
    try {
      const r = await fetch('/api/admin/interests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const d = (await r.json()) as { error: string };
      if (!r.ok) throw new Error(d.error);
      setItems((current) =>
        current.map((i) => (i.id === id ? { ...i, status: 'reviewing' } : i)),
      );
      setMessage('Marked for review. An audit record was saved.');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Please try again.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      {items.length ? (
        <div className="offering-grid">
          {items.map((i) => (
            <article className="interest-card" key={i.id}>
              <span className="tag">{i.status}</span>
              <h3>{findOption(i.option_id)?.title}</h3>
              <p>
                {i.city} · {i.availability}
              </p>
              <p className="small-copy">
                Updated{' '}
                {new Date(i.updated_at).toLocaleDateString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                })}
              </p>
              {i.status === 'requested' && (
                <Button
                  variant="outline"
                  className="secondary-action"
                  disabled={busy}
                  onClick={() => void review(i.id)}
                >
                  Mark for review
                </Button>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p className="notice">No interest requests yet.</p>
      )}
      {message && (
        <p className="notice" role="status">
          {message}
        </p>
      )}
    </>
  );
}
