import { Header, Footer } from '@/components/five-lives/shell';
import { ParticipantHome } from '@/components/five-lives/participant-home';
export const metadata = {
  title: 'Your home',
  robots: { index: false, follow: false },
};
export default function AppPage() {
  return (
    <>
      <Header />
      <main id="main" className="page-width content-page">
        <ParticipantHome />
      </main>
      <Footer />
    </>
  );
}
