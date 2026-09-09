import { Header, Footer } from '@/components/five-lives/shell';
import { authenticated, database } from '@/lib/server';
import { AdminQueue } from '@/components/five-lives/admin-queue';
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Operator interest queue',
  robots: { index: false, follow: false },
};
export default async function AdminPage() {
  const user = await authenticated();
  let status = 'denied';
  let rows: {
    id: string;
    option_id: string;
    city: string;
    availability: string;
    status: string;
    updated_at: string;
  }[] = [];
  if (user) {
    try {
      const db = database();
      const role = await db
        .prepare(
          "SELECT user_id FROM operators WHERE user_id=? AND role IN ('owner','operator')",
        )
        .bind(user.userId)
        .first();
      if (role) {
        status = 'ready';
        rows = (
          await db
            .prepare(
              'SELECT id,option_id,city,availability,status,updated_at FROM interests ORDER BY updated_at DESC LIMIT 100',
            )
            .all<(typeof rows)[number]>()
        ).results;
      }
    } catch {
      status = 'unavailable';
    }
  }
  return (
    <>
      <Header />
      <main id="main" className="page-width content-page">
        <p className="eyebrow">FIVE LIVES OPERATIONS</p>
        <h1>
          {status === 'ready'
            ? 'Interest to possibility.'
            : status === 'unavailable'
              ? 'Queue temporarily unavailable.'
              : 'Operator access required.'}
        </h1>
        {status === 'ready' ? (
          <>
            <p className="page-intro">
              The 100 most recently updated requests. Review interest without
              promising a date. Private scenes and contact data are excluded
              from this queue.
            </p>
            <AdminQueue rows={rows} />
          </>
        ) : (
          <p className="page-intro">
            {status === 'unavailable'
              ? 'Please reconnect and reload this page.'
              : 'This account has not been assigned an operator role. The first person to sign in is never automatically an operator.'}
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}
