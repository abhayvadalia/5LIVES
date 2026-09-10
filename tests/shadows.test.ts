import test from 'node:test';
import assert from 'node:assert/strict';
import { shadowMotion } from '../lib/shadow-motion';

void test('the scroll reveal starts with one person and ends with five clear selves', () => {
  const start = shadowMotion(0);
  const end = shadowMotion(1);
  assert.equal(start.split, 0);
  assert.equal(start.shadowOpacity, 0);
  assert.equal(start.openingOpacity, 1);
  assert.equal(end.split, 1);
  assert.equal(end.shadowOpacity, 1);
  assert.equal(end.shadowBlur, 0);
  assert.equal(end.finalOpacity, 1);
  assert.equal(end.finalBlur, 0);
  assert.equal(end.openingOpacity, 0);
});

void test('overscroll preserves the endpoint scenes and separation never reverses', () => {
  assert.deepEqual(shadowMotion(-1), shadowMotion(0));
  assert.deepEqual(shadowMotion(2), shadowMotion(1));
  let previous = 0;
  for (let n = 0; n <= 100; n++) {
    const scene = shadowMotion(n / 100);
    assert.ok(scene.split >= previous);
    assert.ok(Object.values(scene).every(Number.isFinite));
    previous = scene.split;
  }
});
