'use client';
/* Live Scores / Schedule / Archives — match list grouped by series */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MATCHES, SERIES, TEAMS } from '@/lib/data';
import type { Match } from '@/lib/types';
import { replaceQuery } from '@/lib/params';
import { MATCH_CATS as CATS, MATCH_STATES as STATES } from '@/lib/constants';
import { MobilePromo } from '../Rotator';
import { TabBar } from '../Tabs';
import { Card, Flag, MatchRow, Pills } from '../ui';

const titles: Record<string, string> = { Live: 'Live Cricket Scores', Recent: 'Recent Results', Upcoming: 'Cricket Schedule' };

export default function MatchesView({ initialState, initialCat, team }: { initialState: string; initialCat: string; team: string | null }) {
  const [state, setState] = useState(initialState);
  const [cat, setCat] = useState(initialCat);
  const list = MATCHES.filter(m => m.state === state.toLowerCase() && (cat === 'All' || m.cat === cat) && (!team || m.teams.includes(team)));
  const groups: Record<string, Match[]> = {};
  list.forEach(m => (groups[m.series] = groups[m.series] || []).push(m));

  useEffect(() => {
    replaceQuery(u => { u.searchParams.set('tab', state); if (cat === 'All') u.searchParams.delete('cat'); else u.searchParams.set('cat', cat); });
  }, [state, cat]);

  return (
    <>
      <Card>
        <div className="px-4 pt-4">
          <h1 className="font-display text-2xl md:text-3xl font-bold" id="ml-title">{titles[state]}</h1>
          {team ? <p className="text-sm text-slate-500 mt-1 flex items-center gap-2"><Flag code={team} size="w-5 h-5" /> Showing matches for <b className="text-slate-700">{TEAMS[team].name}</b> · <Link className="text-brand-500 hover:underline" href={`/matches?tab=${state}`}>Clear</Link></p> : null}
        </div>
        <div className="mt-2"><TabBar items={STATES} active={state} onSelect={setState} idPrefix="ml" label="Match state" panels={false} /></div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3" id="ml-filters"><Pills items={CATS} active={cat} onSelect={setCat} /></div>
        <div id="ml-list" aria-live="polite">
          {list.length ? Object.entries(groups).map(([sid, ms]) => [
            <div key={sid} className="flex items-center justify-between px-4 py-2 bg-slate-100 border-y border-slate-200">
              <Link href={`/series?id=${sid}`} className="text-sm font-bold text-slate-700 hover:text-brand-500">{SERIES[sid].name}</Link>
              <span className="text-[11px] uppercase font-semibold text-slate-400">{SERIES[sid].cat}</span>
            </div>,
            ...ms.map(m => <MatchRow key={m.id} m={m} />)
          ]) : <div className="px-4 py-12 text-center"><p className="text-slate-500 font-medium">No {state.toLowerCase()} matches{cat !== 'All' ? ' in ' + cat : ''}{team ? ' for ' + TEAMS[team].name : ''}.</p>
            <Link href="/matches" className="inline-block mt-3 text-sm font-semibold text-brand-500 hover:underline">See all live matches</Link></div>}
        </div>
      </Card>
      <MobilePromo />
    </>
  );
}
