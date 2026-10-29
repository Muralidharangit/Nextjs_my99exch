'use client';
/* News list with category pills */
import { useState } from 'react';
import { NEWS } from '@/lib/data';
import { Card, Pills } from '../ui';
import NewsListItem from './NewsListItem';

export default function NewsList({ cats, initial }: { cats: string[]; initial: string }) {
  const [active, setActive] = useState(initial);
  return (
    <Card>
      <div className="px-4 pt-4"><h1 className="font-display text-3xl font-bold">Cricket News</h1><p className="text-sm text-slate-500">Latest stories, previews, squads and interviews.</p></div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3" id="n-filters"><Pills items={cats} active={active} onSelect={setActive} /></div>
      <ul id="n-list" className="px-4 pb-2 divide-y divide-slate-100" aria-live="polite">{NEWS.filter(n => active === 'All' || n.cat === active).map(n => <NewsListItem key={n.id} n={n} />)}</ul>
    </Card>
  );
}
