import { body, database, failure, json } from '@/lib/server';
import { validateCapture } from '@/lib/interest-capture';
export const dynamic = 'force-dynamic';
async function hash(value: string) {
  return Array.from(
    new Uint8Array(
      await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)),
    ),
  )
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('');
}
export async function POST(request: Request) {
  try {
    const input = validateCapture(await body(request));
    const db = database();
    // Cloudflare supplies this header in production. No raw IP is stored.
    const key = await hash(
      `five-lives-launch:${request.headers.get('CF-Connecting-IP') ?? 'local'}:${Math.floor(Date.now() / 86400000)}`,
    );
    const window = Math.floor(Date.now() / 3600000);
    const limited = await db
      .prepare(
        `INSERT INTO request_limits (key, window, count) VALUES (?, ?, 1) ON CONFLICT(key) DO UPDATE SET window = excluded.window, count = CASE WHEN request_limits.window = excluded.window THEN request_limits.count + 1 ELSE 1 END WHERE request_limits.window != excluded.window OR request_limits.count < 10`,
      )
      .bind(key, window)
      .run();
    if (!limited.meta.changes)
      return json(
        { error: 'Please wait an hour before sending another request.' },
        429,
      );
    const id = crypto.randomUUID();
    const token = crypto.randomUUID() + crypto.randomUUID();
    const createdAt = new Date().toISOString();
    await db.batch([
      db
        .prepare(
          `INSERT INTO launch_requests (id, token_hash, kind, subject, email, city, expected_price, consent_updates, consent_version, consent_updated_at, source, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(
          id,
          await hash(token),
          input.kind,
          input.subject,
          input.email,
          input.city,
          input.expectedPrice,
          input.consentUpdates ? 1 : 0,
          'launch-request-2026-09-14',
          createdAt,
          input.source,
          createdAt,
        ),
      db
        .prepare('DELETE FROM request_limits WHERE window < ?')
        .bind(window - 48),
      db
        .prepare('DELETE FROM launch_requests WHERE created_at < ?')
        .bind(new Date(Date.now() - 180 * 86400000).toISOString()),
    ]);
    return json(
      { id, token, kind: input.kind, subject: input.subject, createdAt },
      201,
    );
  } catch (error) {
    return failure(error);
  }
}
export async function DELETE(request: Request) {
  try {
    const input = await body(request);
    if (
      typeof input.id !== 'string' ||
      input.id.length > 60 ||
      typeof input.token !== 'string' ||
      input.token.length !== 72
    )
      throw new Error('INPUT');
    await database()
      .prepare('DELETE FROM launch_requests WHERE id = ? AND token_hash = ?')
      .bind(input.id, await hash(input.token))
      .run();
    return json({ removed: true });
  } catch (error) {
    return failure(error);
  }
}
export async function PATCH(request: Request) {
  try {
    const input = await body(request);
    if (
      typeof input.id !== 'string' ||
      input.id.length > 60 ||
      typeof input.token !== 'string' ||
      input.token.length !== 72
    )
      throw new Error('INPUT');
    const db = database();
    const tokenHash = await hash(input.token);
    const record = await db
      .prepare(
        'SELECT kind, subject, email, city, expected_price AS expectedPrice, consent_updates AS consentUpdates, created_at AS createdAt FROM launch_requests WHERE id = ? AND token_hash = ?',
      )
      .bind(input.id, tokenHash)
      .first();
    if (!record)
      return json(
        {
          error:
            'This request was removed, expired, or the receipt is not valid.',
        },
        404,
      );
    if (input.action === 'read') return json(record);
    if (input.action !== 'correct') throw new Error('INPUT');
    const corrected = validateCapture({
      ...record,
      email: input.email,
      consentUpdates: input.consentUpdates,
      adult: true,
      consentRequest: true,
    });
    await db
      .prepare(
        'UPDATE launch_requests SET email = ?, consent_updates = ?, consent_updated_at = ? WHERE id = ? AND token_hash = ?',
      )
      .bind(
        corrected.email,
        corrected.consentUpdates ? 1 : 0,
        new Date().toISOString(),
        input.id,
        tokenHash,
      )
      .run();
    return json({
      ...record,
      email: corrected.email,
      consentUpdates: corrected.consentUpdates ? 1 : 0,
    });
  } catch (error) {
    return failure(error);
  }
}
