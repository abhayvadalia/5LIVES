import test from 'node:test';
import assert from 'node:assert/strict';
import { categories } from '../lib/catalog';
import {
  emptyIntake,
  validateIntake,
  updateChoice,
  serializeDraft,
  parseDraft,
  RETENTION_MS,
} from '../lib/intake';
const allNone = () => ({
  choices: Object.fromEntries(categories.map((c) => [c.id, 'none'])),
  active: null,
  scene: '',
});
void test('a complete all-none list is valid without an active choice', () => {
  assert.deepEqual(validateIntake(allNone()), allNone());
});
void test('each category requires an explicit response and cannot borrow another category option', () => {
  assert.throws(() => validateIntake(emptyIntake()));
  assert.throws(() =>
    validateIntake({
      ...allNone(),
      choices: { ...allNone().choices, art: 'cricket' },
    }),
  );
});
void test('a single non-empty answer still requires an explicit starting choice', () => {
  const intake = {
    ...allNone(),
    choices: { ...allNone().choices, sports: 'cricket' },
  };
  assert.throws(() => validateIntake(intake));
  assert.equal(
    validateIntake({ ...intake, active: 'cricket' }).active,
    'cricket',
  );
  assert.throws(() => validateIntake({ ...intake, active: 'song' }));
});
void test('replacing the active category clears its starting point and preserves the other answers', () => {
  const current = validateIntake({
    ...allNone(),
    choices: { ...allNone().choices, sports: 'cricket' },
    active: 'cricket',
  });
  const changed = updateChoice(current, 'sports', 'badminton');
  assert.equal(changed.active, null);
  assert.equal(changed.choices.art, 'none');
});
void test('anonymous scene is excluded unless explicitly saved', () => {
  const intake = { ...allNone(), scene: 'A private scene' };
  assert.equal(parseDraft(serializeDraft(intake, false))?.intake.scene, '');
  assert.equal(
    parseDraft(serializeDraft(intake, true))?.intake.scene,
    intake.scene,
  );
});
void test('draft expires exactly at seven days and corrupt or future schemas are ignored', () => {
  const now = 1000;
  const raw = serializeDraft(allNone(), false, now);
  assert.ok(parseDraft(raw, now + RETENTION_MS - 1));
  assert.equal(parseDraft(raw, now + RETENTION_MS), null);
  assert.equal(parseDraft('{bad'), null);
  assert.equal(parseDraft('{"schemaVersion":2}'), null);
});
void test('scene length and unrecognized categories are rejected', () => {
  assert.throws(() =>
    validateIntake({ ...allNone(), scene: 'x'.repeat(1201) }),
  );
  assert.throws(() =>
    validateIntake({
      ...allNone(),
      choices: { ...allNone().choices, sixth: 'none' },
    }),
  );
});
