import { Header, Footer } from './shell';
export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main" className="page-width beginning-page legal-page">
        <p className="eyebrow">FIVE LIVES · PRE-LAUNCH · 12 SEPTEMBER 2026</p>
        <h1>{title}</h1>
        <div className="legal-copy">{children}</div>
      </main>
      <Footer />
    </>
  );
}
