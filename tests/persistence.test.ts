import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync } from 'node:fs';
const setup = () => {
  const db = new DatabaseSync(':memory:');
  for (const file of readdirSync('drizzle')
    .filter((f) => f.endsWith('.sql'))
    .sort())
    db.exec(readFileSync(`drizzle/${file}`, 'utf8'));
  return db;
};
void test('migration creates a durable profile shape and rejects duplicate identities', () => {
  const db = setup();
  db.prepare(
    'INSERT INTO profiles(user_id,choices,updated_at) VALUES(?,?,?)',
  ).run('person-a', '{}', 'today');
  assert.throws(() =>
    db
      .prepare('INSERT INTO profiles(user_id,choices,updated_at) VALUES(?,?,?)')
      .run('person-a', '{}', 'today'),
  );
  assert.equal(
    db.prepare('SELECT revision FROM profiles WHERE user_id=?').get('person-a')
      ?.revision,
    1,
  );
  db.close();
});
void test('optimistic revision permits one update and rejects the stale competing edit', () => {
  const db = setup();
  db.prepare(
    'INSERT INTO profiles(user_id,choices,updated_at) VALUES(?,?,?)',
  ).run('a', '{}', 'today');
  const update = db.prepare(
    'UPDATE profiles SET scene=?,revision=revision+1 WHERE user_id=? AND revision=?',
  );
  assert.equal(update.run('first', 'a', 1).changes, 1);
  assert.equal(update.run('stale', 'a', 1).changes, 0);
  assert.equal(
    db.prepare('SELECT scene FROM profiles WHERE user_id=?').get('a')?.scene,
    'first',
  );
  assert.equal(update.run('intruder', 'b', 2).changes, 0);
  db.close();
});
void test('interest uniqueness is per participant, option, and normalized city', () => {
  const db = setup();
  const insert = db.prepare(
    'INSERT INTO interests(id,user_id,option_id,city,city_key,availability,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)',
  );
  insert.run('1', 'a', 'cricket', 'Pune', 'pune', 'weekends', 'today', 'today');
  assert.throws(() =>
    insert.run(
      '2',
      'a',
      'cricket',
      'PUNE',
      'pune',
      'evenings',
      'today',
      'today',
    ),
  );
  insert.run('3', 'b', 'cricket', 'Pune', 'pune', 'weekends', 'today', 'today');
  assert.equal(db.prepare('SELECT count(*) AS n FROM interests').get()?.n, 2);
  db.close();
});
void test('operator access is not automatically created for the first profile', () => {
  const db = setup();
  db.prepare(
    'INSERT INTO profiles(user_id,choices,updated_at) VALUES(?,?,?)',
  ).run('first', '{}', 'today');
  assert.equal(db.prepare('SELECT count(*) AS n FROM operators').get()?.n, 0);
  db.close();
});
