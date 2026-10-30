/* Home page */
import Link from 'next/link';
import { ADS, GAMES, NEWS } from '@/lib/data';
import { REGISTER_URL } from '@/lib/constants';
import type { Game, NewsItem } from '@/lib/types';
import { ICON } from '@/components/icons';
import { MobilePromo, Rotator } from '@/components/Rotator';
import { Card, Flag, PlayBtn, SectionHead, SmartLink } from '@/components/ui';
import MatchCarousel from '@/components/home/MatchCarousel';
import BlogCarousel from '@/components/home/BlogCarousel';
import LiveMatchesWidget from '@/components/home/LiveMatchesWidget';

const news = NEWS.slice(1, 5), featured = NEWS[0], more = NEWS.slice(5);

function NewsItemRow({ n, big }: { n: NewsItem; big?: boolean }) {
  return (
    <li><Link href={`/blog/${n.id}`} className="flex gap-3 py-3 group">
      <img src={n.img} alt="" className={`${big ? 'w-24 h-16' : 'w-[72px] h-14'} rounded-lg object-cover shrink-0`} loading="lazy" />
      <span className="min-w-0"><span className="block text-sm font-semibold text-slate-800 group-hover:text-brand-500 leading-snug line-clamp-2">{n.title}</span>
        <span className="flex items-center gap-1 text-xs text-slate-400 mt-1">{ICON.clock}{n.time}</span></span></Link></li>
  );
}

/* The two India pills use the default slate colours; Games and Series use their own violet / orange colours. */
const quick: [string, string, React.ReactNode, string][] = [
  ['India – Men', REGISTER_URL, <Flag key="i" code="IND" size="w-9 h-9" />, 'border-slate-200 text-slate-700 hover:border-brand-500'],
  ['India – Women', REGISTER_URL, <Flag key="w" code="INDW" size="w-9 h-9" />, 'border-slate-200 text-slate-700 hover:border-brand-500'],
  ['Games', REGISTER_URL, <span key="g" className="w-9 h-9 rounded-full bg-violet-600 text-white grid place-items-center">{ICON.game}</span>, 'bg-violet-50 border-violet-200 text-violet-700 hover:border-violet-500'],
  ['Series', REGISTER_URL, <span key="s" className="w-9 h-9 rounded-full bg-orange-500 text-white grid place-items-center">{ICON.trophy}</span>, 'bg-orange-50 border-orange-200 text-orange-600 hover:border-orange-500']
];

function FeaturedGameCard({ g }: { g: Game }) {
  return (
    <article className="group relative rounded-xl overflow-hidden bg-navy-900 shadow-card">
      <SmartLink href={REGISTER_URL} className="block aspect-[137/118] overflow-hidden"><img src={g.img} alt={g.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy" /></SmartLink>
      <div className="p-3 bg-gradient-to-b from-navy-800 to-navy-900">
        <p className="text-white text-xs font-medium mb-2 truncate">{g.tagline}</p>
        <PlayBtn label="Play Now →" href={REGISTER_URL} extra="w-full text-xs py-1.5" />
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only">MY99 EXCH live cricket scores</h1>
      <MatchCarousel />

      <Rotator slides={ADS.strip} aspect="aspect-[6/1]" label="Promotions" />

      <Card>
        <h2 className="font-display text-xl font-bold px-4 pt-3">Quick Access</h2>
        <div className="grid grid-cols-2 2xl:grid-cols-4 gap-3 p-4 pt-3">{quick.map(([l, h, ic, c], idx) => <SmartLink key={`${l}-${idx}`} href={h} className={`flex items-center gap-2.5 rounded-full border pl-1.5 pr-4 min-h-[48px] text-sm font-semibold shadow-sm hover:shadow-card transition duration-300 ${c}`}>{ic}<span className="truncate">{l}</span></SmartLink>)}</div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card><SectionHead title="Latest News" href={REGISTER_URL} /><ul className="px-4 pb-2 divide-y divide-slate-100">{news.map(n => <NewsItemRow key={n.id} n={n} />)}</ul></Card>
        <Card><Link href={`/blog/${featured.id}`} className="group block p-3">
          <div className="relative rounded-lg overflow-hidden aspect-[259/115]"><img src={featured.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" /></div>
          <div className="px-1 pt-3">
            <span className="inline-block rounded px-2 py-0.5 text-[11px] font-bold bg-brand-50 text-brand-600 uppercase">{featured.cat}</span>
            <h3 className="font-display text-2xl font-bold leading-tight mt-2 group-hover:text-brand-500 transition">{featured.title}</h3>
            <p className="text-sm text-slate-500 mt-2">{featured.summary}</p>
            <div className="flex items-center justify-between mt-3 text-xs"><span className="flex items-center gap-1 text-slate-400">{ICON.clock}{featured.time}</span><span className="font-semibold text-brand-500 flex items-center gap-1">Read More {ICON.arrow}</span></div>
          </div></Link></Card>
      </div>

      <BlogCarousel title="Trending Stories" />

      <MobilePromo />

      <Card><SectionHead title="Featured Games" href={REGISTER_URL} /><div className="grid grid-cols-2 lg:grid-cols-4 gap-3 px-4 pb-4">{GAMES.slice(0, 4).map(g => <FeaturedGameCard key={g.id} g={g} />)}</div></Card>

      {more.length > 0 ? (
        <Card><SectionHead title="More News" href={REGISTER_URL} /><ul className="px-4 pb-2 divide-y divide-slate-100">{more.map(n => <NewsItemRow key={n.id} n={n} big />)}</ul></Card>
      ) : null}

      <MobilePromo />

      <LiveMatchesWidget />
    </>
  );
}
