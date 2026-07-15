'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import CaseStudy from '@/components/CaseStudy';
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  type Project,
  type ProjectCategory,
} from '@/lib/content';
import { FORMA_EASE } from '@/lib/motion';

type Filter = 'All' | ProjectCategory;

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All');
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="projects" aria-label="Projects" className="px-5 py-section sm:px-8">
      <header className="mb-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="label mb-4 block">(03) — Projects</span>
          <h2 className="font-grotesk text-display-m font-bold uppercase tracking-tight text-graphite">
            Selected work
          </h2>
        </div>

        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-x-6 gap-y-2">
          {PROJECT_CATEGORIES.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                aria-pressed={active}
                data-cursor
                className={`relative cursor-pointer pb-1 font-mono text-xs uppercase tracking-wide transition-colors duration-slow ease-forma ${
                  active ? 'text-copper' : 'text-slate hover:text-graphite'
                }`}
              >
                {cat}
                {active && (
                  <motion.span
                    layoutId="filter-underline"
                    className="copper-rule absolute inset-x-0 bottom-0"
                    transition={{ duration: 0.5, ease: FORMA_EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </header>

      <motion.div layout className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <ProjectCard key={project.index} project={project} onOpen={setSelected} />
          ))}
        </AnimatePresence>
      </motion.div>

      <CaseStudy project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
