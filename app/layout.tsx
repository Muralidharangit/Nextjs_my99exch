import type { Metadata, Viewport } from 'next';
import { Inter, Rajdhani } from 'next/font/google';
import 'swiper/css/bundle';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import WhatsApp from '@/components/WhatsApp';
import GameIdPopup from '@/components/GameIdPopup';
import { LeftSidebar, RightSidebar } from '@/components/Sidebars';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-inter', display: 'swap' });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-rajdhani', display: 'swap' });

export const metadata: Metadata = {
  title: 'MY99 EXCH – Live Cricket Scores, News & Games',
  description: 'Live cricket scores, ball-by-ball commentary, news and games on MY99 EXCH.',
  icons: { icon: '/images/logo.webp' }
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0B7A6F' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${rajdhani.variable}`}>
      <body className="bg-page font-sans text-slate-800 antialiased">
        <SiteHeader />
        <main className="max-w-[1600px] mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px] xl:grid-cols-[210px_1fr_310px] 2xl:grid-cols-[240px_1fr_340px] gap-4 xl:gap-5">
          <aside id="left-sidebar" className="hidden xl:block" aria-label="Promotions"><LeftSidebar /></aside>
          <div id="content" className="min-w-0 space-y-4">{children}</div>
          <aside id="right-sidebar" className="space-y-4" aria-label="Promotions and featured games"><RightSidebar /></aside>
        </main>
        <SiteFooter />
        <WhatsApp />
        <GameIdPopup />
      </body>
    </html>
  );
}
