'use client';

import { motion } from 'framer-motion';
import SiteImage from '@/components/SiteImage';
import CountUp from '@/components/CountUp';
import { STUDIO } from '@/lib/content';
import { fadeUp, stagger, REVEAL_VIEWPORT } from '@/lib/motion';

export default function Studio() {
  return (
    <section id="studio" aria-label="Studio" className="px-5 py-section sm:px-8">
      <header className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="label block">(05) — Studio</span>
        </div>
        <p className="max-w-prose font-grotesk text-display-m font-medium leading-tight tracking-tight text-graphite md:col-span-9">
          {STUDIO.paragraph}
        </p>
      </header>

      <dl className="mb-20 grid grid-cols-2 gap-y-8 border-y border-line py-8 md:grid-cols-4">
        {STUDIO.facts.map((fact) => (
          <div key={fact.label}>
            <dt className="label mb-2">{fact.label}</dt>
            <dd className="font-mono text-3xl text-graphite">
              <CountUp value={fact.value} suffix={fact.suffix} />
            </dd>
          </div>
        ))}
      </dl>

      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={REVEAL_VIEWPORT}
        className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
      >
        {STUDIO.people.map((person) => (
          <motion.li key={person.name} variants={fadeUp}>
            <div className="aspect-[3/4] overflow-hidden">
              <SiteImage image={person.image} mono className="h-full w-full" sizes="(max-width:1024px) 50vw, 33vw" />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-line pt-3">
              <span className="font-mono text-sm uppercase tracking-wide text-graphite">
                {person.name}
              </span>
              <span className="font-mono text-xs uppercase tracking-wide text-slate">
                {person.role}
              </span>
            </div>
          </motion.li>
        ))}
      </motion.ul>

      <div className="mt-16">
        <a href="/cv" data-cursor data-cursor-label="Open" className="label underline-draw text-graphite">
          View studio CV (print) →
        </a>
      </div>
    </section>
  );
}
