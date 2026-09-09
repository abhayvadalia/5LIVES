'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="page-width content-page">
      <h1>We couldn’t open this page.</h1>
      <p className="page-intro">
        Please check your connection and try again. Your saved account choices
        are still on the server.
      </p>
      <button className="primary-action" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
