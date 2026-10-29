'use client';
/* Welcome popup shown when the site first loads: "Enter Your Game ID" -> register page.
   Closing it (×, backdrop or Escape) keeps it closed for the rest of the browser session. */
import { useEffect, useRef, useState } from 'react';
import { REGISTER_URL } from '@/lib/constants';

const KEY = 'game-id-popup-closed';
const remember = () => { try { sessionStorage.setItem(KEY, '1'); } catch {} };

const Gamepad = () => <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M9.5 8h13a7.5 7.5 0 0 1 7.3 9.2l-1.3 5.6a3.7 3.7 0 0 1-6.4 1.6L19.6 22h-7.2l-2.5 2.4a3.7 3.7 0 0 1-6.4-1.6l-1.3-5.6A7.5 7.5 0 0 1 9.5 8zm1 4.5a1 1 0 0 0-1 1V15H8a1 1 0 0 0 0 2h1.5v1.5a1 1 0 0 0 2 0V17H13a1 1 0 0 0 0-2h-1.5v-1.5a1 1 0 0 0-1-1zm11 .5a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6zm2.6 2.8a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z" /></svg>;
const Rocket = () => <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M27.6 4.4c-5.2-.4-10.4 1.8-13.7 6.1l-1.1 1.4-4.7.6a1.6 1.6 0 0 0-1 .5l-3 3.2a.8.8 0 0 0 .5 1.4l4.5.4 4.8 4.8.4 4.5a.8.8 0 0 0 1.4.5l3.2-3a1.6 1.6 0 0 0 .5-1l.6-4.7 1.4-1.1c4.3-3.3 6.5-8.5 6.1-13.7a.8.8 0 0 0-.7-.7zM20.5 14.3a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zM7.8 21.3c-1.9.6-3 2.4-3.6 6.5 4.1-.6 5.9-1.7 6.5-3.6z" /></svg>;
const Shield = () => <svg className="w-5 h-5 text-[#0E9F6E] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2 4 5v6c0 5 3.4 9.6 8 11 4.6-1.4 8-6 8-11V5zm-1.2 13.6-3.5-3.5 1.4-1.4 2.1 2.1 4.8-4.8 1.4 1.4z" /></svg>;

export default function GameIdPopup() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const close = () => { setOpen(false); remember(); };

  useEffect(() => {
    let closed = false;
    try { closed = sessionStorage.getItem(KEY) === '1'; } catch {}
    if (closed) return;
    const t = setTimeout(() => setOpen(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    input.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); remember(); }
      if (e.key === 'Tab' && dialog.current) {
        // keep keyboard focus inside the popup
        const f = dialog.current.querySelectorAll<HTMLElement>('button, input');
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; prevFocus?.focus(); };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto">
      <div className="fixed inset-0 bg-navy-900/75 backdrop-blur-sm" onClick={close} aria-hidden="true"></div>
      <div className="relative min-h-full grid place-items-center p-3 sm:p-6 pointer-events-none">
        <div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="game-id-title"
          className="popup-in pointer-events-auto relative w-full max-w-[720px] overflow-hidden rounded-[22px] sm:rounded-[28px] bg-gradient-to-b from-white via-white to-[#E8F9FF] shadow-[0_25px_70px_rgba(0,0,0,0.5)] ring-1 ring-white/30">

          {/* blue header: mascot + logo + title */}
          <div className="relative overflow-hidden bg-[linear-gradient(160deg,#0A4CD3_0%,#0B6CF0_45%,#2BB2FC_100%)] pb-9 sm:pb-11">
            <span className="absolute -bottom-10 right-6 w-40 h-24 rounded-full bg-white/25 blur-2xl" aria-hidden="true"></span>
            <span className="absolute -bottom-12 left-1/3 w-56 h-24 rounded-full bg-white/20 blur-2xl" aria-hidden="true"></span>
            <span className="hidden sm:block absolute top-6 left-[38%] w-3 h-1 rounded-full bg-lime-300 rotate-[35deg]" aria-hidden="true"></span>
            <span className="hidden sm:block absolute top-16 right-[13%] w-4 h-1 rounded-full bg-gold-400 -rotate-[25deg]" aria-hidden="true"></span>
            <span className="hidden sm:block absolute bottom-14 right-[5%] w-4 h-1 rounded-full bg-lime-300 rotate-[20deg]" aria-hidden="true"></span>
            <div className="relative flex items-end">
              <img src="/images/popup/mascot.webp" alt="" className="mascot-float w-[36%] max-w-[245px] shrink-0 self-end -mb-9 sm:-mb-11 ml-1 sm:ml-3 mt-3 drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]" />
              <div className="flex-1 min-w-0 text-center pt-6 sm:pt-7 pr-3 sm:pr-10 pb-1">
                <img src="/images/popup/logo-crown.webp" alt="MY99 EXCH" className="mx-auto w-[72%] max-w-[290px] h-auto drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]" />
                <h2 id="game-id-title" className="font-display font-bold leading-none text-white text-[26px] sm:text-[46px] mt-2 sm:mt-3 drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
                  Enter Your <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFF06A] to-[#FFC21A]">Game ID</span>
                </h2>
                <p className="text-white font-semibold text-xs sm:text-lg leading-snug mt-2 sm:mt-3">Get started and enjoy your favorite<br />sports &amp; games!</p>
              </div>
            </div>
          </div>

          {/* white body overlaps the header with a curved top */}
          <div className="relative z-10 -mt-6 sm:-mt-7 rounded-t-[26px] sm:rounded-t-[32px] bg-gradient-to-b from-white via-white to-[#E8F9FF] px-5 sm:px-12 pt-7 sm:pt-9 pb-16 sm:pb-20">
            <form onSubmit={e => { e.preventDefault(); if (id.trim()) window.location.href = REGISTER_URL; }}>
              <label htmlFor="game-id" className="sr-only">Game ID</label>
              <div className="relative">
                <span className="absolute left-5 sm:left-7 top-1/2 -translate-y-1/2 text-[#6B82A5]"><Gamepad /></span>
                <input ref={input} id="game-id" required value={id} onChange={e => setId(e.target.value)} placeholder="Enter your game ID" autoComplete="off"
                  className="w-full h-14 sm:h-16 rounded-full border-2 border-[#C7E0FD] bg-[#F8FBFF] pl-16 sm:pl-20 pr-5 text-base sm:text-xl text-slate-800 placeholder:text-[#9AA9BD] outline-none transition focus:border-[#3B8DF6] focus:ring-4 focus:ring-blue-100" />
              </div>
              <button type="submit"
                className="group relative overflow-hidden mx-auto mt-5 sm:mt-7 flex w-full sm:w-[74%] h-14 sm:h-16 items-center justify-center gap-3 rounded-full bg-gradient-to-b from-[#FFE83D] via-[#FFD21A] to-[#FFB300] border-b-4 border-[#F08A00] text-navy-900 font-display text-2xl sm:text-[30px] font-bold shadow-[0_8px_18px_rgba(255,170,0,0.45)] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(255,170,0,0.55)] active:translate-y-0.5 active:border-b-2 transition">
                <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" aria-hidden="true"></span>
                <span className="relative transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"><Rocket /></span>
                <span className="relative">Continue</span>
              </button>
            </form>
            <p className="mt-4 sm:mt-5 flex items-center justify-center gap-2 text-sm sm:text-base font-semibold text-slate-600"><Shield />Your game ID is safe &amp; secure</p>
          </div>

          {/* bottom corner swooshes + cricket ball */}
          <img src="/images/popup/corner-left.webp" alt="" className="absolute bottom-0 left-0 z-10 w-[24%] sm:w-[20%] pointer-events-none" />
          <img src="/images/popup/corner-right.webp" alt="" className="absolute bottom-0 right-0 z-10 w-[23%] sm:w-[19%] pointer-events-none" />

          <button type="button" onClick={close} aria-label="Close"
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0C2959] text-white grid place-items-center ring-2 ring-white/40 shadow-lg hover:bg-[#13398A] hover:rotate-90 transition duration-300">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
