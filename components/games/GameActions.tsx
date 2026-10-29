'use client';
/* "Play Now" / "Try Demo" buttons on the game page; both are demo-only and show a toast */
import { toast } from '@/lib/toast';
import { PlayBtn } from '../ui';

export default function GameActions() {
  return (
    <div className="mt-6 flex flex-wrap gap-3"><PlayBtn label="Play Now" href="#" extra="text-base px-8 py-3" onClick={e => { e.preventDefault(); toast('Game launch is disabled in this demo'); }} />
      <button type="button" onClick={() => toast('Demo mode coming soon')} className="rounded-full border border-white/30 px-6 min-h-[48px] text-sm font-semibold hover:bg-white/10 transition">Try Demo</button></div>
  );
}
