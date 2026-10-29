'use client';
/* Games lobby: category tabs + game grid, ?cat= follows the selection */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GAMES, GAME_CATS } from '@/lib/data';
import type { Game } from '@/lib/types';
import { replaceQuery } from '@/lib/params';
import { TabBar } from '../Tabs';
import { Card } from '../ui';

const GameCard = ({ g }: { g: Game }) => (
  <article className="group relative flex flex-col rounded-xl overflow-hidden bg-navy-900 shadow-card hover:shadow-glow transition duration-300">
    <div className="relative aspect-[7/6] overflow-hidden"><img src={g.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy" /></div>
    <div className="p-3 bg-gradient-to-b from-navy-800 to-navy-900 flex-1 flex flex-col">
      <h3 className="text-white font-display text-lg font-bold leading-tight"><Link href={`/game-detail?id=${g.id}`} className="after:absolute after:inset-0">{g.title}</Link></h3>
      <p className="text-white/70 text-xs mb-2">{g.cat} · {g.players} playing</p>
      <Link href={`/game-detail?id=${g.id}`} className="relative z-10 mt-auto block text-center rounded-full py-2 text-xs font-bold text-navy-900 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 shadow-glow">Play Now</Link>
    </div>
  </article>
);

export default function GamesLobby({ initial }: { initial: string }) {
  const [gcat, setGcat] = useState(initial);
  const list = GAMES.filter(g => gcat === 'All' || g.cat === gcat);
  useEffect(() => {
    replaceQuery(u => { if (gcat === 'All') u.searchParams.delete('cat'); else u.searchParams.set('cat', gcat); });
  }, [gcat]);
  return (
    <Card>
      <div id="lobby" className="scroll-mt-32"></div>
      <div className="flex items-center justify-between px-4 pt-4"><h2 className="font-display text-2xl font-bold">Games Lobby</h2><span id="g-count" className="text-xs text-slate-400">{list.length} games</span></div>
      <TabBar items={GAME_CATS} active={gcat} onSelect={setGcat} idPrefix="gc" label="Game categories" panels={false} />
      <div id="g-grid" className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 p-4" aria-live="polite">{list.map(g => <GameCard key={g.id} g={g} />)}</div>
    </Card>
  );
}
