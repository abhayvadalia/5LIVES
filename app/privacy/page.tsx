import { Header, Footer } from '@/components/five-lives/shell';
export const metadata = { title: 'Privacy in this preview' };
export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" className="page-width content-page narrow-page">
        <p className="eyebrow">PRIVATE PREVIEW · NOT A PUBLIC LAUNCH POLICY</p>
        <h1>
          A little clarity
          <br />
          about your data.
        </h1>
        <div className="prose">
          <h2>Local drafts</h2>
          <p>
            Your category choices can be kept in this browser for seven days
            after an edit. Your optional scene is excluded unless you explicitly
            choose to keep it here. Clear the draft from Account or your
            browser’s site-data settings.
          </p>
          <h2>Saved choices and interest</h2>
          <p>
            When signed in, pressing “Save my five” stores your choices and
            optional scene against your account on the server. An interest
            request stores the option, city, availability and its status. We do
            not collect your phone number or payment details in this preview.
          </p>
          <h2>Who can access it?</h2>
          <p>
            You can access your saved list and requests. Authorized operators
            can review interest requests for matching. Private scenes are not
            shown in the operator interest queue and are not permission for
            marketing or public sharing.
          </p>
          <h2>Offline and sign-out</h2>
          <p>
            The app’s offline cache contains only neutral fallback content and
            app icons. It does not cache account pages or API responses. Signing
            out from Account also clears the local draft on this device.
          </p>
          <h2>Before a public launch</h2>
          <p>
            Public sign-in, an approved retention schedule, a support contact,
            and account export/deletion workflows are still required. Use
            synthetic information when testing this private preview. Ask the
            person who shared it with you about removing test records.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
