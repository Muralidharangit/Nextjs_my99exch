/* Left and right sidebars */
import Link from 'next/link';
import { ADS, GAMES } from '@/lib/data';
import { REGISTER_URL } from '@/lib/constants';
import { ICON } from './icons';
import { Rotator } from './Rotator';
import { Card, SectionHead, SmartLink } from './ui';

const QUICK_LINKS: [string, string, keyof typeof ICON, string][] = [
  ['Live Matches', REGISTER_URL, 'live', 'bg-red-50 text-live'], ['Upcoming', REGISTER_URL, 'calendar', 'bg-blue-50 text-blue-600'],
  ['Results', REGISTER_URL, 'trophy', 'bg-amber-50 text-gold-600'], ['Games', REGISTER_URL, 'game', 'bg-brand-50 text-brand-600']
];

export function LeftSidebar() {
  return (
    <div className="sticky top-28">
      <Rotator slides={ADS.tall} aspect="aspect-[28/69]" />
      <Card className="mt-3">
        <h2 className="font-display font-bold text-lg px-4 pt-3 pb-1">Quick Links</h2>
        <ul className="pb-2">{QUICK_LINKS.map(([l, h, ic, c], idx) => <li key={`${l}-${idx}`}><SmartLink href={h} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition border-t border-slate-100 first:border-0"><span className={`w-8 h-8 rounded-full grid place-items-center ${c}`}>{ICON[ic]}</span>{l}</SmartLink></li>)}</ul>
      </Card>
    </div>
  );
}

export function RightSidebar() {
  return (
    <>
      <div className="max-w-[300px] mx-auto"><Rotator slides={ADS.box} aspect="aspect-[22/30]" /></div>
      <Card>
        <SectionHead title="Featured Games" href="/games" />
        <ul className="px-4 pb-3 divide-y divide-slate-100">{GAMES.filter(g => ['cricket-clash', 'football-clash', 'basketball-clash', 'game-clash'].includes(g.id)).map(g => (
          <li key={g.id} className="flex items-center gap-3 py-2.5">
            <Link href={`/game-detail?id=${g.id}`} className="shrink-0 w-16 h-16 rounded-lg overflow-hidden"><img src={g.thumb} alt="" className="w-full h-full object-cover hover:scale-110 transition duration-500" loading="lazy" /></Link>
            <div className="flex-1 min-w-0"><Link href={`/game-detail?id=${g.id}`} className="block font-semibold text-sm text-slate-800 hover:text-brand-500">{g.title}</Link><span className="text-xs text-slate-400">{g.cat}</span></div>
            <Link href={`/game-detail?id=${g.id}`} className="shrink-0 rounded-full px-4 py-1.5 text-xs font-bold text-navy-900 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 hover:shadow-glow transition">Play</Link>
          </li>))}</ul>
      </Card>
      <div className="max-w-[280px] mx-auto"><Rotator slides={ADS.tall2} aspect="aspect-[28/69]" /></div>
    </>
  );
}
