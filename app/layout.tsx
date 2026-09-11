import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './motion.css';
import './shadows.css';
import './interiors.css';
import { PwaSupport } from '@/components/five-lives/pwa';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Five Lives — Make room for yourself',
    template: '%s · Five Lives',
  },
  description:
    'Five possibilities. One place to begin. Explore Sports, Art, Health, Travel and Tech, and make room for a part of yourself.',
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: '5lives' },
  icons: { icon: '/icons/icon-192.png', apple: '/icons/icon-192.png' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <PwaSupport />
        {children}
      </body>
    </html>
  );
}
