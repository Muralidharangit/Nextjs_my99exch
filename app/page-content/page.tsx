/* Static pages: about, contact, terms, privacy, rankings */
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { has, param, type SearchParams } from '@/lib/params';
import { MobilePromo } from '@/components/Rotator';
import { Card } from '@/components/ui';
import ContactForm from '@/components/pages/ContactForm';
import Rankings from '@/components/pages/Rankings';

const PAGES: Record<string, [string, ReactNode]> = {
  about: ['About MY99 EXCH', <>
    <p>MY99 EXCH brings you fast, accurate live cricket scores, ball-by-ball commentary, full scorecards and the latest news from every major international, league and domestic competition.</p>
    <p>Alongside the cricket, our games section offers free-to-play cricket games — batting, bowling, strategy and quizzes.</p></>],
  contact: ['Contact Us', <><p>We usually reply within 24 hours.</p><ContactForm /></>],
  terms: ['Terms & Conditions', <><p>By using MY99 EXCH you agree to use the site for lawful purposes only. Scores and statistics are provided for information and may be delayed.</p><p>All games on MY99 EXCH are free to play and involve no real money.</p></>],
  privacy: ['Privacy Policy', <><p>We collect only the information needed to run the service, such as preferences stored in your browser. We never sell personal data.</p><p>You can clear stored preferences at any time from your browser settings.</p></>],
  rankings: ['Team Rankings', null]
};
const keyOf = (p: string | null) => has(PAGES, p) ? p : 'about';

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  return { title: `${PAGES[keyOf(param(await searchParams, 'p'))][0]} | MY99 EXCH`, description: 'About, contact, policies and rankings.' };
}

export default async function ContentPage({ searchParams }: { searchParams: SearchParams }) {
  const key = keyOf(param(await searchParams, 'p'));
  const [title, html] = PAGES[key];
  if (key === 'rankings') return <Rankings title={title} />;
  return (
    <>
      <Card><article className="p-5 md:p-8 prose-news"><h1 className="font-display text-3xl font-bold mb-4">{title}</h1>{html}</article></Card>
      <MobilePromo />
    </>
  );
}
