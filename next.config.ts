import type { NextConfig } from 'next';

const REGISTER_URL = 'https://my99exch.ai/players/register';

/* Old static-site URLs keep working or redirect appropriately */
const LEGACY: [string, string][] = [
  ['/index.html', '/'],
  ['/match-detail.html', '/match-detail']
];

const REDIRECT_PAGES = [
  '/matches',
  '/matches.html',
  '/series',
  '/series.html',
  '/news',
  '/news.html',
  '/games',
  '/games.html',
  '/page-content',
  '/page.html'
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...LEGACY.map(([source, destination]) => ({ source, destination, permanent: true })),
      ...REDIRECT_PAGES.map(source => ({ source, destination: REGISTER_URL, permanent: false }))
    ];
  }
};

export default nextConfig;
