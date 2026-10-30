'use client';
/* Floating WhatsApp button with pop-up bubble */
import { useEffect, useState } from 'react';

const WHATSAPP = { number: '919999999999', text: 'Hi MY99 EXCH, I need help.' };

export default function WhatsApp() {
  const href = `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(WHATSAPP.text)}`;
  const [show, setShow] = useState(false);
  useEffect(() => {
    let closed = false;
    try { closed = sessionStorage.getItem('wa-closed') === '1'; } catch {}
    if (closed) return;
    const t = setTimeout(() => setShow(true), 2500);
    return () => clearTimeout(t);
  }, []);
  const close = () => {
    setShow(false);
    try { sessionStorage.setItem('wa-closed', '1'); } catch {}
  };
  return (
    <div className="fixed right-4 bottom-20 md:bottom-6 md:right-6 z-[60] flex items-end gap-3">
      <div id="wa-bubble" hidden={!show} className="wa-pop relative max-w-[220px] rounded-2xl rounded-br-sm bg-white shadow-lift border border-slate-100 pl-4 pr-8 py-3 mb-2">
        <button type="button" id="wa-close" className="absolute top-1 right-1 w-7 h-7 grid place-items-center text-slate-400 hover:text-slate-700" aria-label="Close chat message" onClick={close}>&times;</button>
        <p className="text-sm font-semibold text-slate-800">Need Cricket Updates?</p>
        <a href={href} target="_blank" rel="noopener" className="text-xs text-[#128C7E] font-semibold hover:underline">Chat with us on WhatsApp →</a>
      </div>
      <a href={href} target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp" className="relative shrink-0 w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-lift hover:scale-110 transition">
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-60" aria-hidden="true"></span>
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-live ring-2 ring-white animate-livepulse" aria-hidden="true"></span>
        <svg className="relative w-8 h-8" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.7c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.7 10.7 0 1 1 16 26.7zm5.9-8c-.3-.2-1.9-1-2.2-1-.3-.2-.5-.2-.7.1l-1 1.3c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.4 1.4.6 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" /></svg>
      </a>
    </div>
  );
}
