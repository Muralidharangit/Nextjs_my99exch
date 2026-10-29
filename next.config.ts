import type { NextConfig } from 'next';

/* Old static-site URLs keep working: /matches.html?tab=Recent -> /matches?tab=Recent (query string is carried over). */
const LEGACY: [string, string][] = [
  ['/index.html', '/'],
  ['/matches.html', '/matches'],
  ['/match-detail.html', '/match-detail'],
  ['/series.html', '/series'],
  ['/news.html', '/news'],
  ['/games.html', '/games'],
  ['/game-detail.html', '/game-detail'],
  ['/page.html', '/page-content']
];

const nextConfig: NextConfig = {
  async redirects() {
    return LEGACY.map(([source, destination]) => ({ source, destination, permanent: true }));
  }
};

export default nextConfig;
