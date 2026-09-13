import test from 'node:test';
import assert from 'node:assert/strict';
import { FIVE_KEY, readFive, saveFive, validateFive } from '../lib/beginnings';
import { validateCapture } from '../lib/interest-capture';
const store = () => {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
  };
};
const five = {
  version: 2 as const,
  lives: ['a singer', 'a gardener', 'a teacher', 'a walker', 'a painter'],
  first: 0,
  completed: [],
  note: '',
};
void test('one active life survives reload and completed lives cannot remain active', () => {
  const storage = store();
  const saved = saveFive(storage, five, 0);
  assert.deepEqual(readFive(storage), saved);
  assert.throws(() =>
    saveFive(storage, { ...five, completed: [0] }, saved.revision),
  );
  const completed = saveFive(
    storage,
    { ...five, first: null, completed: [0] },
    saved.revision,
  );
  const next = saveFive(
    storage,
    { ...completed, first: 1 },
    completed.revision,
  );
  assert.equal(next.first, 1);
  assert.deepEqual(next.completed, [0]);
  assert.equal(next.lives.length, 5);
});
void test('stale browser updates and invalid saved content are rejected', () => {
  const storage = store();
  saveFive(storage, five, 0);
  assert.throws(() => saveFive(storage, { ...five, note: 'stale' }, 0));
  storage.setItem(FIVE_KEY, '{"version":2}');
  assert.throws(() => readFive(storage));
  assert.throws(() => validateFive({ ...five, revision: 1, lives: [''] }));
});
void test('capture requires adult confirmation, specific consent and a real price band without assigning a city', () => {
  const value = {
    kind: 'experience',
    subject: 'song',
    email: 'Person@example.com',
    expectedPrice: '₹2–5k',
    adult: true,
    consentRequest: true,
    consentUpdates: false,
  };
  assert.equal(validateCapture(value).email, 'person@example.com');
  assert.equal(validateCapture(value).consentUpdates, false);
  assert.equal(validateCapture(value).city, '');
  assert.equal(validateCapture({ ...value, city: 'Kolkata' }).city, '');
  for (const invalid of [
    { adult: false },
    { consentRequest: false },
    { expectedPrice: '' },
    { subject: 'unknown' },
    { email: 'invalid' },
    { website: 'bot.example' },
  ])
    assert.throws(() => validateCapture({ ...value, ...invalid }));
});

void test('newsletter requests record the homepage source without accepting arbitrary source URLs', () => {
  const letter = {
    kind: 'letter',
    subject: 'first-letter',
    email: 'reader@example.com',
    adult: true,
    consentRequest: true,
    consentUpdates: false,
  };
  assert.equal(validateCapture(letter).source, '/letter');
  assert.equal(validateCapture({ ...letter, source: '/' }).source, '/');
  assert.throws(() =>
    validateCapture({ ...letter, source: 'https://other.example' }),
  );
  assert.throws(() =>
    validateCapture({
      ...letter,
      kind: 'membership',
      subject: 'founding-membership',
      source: '/',
    }),
  );
});
