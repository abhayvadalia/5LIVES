import { Header, Footer } from '@/components/five-lives/shell';
import { Interests } from '@/components/five-lives/interests';
export const metadata = {
  title: 'My interest requests',
  robots: { index: false, follow: false },
};
export default function InterestsPage() {
  return (
    <>
      <Header />
      <main id="main" className="page-width content-page">
        <Interests />
      </main>
      <Footer />
    </>
  );
}
