/* Site navigation */
import { REGISTER_URL } from './constants';

export interface NavItem { label: string; href?: string; page?: string; items?: [string, string][] }

export const NAV: NavItem[] = [
  { label: 'Live Scores', href: REGISTER_URL, page: 'matches' },
  { label: 'Schedule', href: REGISTER_URL },
  { label: 'Archives', href: REGISTER_URL },
  {
    label: 'News',
    href: REGISTER_URL,
    page: 'news',
    items: [
      ['Latest News', REGISTER_URL],
      ['Squads', REGISTER_URL],
      ['Previews', REGISTER_URL],
      ['Interviews', REGISTER_URL],
      ['Women', REGISTER_URL]
    ]
  },
  {
    label: 'Series',
    href: REGISTER_URL,
    page: 'series',
    items: [
      ['All Series', REGISTER_URL],
      ['India tour of Australia', REGISTER_URL],
      ['England tour of New Zealand', REGISTER_URL],
      ['South Africa tour of Sri Lanka', REGISTER_URL],
      ['Pakistan tour of Zimbabwe', REGISTER_URL],
      ['Bangladesh Premier League', REGISTER_URL],
      ['Big Bash League', REGISTER_URL],
      ['Ranji Trophy 2024-25', REGISTER_URL]
    ]
  },
  {
    label: 'Teams',
    href: REGISTER_URL,
    items: [
      ['India', REGISTER_URL],
      ['Australia', REGISTER_URL],
      ['England', REGISTER_URL],
      ['Pakistan', REGISTER_URL],
      ['South Africa', REGISTER_URL],
      ['New Zealand', REGISTER_URL],
      ['Bangladesh', REGISTER_URL],
      ['West Indies', REGISTER_URL],
      ['Sri Lanka', REGISTER_URL],
      ['Afghanistan', REGISTER_URL]
    ]
  },
  {
    label: 'Games',
    href: REGISTER_URL,
    page: 'games',
    items: [
      ['All Games', REGISTER_URL],
      ['Cricket', REGISTER_URL],
      ['Football', REGISTER_URL],
      ['Basketball', REGISTER_URL],
      ['Esports', REGISTER_URL],
      ['Quiz', REGISTER_URL]
    ]
  },
  {
    label: 'Rankings',
    href: REGISTER_URL,
    items: [
      ['Test Rankings', REGISTER_URL],
      ['ODI Rankings', REGISTER_URL],
      ['T20I Rankings', REGISTER_URL]
    ]
  },
  {
    label: 'More',
    items: [
      ['About Us', '/about-us'],
      ['Contact Us', '/contact-us'],
      ['Terms and Conditions', '/terms-and-conditions'],
      ['Privacy Policy', '/privacy-policy']
    ]
  }
];

/** page id used for the active state in the header and bottom nav */
const PAGES: Record<string, string> = {
  '/': 'home', '/matches': 'matches', '/match-detail': 'match', '/series': 'series',
  '/news': 'news', '/games': 'games', '/game-detail': 'games', '/page-content': 'page',
  '/about-us': 'page', '/contact-us': 'page', '/terms-and-conditions': 'page', '/privacy-policy': 'page'
};
export const pageOf = (pathname: string) => PAGES[pathname] || '';
