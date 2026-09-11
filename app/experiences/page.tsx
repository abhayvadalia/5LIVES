import { Header, Footer } from '@/components/five-lives/shell';
import { LifePortrait } from '@/components/five-lives/life-portrait';
import { CatalogView } from '@/components/five-lives/catalog-view';
export const metadata = { title: 'Explore experiences' };
export default function ExperiencesPage() {
  return (
    <>
      <Header />
      <main id="main" className="page-width content-page">
        <div className="interior-heading">
          <div>
            <p className="eyebrow">A FEW PLACES TO BEGIN</p>
            <h1>
              Which part of you
              <br />
              <em>is curious?</em>
            </h1>
            <p className="page-intro">
              The right lesson, the right guidance, a moment you’ve wanted to
              live. Explore the possibilities we’re bringing together to help
              you begin.
            </p>
          </div>
          <LifePortrait />
        </div>
        <CatalogView />
      </main>
      <Footer />
    </>
  );
}
