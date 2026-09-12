import Link from 'next/link';
import { LegalPage } from '@/components/five-lives/legal-page';
export const metadata = { title: 'About Five Lives' };
export default function HelpPage() {
  return (
    <LegalPage title="Make room for one thing.">
      <h2>Begin with imagination</h2>
      <p>
        Name five other lives you would enjoy living. They can be contradictory,
        unfinished or unexpected. Then choose one to begin. There are no fixed
        categories to fit yourself into.
      </p>
      <h2>Find a little company</h2>
      <p>
        Five Lives is bringing together people in Kolkata who want to begin
        something they have imagined. Membership will help with circles and
        introductions. Hosted experiences will help you make something, finish
        it and take it home.
      </p>
      <h2>What is ready today</h2>
      <p>
        The exercise, browser-saved choices and interest lists are open. The
        letter, membership and hosted experiences are being prepared. Dates,
        hosts and prices will be confirmed before bookings open.
      </p>
      <h2>No commission</h2>
      <p>
        We give away the contacts. We charge for the company. Direct coaching
        fees go to the coach; produced Five Lives experiences are priced
        separately.
      </p>
      <Link href="/#exercise" className="beginning-button">
        Find my five
      </Link>
    </LegalPage>
  );
}
