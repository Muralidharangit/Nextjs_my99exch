import Link from 'next/link';
import type { NewsItem } from '@/lib/types';
import { ICON } from '../icons';

export default function NewsListItem({ n }: { n: NewsItem }) {
  return (
    <li><Link href={`/blog/${n.id}`} className="flex gap-4 py-4 group">
      <img src={n.img} alt="" className="w-28 h-20 md:w-40 md:h-24 rounded-lg object-cover shrink-0" loading="lazy" />
      <span className="min-w-0"><span className="text-[11px] font-bold uppercase text-brand-600">{n.cat}</span>
        <span className="block font-display text-lg md:text-xl font-bold leading-snug group-hover:text-brand-500 transition">{n.title}</span>
        <span className="hidden sm:block text-sm text-slate-500 mt-1 line-clamp-2">{n.summary}</span>
        <span className="flex items-center gap-1 text-xs text-slate-400 mt-1">{ICON.clock}{n.time}</span></span></Link></li>
  );
}
