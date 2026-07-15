'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useGsapContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import BlueprintGrid from '@/components/BlueprintGrid';
import HeliodonCanvas from '@/components/HeliodonCanvas';
import { createHeliodonState, seasonLabel, SEASONS, sunAt, type Season } from '@/lib/heliodon';
import { SITE } from '@/lib/content';
import { FORMA_EASE } from '@/lib/motion';

export default function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef(createHeliodonState());
  const movedRef = useRef(false);
  const [season, setSeason] = useState<Season>('JUN');
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    const state = stateRef.current;
    if (reduced) {
      state.ink = 1;
      state.build = 1;
      state.sunrise = 1;
      state.lapse = false;
      return;
    }
    const tl = gsap.timeline();
    tl.to(state, { ink: 1, duration: 1.1, ease: 'power1.inOut' }, 0.15);
    tl.to(state, { build: 1, duration: 0.8, ease: 'power2.out' }, 1.0);
    tl.to(state, { sunrise: 1, duration: 0.9, ease: 'power2.inOut' }, 1.7);
    tl.add(() => {
      state.lapse = true;
    });
    return () => {
      tl.kill();
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const state = stateRef.current;

    const onMove = (e: PointerEvent) => {
      state.dayTarget = 0.04 + (e.clientX / window.innerWidth) * 0.92;
      state.lastInput = performance.now();
      if (!movedRef.current) {
        movedRef.current = true;
        setMoved(true);
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced]);

  useGsapContext(sectionRef, () => {
    gsap.to(stateRef.current, {
      dusk: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    });
  });

  const cycleSeason = useCallback(() => {
    const state = stateRef.current;
    const next = SEASONS[(SEASONS.indexOf(state.season) + 1) % SEASONS.length];
    state.season = next;
    state.lastInput = performance.now();
    setSeason(next);
  }, []);

  const onSectionClick = useCallback(
    (e: React.MouseEvent) => {
      if (reduced) return;
      if (e.target instanceof Element && e.target.closest('a,button')) return;
      cycleSeason();
    },
    [cycleSeason, reduced],
  );

  const onTick = useCallback((label: string) => {
    if (timeRef.current) timeRef.current.textContent = label;
    const h1 = h1Ref.current;
    if (h1) {
      const state = stateRef.current;
      const sun = sunAt(state.day, state.season);
      const reach = state.sunrise * (1 - state.dusk * 0.5);
      const dx = (0.5 - sun.sunX) * 7 * reach;
      const dy = (1.6 + (1 - sun.intensity) * 2.6) * reach;
      h1.style.textShadow = `${dx.toFixed(2)}px ${dy.toFixed(2)}px 0 rgba(107,104,98,0.22)`;
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      onClick={onSectionClick}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-[8vh] pt-24 sm:px-8"
    >
      <BlueprintGrid className="absolute inset-0" />
      <HeliodonCanvas
        state={stateRef.current}
        onTick={reduced ? undefined : onTick}
        className="absolute inset-0 h-full w-full"
      />

      <motion.div
        className="label absolute right-5 top-24 z-base flex flex-col items-end gap-1 sm:flex-row sm:items-baseline sm:gap-3 sm:right-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 2.4, duration: 0.8 }}
      >
        <span className="text-slate">{SITE.coordinate}</span>
        <span ref={timeRef} className="tabular-nums text-graphite">
          10:20
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            cycleSeason();
          }}
          data-cursor
          data-cursor-label="Season"
          aria-label="Change season"
          className="underline-draw -my-2 py-2 text-graphite"
        >
          {seasonLabel(season)}
        </button>
      </motion.div>

      {!reduced && !moved && (
        <motion.span
          className="label pointer-events-none absolute right-[14%] top-[30%] z-base text-slate"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5] }}
          transition={{ delay: 3, duration: 2.4, repeat: Infinity, repeatType: 'mirror' }}
        >
          ( drag the sun )
        </motion.span>
      )}

      <div className="relative z-base">
        <motion.span
          className="label mb-6 block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : 2.0, duration: 0.8 }}
        >
          {SITE.kicker}
        </motion.span>

        <motion.h1
          ref={h1Ref}
          className="font-grotesk text-display-xl font-bold uppercase leading-[0.9] tracking-tight text-graphite"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 2.1, duration: 1, ease: FORMA_EASE }}
        >
          Atelier<br />Forma
        </motion.h1>

        <motion.div
          className="copper-rule mt-8 w-[46%] origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: reduced ? 0 : 2.5, duration: 0.9, ease: FORMA_EASE }}
        />

        <motion.div
          className="mt-6 flex items-end justify-between gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : 2.7, duration: 0.8 }}
        >
          <p className="max-w-prose font-grotesk text-lead text-graphite">{SITE.tagline}</p>
          <a
            href="#manifesto"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
              document.getElementById('manifesto')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
            }}
            data-cursor
            data-cursor-label="Down"
            className="label whitespace-nowrap text-slate underline-draw"
          >
            (↓) Scroll
          </a>
        </motion.div>
      </div>
    </section>
  );
}
