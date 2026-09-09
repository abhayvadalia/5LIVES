import Link from 'next/link';
import { Header, Footer } from '@/components/five-lives/shell';
import { chatGPTSignInPath, getChatGPTUser } from '@/app/chatgpt-auth';
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Save your five',
  robots: { index: false, follow: false },
};
export default async function SignInPage() {
  const user = await getChatGPTUser();
  return (
    <>
      <Header />
      <main id="main" className="page-width content-page narrow-page">
        <p className="eyebrow">KEEP YOUR POSSIBILITIES CLOSE</p>
        <h1>
          Your five,
          <br />
          wherever you are.
        </h1>
        <p className="page-intro">
          Sign in to save your list and resume it on another device. We’ll ask
          you to review a local draft before replacing a saved list.
        </p>
        <section className="soft-panel">
          <h2>{user ? 'You’re signed in.' : 'Sign in to this preview'}</h2>
          <p>
            {user
              ? 'Your account can keep your five and interest requests together.'
              : 'This early preview uses ChatGPT sign-in. Public email or phone sign-in is still being prepared.'}
          </p>
          {user ? (
            <Link className="primary-action" href="/choose/review">
              Review and save my five
            </Link>
          ) : (
            <a
              className="primary-action"
              href={chatGPTSignInPath('/choose/review')}
              target="_top"
            >
              Continue with ChatGPT
            </a>
          )}
        </section>
        <Link className="text-action spaced" href="/choose">
          Continue with a local draft
        </Link>
      </main>
      <Footer />
    </>
  );
}
