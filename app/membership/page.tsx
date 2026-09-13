import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';
import { Header, Footer } from '@/components/five-lives/shell';
import { InterestForm } from '@/components/five-lives/interest-form';
export const metadata = {
  title: 'A little company. Membership',
  description:
    'Your circle, personal introductions and people beginning with you. Founding membership is opening soon.',
};
const perks = [
  [
    'Your circle, by name.',
    'Up to five other people who want to begin the same thing, in the same few weeks. A small group to make a plan with, show up with, and get to know.',
  ],
  [
    'The right number to ring.',
    'Coaches, teachers, studios and grounds, with names, prices and our notes. The little black book will be included in membership. Book directly. We take no commission, ever.',
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
    'A little less to pay.',
    'Members get 15% off every Five Lives hosted experience. Your membership covers the company; produced experiences are priced separately.',
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
          <p className="eyebrow">FIVE LIVES MEMBERSHIP</p>
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
            Founding membership is opening soon <ArrowRight size={18} />
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
          <p className="eyebrow">WHAT YOU ARE PAYING FOR</p>
          <h2>
            We give away the contacts.
            <br />
            <em>We charge for the company.</em>
          </h2>
          <p>
            Not a course. Not a subscription box. Not another feed to keep up
            with. No cut of a coach’s fee.
          </p>
          <p>
            If all you need is the name of a swimming coach, you should not have
            to buy an experience to get it.
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
          <p>
            We will share confirmed enrolment numbers when membership opens. If
            you would rather wait,{' '}
            <Link href="/letter">come for the letter</Link>.
          </p>
        </section>
        <section className="membership-price">
          <div>
            <p className="eyebrow">FOUNDING MEMBERSHIP · ANNUAL</p>
            <h2>
              ₹1,999<span> / year</span>
            </h2>
            <p>For the first 100 paid members. That annual price for life.</p>
            <p className="form-small">
              Planned total including 18% GST: ₹1,694.07 + ₹304.93 GST.
            </p>
          </div>
          <div>
            <p>Regular membership</p>
            <strong>₹2,999 / year</strong>
            <p className="form-small">₹2,541.53 + ₹457.47 GST. Annual only.</p>
            <p className="form-small">
              Enrolment has not opened. The interest list does not reserve the
              founding price. No payment is taken here.
            </p>
          </div>
        </section>
        <section className="beginning-faq">
          <p className="eyebrow">A FEW PRACTICAL THINGS</p>
          {[
            [
              'What does the annual fee cover?',
              'The eight membership benefits above. Coaches are booked and paid directly. Hosted experiences are separate, with a 15% member discount.',
            ],
            [
              'Do I have to begin all five?',
              'No. Five is for the exercise. After that, pick one. You can return to the others when you are ready.',
            ],
            [
              'How will renewal and cancellation work?',
              'The planned membership is annual. Before payment, you will see the renewal amount and date. We plan a reminder seven days before renewal, one-click cancellation in your account, and a pro-rata refund within 14 days of a charge. No subscription is available or active yet.',
            ],
            [
              'What is ready today?',
              'The free exercise, your browser-saved beginning and the interest lists. Membership, the letter and hosted experiences are being prepared. We will share confirmed details before asking for payment.',
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
          title="Be here for the beginning."
        />
      </main>
      <Footer />
    </>
  );
}
