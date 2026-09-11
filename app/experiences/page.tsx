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
              Specific, achievable experiences. A real moment to share, and
              something tangible to keep. Browse the possibilities we’re
              developing.
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
