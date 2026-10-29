/* Games lobby */
import type { Metadata } from 'next';
import Link from 'next/link';
import { GAMES, GAME_CATS } from '@/lib/data';
import type { Game } from '@/lib/types';
import { param, type SearchParams } from '@/lib/params';
import { MobilePromo } from '@/components/Rotator';
import { PlayBtn } from '@/components/ui';
import GamesLobby from '@/components/games/GamesLobby';

export const metadata: Metadata = { title: 'Games Lobby | MY99 EXCH', description: 'Free-to-play cricket, football, basketball and esports games.' };

const banners = GAMES;
const BannerItem = ({ g }: { g: Game }) => (
  <Link href={`/game-detail?id=${g.id}`} className="shrink-0 w-56 mx-2 rounded-xl overflow-hidden shadow-card hover:shadow-glow transition relative">
    <img src={g.img} alt={g.title} className="w-full aspect-[7/6] object-cover" loading="lazy" /></Link>
);

export default async function GamesPage({ searchParams }: { searchParams: SearchParams }) {
  const cat = param(await searchParams, 'cat');
  const gcat = cat && GAME_CATS.includes(cat) ? cat : 'All';
  return (
    <>
      <div className="relative rounded-xl overflow-hidden shadow-card">
        <img src="/images/ads/games-hero.jpg" alt="" className="w-full h-44 md:h-56 object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-transparent flex flex-col justify-center p-6 md:p-10">
          <p className="text-gold-400 font-semibold text-sm uppercase tracking-widest">MY99 EXCH Games</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-none mt-1">Free sports games.<br />Play anytime.</h1>
          <div className="mt-4"><PlayBtn label="Explore Games" href="#lobby" /></div>
        </div>
      </div>

      <section className="relative overflow-hidden" aria-label="Game banners">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] py-2">{[...banners, ...banners].map((g, i) => <BannerItem key={i} g={g} />)}</div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-page to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-page to-transparent"></div>
      </section>

      <GamesLobby key={gcat} initial={gcat} />

      <MobilePromo />
    </>
  );
}
