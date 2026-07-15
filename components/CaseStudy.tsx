'use client';

import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SiteImage from '@/components/SiteImage';
import CountUp from '@/components/CountUp';
import type { Project } from '@/lib/content';
import { planSlide } from '@/lib/motion';

interface CaseStudyProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudy({ project, onClose }: CaseStudyProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  const escClose = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', escClose);
    panelRef.current?.querySelector<HTMLElement>('button')?.focus();
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', escClose);
    };
  }, [project, escClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="fixed inset-0 z-case bg-graphite/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} case study`}
            className="fixed inset-y-0 right-0 z-case w-full overflow-y-auto bg-concrete sm:w-[88%] lg:w-[72%]"
            variants={planSlide}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <div className="sticky top-0 z-base flex items-center justify-between bg-concrete/90 px-5 py-4 backdrop-blur-sm sm:px-10">
              <span className="font-mono text-xs text-slate">
                ({project.index}) — {project.category}
              </span>
              <button
                type="button"
                onClick={onClose}
                data-cursor
                className="label underline-draw text-graphite"
              >
                Close ✕
              </button>
            </div>
            <div className="copper-rule mx-5 opacity-40 sm:mx-10" />

            <div className="px-5 pb-24 pt-10 sm:px-10">
              <h2 className="max-w-[14ch] font-grotesk text-display-l font-bold uppercase leading-[0.92] tracking-tight text-graphite">
                {project.name}
              </h2>

              <div className="relative mt-10 aspect-[16/9] w-full">
                <SiteImage image={project.image} priority sizes="72vw" className="h-full w-full" />
              </div>

              <dl className="mt-12 grid grid-cols-2 gap-y-8 border-y border-line py-8 sm:grid-cols-4">
                <Stat label="Year">
                  <CountUp value={Number(project.year)} duration={1000} />
                </Stat>
                <Stat label="Area">
                  <CountUp value={project.area} suffix=" m²" />
                </Stat>
                <Stat label="Location">{project.location}</Stat>
                <Stat label="Coordinate">{project.coordinate}</Stat>
              </dl>

              <p className="mt-12 max-w-prose font-grotesk text-lead text-graphite">{project.brief}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Stat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="label mb-2 text-slate">{label}</dt>
      <dd className="font-mono text-lg text-graphite">{children}</dd>
    </div>
  );
}
