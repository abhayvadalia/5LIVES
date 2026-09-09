import { authenticated, json } from '@/lib/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  const user = await authenticated();
  return json({ signedIn: !!user, displayName: user?.displayName ?? null });
}
