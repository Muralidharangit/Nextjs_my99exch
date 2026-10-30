'use client';
/* Header, match strip, ALL matches panel and mobile drawer */
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MATCHES, teamShort } from '@/lib/data';
import { NAV, pageOf } from '@/lib/nav';
import { ICON } from './icons';
import { Flag, PlayBtn, SmartLink, statusColor } from './ui';

export default function SiteHeader() {
  const page = pageOf(usePathname());
  const [drawer, setDrawer] = useState(false);
  const [allOpen, setAllOpen] = useState(false);
  const allBtn = useRef<HTMLButtonElement>(null);
  const allPanel = useRef<HTMLDivElement>(null);

  useEffect(() => { document.body.style.overflow = drawer ? 'hidden' : ''; }, [drawer]);
  useEffect(() => {
    const onClick = (e: globalThis.MouseEvent) => {
      const t = e.target as Node;
      if (!allPanel.current?.contains(t) && !allBtn.current?.contains(t)) setAllOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setAllOpen(false); setDrawer(false); } };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey); };
  }, []);

  // close menus when a link inside them is followed
  const closeOnLink = (close: () => void) => (e: MouseEvent) => { if ((e.target as HTMLElement).closest('a')) close(); };
  const blurDropdown = (e: MouseEvent) => { (e.target as HTMLElement).closest('a')?.blur(); };

  return (
    <>
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:z-[80] focus:bg-white focus:p-2">Skip to content</a>
      <header className="sticky top-0 z-50 shadow-md">
        <div className="bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700">
          <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center gap-3">
            <button type="button" id="menu-btn" className="xl:hidden -ml-2 w-11 h-11 grid place-items-center text-white" aria-label="Open menu" aria-expanded={drawer} aria-controls="drawer" onClick={() => setDrawer(true)}>{ICON.menu}</button>
            <Link href="/" className="shrink-0" aria-label="MY99 EXCH home"><img src="/images/logo.webp" alt="MY99 EXCH" className="h-8 sm:h-10 w-auto drop-shadow" /></Link>
            <nav className="hidden xl:flex items-center text-sm font-semibold ml-2 whitespace-nowrap" aria-label="Main" onClick={blurDropdown}>
              {NAV.map(n => n.items
                ? <div key={n.label} className="relative group">
                    {n.href ? (
                      <SmartLink href={n.href} className={`flex items-center gap-1 px-2 2xl:px-3 py-2 text-white/90 hover:text-gold-400 transition ${n.page === page ? 'text-gold-400' : ''}`} aria-haspopup="true">
                        {n.label}{ICON.chevron}
                      </SmartLink>
                    ) : (
                      <button type="button" className={`flex items-center gap-1 px-2 2xl:px-3 py-2 text-white/90 hover:text-gold-400 transition ${n.page === page ? 'text-gold-400' : ''}`} aria-haspopup="true">
                        {n.label}{ICON.chevron}
                      </button>
                    )}
                    <div className="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block z-50">
                      <ul className="bg-white rounded-lg shadow-lift py-2 min-w-[220px] border border-slate-100">
                        {n.items.map(([l, h], idx) => <li key={`${l}-${idx}`}><SmartLink href={h} className="block px-4 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-600">{l}</SmartLink></li>)}
                      </ul>
                    </div>
                  </div>
                : <SmartLink key={n.label} href={n.href!} className={`px-2 2xl:px-3 py-2 text-white/90 hover:text-gold-400 transition ${n.page === page ? 'text-gold-400' : ''}`}>{n.label}</SmartLink>)}
            </nav>
            <div className="ml-auto flex items-center gap-2 xl:gap-3">
              <SmartLink href="https://my99exch.ai/players/register" className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-5 py-2 font-bold text-navy-900 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 shadow-glow hover:scale-105 transition duration-300 text-sm">
                Live Scores
              </SmartLink>
            </div>
          </div>
        </div>
        <div className="bg-strip text-sm text-slate-300">
          <div className="max-w-[1600px] mx-auto pl-4 md:px-4 h-12 flex items-stretch">
            <div className="hidden sm:flex items-center gap-2 pr-4 border-r border-white/10 text-white font-display font-bold text-lg tracking-wide">{ICON.ball} MATCHES</div>
            <div className="flex-1 flex overflow-x-auto whitespace-nowrap no-scrollbar" aria-label="Current matches">
              {MATCHES.slice(0, 9).map(m => (
                <Link key={m.id} href={`/match-detail?id=${m.id}`} className="shrink-0 flex items-center gap-2.5 px-4 h-full border-r border-white/10 hover:bg-white/5 transition">
                  <span className="flex -space-x-1.5"><Flag code={m.teams[0]} size="w-5 h-5" /><Flag code={m.teams[1]} size="w-5 h-5" /></span>
                  <span className="leading-tight"><span className="block text-white font-semibold text-[13px]">{teamShort(m.teams[0])} vs {teamShort(m.teams[1])}</span>
                    <span className={`block text-[11px] ${m.state === 'live' ? 'text-live font-semibold' : 'text-slate-400'}`}>{m.state === 'live' && m.short === 'Live' ? 'Live' : m.short}</span></span>
                </Link>
              ))}
            </div>
            {/* <div className="relative flex items-center pl-2">
              <button ref={allBtn} type="button" id="all-btn" className="h-9 px-3 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1 transition" aria-expanded={allOpen} aria-controls="all-panel" onClick={() => setAllOpen(o => !o)}>ALL {ICON.chevron}</button>
              <div ref={allPanel} id="all-panel" hidden={!allOpen} onClick={closeOnLink(() => setAllOpen(false))} className="absolute right-0 top-full mt-1 w-80 max-h-[70vh] overflow-y-auto bg-white rounded-lg shadow-lift border border-slate-100 z-50 text-slate-700">
                {(['live', 'upcoming', 'recent'] as const).map(st => [
                  <p key={st} className="px-4 pt-3 pb-1 text-[11px] uppercase font-bold text-slate-400">{st}</p>,
                  ...MATCHES.filter(m => m.state === st).map(m => (
                    <Link key={m.id} href={`/match-detail?id=${m.id}`} className="flex items-center gap-2 px-4 py-2 hover:bg-brand-50">
                      <span className="flex -space-x-1.5"><Flag code={m.teams[0]} size="w-5 h-5" /><Flag code={m.teams[1]} size="w-5 h-5" /></span>
                      <span className="text-sm min-w-0"><b className="font-semibold">{teamShort(m.teams[0])} vs {teamShort(m.teams[1])}</b> <span className="text-slate-400">· {m.desc}</span><span className={`block text-[11px] truncate ${statusColor(m)}`}>{m.status}</span></span>
                    </Link>
                  ))
                ])}
              </div>
            </div> */}
          </div>
        </div>
      </header>
      <div id="drawer" hidden={!drawer} className="fixed inset-0 z-[60] xl:hidden">
        <div className="absolute inset-0 bg-black/50" onClick={() => setDrawer(false)}></div>
        <nav className="absolute left-0 top-0 bottom-0 w-[84%] max-w-xs bg-white overflow-y-auto shadow-lift" aria-label="Mobile" onClick={closeOnLink(() => setDrawer(false))}>
          <div className="flex items-center justify-between h-16 px-4 bg-brand-500"><img src="/images/logo.webp" alt="MY99 EXCH" className="h-8" /><button type="button" className="w-11 h-11 grid place-items-center text-white" aria-label="Close menu" onClick={() => setDrawer(false)}>{ICON.close}</button></div>
          <div className="p-2">
            {NAV.map(n => n.items
              ? <details key={n.label} className="group">
                  <summary className="flex items-center justify-between px-3 min-h-[44px] font-semibold text-slate-700 cursor-pointer list-none">
                    {n.href ? <SmartLink href={n.href} className="hover:text-brand-500">{n.label}</SmartLink> : <span>{n.label}</span>}
                    <span className="transition group-open:rotate-180">{ICON.chevron}</span>
                  </summary>
                  {n.items.map(([l, h], idx) => <SmartLink key={`${l}-${idx}`} href={h} className="block pl-6 pr-3 py-2.5 text-sm text-slate-600 hover:text-brand-500">{l}</SmartLink>)}
                </details>
              : <SmartLink key={n.label} href={n.href!} className="flex items-center px-3 min-h-[44px] font-semibold text-slate-700 hover:text-brand-500">{n.label}</SmartLink>)}
            <div className="p-3"><PlayBtn label="Play Now" href="https://my99exch.ai/players/register" extra="w-full" /></div>
          </div>
        </nav>
      </div>
    </>
  );
}
