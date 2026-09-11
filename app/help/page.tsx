import Link from 'next/link';
import { Header, Footer } from '@/components/five-lives/shell';
export const metadata = { title: 'About & help' };
export default function HelpPage() {
  return (
    <>
      <Header />
      <main id="main" className="page-width content-page narrow-page">
        <p className="eyebrow">A LITTLE MORE ABOUT FIVE LIVES</p>
        <h1>
          Real experiences.
          <br />
          <em>Your own pace.</em>
        </h1>
        <div className="prose">
          <h2>What are my five?</h2>
          <p>
            One specific possibility in Sports, Art, Health, Travel and Tech.
            “Nothing here yet” is welcome in every category. Choose one starting
            point when you feel ready.
          </p>
          <h2>How does Five Lives help?</h2>
          <p>
            We help you find a way into the life you imagine: a music teacher
            who helps you begin, a coach who builds your confidence, or a
            thoughtfully planned journey. Your choices guide the kinds of
            opportunities we bring together.
          </p>
          <h2>What’s available now?</h2>
          <p>
            You can explore possibilities and keep your five in this browser,
            without an account. Guided activities and experiences are in
            development. There are no confirmed dates or payments yet, and
            saving a choice does not make a booking or send an interest request.
          </p>
          <h2>Does choosing cost anything?</h2>
          <p>
            Exploring and making your list are free. When opportunities become
            available, you’ll see what’s included, who’s guiding you and the
            full price before deciding.
          </p>
          <h2>Need help with this preview?</h2>
          <p>
            If someone shared Five Lives with you, you can send feedback to
            them. We’re still developing the experience and support channels.
          </p>
          <h2>A space for everyone</h2>
          <p>
            Be respectful, respect boundaries and ask before photographing or
            sharing someone else’s experience. Hosted activities will have their
            own participation and accessibility information.
          </p>
          <Link className="primary-action" href="/choose">
            Find my five
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
