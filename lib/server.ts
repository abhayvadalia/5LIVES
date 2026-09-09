import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '@/app/chatgpt-auth';
export function database(): D1Database {
  const db = (env as unknown as { DB?: D1Database }).DB;
  if (!db) throw new Error('DATABASE_UNAVAILABLE');
  return db;
}
export const privateHeaders = {
  'Cache-Control': 'private, no-store',
  Vary: 'Cookie',
  'X-Content-Type-Options': 'nosniff',
};
export function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: privateHeaders });
}
export async function authenticated() {
  return getChatGPTUser();
}
export async function body(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin || origin !== new URL(request.url).origin)
    throw new Error('ORIGIN');
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    throw new Error('INPUT');
  if (Number(request.headers.get('content-length') ?? 0) > 12000)
    throw new Error('INPUT');
  const raw = await request.text();
  if (raw.length > 12000) throw new Error('INPUT');
  return JSON.parse(raw);
}
export function failure(error: unknown) {
  if (error instanceof Error && error.message === 'ORIGIN')
    return json(
      {
        error:
          'This request could not be verified. Reload this page and try again.',
      },
      403,
    );
  if (
    error instanceof SyntaxError ||
    (error instanceof Error && error.message === 'INPUT')
  )
    return json(
      { error: 'Check the information you entered and try again.' },
      400,
    );
  return json(
    {
      error:
        'Saving is temporarily unavailable. Your current input is still here; please try again.',
    },
    503,
  );
}
