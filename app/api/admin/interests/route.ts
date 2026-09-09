import { authenticated, body, database, failure, json } from '@/lib/server';
export const dynamic = 'force-dynamic';
export async function PATCH(request: Request) {
  const user = await authenticated();
  if (!user) return json({ error: 'Sign in required.' }, 401);
  try {
    const db = database();
    const operator = await db
      .prepare(
        "SELECT user_id FROM operators WHERE user_id=? AND role IN ('owner','operator')",
      )
      .bind(user.userId)
      .first();
    if (!operator) return json({ error: 'Operator access required.' }, 403);
    const input = await body(request);
    if (typeof input.id !== 'string')
      return json({ error: 'Select an interest request.' }, 400);
    const now = new Date().toISOString();
    const results = await db.batch([
      db
        .prepare(
          "INSERT INTO audit (id,actor_id,action,subject_id,created_at) SELECT ?,?,'interest.reviewing',id,? FROM interests WHERE id=? AND status='requested'",
        )
        .bind(crypto.randomUUID(), user.userId, now, input.id),
      db
        .prepare(
          "UPDATE interests SET status='reviewing',updated_at=? WHERE id=? AND status='requested'",
        )
        .bind(now, input.id),
    ]);
    return results[1].meta.changes
      ? json({ reviewing: true })
      : json(
          {
            error:
              'This request is no longer awaiting review. Reload the queue.',
          },
          409,
        );
  } catch (e) {
    return failure(e);
  }
}
