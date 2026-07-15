import { gsap } from '@/lib/gsap';

interface DrawOptions {
  duration?: number;
  ease?: string;
  stagger?: number;
  delay?: number;

  scrollTrigger?: gsap.TweenVars['scrollTrigger'];
}

export function drawStrokes(targets: gsap.TweenTarget, opts: DrawOptions = {}): gsap.core.Tween {
  const { duration = 1, ease = 'power2.inOut', stagger = 0.04, delay = 0, scrollTrigger } = opts;
  gsap.set(targets, { strokeDasharray: 1, strokeDashoffset: 1 });
  return gsap.to(targets, { strokeDashoffset: 0, duration, ease, stagger, delay, scrollTrigger });
}
