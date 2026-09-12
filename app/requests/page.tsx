import { Header, Footer } from '@/components/five-lives/shell';
import { RequestManager } from '@/components/five-lives/request-manager';
export const metadata = {
  title: 'Manage your requests',
  robots: { index: false, follow: false },
};
export default function RequestsPage() {
  return (
    <>
      <Header />
      <main id="main" className="page-width beginning-page">
        <RequestManager />
      </main>
      <Footer />
    </>
  );
}
