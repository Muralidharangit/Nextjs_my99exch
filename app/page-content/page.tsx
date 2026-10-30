/* Static pages: about, contact, terms, privacy, rankings */
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { has, param, type SearchParams } from '@/lib/params';
import { MobilePromo } from '@/components/Rotator';
import { Card } from '@/components/ui';
import ContactForm from '@/components/pages/ContactForm';
import Rankings from '@/components/pages/Rankings';

const REDIRECTS: Record<string, string> = {
  about: '/about-us',
  contact: '/contact-us',
  terms: '/terms-and-conditions',
  privacy: '/privacy-policy'
};

const PAGES: Record<string, [string, ReactNode]> = {
  rankings: ['Team Rankings', null]
};
const keyOf = (p: string | null) => has(PAGES, p) ? p : 'rankings';

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const p = param(await searchParams, 'p');
  if (p && REDIRECTS[p]) {
    return { title: 'MY99 EXCH', description: 'MY99 EXCH information' };
  }
  return { title: 'Team Rankings | MY99 EXCH', description: 'ICC cricket team rankings.' };
}

export default async function ContentPage({ searchParams }: { searchParams: SearchParams }) {
  const p = param(await searchParams, 'p');
  if (p && REDIRECTS[p]) {
    redirect(REDIRECTS[p]);
  }
  return <Rankings title="Team Rankings" />;
}
