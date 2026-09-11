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
          <h2>Does choosing cost anything?</h2>
          <p>
            Exploring, making your list, expressing interest and joining a group
            are free. You only pay for a defined experience with a real date and
            delivery plan. There are no confirmed events or payments in this
            preview.
          </p>
          <h2>What happens after I express interest?</h2>
          <p>
            Your request is saved for review. It does not guarantee a match, a
            place or a date. When the pilot is ready, a suitable experience will
            need a confirmed host, venue, schedule, capacity and full terms
            before booking opens.
          </p>
          <h2>Where do groups talk?</h2>
          <p>
            WhatsApp is the planned conversation channel. Group links are not
            available yet. Joining a WhatsApp group may expose your phone number
            and profile to other members; coordination alternatives will depend
            on the host.
          </p>
          <h2>Need help with this preview?</h2>
          <p>
            Report an issue to the person who shared this private preview with
            you. Public support, account requests and event-specific safety
            information must be established before launch. This preview is not
            an emergency service.
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
