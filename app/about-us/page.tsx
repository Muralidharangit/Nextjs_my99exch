import type { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui';
import { MobilePromo } from '@/components/Rotator';

export const metadata: Metadata = {
  title: 'About Us | My99exch Your Cricket Information Destination',
  description: 'Learn about My99exch, your destination for live cricket scores, match schedules, cricket news, player statistics, ICC rankings and match updates.',
  keywords: 'My99exch, about My99exch, My99exch.mobi, live cricket scores, cricket news, cricket updates, cricket schedule, player statistics, ICC rankings, cricket information, cricket website',
  alternates: {
    canonical: '/about-us'
  }
};

export default function AboutUsPage() {
  return (
    <>
      <nav className="text-xs text-slate-500 mb-1" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand-500">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-slate-700 font-medium">About Us</span>
      </nav>

      <Card className="overflow-hidden">
        <article className="p-5 md:p-8 space-y-6 text-slate-700 leading-relaxed">
          <div className="border-b border-slate-100 pb-4">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 tracking-wide">
              About Us – My99exch
            </h1>
            <p className="text-xs text-slate-400 mt-1">Your Destination for Cricket Information & Live Updates</p>
          </div>

          <p className="text-base text-slate-600">
            Welcome to <strong className="text-slate-900 font-semibold">My99exch</strong>, your destination for the latest cricket updates, live scores, match schedules, news, statistics and videos. Our goal is keep cricket fans connected to the game by providing timely information and easy access to important cricket updates from around the world.
          </p>

          <p className="text-slate-600">
            At My99exch, we understand excitement and passion that cricket brings millions fans. Whether you follow international cricket, domestic tournaments, T20 leagues, One Day Internationals or Test matches, we aim to bring you closer to every moment of the action.
          </p>

          <section className="space-y-4 pt-2">
            <h2 className="font-display text-2xl font-bold text-slate-900 border-l-4 border-brand-500 pl-3">
              What We Offer
            </h2>
            <p className="text-slate-600">
              We strive to provide cricket enthusiasts comprehensive range of cricket-related information, including:
            </p>
            <div className="grid gap-3 sm:grid-cols-2 pt-1">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-500/40 transition">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0"></span>
                  Live Cricket Scores
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Follow ongoing matches regularly updated scores and match information.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-500/40 transition">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0"></span>
                  Ball-by-Ball Commentary
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Stay informed about key moments, wickets, boundaries match developments.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-500/40 transition">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0"></span>
                  Cricket Schedules
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Explore upcoming fixtures, series schedules and tournament details.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-500/40 transition">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0"></span>
                  Latest Cricket News
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Read the latest updates, match reports, team announcements and cricket developments.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-500/40 transition">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0"></span>
                  Player Statistics
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Explore player performances, team records, match statistics and cricket insights.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-500/40 transition">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0"></span>
                  ICC Rankings
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Keep track of international team and player rankings.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-500/40 transition sm:col-span-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0"></span>
                  Cricket Videos
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Discover cricket highlights, important moments and video updates.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="font-display text-2xl font-bold text-slate-900 border-l-4 border-brand-500 pl-3">
              Our Mission
            </h2>
            <p className="text-slate-600">
              Our mission make cricket information accessible, convenient and engaging for fans everywhere. We aim to deliver a user-friendly experience where visitors can find relevant cricket updates without unnecessary complexity.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="font-display text-2xl font-bold text-slate-900 border-l-4 border-brand-500 pl-3">
              Why Choose My99exch?
            </h2>
            <p className="text-slate-600">
              We focus providing a smooth browsing experience, organized cricket information and regularly updated content. From live match coverage to tournament schedules and the latest cricket headlines, My99exch aims to serve as a useful information destination for cricket followers.
            </p>
            <p className="text-slate-600">
              Value accuracy, clarity and the trust of our readers. Our commitment is to continually improve our platform and make following cricket easier for fans across India, the United States, Canada and beyond.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="font-display text-2xl font-bold text-slate-900 border-l-4 border-brand-500 pl-3">
              Stay Connected with Cricket
            </h2>
            <p className="text-slate-600">
              Cricket is more just a sport; it is a passion shared by millions. My99exch is to help you stay informed about the teams, players, tournaments and moments that make the game exciting.
            </p>
            <div className="p-4 rounded-xl bg-brand-50 border border-brand-500/20 text-brand-700 font-medium text-sm">
              Thank you for visiting <span className="font-bold">My99exch.mobi</span>. Stay connected and keep up with the latest cricket action!
            </div>
          </section>
        </article>
      </Card>

      <MobilePromo />
    </>
  );
}
