import type { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui';
import { MobilePromo } from '@/components/Rotator';
import ContactForm from '@/components/pages/ContactForm';
import { ICON } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Contact Us | My99exch Get in Touch With Our Team',
  description: 'Contact My99exch website assistance, cricket updates, feedback, content corrections general enquiries. We welcome your questions and suggestions.',
  keywords: 'My99exch contact, contact My99exch, My99exch.mobi, My99exch support, cricket website contact, cricket enquiries, cricket feedback, website assistance, cricket information.',
  alternates: {
    canonical: '/contact-us'
  }
};

export default function ContactUsPage() {
  return (
    <>
      <nav className="text-xs text-slate-500 mb-1" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand-500">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-slate-700 font-medium">Contact Us</span>
      </nav>

      <Card className="overflow-hidden">
        <article className="p-5 md:p-8 space-y-6 text-slate-700 leading-relaxed">
          <div className="border-b border-slate-100 pb-4">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 tracking-wide">
              Contact Us | My99exch
            </h1>
            <p className="text-xs text-slate-400 mt-1">Get in Touch With Our Team</p>
          </div>

          <p className="text-base text-slate-600">
            Contact My99exch website assistance, cricket updates, feedback, content corrections general enquiries. We welcome your questions and suggestions.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <span className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 grid place-items-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Email Enquiries</h2>
                <a href="mailto:my99exchmobi@gmail.com" className="text-xs font-semibold text-brand-600 hover:text-brand-700 mt-1 block">
                  my99exchmobi@gmail.com
                </a>
                <p className="text-[11px] text-slate-400 mt-0.5">We aim to respond promptly</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <span className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 grid place-items-center shrink-0">
                {ICON.clock}
              </span>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Support Availability</h2>
                <p className="text-xs text-slate-600 mt-1">Website assistance & cricket queries</p>
                <p className="text-[11px] text-slate-400 mt-0.5">24/7 Live cricket coverage updates</p>
              </div>
            </div>
          </div>

          <section className="space-y-4 pt-2">
            <h2 className="font-display text-2xl font-bold text-slate-900 border-l-4 border-brand-500 pl-3">
              Send Us a Message
            </h2>
            <p className="text-sm text-slate-500">
              Have feedback, content corrections, or general questions? Fill out the form below:
            </p>
            <ContactForm />
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="font-display text-2xl font-bold text-slate-900 border-l-4 border-brand-500 pl-3">
              Stay Connected with My99exch
            </h2>
            <p className="text-slate-600">
              Thank you for visiting My99exch. We appreciate your interest and support. Stay connected with us for the latest cricket news, live scores, match schedules, player statistics, ICC rankings and cricket videos.
            </p>
            <div className="p-4 rounded-xl bg-brand-50 border border-brand-500/20 text-brand-700 font-semibold text-sm">
              My99exch – Your destination for cricket updates and information.
            </div>
          </section>
        </article>
      </Card>

      <MobilePromo />
    </>
  );
}
