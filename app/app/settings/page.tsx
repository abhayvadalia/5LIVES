import { Header, Footer } from '@/components/five-lives/shell';
import { AccountSettings } from '@/components/five-lives/account-settings';
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Your space',
  robots: { index: false, follow: false },
};
export default function SettingsPage() {
  return (
    <>
      <Header />
      <main id="main" className="page-width content-page">
        <AccountSettings />
      </main>
      <Footer />
    </>
  );
}
