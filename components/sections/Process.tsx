'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useGsapContext';
import { drawStrokes } from '@/lib/svg-draw';
import SiteImage from '@/components/SiteImage';
import { PROCESS } from '@/lib/content';

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGsapContext(sectionRef, () => {

    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', end: 'bottom 80%', scrub: true },
        },
      );
    }

    gsap.utils.toArray<HTMLElement>('[data-phase]').forEach((phase) => {
      drawStrokes(phase.querySelectorAll<SVGPathElement>('.draw'), {
        duration: 1.1,
        stagger: 0.08,
        scrollTrigger: { trigger: phase, start: 'top 72%' },
      });
    });
  });

  return (
    <section ref={sectionRef} id="process" aria-label="Process" className="bg-concrete-2 px-5 py-section sm:px-8">
      <header className="mb-16">
        <span className="label mb-4 block">(04) — Process</span>
        <h2 className="font-grotesk text-display-m font-bold uppercase tracking-tight text-graphite">
          How a building begins
        </h2>
      </header>

      <div className="relative mx-auto max-w-5xl">
        <div className="absolute left-1 top-2 hidden h-full w-px bg-line md:block">
          <div ref={lineRef} className="h-full w-full bg-copper" />
        </div>

        <ol className="space-y-20 md:space-y-32 md:pl-16">
          {PROCESS.map((phase, i) => (
            <li
              key={phase.index}
              data-phase
              className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16"
            >
              <span className="absolute -left-[60px] top-2 hidden h-2.5 w-2.5 rounded-none bg-copper md:block" />

              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <div className="flex items-start gap-6">
                  <span className="font-mono text-sm text-copper">{phase.index}</span>
                  <PhaseDiagram index={i} />
                </div>
                <h3 className="mt-6 font-grotesk text-display-m font-medium tracking-tight text-graphite">
                  {phase.name}
                </h3>
                <p className="mt-4 max-w-prose font-grotesk text-lead text-slate">{phase.line}</p>
              </div>

              <div className={`aspect-[4/3] ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <SiteImage image={phase.image} className="h-full w-full" sizes="(max-width:768px) 100vw, 50vw" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PhaseDiagram({ index }: { index: number }) {
  const common = { fill: 'none', stroke: '#1A1A1A', strokeWidth: 1.5, vectorEffect: 'non-scaling-stroke' as const, pathLength: 1 };
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12 shrink-0" aria-hidden>
      {index === 0 && (
        <>
          <rect className="draw" x="8" y="8" width="48" height="48" {...common} />
          <line className="draw" x1="8" y1="56" x2="56" y2="8" {...common} />
        </>
      )}
      {index === 1 && (
        <>
          <path className="draw" d="M8 56 L32 8 L56 56 Z" {...common} />
          <line className="draw" x1="20" y1="32" x2="44" y2="32" {...common} />
        </>
      )}
      {index === 2 && (
        <>
          <rect className="draw" x="8" y="8" width="20" height="20" {...common} />
          <rect className="draw" x="36" y="8" width="20" height="20" {...common} />
          <rect className="draw" x="8" y="36" width="20" height="20" {...common} />
          <rect className="draw" x="36" y="36" width="20" height="20" {...common} />
        </>
      )}
      {index === 3 && (
        <>
          <line className="draw" x1="8" y1="56" x2="56" y2="56" {...common} />
          <rect className="draw" x="12" y="28" width="14" height="28" {...common} />
          <rect className="draw" x="32" y="16" width="20" height="40" {...common} />
        </>
      )}
    </svg>
  );
}
