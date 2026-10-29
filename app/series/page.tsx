/* Series list (/series) and series page (/series?id=...) */
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { MATCHES, SERIES, TABLES, TEAMS, teamShort } from '@/lib/data';
import { fmtOv, inningsOf } from '@/lib/cricket';
import { SERIES_TABS as TABS } from '@/lib/constants';
import { has, param, type SearchParams } from '@/lib/params';
import { MobilePromo } from '@/components/Rotator';
import { Card, Flag, MatchRow } from '@/components/ui';
import SeriesTabs from '@/components/series/SeriesTabs';

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const id = param(await searchParams, 'id');
  const s = has(SERIES, id) ? SERIES[id] : null;
  return { title: s ? `${s.name} | MY99 EXCH` : 'Cricket Series | MY99 EXCH', description: 'Fixtures, points tables and stats for every series.' };
}

function SeriesList() {
  return (
    <Card><div className="px-4 pt-4 pb-2"><h1 className="font-display text-3xl font-bold">Cricket Series</h1></div>
      {['International', 'League', 'Domestic', 'Women'].map(c => [
        <h2 key={`h-${c}`} className="px-4 py-2 bg-slate-100 text-xs font-bold uppercase text-slate-500">{c}</h2>,
        <ul key={`l-${c}`}>{Object.entries(SERIES).filter(([, x]) => x.cat === c).map(([id, x]) => <li key={id}><Link href={`/series?id=${id}`} className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-100 hover:bg-brand-50 transition">
          <span><span className="block font-semibold text-slate-800">{x.name}</span><span className="text-xs text-slate-400">{x.dates}</span></span>
          <span className="flex -space-x-1.5">{x.teams.slice(0, 4).map(t => <Flag key={t} code={t} size="w-6 h-6" />)}</span></Link></li>)}</ul>
      ])}
    </Card>
  );
}

interface Fixture { desc: string; teams: string[]; venue: string; when: string; done: boolean }

function SeriesDetail({ sid, tab }: { sid: string; tab: string | null }) {
  const s = SERIES[sid];
  const active = tab && TABS.includes(tab) ? tab : 'Fixtures';
  const ms = MATCHES.filter(m => m.series === sid);

  // pad bilateral series with the remaining fixtures so the schedule looks complete
  const extra: Fixture[] = [];
  if (!s.table) {
    const fmt = ms[0].format, n = fmt === 'Test' ? 2 : 3, label = fmt === 'Test' ? 'Test' : fmt === 'ODI' ? 'ODI' : 'T20I';
    for (let i = 1; i <= n; i++) {
      const d = `${['1st', '2nd', '3rd'][i - 1]} ${label}`;
      if (!ms.some(m => m.desc === d)) extra.push({ desc: d, teams: s.teams, venue: ms[0].venue, when: i < +ms[0].desc[0] ? 'Completed' : `Nov ${i * 3 + 1}, 2026`, done: i < +ms[0].desc[0] });
    }
  }
  const fixtures = (
    <ul>{ms.map(m => <li key={m.id} className="border-b border-slate-100"><MatchRow m={m} /></li>)}
      {extra.map(f => <li key={f.desc} className="px-4 py-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <span><span className="block text-sm font-semibold text-slate-700">{teamShort(f.teams[0])} vs {teamShort(f.teams[1])}, {f.desc}</span><span className="text-xs text-slate-400">{f.venue}</span></span>
        <span className={`text-xs font-semibold ${f.done ? 'text-brand-600' : 'text-slate-500'}`}>{f.when}</span></li>)}</ul>
  );

  const table = s.table
    ? <>
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="bg-slate-100 text-slate-500 uppercase text-xs"><th className="px-3 py-2 text-left">#</th><th className="px-3 py-2 text-left">Team</th><th className="px-3 py-2">M</th><th className="px-3 py-2">W</th><th className="px-3 py-2">L</th><th className="px-3 py-2">Pts</th><th className="px-3 py-2">{s.table === 'ptl' ? 'NRR' : 'Quotient'}</th></tr></thead>
          <tbody>{TABLES[s.table].map((r, i) => <tr key={r[0]} className={`border-b border-slate-100 hover:bg-brand-50 ${i < (s.table === 'ptl' ? 4 : 2) ? '' : 'text-slate-500'}`}><td className="px-3 py-2.5">{i + 1}</td><td className="px-3 py-2.5"><span className="flex items-center gap-2 font-semibold"><Flag code={r[0]} size="w-5 h-5" />{TEAMS[r[0]].name}</span></td>
            {r.slice(1).map((v, k) => <td key={k} className={`px-3 py-2.5 text-center tabular-nums ${k === 3 ? 'font-bold text-slate-800' : ''}`}>{v}</td>)}</tr>)}</tbody></table></div>
        <p className="px-4 py-3 text-xs text-slate-400">Top {s.table === 'ptl' ? 'four teams qualify for the playoffs' : 'two teams qualify for the knockouts'}.</p>
      </>
    : <div className="p-6 text-center"><p className="font-display text-2xl font-bold">{s.standing}</p><div className="flex justify-center gap-6 mt-4">{s.teams.map(t => <span key={t} className="flex flex-col items-center gap-2"><Flag code={t} size="w-12 h-12" /><b className="text-sm">{TEAMS[t].name}</b></span>)}</div>
        <p className="text-xs text-slate-400 mt-4">Bilateral series — no points table.</p></div>;

  // aggregate player stats from every simulated innings in the series
  const runs: Record<string, { name: string; team: string; r: number; b: number; inns: number }> = {};
  const wkts: Record<string, { name: string; team: string; w: number; r: number; balls: number }> = {};
  ms.forEach(m => inningsOf(m).forEach(inn => {
    inn.bat.forEach(b => { const k = b.name; runs[k] = runs[k] || { name: k, team: inn.team, r: 0, b: 0, inns: 0 }; runs[k].r += b.r; runs[k].b += b.b; runs[k].inns++; });
    inn.bowlers.forEach(b => { const k = b.name; wkts[k] = wkts[k] || { name: k, team: inn.bowlTeam, w: 0, r: 0, balls: 0 }; wkts[k].w += b.w; wkts[k].r += b.r; wkts[k].balls += b.balls; });
  }));
  const topR = Object.values(runs).sort((a, b) => b.r - a.r).slice(0, 5), topW = Object.values(wkts).sort((a, b) => b.w - a.w || a.r - b.r).slice(0, 5);
  const statTable = (title: string, cols: string[], rows: ReactNode[][]) => (
    <div><h3 className="font-display text-xl font-bold px-4 pt-4 pb-2">{title}</h3><div className="overflow-x-auto"><table className="w-full text-sm">
      <thead><tr className="bg-slate-100 text-slate-500 uppercase text-xs">{cols.map((c, i) => <th key={i} className={`px-3 py-2 ${i ? 'text-right' : 'text-left'}`}>{c}</th>)}</tr></thead>
      <tbody>{rows.map((r, k) => <tr key={k} className="border-b border-slate-100 hover:bg-brand-50">{r.map((v, i) => <td key={i} className={`px-3 py-2 ${i ? 'text-right tabular-nums' : ''}`}>{v}</td>)}</tr>)}</tbody></table></div></div>
  );
  const player = (p: { team: string; name: string }) => <span className="flex items-center gap-2"><Flag code={p.team} size="w-4 h-4" /><b className="font-semibold">{p.name}</b></span>;
  const stats = topR.length
    ? <div className="grid xl:grid-cols-2 gap-2 pb-4">{statTable('Most Runs', ['Player', 'Inns', 'Runs', 'SR'], topR.map(p => [player(p), p.inns, <b key="r">{p.r}</b>, (p.r * 100 / Math.max(1, p.b)).toFixed(1)]))}
        {statTable('Most Wickets', ['Player', 'Overs', 'Wkts', 'Econ'], topW.map(p => [player(p), fmtOv(p.balls), <b key="w">{p.w}</b>, (p.r * 6 / p.balls).toFixed(2)]))}</div>
    : <p className="p-8 text-center text-sm text-slate-400">Stats will appear once the series gets under way.</p>;

  return (
    <>
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-navy-700 to-navy-900 text-white p-6">
        <div className="absolute -right-10 -bottom-16 w-60 h-60 rounded-full bg-gold-500/20 blur-3xl" aria-hidden="true"></div>
        <Link href="/series" className="text-xs text-white/60 hover:text-gold-400">← All series</Link>
        <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">{s.name}</h1>
        <p className="text-sm text-white/70 mt-1">{s.dates} · {s.cat}</p>
        <div className="flex -space-x-2 mt-4">{s.teams.map(t => <Flag key={t} code={t} size="w-10 h-10" />)}</div>
      </div>
      <Card className="overflow-hidden"><SeriesTabs key={active} initial={active} panels={{ 'Fixtures': fixtures, 'Points Table': table, 'Stats': stats }} /></Card>
      <MobilePromo />
    </>
  );
}

export default async function SeriesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const sid = param(sp, 'id');
  return has(SERIES, sid) ? <SeriesDetail key={sid} sid={sid} tab={param(sp, 'tab')} /> : <SeriesList />;
}
