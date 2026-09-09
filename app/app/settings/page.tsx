import { Header, Footer } from '@/components/five-lives/shell';
import { AccountSettings } from '@/components/five-lives/account-settings';
import { getChatGPTUser } from '@/app/chatgpt-auth';
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Account & privacy',
  robots: { index: false, follow: false },
};
export default async function SettingsPage() {
  const user = await getChatGPTUser();
  return (
    <>
      <Header />
      <main id="main" className="page-width content-page">
        <AccountSettings name={user?.displayName ?? null} />
      </main>
      <Footer />
    </>
  );
}
