'use client';

import { FormEvent, useState } from 'react';
import { CONTACT, SITE } from '@/lib/content';

type Status = 'idle' | 'sending' | 'done';

const FIELD =
  'w-full border-b border-line bg-transparent py-3 font-grotesk text-graphite placeholder:text-slate/60 transition-colors duration-slow ease-forma focus:border-copper focus:outline-none';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    window.setTimeout(() => setStatus('done'), 900);
  };

  return (
    <section id="contact" aria-label="Contact" className="px-5 py-section sm:px-8">
      <span className="label mb-8 block">(06) — Contact</span>

      <h2 className="font-grotesk text-display-xl font-bold uppercase leading-[0.85] tracking-tight text-graphite">
        {CONTACT.heading}
      </h2>
      <div className="copper-rule mt-6 w-[40%]" />

      <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="mb-10 max-w-prose font-grotesk text-lead text-slate">{CONTACT.line}</p>

          {status === 'done' ? (
            <p role="status" className="font-grotesk text-display-m font-medium text-copper-deep">
              {CONTACT.success}
            </p>
          ) : (
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="c-name" className="label mb-2 block">Name</label>
                <input id="c-name" name="name" type="text" required autoComplete="name" className={FIELD} placeholder="Your name" />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="c-email" className="label mb-2 block">Email</label>
                <input id="c-email" name="email" type="email" required autoComplete="email" className={FIELD} placeholder="you@studio.com" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-type" className="label mb-2 block">Project type</label>
                <select id="c-type" name="type" className={`${FIELD} cursor-pointer`} defaultValue={CONTACT.projectTypes[0]}>
                  {CONTACT.projectTypes.map((t) => (
                    <option key={t} value={t} className="bg-concrete text-graphite">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-message" className="label mb-2 block">The site, and the silence you want to keep</label>
                <textarea id="c-message" name="message" rows={3} className={`${FIELD} resize-none`} placeholder="Tell us about the project…" />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  data-cursor
                  className="group inline-flex cursor-pointer items-center gap-3 border border-graphite px-10 py-4 font-mono text-xs uppercase tracking-wide text-graphite transition-colors duration-slow ease-forma hover:border-copper hover:bg-copper hover:text-concrete"
                >
                  {status === 'sending' ? 'Sending…' : 'Send'}
                  <span aria-hidden>→</span>
                </button>
              </div>
            </form>
          )}
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <span className="label mb-4 block">Studio</span>
          <p className="font-mono text-2xl text-graphite">{SITE.coordinate}</p>
          <p className="mt-4 font-grotesk text-lead text-slate">{SITE.address}</p>
          <p className="mt-1 font-grotesk text-lead text-slate">Zürich, Switzerland</p>
          <a
            href={`mailto:${SITE.email}`}
            data-cursor
            className="mt-8 inline-block font-mono text-sm text-graphite underline-draw"
          >
            {SITE.email}
          </a>
        </aside>
      </div>
    </section>
  );
}
