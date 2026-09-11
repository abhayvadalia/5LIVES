import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export function Header({
  motionControl,
  howHref = '/#how-it-works',
}: {
  motionControl?: React.ReactNode;
  howHref?: string;
}) {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Five Lives home">
        5<span>lives</span>
        <span className="brand-dot">.</span>
      </Link>
      <nav aria-label="Main navigation">
        {motionControl}
        <Link href="/experiences">Explore experiences</Link>
        <Link href={howHref} className="desktop-link">
          How it works
        </Link>
        <Link href="/app" className="nav-five">
          My five <ArrowUpRight size={16} />
        </Link>
      </nav>
    </header>
  );
}
export function Footer({ homeLink }: { homeLink?: 'original' | 'imagined' }) {
  return (
    <footer className="site-footer">
      <Link className="wordmark" href="/">
        5<span>lives</span>.
      </Link>
      <p>A little room. A whole new part of you.</p>
      <div>
        <Link href="/help">About & help</Link>
        <Link href="/privacy">Privacy</Link>
        {homeLink && (
          <Link href={homeLink === 'imagined' ? '/imagined-lives' : '/'}>
            {homeLink === 'imagined'
              ? 'Another way to see five lives'
              : 'Original homepage'}
          </Link>
        )}
      </div>
      <small>Made for possibilities, at every adult life stage.</small>
    </footer>
  );
}
