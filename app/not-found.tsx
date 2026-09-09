import Link from 'next/link';
import { Header, Footer } from '@/components/five-lives/shell';
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="page-width content-page" id="main">
        <p className="eyebrow">A DIFFERENT PLACE TO BEGIN</p>
        <h1>That page isn’t here.</h1>
        <p className="page-intro">
          The link may have changed. Your possibilities are still waiting.
        </p>
        <Link className="primary-action" href="/experiences">
          Explore experiences
        </Link>
      </main>
      <Footer />
    </>
  );
}
