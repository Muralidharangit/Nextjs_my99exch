import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_ARTICLES } from '@/lib/blogData';
import { ICON } from '@/components/icons';
import { Card, SectionHead } from '@/components/ui';
import { MobilePromo } from '@/components/Rotator';

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({
    slug: article.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug || a.id === slug);
  if (!article) return { title: 'Blog | MY99 EXCH' };

  return {
    title: `${article.metaTitle} | MY99 EXCH`,
    description: article.metaDescription,
    keywords: article.metaKeywords,
    alternates: {
      canonical: `/blog/${article.slug}`
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: 'article',
      publishedTime: '2026-10-30T00:00:00.000Z',
      images: [
        {
          url: article.img,
          width: 1200,
          height: 630,
          alt: article.title
        }
      ]
    }
  };
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug || a.id === slug);

  if (!article) {
    notFound();
  }

  const related = BLOG_ARTICLES.filter((a) => a.id !== article.id);

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.summary,
    image: article.img,
    datePublished: '2026-10-30T00:00:00.000Z',
    dateModified: '2026-10-30T00:00:00.000Z',
    author: {
      '@type': 'Organization',
      name: 'MY99 EXCH Desk'
    },
    publisher: {
      '@type': 'Organization',
      name: 'MY99 EXCH',
      logo: {
        '@type': 'ImageObject',
        url: 'https://my99exch.mobi/images/logo.webp'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://my99exch.mobi/blog/${article.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-xs text-slate-500 mb-1" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand-500">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/news" className="hover:text-brand-500">News</Link>
        <span className="mx-1.5">/</span>
        <span className="text-slate-700 font-medium">{article.cat}</span>
      </nav>

      <Card>
        <article className="p-5 md:p-8">
          <span className="rounded px-2.5 py-0.5 text-[11px] font-bold bg-brand-50 text-brand-600 uppercase tracking-wide">
            {article.cat}
          </span>

          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mt-3 text-slate-900">
            {article.heading}
          </h1>

          <p className="text-slate-600 text-sm md:text-base mt-2 leading-relaxed font-medium">
            {article.summary}
          </p>

          <p className="flex items-center gap-2 text-xs text-slate-400 mt-4 pb-4 border-b border-slate-100">
            <b className="text-slate-700 font-semibold">MY99 EXCH Desk</b> · {ICON.clock} {article.time}
          </p>

          <div className="relative rounded-xl overflow-hidden my-5 aspect-[16/9] md:aspect-[16/8] bg-slate-100 shadow-sm">
            <img
              src={article.img}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose-news space-y-4 text-slate-700 text-sm md:text-base leading-relaxed">
            {article.paragraphs.map((para, i) => {
              // Format subsection headings if paragraph is short and looks like a heading
              const isHeading =
                para.length < 90 &&
                !para.endsWith('.') &&
                !para.endsWith('!') &&
                !para.endsWith('?') &&
                !para.startsWith('“') &&
                !para.startsWith('"') &&
                (para.startsWith('India') ||
                  para.startsWith('New Zealand') ||
                  para.startsWith('Squad') ||
                  para.startsWith('Match Details') ||
                  para.startsWith('What') ||
                  para.startsWith('Team News') ||
                  para.startsWith('Did You Know') ||
                  para.startsWith('Brief Scores') ||
                  para.startsWith('Meg Lanning') ||
                  para.startsWith('From Mysuru') ||
                  para.startsWith('The Importance') ||
                  para.startsWith('A Player Who') ||
                  para.startsWith('Learning and') ||
                  para.startsWith('A Promising') ||
                  para.startsWith('Nitish Kumar') ||
                  para.startsWith('Mohammed Siraj') ||
                  para.startsWith('Lyon Keeps') ||
                  para.startsWith('The Final Move') ||
                  para.startsWith('The Contest Is'));

              if (isHeading) {
                return (
                  <h2
                    key={i}
                    className="font-display text-xl md:text-2xl font-bold text-slate-900 pt-3 pb-1 border-l-4 border-brand-500 pl-3 mt-4"
                  >
                    {para}
                  </h2>
                );
              }

              return <p key={i}>{para}</p>;
            })}
          </div>

          <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-100">
            {['Cricket', article.cat, 'MY99EXCH', 'News', '30 October 2026'].map((t, i) => (
              <span
                key={i}
                className="rounded-full bg-slate-100 hover:bg-brand-50 hover:text-brand-600 transition px-3 py-1 text-xs text-slate-600 font-medium"
              >
                #{t.replace(/\s/g, '')}
              </span>
            ))}
          </div>
        </article>
      </Card>

      <MobilePromo />

      <Card>
        <SectionHead title="Related Stories" href="/news" />
        <ul className="px-4 pb-2 divide-y divide-slate-100">
          {related.map((item) => (
            <li key={item.id}>
              <Link
                href={`/blog/${item.slug}`}
                className="flex gap-4 py-4 group"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-24 h-16 md:w-32 md:h-20 rounded-lg object-cover shrink-0"
                  loading="lazy"
                />
                <span className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold uppercase text-brand-600">
                    {item.cat}
                  </span>
                  <span className="block font-display text-base md:text-lg font-bold leading-snug group-hover:text-brand-500 transition line-clamp-2">
                    {item.title}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                    {ICON.clock} {item.time}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
