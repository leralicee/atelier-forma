'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useGsapContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { MANIFESTO } from '@/lib/content';
import { fadeUp, REVEAL_VIEWPORT } from '@/lib/motion';

export default function Manifesto() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, () => {
    gsap.utils.toArray<HTMLElement>('[data-mf-track]').forEach((track) => {
      const text = track.querySelector<HTMLElement>('[data-mf-text]');
      if (!text) return;
      gsap.set(text, { transformOrigin: 'left center' });

      gsap.fromTo(
        text,
        { scale: 0.42, opacity: 0.4 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: track, start: 'top top', end: '+=56%', scrub: 1.2 },
        },
      );
    });
  });

  if (reduced) {
    return (
      <section id="manifesto" aria-label="Manifesto" className="px-5 py-section sm:px-8">
        <span className="label mb-16 block">(02) — Manifesto</span>
        <div className="space-y-24">
          {MANIFESTO.map((line) => (
            <motion.p
              key={line}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={REVEAL_VIEWPORT}
              className="max-w-[16ch] font-grotesk text-display-l font-medium leading-[0.95] tracking-tight text-graphite"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="manifesto" aria-label="Manifesto" className="relative">
      <span className="label sticky top-24 z-base ml-5 inline-block sm:ml-8">(02) — Manifesto</span>
      {MANIFESTO.map((line, i) => (
        <div key={line} data-mf-track className="relative h-[170vh]">
          <div className="sticky top-0 flex h-screen items-center px-5 sm:px-8">
            <p
              data-mf-text
              className="max-w-[18ch] font-grotesk text-display-l font-medium leading-[0.95] tracking-tight text-graphite"
            >
              <span className="mr-3 align-super font-mono text-sm text-copper">0{i + 1}</span>
              {line}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
