import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
function harness() {
  const events: Record<string, (e: unknown) => void> = {};
  const captured: string[][] = [];
  const context = {
    self: {
      location: { origin: 'https://five.test' },
      addEventListener: (name: string, fn: (e: unknown) => void) =>
        (events[name] = fn),
      clients: { claim: async () => {} },
      skipWaiting: () => {},
    },
    caches: {
      open: async () => ({
        addAll: async (paths: string[]) => captured.push(paths),
      }),
      keys: async () => [],
      match: async () => new Response('offline'),
    },
    fetch: async () => new Response('network'),
    URL,
    Response,
  };
  vm.runInNewContext(readFileSync('public/sw.js', 'utf8'), context);
  return { events, captured };
}
void test('service worker install caches only neutral fallback and app icons', async () => {
  const h = harness();
  let pending: Promise<unknown> = Promise.resolve();
  h.events.install({ waitUntil: (p: Promise<unknown>) => (pending = p) });
  await pending;
  assert.deepEqual(Array.from(h.captured[0]), [
    '/offline.html',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
  ]);
});
void test('private API and write requests bypass service-worker caching', () => {
  const h = harness();
  for (const url of [
    '/api/profile',
    '/api/interests',
    '/api/admin/interests',
  ]) {
    let handled = false;
    h.events.fetch({
      request: { url: `https://five.test${url}`, method: 'GET', mode: 'cors' },
      respondWith: () => (handled = true),
    });
    assert.equal(handled, false);
  }
  let handled = false;
  h.events.fetch({
    request: {
      url: 'https://five.test/api/profile',
      method: 'PUT',
      mode: 'cors',
    },
    respondWith: () => (handled = true),
  });
  assert.equal(handled, false);
});
