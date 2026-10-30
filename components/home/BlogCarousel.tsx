'use client';
/* Moving Blog / News Carousel with Swiper: autoplay, pagination dots, responsive slides */
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Swiper from 'swiper';
import { A11y, Autoplay, Keyboard, Pagination } from 'swiper/modules';
import { NEWS } from '@/lib/data';
import type { NewsItem } from '@/lib/types';
import { ICON } from '../icons';
import { Card, SectionHead } from '../ui';

function BlogSlideCard({ n }: { n: NewsItem }) {
  return (
    <article className="swiper-slide !h-auto flex flex-col bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden group hover:-translate-y-1 hover:shadow-lift transition duration-300">
      <Link href={`/blog/${n.id}`} className="block relative aspect-[16/9] overflow-hidden bg-slate-100">
        <img
          src={n.img}
          alt={n.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          loading="lazy"
        />
        <span className="absolute top-2.5 left-2.5 rounded px-2 py-0.5 text-[10px] font-bold bg-brand-50/95 text-brand-600 uppercase backdrop-blur-sm shadow-sm">
          {n.cat}
        </span>
      </Link>

      <div className="p-3.5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-base md:text-lg leading-snug text-slate-800 group-hover:text-brand-500 transition line-clamp-2">
          <Link href={`/blog/${n.id}`}>{n.title}</Link>
        </h3>
        <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed flex-1">
          {n.summary}
        </p>
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 text-xs">
          <span className="flex items-center gap-1 text-slate-400">
            {ICON.clock}{n.time}
          </span>
          <Link
            href={`/blog/${n.id}`}
            className="font-semibold text-brand-500 hover:text-brand-600 flex items-center gap-1"
          >
            Read More {ICON.arrow}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function BlogCarousel({
  title = 'Trending Stories',
  items = NEWS
}: {
  title?: string;
  items?: NewsItem[];
}) {
  const track = useRef<HTMLDivElement>(null);
  const dots = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!track.current) return;
    const swiper = new Swiper(track.current, {
      modules: [Autoplay, Pagination, Keyboard, A11y],
      slidesPerView: 1.15,
      spaceBetween: 14,
      loop: items.length > 3,
      speed: 600,
      grabCursor: true,
      autoplay: {
        delay: 4000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false
      },
      pagination: {
        el: dots.current!,
        clickable: true
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 16 },
        1024: { slidesPerView: 3, spaceBetween: 16 }
      },
      a11y: {
        prevSlideMessage: 'Previous story',
        nextSlideMessage: 'Next story',
        paginationBulletMessage: 'Go to slide {{index}}'
      }
    });

    return () => swiper.destroy(true, true);
  }, [items]);

  return (
    <Card className="overflow-hidden">
      <SectionHead title={title} href="/news" />
      <div className="px-4 pb-2">
        <div ref={track} className="swiper py-2 -my-2">
          <div className="swiper-wrapper">
            {items.map((n) => (
              <BlogSlideCard key={n.id} n={n} />
            ))}
          </div>
        </div>
        <div ref={dots} className="promo-dots flex justify-center items-center mt-3 min-h-[24px]"></div>
      </div>
    </Card>
  );
}
