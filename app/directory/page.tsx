import Link from 'next/link';
import { Header, Footer } from '@/components/five-lives/shell';
export const metadata = {
  title: 'The little black book',
  robots: { index: false, follow: false },
};
export default function DirectoryPage() {
  return (
    <>
      <Header />
      <main id="main" className="page-width beginning-page">
        <section className="editorial-hero">
          <p className="eyebrow">THE LITTLE BLACK BOOK · MEMBERSHIP</p>
          <h1>
            The right person.
            <br />
            <em>By name.</em>
          </h1>
          <p className="editorial-intro">
            A place for teachers, coaches, studios and grounds we have checked
            in Kolkata. Book directly. We take no commission, ever.
          </p>
        </section>
        <section className="founding-note">
          <h2>The book is not open yet.</h2>
          <p>
            We have not published any coach records. Contact details will be
            available only to paid members after membership and verification are
            ready.
          </p>
        </section>
        <section className="legal-copy">
          <h2>The standard we will use</h2>
          <ul>
            <li>
              Confirm the person’s identity, contact details and permission to
              be listed.
            </li>
            <li>
              Check relevant qualifications and experience for the activity they
              teach.
            </li>
            <li>
              Speak to the provider about beginner suitability, access,
              location, prices and cancellation terms.
            </li>
            <li>
              Record what was checked, by whom and when. Recheck changed
              details.
            </li>
            <li>
              Remove a listing while a credible safety or accuracy concern is
              reviewed.
            </li>
          </ul>
          <p>
            This is our planned verification standard. It is not a claim that a
            provider has already passed it.
          </p>
          <h2>Your own details stay private</h2>
          <p>
            Member names, profiles and contact details are not published here.
            When circles open, exchanging contact details will require both
            people’s agreement.
          </p>
          <Link href="/membership" className="beginning-button">
            Explore membership
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
