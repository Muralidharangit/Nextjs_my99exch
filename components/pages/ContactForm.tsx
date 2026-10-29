'use client';
/* Contact form: demo only, resets and shows a toast */
import { toast } from '@/lib/toast';

export default function ContactForm() {
  return (
    <form className="grid gap-3 max-w-lg mt-4" onSubmit={e => { e.preventDefault(); e.currentTarget.reset(); toast('Thanks! Your message has been noted (demo).'); }}>
      <label className="text-sm font-semibold text-slate-600">Name<input required className="mt-1 w-full rounded-lg border border-slate-200 px-3 min-h-[44px] focus:border-brand-500 outline-none" /></label>
      <label className="text-sm font-semibold text-slate-600">Email<input required type="email" className="mt-1 w-full rounded-lg border border-slate-200 px-3 min-h-[44px] focus:border-brand-500 outline-none" /></label>
      <label className="text-sm font-semibold text-slate-600">Message<textarea required rows={4} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-500 outline-none"></textarea></label>
      <button className="justify-self-start rounded-full bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 min-h-[44px] transition">Send message</button></form>
  );
}
