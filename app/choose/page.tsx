import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FiveExercise } from '@/components/five-lives/five-exercise';
import { Footer } from '@/components/five-lives/shell';
export const metadata = {
  title: 'Find your five',
  robots: { index: false, follow: false },
};
export default function ChoosePage() {
  return (
    <div className="beginning-site cinematic-exercise">
      <header className="question-header page-width">
        <Link href="/" className="wordmark" aria-label="Five Lives home">
          5<span>lives</span>.
        </Link>
        <span>Five possibilities. One beginning.</span>
        <Link href="/">
          <ArrowLeft size={16} /> Back to the story
        </Link>
      </header>
      <main id="main" className="page-width beginning-hero">
        <div className="beginning-heading">
          <p className="eyebrow">LET YOUR MIND WANDER</p>
          <h1>
            Imagine freely.
            <br />
            <em>Begin with one.</em>
          </h1>
          <p>
            A musician. A traveller. Someone entirely unexpected.
            <br />
            Name five lives you would enjoy living. No need to know how yet.
          </p>
          <p className="form-small">
            Free to explore. Your choices stay in this browser.
          </p>
        </div>
        <FiveExercise />
      </main>
      <Footer />
    </div>
  );
}
