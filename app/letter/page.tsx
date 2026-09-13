import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Header, Footer } from '@/components/five-lives/shell';
import { InterestForm } from '@/components/five-lives/interest-form';
export const metadata = {
  title: 'Stories & small beginnings — Five Lives',
  description:
    'A free letter from Kolkata for the lives you keep imagining. Stories, small beginnings and a little room for possibility. First issue coming soon.',
};
export default function LetterPage() {
  return (
    <>
      <Header />
      <main id="main" className="page-width beginning-page letter-page">
        <section className="editorial-hero">
          <p className="eyebrow">STORIES & SMALL BEGINNINGS</p>
          <h1>
            For the life
            <br />
            <em>you keep imagining.</em>
          </h1>
          <p className="editorial-intro">
            Some possibilities keep finding their way back. A song you want to
            learn. A place you want to see. Something you once loved doing. The
            Five Lives letter is a little space to stay close to them.
          </p>
          <a className="text-action" href="#register-interest">
            Keep me in the loop <ArrowUpRight size={18} />
          </a>
        </section>
        <section className="letter-editorial" aria-labelledby="letter-why">
          <p className="eyebrow">WHY WE’RE WRITING</p>
          <div>
            <h2 id="letter-why">
              An imagined life can start
              <br />
              <em>with an ordinary afternoon.</em>
            </h2>
            <p>
              Perhaps the musician in you begins with one lesson. The explorer
              with a day somewhere unfamiliar. The maker with an idea finally
              given an hour of your attention.
            </p>
            <p>
              Five Lives helps you find ways to bring those possibilities into
              the life you already have. We’re starting in Kolkata, gathering
              people, lessons and experiences that can make a beginning easier.
              Time with someone who knows their craft can help you go deeper
              into a world you’ve always wanted to explore.
            </p>
            <p>
              The letter will follow that same curiosity. A story that makes
              something feel possible. A useful way to try it. A little
              encouragement to give it a place in your week.
            </p>
            <Link className="text-action" href="/#founder">
              Why I started Five Lives — Abhay <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
        <section
          className="letter-outline"
          aria-label="What we’re preparing for each issue"
        >
          {[
            [
              'One life.',
              'Stories of people making room for something they love, told with their permission. The small starts as well as the milestones.',
            ],
            [
              'One beginning.',
              'Something simple to try. As our Kolkata community grows, we’ll include people and places that can help you take it further.',
            ],
            [
              'One question.',
              'A moment to notice what you miss, what draws you in, and what you might make room for next.',
            ],
          ].map(([title, copy], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h2>{title}</h2>
              <p>{copy}</p>
            </article>
          ))}
        </section>
        <section
          className="letter-sample"
          aria-labelledby="letter-sample-title"
        >
          <div className="letter-sample-heading">
            <p className="eyebrow">A BEGINNING TO TRY TODAY</p>
            <span>20 minutes, just for this.</span>
          </div>
          <h2 id="letter-sample-title">
            “I keep coming
            <br />
            <em>back to…”</em>
          </h2>
          <p>
            Finish that sentence with something you’d like to do. Then give it
            twenty minutes: sing a verse, sketch the view from your window, or
            map out the first day of a journey you keep imagining.
          </p>
          <p>
            You can leave it unfinished. Afterwards, notice the part you’d like
            to come back to. That’s a place to begin.
          </p>
          <Link className="text-action" href="/choose?start=five">
            Make room for my five <ArrowUpRight size={18} />
          </Link>
        </section>
        <div className="letter-signup-grid">
          <div className="letter-signup-context">
            <p className="eyebrow">THE FIVE LIVES LETTER</p>
            <h2>
              A little possibility.
              <br />
              <em>Every other week.</em>
            </h2>
            <p>
              Free to read. Rooted in Kolkata. Written to help you live a little
              of the lives you imagine.
            </p>
            <p>
              We’re preparing the first issue. Leave your email for an
              invitation when it’s ready; you’ll choose then whether to receive
              future letters.
            </p>
          </div>
          <InterestForm
            kind="letter"
            subject="first-letter"
            title="Let me know when it begins."
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
