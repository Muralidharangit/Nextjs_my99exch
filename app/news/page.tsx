import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { NEWS } from '@/lib/data';
import { BLOG_ARTICLES } from '@/lib/blogData';
import { param, type SearchParams } from '@/lib/params';
import { MobilePromo } from '@/components/Rotator';
import NewsList from '@/components/news/NewsList';

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const id = param(await searchParams, 'id');
  const blog = BLOG_ARTICLES.find(a => a.id === id || a.slug === id);
  if (blog) {
    return { title: `${blog.metaTitle} | MY99 EXCH News`, description: blog.metaDescription };
  }
  const article = NEWS.find(n => n.id === id);
  return { title: article ? `${article.title} | MY99 EXCH News` : 'Cricket News | MY99 EXCH', description: 'Latest cricket news, previews and interviews.' };
}

export default async function NewsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const id = param(sp, 'id');
  if (id) {
    redirect(`/blog/${id}`);
  }

  const ncat = param(sp, 'cat');
  const cats = ['All', ...new Set(NEWS.map(n => n.cat))];
  const active = ncat && cats.includes(ncat) ? ncat : 'All';
  return (
    <>
      <NewsList key={active} cats={cats} initial={active} />
      <MobilePromo />
    </>
  );
}
