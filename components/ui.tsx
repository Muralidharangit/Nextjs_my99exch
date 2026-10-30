/* Shared UI pieces: flags, badges, cards, buttons, match rows, ball chips, filter pills */
import Link from 'next/link';
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { TEAMS, teamShort, scoreOf } from '@/lib/data';
import type { Match, Format } from '@/lib/types';
import { ICON } from './icons';

export function Flag({ code, size = 'w-6 h-6' }: { code: string; size?: string }) {
  const t = TEAMS[code];
  if (t.iso) return <img src={`https://flagcdn.com/w80/${t.iso}.png`} alt="" className={`${size} rounded-full object-cover ring-1 ring-slate-200 shrink-0`} loading="lazy" />;
  return <span className={`${size} rounded-full grid place-items-center text-[8px] font-bold text-white shrink-0 ring-1 ring-black/10`} style={{ background: t.color } as CSSProperties} aria-hidden="true">{teamShort(code).slice(0, 3)}</span>;
}

const FORMAT_BADGE: Record<Format, string> = { Test: 'bg-live text-white', ODI: 'bg-brand-500 text-white', T20: 'bg-gold-500 text-navy-900' };
export const FormatBadge = ({ f }: { f: Format }) => <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${FORMAT_BADGE[f]}`}>{f}</span>;
export const LiveBadge = () => <span className="bg-live text-white rounded px-1.5 text-[10px] leading-4 font-bold animate-livepulse">LIVE</span>;
export const statusColor = (m: Match) => m.state === 'live' ? 'text-live' : m.state === 'recent' ? 'text-brand-600' : 'text-slate-500';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`bg-white rounded-xl shadow-card border border-slate-100 ${className}`}>{children}</section>;
}

export function SectionHead({ title, href, label = 'View All' }: { title: string; href?: string; label?: string }) {
  return (
    <div className="flex items-center justify-between px-4 pt-4 pb-2">
      <h2 className="font-display text-xl font-bold text-slate-800 uppercase tracking-wide">{title}</h2>
      {href ? <Link href={href} className="text-xs font-semibold text-brand-500 hover:text-brand-700 flex items-center gap-1 min-h-[44px] md:min-h-0">{label} {ICON.arrow}</Link> : null}
    </div>
  );
}

/** internal routes use next/link; external URLs (http/https) and links with a #fragment stay plain anchors */
export function SmartLink({ href, ...rest }: { href: string; className?: string; children?: ReactNode; onClick?: MouseEventHandler<HTMLAnchorElement>; 'aria-label'?: string; 'aria-current'?: 'page' }) {
  if (href.startsWith('http://') || href.startsWith('https://') || href.includes('#')) {
    return <a href={href} {...rest} />;
  }
  return <Link href={href} {...rest} />;
}

export function PlayBtn({ label = 'Play Now', href = '/games', extra = '', onClick }: { label?: string; href?: string; extra?: string; onClick?: MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <SmartLink href={href} onClick={onClick} className={`relative overflow-hidden whitespace-nowrap inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2 font-bold text-navy-900 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 shadow-glow hover:scale-105 transition duration-300 ${extra}`}>
      <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" aria-hidden="true"></span>
      <span className="relative">{label}</span>
    </SmartLink>
  );
}

/* ---------- Match helpers shared by pages ---------- */
export function ScoreLine({ m, code, big }: { m: Match; code: string; big?: boolean }) {
  const s = scoreOf(m, code);
  return (
    <div className="flex items-center gap-2">
      <Flag code={code} size="w-5 h-5" />
      <span className={`text-sm font-semibold ${s ? 'text-slate-700' : 'text-slate-500'} w-12`}>{teamShort(code)}</span>
      {s ? <><span className={`font-display font-bold ${big ? 'text-xl' : 'text-base'} text-slate-800`}>{s.r}{s.w < 10 ? '/' + s.w : ''}</span><span className="text-[11px] text-slate-400 ml-1">({s.o})</span></> : null}
    </div>
  );
}

export function MatchRow({ m }: { m: Match }) {
  const link = `/match-detail?id=${m.id}`;
  const ln = 'text-brand-500 hover:text-brand-700 hover:underline';
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-brand-50/60 transition">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
          {m.state === 'live' ? <LiveBadge /> : null}<Link href={link} className="font-semibold text-slate-700 hover:text-brand-500">{teamShort(m.teams[0])} vs {teamShort(m.teams[1])}, {m.desc}</Link> <FormatBadge f={m.format} />
        </div>
        <div className="text-[11px] text-slate-400 mb-2 truncate">{m.venue} · {m.date}</div>
        <div className="space-y-1"><ScoreLine m={m} code={m.teams[0]} /><ScoreLine m={m} code={m.teams[1]} /></div>
        <p className={`text-xs font-semibold mt-2 ${statusColor(m)}`}>{m.status}</p>
      </div>
      <div className="flex sm:flex-col items-start sm:items-end justify-start gap-x-3 gap-y-1 text-xs font-medium flex-wrap">
        {m.state === 'upcoming'
          ? <><Link href={`${link}&tab=info`} className={`${ln} min-h-[32px] flex items-center`}>Match Info</Link><Link href={`${link}&tab=squads`} className={`${ln} min-h-[32px] flex items-center`}>Squads</Link></>
          : <><Link href={`${link}&tab=live`} className={`${ln} min-h-[32px] flex items-center`}>Live Score</Link><Link href={`${link}&tab=scorecard`} className={`${ln} min-h-[32px] flex items-center`}>Scorecard</Link><Link href={`${link}&tab=full-commentary`} className={`${ln} min-h-[32px] flex items-center`}>Full Commentary</Link></>}
      </div>
    </div>
  );
}

/* ball chip used in commentary, recent balls and over summaries */
export function Chip({ v, size = 'w-7 h-7' }: { v: string; size?: string }) {
  const cls = v === 'W' ? 'bg-live text-white' : v === '4' ? 'bg-blue-500 text-white' : v === '6' ? 'bg-gold-500 text-navy-900'
    : v === '0' ? 'bg-slate-200 text-slate-500' : v === 'wd' || v === 'lb' ? 'bg-brand-50 text-brand-700 ring-1 ring-brand-500/30' : 'bg-white text-slate-700 ring-1 ring-slate-200';
  const txt = v === '0' ? '•' : v;
  return <span className={`${size} shrink-0 rounded-full grid place-items-center text-[11px] font-bold ${cls}`} aria-label={v === '0' ? 'dot ball' : v}>{txt}</span>;
}

/* filter pills */
export function Pills({ items, active, onSelect }: { items: string[]; active: string; onSelect: (v: string) => void }) {
  return (
    <>
      {items.map(v => (
        <button key={v} type="button" data-filter={v} aria-pressed={v === active} onClick={() => onSelect(v)}
          className={`shrink-0 rounded-full px-3.5 min-h-[36px] text-xs font-semibold border transition duration-300 ${v === active ? 'bg-gold-500 border-gold-500 text-navy-900' : 'bg-white border-slate-200 text-slate-600 hover:border-brand-500 hover:text-brand-500'}`}>{v}</button>
      ))}
    </>
  );
}
