'use client';

import { useRef } from 'react';
import { useGsapContext } from '@/hooks/useGsapContext';
import { drawStrokes } from '@/lib/svg-draw';

interface BlueprintGridProps {
  cols?: number;
  rows?: number;
  className?: string;
}

export default function BlueprintGrid({ cols = 12, rows = 8, className = '' }: BlueprintGridProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGsapContext(ref, () => {
    drawStrokes('.bp-line', { duration: 0.9, stagger: 0.025 });
    drawStrokes('.bp-accent', { duration: 1.1, delay: 0.6 });
  });

  const vLines = Array.from({ length: cols - 1 }, (_, i) => ((i + 1) / cols) * 100);
  const hLines = Array.from({ length: rows - 1 }, (_, i) => ((i + 1) / rows) * 100);

  return (
    <div ref={ref} className={className} aria-hidden>
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
        {vLines.map((x) => (
          <line
            key={`v${x}`}
            className="bp-line"
            x1={x}
            y1="0"
            x2={x}
            y2="100"
            stroke="#D8D6D0"
            strokeWidth="1"
            pathLength={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {hLines.map((y) => (
          <line
            key={`h${y}`}
            className="bp-line"
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="#D8D6D0"
            strokeWidth="1"
            pathLength={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <line
          className="bp-accent"
          x1="25"
          y1="0"
          x2="25"
          y2="100"
          stroke="#B87333"
          strokeWidth="1"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
        />
        <line
          className="bp-accent"
          x1="0"
          y1="62.5"
          x2="100"
          y2="62.5"
          stroke="#B87333"
          strokeWidth="1"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
