import { findOption } from './catalog';
export const PRICE_BANDS = ['₹2–5k', '₹5–10k', '₹10–20k', '₹20k+'] as const;
export const CAPTURE_RECEIPTS_KEY = '5lives.requests.v1';
export type Capture = {
  kind: 'membership' | 'letter' | 'experience';
  subject: string;
  email: string;
  city: string;
  expectedPrice: string;
  consentUpdates: boolean;
  adult: true;
  consentRequest: true;
  source: string;
};
export function validateCapture(value: unknown): Capture {
  const v = value as Record<string, unknown>;
  if (
    !v ||
    !['membership', 'letter', 'experience'].includes(String(v.kind)) ||
    v.adult !== true ||
    v.consentRequest !== true ||
    typeof v.consentUpdates !== 'boolean' ||
    typeof v.email !== 'string' ||
    v.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()) ||
    typeof v.subject !== 'string' ||
    v.subject.length > 160 ||
    !v.subject.trim() ||
    (v.kind === 'experience' &&
      !PRICE_BANDS.includes(v.expectedPrice as (typeof PRICE_BANDS)[number])) ||
    v.website ||
    (v.source !== undefined && !(v.kind === 'letter' && v.source === '/'))
  )
    throw new Error('INPUT');
  if (
    (v.kind === 'membership' && v.subject !== 'founding-membership') ||
    (v.kind === 'letter' && v.subject !== 'first-letter') ||
    (v.kind === 'experience' && !findOption(v.subject))
  )
    throw new Error('INPUT');
  return {
    kind: v.kind as Capture['kind'],
    subject: v.subject.trim(),
    email: v.email.trim().toLowerCase(),
    city: '',
    expectedPrice: v.kind === 'experience' ? String(v.expectedPrice) : '',
    consentUpdates: v.consentUpdates,
    adult: true,
    consentRequest: true,
    source:
      v.source === '/'
        ? '/'
        : v.kind === 'experience'
          ? `/experiences/${v.subject}`
          : `/${v.kind}`,
  };
}
export type CaptureReceipt = {
  id: string;
  token: string;
  kind: string;
  subject: string;
  createdAt: string;
};
