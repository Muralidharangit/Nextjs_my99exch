import type { Metadata } from 'next';
import { MATCHES, TEAMS, matchById, sidesOf } from '@/lib/data';
import { param, type SearchParams } from '@/lib/params';
import MatchDetail from '@/components/match/MatchDetail';

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const m = matchById(param(await searchParams, 'id')) || MATCHES[0];
  const [home, away] = sidesOf(m);
  return { title: `${TEAMS[home].name} vs ${TEAMS[away].name}, ${m.desc} – Live Score | MY99 EXCH`, description: 'Live score, scorecard and ball-by-ball commentary.' };
}

export default async function MatchDetailPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const id = param(sp, 'id'), tab = param(sp, 'tab');
  // remount when another match or tab is opened through a link (fresh state, like a page load)
  return <MatchDetail key={`${id}|${tab}`} id={id} tab={tab} />;
}
