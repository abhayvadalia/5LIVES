import { Header, Footer } from '@/components/five-lives/shell';
import Link from 'next/link';
export const metadata = { title: 'Your data' };
export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" className="page-width content-page narrow-page">
        <p className="eyebrow">YOUR CHOICES, IN YOUR BROWSER</p>
        <h1>
          A little clarity
          <br />
          <em>about your data.</em>
        </h1>
        <div className="prose">
          <h2>No login needed</h2>
          <p>
            Five Lives opens directly from its link. You can explore and keep
            your choices without creating an account.
          </p>
          <h2>Drafts and saved lists</h2>
          <p>
            Your draft stays in browser storage for seven days after an edit.
            Pressing “Save my five” keeps a separate saved list until you clear
            it or remove this site’s browser data. Lists do not sync across
            devices. Your optional scene is only stored if you choose to keep
            it.
          </p>
          <h2>What is shared?</h2>
          <p>
            This version does not send your choices or scene to Five Lives,
            teachers, coaches or experience guides. Saving your five is not an
            interest request or booking. The hosting service handles ordinary
            page requests and may process technical request information to
            operate the site.
          </p>
          <h2>Your browser, your space</h2>
          <p>
            Someone using the same browser profile can view your saved list. Use
            Your space to clear your draft and saved choices, or remove the
            site’s data in your browser settings. Private browsing or blocked
            storage can prevent saving.
          </p>
          <h2>Offline</h2>
          <p>
            The app cache contains neutral fallback content and icons. Your
            chosen list uses browser storage separately. New pages still require
            a connection.
          </p>
          <h2>Earlier private previews</h2>
          <p>
            Choices saved to an account in an earlier private preview remain
            protected on the server; this browser-only version does not load or
            delete them. For those earlier test records, contact the person who
            shared the preview.
          </p>
          <Link href="/app/settings" className="primary-action">
            Manage my browser choices
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
