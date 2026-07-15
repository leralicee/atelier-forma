'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const LERP = 0.08;

export default function Crosshair() {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const onPrintRoute = pathname?.startsWith('/cv') ?? false;
  const vRef = useRef<HTMLDivElement>(null);
  const hRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduced || onPrintRoute) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    document.body.dataset.crosshair = 'on';

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let active = false;
    let raf = 0;
    let running = false;

    const loop = () => {
      pos.x += (target.x - pos.x) * LERP;
      pos.y += (target.y - pos.y) * LERP;

      const settled = Math.abs(target.x - pos.x) < 0.1 && Math.abs(target.y - pos.y) < 0.1;
      running = !settled;
      if (running) raf = requestAnimationFrame(loop);

      const copper = '#B87333';
      const line = 'rgba(107,104,98,0.35)';
      if (vRef.current) {
        vRef.current.style.transform = `translateX(${pos.x}px)`;
        vRef.current.style.backgroundColor = active ? copper : line;
      }
      if (hRef.current) {
        hRef.current.style.transform = `translateY(${pos.y}px)`;
        hRef.current.style.backgroundColor = active ? copper : line;
      }
      if (reticleRef.current) {
        const s = active ? 1.9 : 1;
        reticleRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${s})`;
        reticleRef.current.style.borderColor = active ? copper : '#1A1A1A';
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${pos.x + 22}px, ${pos.y - 8}px)`;
        labelRef.current.style.opacity = active ? '1' : '0';
      }
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el =
        e.target instanceof Element
          ? e.target.closest('a, button, [data-cursor], input, textarea, select')
          : null;
      active = !!el;
      const label = el instanceof HTMLElement ? el.dataset.cursorLabel ?? '' : '';
      if (labelRef.current) labelRef.current.textContent = label;
      if (!running) {
        running = true;
        loop();
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      delete document.body.dataset.crosshair;
    };
  }, [reduced, onPrintRoute]);

  if (reduced || onPrintRoute || !enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-crosshair">
      <div ref={vRef} className="absolute left-0 top-0 h-full w-px will-change-transform" />
      <div ref={hRef} className="absolute left-0 top-0 h-px w-full will-change-transform" />
      <div
        ref={reticleRef}
        className="absolute left-0 top-0 h-3 w-3 border border-graphite will-change-transform"
        style={{ transition: 'border-color 0.3s ease' }}
      />
      <span
        ref={labelRef}
        className="absolute left-0 top-0 font-mono text-[0.7rem] uppercase tracking-wide text-copper opacity-0 will-change-transform"
      />
    </div>
  );
}
