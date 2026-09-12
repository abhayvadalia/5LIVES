import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export function Header({
  motionControl,
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
        <Link href="/membership">Membership</Link>
        <Link href="/experiences" className="desktop-link">
          Experiences
        </Link>
        <Link href="/letter" className="desktop-link">
          The letter
        </Link>
        <Link href="/my-five" className="nav-five">
          My five <ArrowUpRight size={16} />
        </Link>
      </nav>
    </header>
  );
}
export function Footer(_props: { homeLink?: 'original' | 'imagined' } = {}) {
  return (
    <footer className="site-footer beginning-footer">
      <section className="footer-invitation">
        <p>
          Begin one thing.
          <br />
          <em>With a little company.</em>
        </p>
        <Link href="/membership" className="beginning-button">
          Explore membership <ArrowUpRight size={18} />
        </Link>
      </section>
      <Link className="wordmark" href="/">
        5<span>lives</span>.
      </Link>
      <p>Making room in Kolkata.</p>
      <div>
        <Link href="/help">About & help</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/refunds">Refunds</Link>
        <Link href="/grievance">Grievance</Link>
        <Link href="/community-guidelines">Guidelines</Link>
        <Link href="/requests">My requests</Link>
      </div>
      <small>Five Lives · Pre-launch · Adults 18+ · Kolkata</small>
    </footer>
  );
}
