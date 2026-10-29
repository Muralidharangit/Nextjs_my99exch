'use client';
/* Footer and mobile bottom navigation */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { pageOf } from '@/lib/nav';
import { ICON } from './icons';

const SOCIAL: [string, string][] = [['Facebook', 'M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z'], ['X', 'M4 4l16 16M20 4L4 20'], ['Instagram', 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5-1.5h.01'], ['YouTube', 'M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm7 1v6l5-3z'], ['Telegram', 'M21 4L3 11l6 2 2 6 3-4 5 4z']];
const BOTTOM: [string, string, keyof typeof ICON, string][] = [['Home', '/', 'home', 'home'], ['Live', '/matches', 'live', 'matches'], ['Series', '/series', 'calendar', 'series'], ['Games', '/games', 'game', 'games'], ['News', '/news', 'news', 'news']];
const lk = 'hover:text-gold-400';

export default function SiteFooter() {
  const page = pageOf(usePathname());
  return (
    <>
      <footer className="bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700 text-white/80 mt-8 pb-20 md:pb-0">
        <div className="max-w-[1600px] mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div><img src="/images/logo.webp" alt="MY99 EXCH" className="h-10 mb-3" /><p className="text-sm leading-relaxed">Live cricket scores, ball-by-ball commentary, news and games — all in one place.</p></div>
          <div><h3 className="text-white font-display font-bold text-lg mb-3">Cricket</h3><ul className="space-y-2 text-sm">
            <li><Link className={lk} href="/matches">Live Scores</Link></li><li><Link className={lk} href="/matches?tab=Upcoming">Schedule</Link></li>
            <li><Link className={lk} href="/series">Series</Link></li><li><Link className={lk} href="/news">News</Link></li><li><Link className={lk} href="/page-content?p=rankings">Rankings</Link></li></ul></div>
          <div><h3 className="text-white font-display font-bold text-lg mb-3">Company</h3><ul className="space-y-2 text-sm">
            <li><Link className={lk} href="/page-content?p=about">About</Link></li><li><Link className={lk} href="/page-content?p=contact">Contact</Link></li>
            <li><Link className={lk} href="/page-content?p=terms">Terms</Link></li><li><Link className={lk} href="/page-content?p=privacy">Privacy</Link></li></ul></div>
          <div><h3 className="text-white font-display font-bold text-lg mb-3">Follow us</h3>
            <div className="flex gap-2 mb-5">{SOCIAL.map(([n, d]) => <a key={n} href="#" aria-label={n} className="w-11 h-11 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-900 grid place-items-center transition"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d={d} /></svg></a>)}</div>
          </div>
        </div>
        <div className="border-t border-white/15"><div className="max-w-[1600px] mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between gap-2 text-xs">
          <span>© 2026 MY99 EXCH. All rights reserved.</span><span>Live scores · Commentary · News</span></div></div>
      </footer>
      <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-t border-slate-200 md:hidden" aria-label="Bottom">
        <div className="grid grid-cols-5">{BOTTOM.map(([l, h, ic, p]) => <Link key={p} href={h} className={`flex flex-col items-center justify-center gap-0.5 h-14 text-[11px] font-medium ${p === page ? 'text-brand-600' : 'text-slate-500'}`} aria-current={p === page ? 'page' : undefined}>{ICON[ic]}{l}</Link>)}</div>
      </nav>
    </>
  );
}
