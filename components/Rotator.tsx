'use client';
/* Promotion rotator (Swiper) and the mobile promo slot */
import { memo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Swiper from 'swiper';
import { SmartLink } from './ui';
import { A11y, Autoplay, Keyboard, Pagination } from 'swiper/modules';
import { ADS } from '@/lib/data';
import type { AdSlide } from '@/lib/types';

function AdInner({ s, i, wide }: { s: AdSlide; i: number; wide: boolean }) {
  const loading = i ? 'lazy' as const : undefined;
  if (!s.title) return <img src={s.img} loading={loading} alt={s.alt} className={`w-full h-full object-cover ${s.pos || ''}`} decoding="async" />;
  if (wide) return (
    <>
      <img src={s.img} loading={loading} alt="" className="absolute inset-0 w-full h-full object-cover object-right" decoding="async" />
      <span className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-transparent"></span>
      <span className="absolute inset-0 flex items-center justify-between gap-4 px-5 md:px-8">
        <span className="min-w-0"><span className="block font-display font-bold uppercase leading-none text-gold-400 text-2xl md:text-3xl drop-shadow">{s.title}</span>
          <span className="block text-white/90 text-xs md:text-sm mt-1">{s.sub}</span></span>
        <span className="shrink-0 rounded-full px-4 md:px-6 py-2 text-xs md:text-sm font-bold text-navy-900 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 shadow-glow">EXPLORE →</span>
      </span>
    </>
  );
  return (
    <>
      <img src={s.img} loading={loading} alt="" className="absolute inset-0 w-full h-full object-cover" decoding="async" />
      <span className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/40 to-navy-900/10"></span>
      <span className="absolute inset-x-0 bottom-0 p-4 flex flex-col items-center text-center gap-2">
        <img src="/images/logo.webp" alt="MY99 EXCH" className="h-5 w-auto" />
        <span className="font-display font-bold uppercase leading-none text-gold-400 text-2xl drop-shadow">{s.title}</span>
        <span className="text-white/90 text-xs">{s.sub}</span>
        <span className="mt-1 rounded-full px-4 py-1.5 text-xs font-bold text-navy-900 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 shadow-glow">VIEW MATCHES</span>
      </span>
    </>
  );
}

function RotatorImpl({ slides, aspect, label = 'Promotions', wide = false }: { slides: AdSlide[]; aspect: string; label?: string; wide?: boolean }) {
  const el = useRef<HTMLDivElement>(null);
  const dots = useRef<HTMLDivElement>(null);
  const slideList = slides.length > 0 && slides.length < 5 ? [...slides, ...slides] : slides;
  useEffect(() => {
    const swiper = new Swiper(el.current!, {
      modules: [Autoplay, Pagination, Keyboard, A11y],
      loop: slideList.length > 1,
      speed: 600,
      grabCursor: true,
      autoplay: { delay: 5000, pauseOnMouseEnter: true, disableOnInteraction: false },
      pagination: { el: dots.current!, clickable: true },
      keyboard: { enabled: true, onlyInViewport: true },
      a11y: { prevSlideMessage: 'Previous promotion', nextSlideMessage: 'Next promotion', paginationBulletMessage: 'Show promotion {{index}}' },
      observer: true, observeParents: true
    });
    return () => swiper.destroy(true, true);
  }, [slideList.length]);
  return (
    <div data-rotator role="region" aria-label={label}>
      <div ref={el} className={`swiper rounded-xl overflow-hidden shadow-card bg-navy-900 ${aspect}`}>
        <div className="swiper-wrapper">{slideList.map((s, i) => <SmartLink key={i} href={s.href} className="swiper-slide relative block"><AdInner s={s} i={i} wide={wide} /></SmartLink>)}</div>
      </div>
      <div ref={dots} className="promo-dots flex justify-center items-center mt-1 min-h-[24px]"></div>
    </div>
  );
}
export const Rotator = memo(RotatorImpl);

/* full-width promo slot shown between sections on phones only */
export const MobilePromo = () => <div className="md:hidden max-w-[300px] w-full mx-auto"><Rotator slides={ADS.box} aspect="aspect-[22/30]" label="Sponsored" /></div>;
