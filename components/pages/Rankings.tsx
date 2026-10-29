'use client';
/* Team rankings with format tabs; the #Test / #ODI / #T20 hash picks and follows the tab */
import { useEffect, useState } from 'react';
import { RANKINGS, TEAMS } from '@/lib/data';
import { TabBar } from '../Tabs';
import { Card, Flag } from '../ui';

const fmts = Object.keys(RANKINGS);
const fromHash = () => { const h = window.location.hash.slice(1); return fmts.includes(h) ? h : 'Test'; };

export default function Rankings({ title }: { title: string }) {
  const [active, setActive] = useState('Test');
  // the hash is only known in the browser; also follow hash links clicked while already on this page
  useEffect(() => {
    const sync = () => setActive(fromHash());
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  const select = (v: string) => { setActive(v); window.history.replaceState(window.history.state, '', '#' + v); };
  return (
    <Card className="overflow-hidden">
      <h1 className="font-display text-3xl font-bold px-4 pt-4">{title}</h1>
      <TabBar items={fmts} active={active} onSelect={select} idPrefix="rk" label="Format" />
      {fmts.map(f => <div key={f} id={`rk-panel-${f.toLowerCase()}`} role="tabpanel" aria-labelledby={`rk-${f.toLowerCase()}`} hidden={f !== active}>
        <table className="w-full text-sm"><thead><tr className="bg-slate-100 text-slate-500 uppercase text-xs"><th className="px-4 py-2 text-left">Rank</th><th className="px-4 py-2 text-left">Team</th><th className="px-4 py-2 text-right">Rating</th></tr></thead>
          <tbody>{RANKINGS[f].map(([t, r], i) => <tr key={t} className="border-b border-slate-100 hover:bg-brand-50"><td className={`px-4 py-2.5 font-bold ${i < 3 ? 'text-gold-600' : 'text-slate-400'}`}>{i + 1}</td>
            <td className="px-4 py-2.5"><span className="flex items-center gap-2 font-semibold"><Flag code={t} size="w-6 h-6" />{TEAMS[t].name}</span></td><td className="px-4 py-2.5 text-right font-display text-lg font-bold">{r}</td></tr>)}</tbody></table></div>)}
    </Card>
  );
}
