import Link from 'next/link';
import { LegalPage } from '@/components/five-lives/legal-page';
export const metadata = { title: 'Grievance and support' };
export default function GrievancePage() {
  return (
    <LegalPage title="Grievance and support.">
      <h2>For your interest request</h2>
      <p>
        Use <Link href="/requests">My requests</Link> to access or correct your
        information, withdraw update consent, or erase a submitted request. Use
        the management link in your downloaded receipt if you are on another
        device.
      </p>
      <h2>For browser-saved choices</h2>
      <p>
        <Link href="/app/settings">Your space</Link> lets you clear your saved
        aspirations, draft and private note.
      </p>
      <h2>Support arrangements before launch</h2>
      <p>
        A named Grievance Officer, dedicated contact address and published
        response process are still being arranged. This page does not represent
        an active grievance desk. Paid membership and member posting are not
        open.
      </p>
      <h2>Member content</h2>
      <p>
        Private member threads and profiles will remain closed until reporting,
        review and takedown procedures and a responsible contact are in place.
        No member content is published by this version.
      </p>
    </LegalPage>
  );
}
