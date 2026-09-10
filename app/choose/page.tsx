import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { IntakeFlow } from '@/components/five-lives/intake-flow';
export const metadata = {
  title: 'Choose your five',
  robots: { index: false, follow: false },
};
export default function ChoosePage() {
  return (
    <>
      <header className="question-header page-width">
        <Link href="/" className="wordmark" aria-label="Five Lives home">
          5<span>lives</span>.
        </Link>
        <span>A little more of you.</span>
        <Link href="/experiences">
          Just exploring? <ArrowUpRight size={15} />
        </Link>
      </header>
      <IntakeFlow immersive />
    </>
  );
}
