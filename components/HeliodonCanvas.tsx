'use client';

import { useEffect, useRef } from 'react';
import {
  drawHeliodon,
  layoutFor,
  sunAt,
  timeLabel,
  type HeliodonState,
} from '@/lib/heliodon';

interface HeliodonCanvasProps {
  state: HeliodonState;
  onTick?: (label: string, altitude: number) => void;
  className?: string;
}

const LAPSE_SPEED = 0.018;
const IDLE_AFTER = 3000;

export default function HeliodonCanvas({ state, onTick, className = '' }: HeliodonCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tickRef = useRef(onTick);
  tickRef.current = onTick;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let running = true;
    let last = performance.now();
    let lastLabel = '';
    let wasIdle = false;

    const loop = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const idle = state.lapse && now - state.lastInput > IDLE_AFTER;
      if (idle && !wasIdle) state.dayTarget = state.day;
      wasIdle = idle;

      if (idle) {
        state.dayTarget += LAPSE_SPEED * dt;
        if (state.dayTarget > 0.98) {
          state.dayTarget = 0.02;
          state.day = 0.02;
        }
      }
      const k = 1 - Math.pow(1 - 0.055, dt * 60);
      state.day += (state.dayTarget - state.day) * k;

      drawHeliodon(ctx, width, height, state, layoutFor(width, height, width < 768));

      if (tickRef.current) {
        const label = timeLabel(state.day, state.season);
        if (label !== lastLabel) {
          lastLabel = label;
          tickRef.current(label, sunAt(state.day, state.season).altitude);
        }
      }
    };
    raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([entry]) => {
      const next = entry.isIntersecting && !document.hidden;
      if (next && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(loop);
        return;
      }
      if (!next && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden && running) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!document.hidden && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [state]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
