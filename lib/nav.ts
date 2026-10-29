/* Site navigation */
import { SERIES, TEAMS, GAME_CATS } from './data';

export interface NavItem { label: string; href?: string; page?: string; items?: [string, string][] }

export const NAV: NavItem[] = [
  { label: 'Live Scores', href: '/matches', page: 'matches' },
  { label: 'Schedule', href: '/matches?tab=Upcoming' },
  { label: 'Archives', href: '/matches?tab=Recent' },
  { label: 'News', page: 'news', items: [['Latest News', '/news'], ['Squads', '/news?cat=Squads'], ['Previews', '/news?cat=Preview'], ['Interviews', '/news?cat=Interview'], ['Women', '/news?cat=Women']] },
  { label: 'Series', page: 'series', items: [['All Series', '/series'], ...Object.entries(SERIES).slice(0, 7).map(([id, s]): [string, string] => [s.name, `/series?id=${id}`])] },
  { label: 'Teams', items: ['IND', 'AUS', 'ENG', 'PAK', 'SA', 'NZ', 'BAN', 'WI', 'SL', 'AFG'].map((c): [string, string] => [TEAMS[c].name, `/matches?team=${c}&tab=Recent`]) },
  { label: 'Games', page: 'games', items: GAME_CATS.map((c): [string, string] => [c === 'All' ? 'All Games' : c, c === 'All' ? '/games' : `/games?cat=${encodeURIComponent(c)}`]) },
  { label: 'Rankings', items: [['Test Rankings', '/page-content?p=rankings#Test'], ['ODI Rankings', '/page-content?p=rankings#ODI'], ['T20I Rankings', '/page-content?p=rankings#T20']] },
  { label: 'More', items: [['About Us', '/page-content?p=about'], ['Contact', '/page-content?p=contact'], ['Terms', '/page-content?p=terms'], ['Privacy', '/page-content?p=privacy']] }
];

/** page id used for the active state in the header and bottom nav */
const PAGES: Record<string, string> = {
  '/': 'home', '/matches': 'matches', '/match-detail': 'match', '/series': 'series',
  '/news': 'news', '/games': 'games', '/game-detail': 'games', '/page-content': 'page'
};
export const pageOf = (pathname: string) => PAGES[pathname] || '';
