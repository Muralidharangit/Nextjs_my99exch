'use client';
/* Home match carousel: live first, then upcoming, then recent, with a promo card after every 3 matches */
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Swiper from 'swiper';
import { A11y, Keyboard, Mousewheel, Navigation } from 'swiper/modules';
import { ADS, MATCHES, SERIES, TEAMS } from '@/lib/data';
import type { AdSlide, Match } from '@/lib/types';
import { ICON } from '../icons';
import { FormatBadge, LiveBadge, ScoreLine, statusColor } from '../ui';

const order = { live: 0, upcoming: 1, recent: 2 };
const carouselMatches = [...MATCHES].sort((a, b) => order[a.state] - order[b.state]);

function MatchCard({ m }: { m: Match }) {
  const s = SERIES[m.series];
  return (
    <article className="swiper-slide !h-auto relative flex flex-col bg-white rounded-xl shadow-card border border-slate-100 hover:-translate-y-1 hover:shadow-lift transition duration-300">
      <div className="px-4 pt-3 flex items-center justify-between gap-2 text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5 min-w-0">{m.state === 'live' ? <LiveBadge /> : null}<span className="truncate">{m.desc} · {s.name.split(',')[0]}</span></span><FormatBadge f={m.format} />
      </div>
      <Link href={`/match-detail?id=${m.id}`} className="block px-4 pt-3 pb-3 after:absolute after:inset-0 after:rounded-xl" aria-label={`${TEAMS[m.teams[0]].name} vs ${TEAMS[m.teams[1]].name}, ${m.desc}. ${m.status}`}>
        <div className="space-y-2"><ScoreLine m={m} code={m.teams[0]} big /><ScoreLine m={m} code={m.teams[1]} big /></div>
        <p className={`mt-3 text-xs font-semibold ${m.state === 'live' ? 'text-live' : statusColor(m)} truncate`}>{m.status}</p>
      </Link>
      <div className="mt-auto border-t border-slate-100 bg-slate-50 rounded-b-xl px-4 py-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        <Link href={`/series?id=${m.series}&tab=Fixtures`} className="relative z-10 flex items-center gap-1 hover:text-brand-500 min-h-[32px]">Schedule {ICON.arrow}</Link>
        <Link href={`/series?id=${m.series}&tab=${s.table ? 'Points Table' : 'Stats'}`} className="relative z-10 hover:text-brand-500 min-h-[32px] flex items-center">{s.table ? 'Table' : 'Stats'}</Link>
      </div>
    </article>
  );
}

/* promo slide: the portrait ad is shown whole over a blurred copy of itself */
const PromoCard = ({ ad }: { ad: AdSlide }) => (
  <Link href={ad.href} className="swiper-slide !h-auto relative block rounded-xl overflow-hidden shadow-card hover:-translate-y-1 hover:shadow-glow transition duration-300 bg-navy-900">
    <img src={ad.img} alt="" className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-60" loading="lazy" />
    <img src={ad.img} alt={ad.alt} className="absolute inset-0 w-full h-full object-contain" loading="lazy" />
  </Link>
);

export default function MatchCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const prev = useRef<HTMLButtonElement>(null);
  const next = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const swiper = new Swiper(track.current!, {
      modules: [Navigation, Keyboard, Mousewheel, A11y],
      slidesPerView: 1.2,
      spaceBetween: 12,
      breakpoints: { 768: { slidesPerView: 1.5 }, 1024: { slidesPerView: 2.5 } },
      speed: 500,
      grabCursor: true,
      freeMode: { enabled: false },
      navigation: { prevEl: prev.current, nextEl: next.current },
      keyboard: { enabled: true, onlyInViewport: true },
      mousewheel: { forceToAxis: true },
      a11y: { prevSlideMessage: 'Previous matches', nextSlideMessage: 'Next matches' }
    });
    return () => swiper.destroy(true, true);
  }, []);

  return (
    <section className="relative" aria-label="Featured matches">
      <button ref={prev} type="button" data-scroll="-1" className="mc-prev hidden md:grid absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-card place-items-center text-slate-700 hover:text-brand-500 hover:shadow-lift transition" aria-label="Previous matches">{ICON.left}</button>
      <div ref={track} id="mc-track" className="swiper py-2 -my-2 px-0.5">
        <div className="swiper-wrapper">
          {carouselMatches.map((m, i) => [
            <MatchCard key={m.id} m={m} />,
            (i + 1) % 3 === 0 ? <PromoCard key={`promo-${i}`} ad={ADS.box[((i + 1) / 3 - 1) % ADS.box.length]} /> : null
          ])}
        </div>
      </div>
      <button ref={next} type="button" data-scroll="1" className="mc-next hidden md:grid absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-card place-items-center text-slate-700 hover:text-brand-500 hover:shadow-lift transition" aria-label="Next matches">{ICON.right}</button>
    </section>
  );
}
