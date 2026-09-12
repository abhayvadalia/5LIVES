import { Header, Footer } from '@/components/five-lives/shell';
import { MyBeginning } from '@/components/five-lives/my-beginning';
export const metadata = {
  title: 'Your one beginning',
  robots: { index: false, follow: false },
};
export default function MyFivePage() {
  return (
    <>
      <Header />
      <main id="main" className="page-width beginning-page">
        <MyBeginning />
      </main>
      <Footer />
    </>
  );
}
