import test from 'node:test';
import assert from 'node:assert/strict';
import { storyProgress, storyChapter } from '../lib/motion';
import { questions } from '../lib/questions';
import { categories } from '../lib/catalog';
void test('scroll narrative handles overscroll and the end of the sticky section', () => {
  assert.equal(storyProgress(200, 2400, 800), 0);
  assert.equal(storyProgress(-800, 2400, 800), 0.5);
  assert.equal(storyProgress(-3000, 2400, 800), 1);
  assert.equal(storyChapter(1, 3), 2);
  assert.equal(storyChapter(-1, 3), 0);
});
void test('short narrative cannot divide by zero', () => {
  assert.equal(storyProgress(0, 600, 600), 0);
  assert.equal(storyProgress(-5, 500, 600), 1);
});
void test('every accepted category has a question without changing catalog ownership', () => {
  assert.deepEqual(
    Object.keys(questions).sort(),
    categories.map((c) => c.id).sort(),
  );
  for (const category of categories)
    assert.ok(questions[category.id].question.endsWith('?'));
});
