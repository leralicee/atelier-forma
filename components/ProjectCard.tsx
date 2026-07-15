'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import SiteImage from '@/components/SiteImage';
import type { Project } from '@/lib/content';
import { FORMA_EASE } from '@/lib/motion';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

const ProjectCard = forwardRef<HTMLButtonElement, ProjectCardProps>(function ProjectCard(
  { project, onOpen },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      type="button"
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: FORMA_EASE }}
      onClick={() => onOpen(project)}
      data-cursor
      data-cursor-label="View"
      aria-label={`${project.name}, ${project.category}, ${project.year}. Open case study.`}
      className="group block cursor-pointer text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SiteImage
          image={project.image}
          sizes="(max-width:768px) 100vw, 33vw"
          className="h-full w-full transition-transform duration-slower ease-forma group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 font-mono text-xs text-concrete mix-blend-difference">
          ({project.index})
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-grotesk text-xl font-medium tracking-tight text-graphite">
          {project.name}
        </h3>
        <span className="font-mono text-xs text-slate">{project.year}</span>
      </div>
      <div className="mt-1 flex items-baseline justify-between gap-4">
        <span className="label text-slate">{project.category}</span>
        <span className="font-mono text-xs text-slate">
          {project.area.toLocaleString('en-US')} m²
        </span>
      </div>
    </motion.button>
  );
});

export default ProjectCard;
