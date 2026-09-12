import Link from 'next/link';
import { LegalPage } from '@/components/five-lives/legal-page';
export const metadata = { title: 'Privacy and your data' };
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy and your data.">
      <h2>The exercise stays in your browser</h2>
      <p>
        No login is needed. Exercise drafts expire seven days after your last
        edit. Saved aspirations, your chosen beginning and notes stay in this
        browser until you clear them. They are not sent to Five Lives by the
        exercise. Anyone using this browser profile may be able to read them.
      </p>
      <h2>When you register interest</h2>
      <p>
        Five Lives stores your email address, Kolkata as your city, the
        membership, letter invitation or experience you selected, and an
        experience price range if supplied. We also record the time, form source
        and consent choices so we can respond to the request you made.
      </p>
      <p>
        The required checkbox covers only that opening or letter invitation. The
        optional checkbox covers other Five Lives openings. Both start unticked.
        Joining a letter interest list is not newsletter subscription consent; a
        separate confirmation will be needed before the fortnightly letter
        begins.
      </p>
      <h2>Who can use it</h2>
      <p>
        Interest information is held for the Five Lives team to plan and respond
        to openings. It is not published or passed to a coach, teacher or other
        member. Hosting and database services process it to operate this site.
        No payment details are collected. We have not added advertising trackers
        or an analytics service.
      </p>
      <h2>Access, correction and deletion</h2>
      <p>
        After submitting, keep your request receipt.{' '}
        <Link href="/requests">My requests</Link> lets you view and correct your
        email, withdraw optional update consent, or delete the request and its
        personal details. Deleting a request also withdraws permission to
        contact you about it. The downloaded receipt contains a private
        management link: keep it private.
      </p>
      <p>
        Your browser choices are separate. Use{' '}
        <Link href="/app/settings">Your space</Link> to clear them. Clearing
        browser data alone does not erase an interest request already sent to
        the server. Remove the request first, or keep its downloaded receipt.
      </p>
      <h2>Retention and service information</h2>
      <p>
        Interest requests are retained until removed or until our periodic
        cleanup removes old requests. Requests older than 180 days are removed
        during interest-list maintenance. Technical request information may be
        processed by the host to keep the service working. Short-lived, hashed
        network identifiers limit repeated submissions; raw IP addresses are not
        stored in our interest database.
      </p>
      <h2>Pre-launch contact details</h2>
      <p>
        The business address and dedicated support and grievance contacts have
        not yet been published. Paid membership and member posting remain
        closed. Self-service access, correction and deletion for interest
        requests are available through your receipt.
      </p>
      <h2>Earlier previews</h2>
      <p>
        Records saved to an account in an earlier private preview remain
        protected separately. This public exercise does not load or delete those
        test records. Contact the person who shared that private preview about
        them.
      </p>
    </LegalPage>
  );
}
