import type { Variants } from 'framer-motion';

export const FORMA_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DRAFT_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: FORMA_EASE } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const planSlide: Variants = {
  hidden: { x: '100%' },
  show: { x: 0, transition: { duration: 0.7, ease: DRAFT_EASE } },
  exit: { x: '100%', transition: { duration: 0.6, ease: DRAFT_EASE } },
};

export const REVEAL_VIEWPORT = { once: true, margin: '-80px' } as const;
