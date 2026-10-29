/* News list (/news) and article (/news?id=...) */
import type { Metadata } from 'next';
import { Fragment } from 'react';
import Link from 'next/link';
import { NEWS, NEWS_BODY } from '@/lib/data';
import { param, type SearchParams } from '@/lib/params';
import { ICON } from '@/components/icons';
import { MobilePromo } from '@/components/Rotator';
import { Card, SectionHead } from '@/components/ui';
import NewsList from '@/components/news/NewsList';
import NewsListItem from '@/components/news/NewsListItem';

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const id = param(await searchParams, 'id');
  const article = NEWS.find(n => n.id === id);
  return { title: article ? `${article.title} | MY99 EXCH News` : 'Cricket News | MY99 EXCH', description: 'Latest cricket news, previews and interviews.' };
}

export default async function NewsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const id = param(sp, 'id');
  const article = NEWS.find(n => n.id === id);
  const ncat = param(sp, 'cat');

  if (article) return (
    <Fragment key={article.id}>
      <nav className="text-xs text-slate-500" aria-label="Breadcrumb"><Link href="/news" className="hover:text-brand-500">News</Link> / <Link href={`/news?cat=${article.cat}`} className="hover:text-brand-500">{article.cat}</Link></nav>
      <Card><article className="p-5 md:p-8">
        <span className="rounded px-2 py-0.5 text-[11px] font-bold bg-brand-50 text-brand-600 uppercase">{article.cat}</span>
        <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight mt-3">{article.title}</h1>
        <p className="text-slate-500 mt-2">{article.summary}</p>
        <p className="flex items-center gap-2 text-xs text-slate-400 mt-3 pb-4 border-b border-slate-100"><b className="text-slate-600">MY99 EXCH Desk</b> · {ICON.clock}{article.time}</p>
        <img src={article.img} alt="" className="w-full rounded-lg my-5 aspect-[16/8] object-cover" />
        <div className="prose-news">{NEWS_BODY.map((p, i) => <p key={i}>{p}</p>)}</div>
        <div className="flex flex-wrap gap-2 mt-4">{['Cricket', article.cat, 'Live Scores'].map((t, i) => <span key={i} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">#{t.replace(/\s/g, '')}</span>)}</div>
      </article></Card>
      <MobilePromo />
      <Card><SectionHead title="Related News" href="/news" /><ul className="px-4 pb-2 divide-y divide-slate-100">{NEWS.filter(n => n !== article).slice(0, 4).map(n => <NewsListItem key={n.id} n={n} />)}</ul></Card>
    </Fragment>
  );

  const cats = ['All', ...new Set(NEWS.map(n => n.cat))];
  const active = ncat && cats.includes(ncat) ? ncat : 'All';
  return (
    <>
      <NewsList key={active} cats={cats} initial={active} />
      <MobilePromo />
    </>
  );
}
