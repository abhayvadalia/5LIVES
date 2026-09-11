import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BROWSER_PROFILE_KEY,
  readBrowserProfile,
  writeBrowserProfile,
} from '../lib/browser-profile';
import type { Intake } from '../lib/intake';
const intake: Intake = {
  choices: {
    sports: 'none',
    art: 'song',
    health: 'none',
    travel: 'none',
    tech: 'none',
  },
  active: 'song',
  scene: 'A private idea',
};
function storage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
  };
}
void test('saved choices persist only in the selected browser and exclude an unapproved scene', () => {
  const browser = storage();
  writeBrowserProfile(browser, intake, 0, false);
  assert.equal(readBrowserProfile(browser)?.active, 'song');
  assert.equal(readBrowserProfile(browser)?.scene, '');
  assert.equal(readBrowserProfile(storage()), null);
});
void test('scene is retained only with explicit opt-in and can be removed on a later save', () => {
  const browser = storage();
  writeBrowserProfile(browser, intake, 0, true);
  assert.equal(readBrowserProfile(browser)?.scene, 'A private idea');
  writeBrowserProfile(browser, intake, 1, false);
  assert.equal(readBrowserProfile(browser)?.scene, '');
});
void test('stale browser revisions cannot replace a newer list', () => {
  const browser = storage();
  writeBrowserProfile(browser, intake, 0, false);
  assert.throws(
    () => writeBrowserProfile(browser, intake, 0, true),
    /another tab/,
  );
  assert.equal(readBrowserProfile(browser)?.revision, 1);
});
void test('corrupt saved records and unavailable browser storage never report a successful save', () => {
  const browser = storage();
  browser.setItem(BROWSER_PROFILE_KEY, '{"schemaVersion":99}');
  assert.throws(() => readBrowserProfile(browser));
  const unavailable = {
    getItem: () => null,
    setItem: () => {
      throw new Error('Quota exceeded');
    },
  };
  assert.throws(
    () => writeBrowserProfile(unavailable, intake, 0, false),
    /Quota/,
  );
});
