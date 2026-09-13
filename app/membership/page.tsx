import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';
import { Header, Footer } from '@/components/five-lives/shell';
import { InterestForm } from '@/components/five-lives/interest-form';
export const metadata = {
  title: 'A little company. Membership',
  description:
    'Your circle, personal introductions and people beginning with you. Membership is launching soon.',
};
const perks = [
  [
    'Your circle, by name.',
    'Up to five other people who want to begin the same thing, in the same few weeks. A small group to make a plan with, show up with, and get to know.',
  ],
  [
    'The right number to ring.',
    'Coaches, teachers, studios and grounds, with our notes. The little black book will be included in membership. Book directly. We take no commission, ever.',
  ],
  [
    'Something you did this week.',
    'A private thread for the half-finished canvas, the missed session, the first time it went well. A place to tell your circle what actually happened.',
  ],
  [
    'An hour with someone who teaches.',
    'One live session each month with a working coach or teacher, answering what members bring. A recording for the times you cannot make it.',
  ],
  [
    'A week to make room.',
    'Members hear about hosted experiences a week before they open to everyone else. Time to look at your calendar and decide.',
  ],
  [
    'An introduction made by a person.',
    'Tell us what you want to begin. While we are small, a person will help find someone who teaches it and people to begin alongside.',
  ],
  [
    'The other lives can wait.',
    'Keep all five. Begin one. When you finish it, come back and make room for the next. There is no five-part checklist to catch up with.',
  ],
];
export default function MembershipPage() {
  return (
    <>
      <Header />
      <main id="main" className="page-width beginning-page membership-page">
        <section className="editorial-hero">
          <p className="eyebrow">MEMBERSHIP · LAUNCHING SOON</p>
          <h1>
            A beginning is easier
            <br />
            <em>with company.</em>
          </h1>
          <p className="editorial-intro">
            Five Lives helps you begin one thing you have always imagined doing,
            alongside people doing the same. Membership brings your circle,
            useful introductions and a reason to keep showing up.
          </p>
          <a href="#register-interest" className="beginning-text-link">
            Join the waitlist <ArrowRight size={18} />
          </a>
        </section>
        <section
          className="membership-perks"
          aria-label="Planned membership benefits"
        >
          {perks.map(([title, description], i) => (
            <article key={title}>
              <span className="perk-number">0{i + 1}</span>
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </section>
        <section className="membership-principle">
          <p className="eyebrow">PEOPLE WHO HELP YOU BEGIN</p>
          <h2>
            The right guidance.
            <br />
            <em>A little company.</em>
          </h2>
          <p>
            Find someone who knows their craft, and people to begin alongside.
            We’ll help with the introductions.
          </p>
          <Link href="/directory" className="beginning-text-link">
            How we will check the little black book <ArrowRight size={18} />
          </Link>
        </section>
        <section className="founding-note">
          <p className="eyebrow">A NOTE BEFORE YOU JOIN</p>
          <h2>Small, from the start.</h2>
          <p>
            Five Lives is taking shape. Paid membership has not opened on this
            site, and circles have not been offered here yet. Introductions will
            be made by hand. Your circle may take time to come together.
          </p>
          <p>Join the waitlist to hear when we launch.</p>
        </section>
        <section className="beginning-faq">
          <p className="eyebrow">A FEW PRACTICAL THINGS</p>
          {[
            [
              'What will membership include?',
              'Your circle, personal introductions and time with people who teach. Hosted experiences will be offered separately.',
            ],
            [
              'Do I have to begin all five?',
              'No. Five is for the exercise. After that, pick one. You can return to the others when you are ready.',
            ],
            [
              'What is ready today?',
              'The free exercise, your browser-saved beginning and the waitlists. Membership, the letter and hosted experiences are being prepared. We will share confirmed details before asking for payment.',
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <Plus size={18} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
        <InterestForm
          kind="membership"
          subject="founding-membership"
          title="Be first to hear."
        />
      </main>
      <Footer />
    </>
  );
}
