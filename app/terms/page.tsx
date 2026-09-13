import { LegalPage } from '@/components/five-lives/legal-page';
export const metadata = { title: 'Terms' };
export default function TermsPage() {
  return (
    <LegalPage title="Terms for this opening.">
      <h2>What is available</h2>
      <p>
        Five Lives is a pre-launch project for adults aged 18 and over. You can
        complete the free exercise, keep choices in your browser and join
        waitlists for future openings.
      </p>
      <h2>Joining a waitlist</h2>
      <p>
        Submitting a form does not create a paid membership or book an
        experience. Hosts, dates, capacity and availability are not confirmed
        until explicitly published. No payment or recurring mandate is collected
        by this version.
      </p>
      <h2>Membership launch</h2>
      <p>
        Membership is launching soon. Full details, including billing, renewal
        and cancellation terms, will be shared before enrolment opens.
      </p>
      <h2>Coaches and hosted experiences</h2>
      <p>
        Five Lives takes no commission from coaches. Direct coaching
        arrangements will be agreed with and paid to the provider. Five Lives
        produced experiences will have their own inclusions, total prices,
        access information and cancellation terms.
      </p>
      <h2>Your use of the site</h2>
      <p>
        Do not submit someone else’s contact information without permission, use
        automated forms to send unwanted requests, or try to access someone
        else’s receipt or private records. Keep your management receipt private.
      </p>
      <h2>Before paid enrolment</h2>
      <p>
        The legal entity, registered address, GSTIN, customer-care details and
        named Grievance Officer must be published before paid enrolment opens.
        These pre-launch terms do not claim that those arrangements are already
        in place.
      </p>
    </LegalPage>
  );
}
