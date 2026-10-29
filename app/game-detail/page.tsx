/* Single game page */
import type { Metadata } from 'next';
import Link from 'next/link';
import { GAMES, GAME_ABOUT } from '@/lib/data';
import { param, type SearchParams } from '@/lib/params';
import { MobilePromo } from '@/components/Rotator';
import { Card, SectionHead } from '@/components/ui';
import GameActions from '@/components/games/GameActions';

const gameOf = (id: string | null) => GAMES.find(x => x.id === id) || GAMES[0];

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const g = gameOf(param(await searchParams, 'id'));
  return { title: `${g.title} – Play Online | MY99 EXCH`, description: 'Game details, how to play and related games.' };
}

export default async function GameDetailPage({ searchParams }: { searchParams: SearchParams }) {
  const g = gameOf(param(await searchParams, 'id'));
  const [desc, steps] = GAME_ABOUT[g.cat];
  const related = GAMES.filter(x => x.id !== g.id).sort((a, b) => Number(b.cat === g.cat) - Number(a.cat === g.cat)).slice(0, 4);
  return (
    <>
      <nav className="text-xs text-slate-500" aria-label="Breadcrumb"><Link href="/games" className="hover:text-brand-500">Games</Link> / <Link href={`/games?cat=${encodeURIComponent(g.cat)}`} className="hover:text-brand-500">{g.cat}</Link> / <span className="text-slate-700">{g.title}</span></nav>
      <div className="relative rounded-xl overflow-hidden shadow-card bg-navy-900">
        <img src={g.img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm scale-110" />
        <div className="relative grid md:grid-cols-[280px_1fr] gap-6 p-5 md:p-8 items-center">
          <img src={g.img} alt={g.title} className="w-full aspect-[7/6] object-cover rounded-xl shadow-glow ring-2 ring-gold-500/60" />
          <div className="text-white">
            <span className="rounded px-2 py-0.5 text-[11px] font-bold bg-gold-500 text-navy-900">{g.tag}</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 leading-none">{g.title}</h1>
            <p className="text-white/80 mt-2">{g.tagline}</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-white/80"><span>Category: <b className="text-white">{g.cat}</b></span><span>Playing now: <b className="text-white">{g.players}</b></span><span>Rating: <b className="text-gold-400">★ 4.{(g.title.length % 5) + 4}</b></span></div>
            <GameActions />
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <Card><div className="p-5"><h2 className="font-display text-2xl font-bold mb-2">About the game</h2><p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">{['Instant play', 'Mobile friendly', 'Secure & fair', '24×7 support'].map(f => <li key={f} className="flex items-center gap-2 text-slate-600"><span className="w-5 h-5 rounded-full bg-brand-50 text-brand-600 grid place-items-center text-xs">✓</span>{f}</li>)}</ul></div></Card>
        <Card><div className="p-5"><h2 className="font-display text-2xl font-bold mb-3">How to play</h2>
          <ol className="space-y-3">{steps.map((s, i) => <li key={i} className="flex gap-3 text-sm text-slate-600"><span className="w-7 h-7 shrink-0 rounded-full bg-gold-500 text-navy-900 font-bold grid place-items-center">{i + 1}</span><span className="pt-1">{s}</span></li>)}</ol></div></Card>
      </div>
      <MobilePromo />
      <Card><SectionHead title="Related Games" href="/games" /><div className="grid grid-cols-2 lg:grid-cols-4 gap-3 px-4 pb-4">{related.map(r => <Link key={r.id} href={`/game-detail?id=${r.id}`} className="group rounded-xl overflow-hidden bg-navy-900 shadow-card">
        <span className="block aspect-square overflow-hidden"><img src={r.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy" /></span>
        <span className="block p-3 text-white"><b className="font-display text-lg">{r.title}</b><span className="block text-xs text-white/60">{r.cat}</span></span></Link>)}</div></Card>
    </>
  );
}
