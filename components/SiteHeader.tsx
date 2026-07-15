'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NAV, SITE } from '@/lib/content';

const SECTION_LABELS: Record<string, string> = {
  hero: 'Index',
  manifesto: 'Manifesto',
  projects: 'Projects',
  process: 'Process',
  studio: 'Studio',
  contact: 'Contact',
};

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('Index');
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const onPrintRoute = pathname?.startsWith('/cv') ?? false;

  const close = useCallback(() => setOpen(false), []);

  const go = useCallback((href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const ids = Object.keys(SECTION_LABELS);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(SECTION_LABELS[e.target.id] ?? 'Index');
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      overlayRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    } else {
      document.body.style.overflow = '';
      menuButtonRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return close();
      if (e.key !== 'Tab') return;
      const nodes = overlayRef.current?.querySelectorAll<HTMLElement>('a, button');
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  if (onPrintRoute) return null;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-header bg-concrete/80 backdrop-blur-sm">
        <div className="grid grid-cols-3 items-center px-5 py-4 sm:px-8">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              go('#hero');
            }}
            data-cursor
            data-cursor-label="Top"
            className="font-grotesk text-sm font-bold uppercase tracking-label text-graphite"
          >
            {SITE.name}
          </a>

          <span className="hidden text-center font-mono text-xs uppercase tracking-wide text-slate sm:block">
            ({current})
          </span>

          <div className="flex items-center justify-end gap-5">
            <span className="hidden font-mono text-xs text-slate md:inline">{SITE.coordinate}</span>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-haspopup="dialog"
              data-cursor
              className="label underline-draw text-graphite"
            >
              Menu
            </button>
          </div>
        </div>
        <div className="copper-rule mx-5 opacity-30 sm:mx-8" />
      </header>

      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
        aria-hidden={!open}
        className="fixed inset-0 z-nav flex flex-col bg-concrete transition-transform duration-slower ease-draft"
        style={{
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 sm:px-8">
          <span className="font-grotesk text-sm font-bold uppercase tracking-label text-graphite">
            {SITE.name}
          </span>
          <button type="button" onClick={close} data-cursor className="label underline-draw text-graphite">
            Close
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center gap-2 px-5 sm:px-8">
          {NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                go(link.href);
              }}
              data-cursor
              data-cursor-label="Go"
              className="group flex items-baseline gap-5 py-1"
            >
              <span className="font-mono text-sm text-slate transition-colors group-hover:text-copper">
                ({link.index})
              </span>
              <span className="font-grotesk text-[clamp(2.5rem,9vw,7rem)] font-medium leading-none tracking-tight text-graphite transition-colors duration-slow ease-forma group-hover:text-copper">
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-between px-5 pb-6 sm:px-8">
          <span className="font-mono text-xs text-slate">{SITE.coordinate}</span>
          <span className="font-mono text-xs text-slate">{SITE.tagline}</span>
        </div>
      </div>
    </>
  );
}
