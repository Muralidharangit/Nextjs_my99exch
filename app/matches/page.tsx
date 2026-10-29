import type { Metadata } from 'next';
import { TEAMS } from '@/lib/data';
import { has, param, type SearchParams } from '@/lib/params';
import { MATCH_CATS as CATS, MATCH_STATES as STATES } from '@/lib/constants';
import MatchesView from '@/components/matches/MatchesView';

export const metadata: Metadata = { title: 'Live Cricket Scores | MY99 EXCH', description: 'Live, recent and upcoming cricket matches.' };

export default async function MatchesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const tab = param(sp, 'tab'), cat = param(sp, 'cat'), team = param(sp, 'team');
  const state = tab && STATES.includes(tab) ? tab : 'Live';
  const c = cat && CATS.includes(cat) ? cat : 'All';
  const t = has(TEAMS, team) ? team : null;
  // remount when the query changes through a link (fresh state, like a page load)
  return <MatchesView key={`${state}|${c}|${t}`} initialState={state} initialCat={c} team={t} />;
}
