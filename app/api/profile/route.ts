import { authenticated, body, database, failure, json } from '@/lib/server';
import { validateIntake } from '@/lib/intake';
export const dynamic = 'force-dynamic';
export async function GET() {
  const user = await authenticated();
  if (!user) return json({ error: 'Sign in to load your saved choices.' }, 401);
  try {
    const profile = await database()
      .prepare(
        'SELECT choices, active, scene, revision, updated_at FROM profiles WHERE user_id = ?',
      )
      .bind(user.userId)
      .first<{
        choices: string;
        active: string | null;
        scene: string;
        revision: number;
        updated_at: string;
      }>();
    return json({
      profile: profile
        ? {
            choices: JSON.parse(profile.choices),
            active: profile.active,
            scene: profile.scene,
            revision: profile.revision,
            updatedAt: profile.updated_at,
          }
        : null,
    });
  } catch (e) {
    return failure(e);
  }
}
export async function PUT(request: Request) {
  const user = await authenticated();
  if (!user)
    return json(
      { error: 'Sign in again to save. Your current choices are still here.' },
      401,
    );
  try {
    const input = await body(request);
    let intake;
    try {
      intake = validateIntake(input);
    } catch (e) {
      return json({ error: (e as Error).message }, 400);
    }
    if (!Number.isSafeInteger(input.revision) || input.revision < 0)
      return json({ error: 'Reload your saved choices before saving.' }, 400);
    const now = new Date().toISOString();
    const db = database();
    const result =
      input.revision === 0
        ? await db
            .prepare(
              'INSERT INTO profiles (user_id,choices,active,scene,revision,updated_at) VALUES (?,?,?,?,1,?) ON CONFLICT(user_id) DO NOTHING',
            )
            .bind(
              user.userId,
              JSON.stringify(intake.choices),
              intake.active,
              intake.scene,
              now,
            )
            .run()
        : await db
            .prepare(
              'UPDATE profiles SET choices=?, active=?, scene=?, revision=revision+1, updated_at=? WHERE user_id=? AND revision=?',
            )
            .bind(
              JSON.stringify(intake.choices),
              intake.active,
              intake.scene,
              now,
              user.userId,
              input.revision,
            )
            .run();
    if (result.meta.changes === 0)
      return json(
        {
          error:
            'Your saved list has changed elsewhere. Review the latest list before replacing it.',
        },
        409,
      );
    return json({ revision: input.revision + 1, updatedAt: now });
  } catch (e) {
    return failure(e);
  }
}
