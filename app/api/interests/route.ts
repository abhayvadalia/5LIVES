import { authenticated, body, database, failure, json } from '@/lib/server';
import { findOption } from '@/lib/catalog';
export const dynamic = 'force-dynamic';
export async function GET() {
  const user = await authenticated();
  if (!user) return json({ error: 'Sign in to view your requests.' }, 401);
  try {
    return json({
      interests: (
        await database()
          .prepare(
            'SELECT id, option_id, city, availability, status, updated_at FROM interests WHERE user_id=? ORDER BY updated_at DESC',
          )
          .bind(user.userId)
          .all()
      ).results,
    });
  } catch (e) {
    return failure(e);
  }
}
export async function POST(request: Request) {
  const user = await authenticated();
  if (!user) return json({ error: 'Sign in to express interest.' }, 401);
  try {
    const input = await body(request);
    if (
      typeof input.optionId !== 'string' ||
      !findOption(input.optionId) ||
      typeof input.city !== 'string' ||
      input.city.trim().length < 2 ||
      input.city.length > 80 ||
      typeof input.availability !== 'string' ||
      input.availability.trim().length < 3 ||
      input.availability.length > 400
    )
      return json(
        {
          error:
            'Choose a possibility, city (2–80 characters), and practical availability (3–400 characters).',
        },
        400,
      );
    const db = database();
    const profile = await db
      .prepare('SELECT choices FROM profiles WHERE user_id=?')
      .bind(user.userId)
      .first<{ choices: string }>();
    if (
      !profile ||
      !Object.values(JSON.parse(profile.choices)).includes(input.optionId)
    )
      return json(
        {
          error:
            'Save this possibility in your five before requesting a match.',
        },
        400,
      );
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    await db
      .prepare(
        "INSERT INTO interests (id,user_id,option_id,city,city_key,availability,status,created_at,updated_at) VALUES (?,?,?,?,?,?,'requested',?,?) ON CONFLICT(user_id,option_id,city_key) DO UPDATE SET availability=excluded.availability,status=CASE WHEN interests.status='withdrawn' THEN 'requested' ELSE interests.status END,updated_at=excluded.updated_at",
      )
      .bind(
        id,
        user.userId,
        input.optionId,
        input.city.trim(),
        input.city
          .trim()
          .normalize('NFKC')
          .toLocaleLowerCase('en-IN')
          .replace(/\s+/g, ' '),
        input.availability.trim(),
        now,
        now,
      )
      .run();
    return json({ saved: true });
  } catch (e) {
    return failure(e);
  }
}
export async function PATCH(request: Request) {
  const user = await authenticated();
  if (!user) return json({ error: 'Sign in to withdraw a request.' }, 401);
  try {
    const input = await body(request);
    if (typeof input.id !== 'string')
      return json({ error: 'Choose a request to withdraw.' }, 400);
    const result = await database()
      .prepare(
        "UPDATE interests SET status='withdrawn',updated_at=? WHERE id=? AND user_id=?",
      )
      .bind(new Date().toISOString(), input.id, user.userId)
      .run();
    return result.meta.changes
      ? json({ withdrawn: true })
      : json({ error: 'Request not found.' }, 404);
  } catch (e) {
    return failure(e);
  }
}
