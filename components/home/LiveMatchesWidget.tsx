'use client';
/* Home "Live Matches" card: state tabs + category pills */
import { useState } from 'react';
import { MATCHES } from '@/lib/data';
import type { Match } from '@/lib/types';
import { TabBar } from '../Tabs';
import { Card, MatchRow, Pills, SectionHead } from '../ui';

export default function LiveMatchesWidget() {
  const [hmState, setHmState] = useState('Live');
  const [hmCat, setHmCat] = useState('All');
  const list = MATCHES.filter(m => m.state === hmState.toLowerCase() && (hmCat === 'All' || m.cat === hmCat));
  const groups: Record<string, Match[]> = {};
  list.forEach(m => (groups[m.cat] = groups[m.cat] || []).push(m));
  return (
    <Card>
      <SectionHead title="Live Matches" href="/matches" />
      <TabBar items={['Live', 'Recent', 'Upcoming']} active={hmState} onSelect={setHmState} idPrefix="hm" label="Match state" panels={false} />
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3" id="hm-filters"><Pills items={['All', 'International', 'League', 'Domestic', 'Women']} active={hmCat} onSelect={setHmCat} /></div>
      <div id="hm-list">
        {list.length ? Object.entries(groups).map(([cat, ms]) => [
          <h3 key={cat} className="px-4 py-1.5 bg-slate-100 text-xs font-bold uppercase text-slate-500">{cat}</h3>,
          ...ms.slice(0, 3).map(m => <MatchRow key={m.id} m={m} />)
        ]) : <p className="px-4 py-8 text-center text-sm text-slate-400">No {hmState.toLowerCase()} matches in this category.</p>}
      </div>
    </Card>
  );
}
