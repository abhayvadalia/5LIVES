import { Header, Footer } from '@/components/five-lives/shell';
import { InterestForm } from '@/components/five-lives/interest-form';
export const metadata = {
  title: 'The Five Lives letter',
  description:
    'One life. One beginning. One question. A free fortnightly letter from Kolkata, opening soon.',
};
export default function LetterPage() {
  return (
    <>
      <Header />
      <main id="main" className="page-width beginning-page letter-page">
        <section className="editorial-hero">
          <p className="eyebrow">THE FIVE LIVES LETTER · FREE</p>
          <h1>
            A little room
            <br />
            <em>in your inbox.</em>
          </h1>
          <p className="editorial-intro">
            A letter from Kolkata, every other week. Something someone did.
            Something you could begin. A question to sit with.
          </p>
        </section>
        <section
          className="letter-outline"
          aria-label="The shape of each future issue"
        >
          {[
            [
              'One life.',
              'A real person who made room for something. Their words, their photograph, with their permission.',
            ],
            [
              'One beginning.',
              'A small, free thing to try this week. Useful names and local details when we have checked them.',
            ],
            [
              'One question.',
              'A prompt to return to your own possibilities. A reply when you have something to say.',
            ],
          ].map(([title, copy], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h2>{title}</h2>
              <p>{copy}</p>
            </article>
          ))}
        </section>
        <div className="founding-note">
          <p className="eyebrow">BEFORE THE FIRST ISSUE</p>
          <h2>We are still listening.</h2>
          <p>
            No issues have been published here yet. The first two will be
            available to read in full when they are ready. We are gathering the
            people and stories that belong in them.
          </p>
        </div>
        <InterestForm
          kind="letter"
          subject="first-letter"
          title="Hear when the first letter is ready."
        />
      </main>
      <Footer />
    </>
  );
}
