'use client';
/* Accessible tabs: role=tab, arrow / Home / End keys, roving tabindex */
import { useRef } from 'react';

export const tabKey = (v: string) => v.toLowerCase().replace(/\s+/g, '-');

export function TabBar({ items, active, onSelect, idPrefix = 'tab', label = 'Sections', panels = true }: {
  items: string[]; active: string; onSelect: (v: string) => void; idPrefix?: string; label?: string; panels?: boolean;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const select = (i: number, focus?: boolean) => {
    if (focus) refs.current[i]?.focus();
    onSelect(items[i]);
  };
  return (
    <div role="tablist" aria-label={label} className="flex overflow-x-auto no-scrollbar border-b border-slate-200 px-2">
      {items.map((v, i) => {
        const on = v === active, key = tabKey(v);
        return (
          <button key={v} ref={el => { refs.current[i] = el; }} type="button" role="tab" data-value={v} id={`${idPrefix}-${key}`}
            aria-controls={panels ? `${idPrefix}-panel-${key}` : undefined} aria-selected={on} tabIndex={on ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={e => {
              const k = ({ ArrowRight: 1, ArrowLeft: -1 } as Record<string, number>)[e.key];
              if (k) { e.preventDefault(); select((i + k + items.length) % items.length, true); }
              if (e.key === 'Home') { e.preventDefault(); select(0, true); }
              if (e.key === 'End') { e.preventDefault(); select(items.length - 1, true); }
            }}
            className={`shrink-0 px-3 md:px-4 min-h-[44px] text-sm border-b-2 -mb-px transition duration-300 hover:text-brand-500 ${on ? 'border-gold-500 text-brand-700 font-semibold' : 'border-transparent text-slate-500'}`}>{v}</button>
        );
      })}
    </div>
  );
}
