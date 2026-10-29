'use client';
/* Series page tabs: all panels are rendered, the inactive ones hidden; the URL ?tab= follows the selection */
import { useState, type ReactNode } from 'react';
import { SERIES_TABS as TABS } from '@/lib/constants';
import { replaceQuery } from '@/lib/params';
import { TabBar } from '../Tabs';

export default function SeriesTabs({ initial, panels }: { initial: string; panels: Record<string, ReactNode> }) {
  const [active, setActive] = useState(initial);
  const select = (v: string) => { setActive(v); replaceQuery(u => u.searchParams.set('tab', v)); };
  return (
    <>
      <TabBar items={TABS} active={active} onSelect={select} idPrefix="sr" label="Series sections" />
      <div id="sr-panel-fixtures" role="tabpanel" aria-labelledby="sr-fixtures" hidden={active !== 'Fixtures'}>{panels['Fixtures']}</div>
      <div id="sr-panel-points-table" role="tabpanel" aria-labelledby="sr-points-table" hidden={active !== 'Points Table'}>{panels['Points Table']}</div>
      <div id="sr-panel-stats" role="tabpanel" aria-labelledby="sr-stats" hidden={active !== 'Stats'}>{panels['Stats']}</div>
    </>
  );
}
