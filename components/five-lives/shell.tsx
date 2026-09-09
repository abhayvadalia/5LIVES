import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Five Lives home">
        5<span>lives</span>
        <span className="brand-dot">.</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/experiences">Explore experiences</Link>
        <Link href="/#how-it-works" className="desktop-link">
          How it works
        </Link>
        <Link href="/app" className="nav-five">
          My five <ArrowUpRight size={16} />
        </Link>
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <Link className="wordmark" href="/">
        5<span>lives</span>.
      </Link>
      <p>A little room. A whole new part of you.</p>
      <div>
        <Link href="/help">About & help</Link>
        <Link href="/privacy">Privacy</Link>
      </div>
      <small>Made for possibilities, at every adult life stage.</small>
    </footer>
  );
}
