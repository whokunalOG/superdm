import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'SuperDM - Automate Instagram DMs & Grow Followers',
  description: 'Lock your best content behind a follower check. Automatically DM users when they follow, creating a viral loop that grows your audience 10x faster.',
  keywords: ['Instagram', 'automation', 'DM', 'growth', 'followers'],
  authors: [{ name: 'SuperDM' }],
  openGraph: {
    title: 'SuperDM - Automate Instagram DMs & Grow Followers',
    description: 'Lock your best content behind a follower check. Automatically DM users when they follow, creating a viral loop that grows your audience 10x faster.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-bg text-accent`}>{children}</body>
    </html>
  );
}
