'use client';

import { PROJECTS, SITE, STUDIO } from '@/lib/content';

export default function CvPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl bg-white px-6 py-16 text-black print:py-0">
      <header className="flex items-start justify-between border-b border-black pb-6">
        <div>
          <h1 className="font-grotesk text-3xl font-bold uppercase tracking-tight">{SITE.name}</h1>
          <p className="mt-1 font-mono text-xs uppercase tracking-wide text-neutral-600">
            Studio Curriculum — {SITE.coordinate}
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="border border-black px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors hover:bg-black hover:text-white print:hidden"
        >
          Print
        </button>
      </header>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">Profile</h2>
        <p className="mt-3 font-grotesk text-lg leading-relaxed">{STUDIO.paragraph}</p>
      </section>

      <section className="mt-10 grid grid-cols-4 gap-4 border-y border-neutral-300 py-6">
        {STUDIO.facts.map((f) => (
          <div key={f.label}>
            <div className="font-mono text-2xl">{f.value}</div>
            <div className="font-mono text-[0.7rem] uppercase tracking-wide text-neutral-500">{f.label}</div>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">Partners</h2>
        <ul className="mt-3 divide-y divide-neutral-200">
          {STUDIO.people.map((p) => (
            <li key={p.name} className="flex items-baseline justify-between py-2">
              <span className="font-grotesk text-base font-medium">{p.name}</span>
              <span className="font-mono text-xs uppercase tracking-wide text-neutral-600">{p.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">Selected projects</h2>
        <table className="mt-3 w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-neutral-300 font-mono text-[0.7rem] uppercase tracking-wide text-neutral-500">
              <th className="py-2 pr-4 font-normal">Ref</th>
              <th className="py-2 pr-4 font-normal">Project</th>
              <th className="py-2 pr-4 font-normal">Type</th>
              <th className="py-2 pr-4 font-normal">Year</th>
              <th className="py-2 font-normal">Area</th>
            </tr>
          </thead>
          <tbody>
            {PROJECTS.map((p) => (
              <tr key={p.index} className="border-b border-neutral-200">
                <td className="py-2 pr-4 font-mono text-sm">{p.index}</td>
                <td className="py-2 pr-4 font-grotesk text-sm font-medium">{p.name}</td>
                <td className="py-2 pr-4 font-mono text-xs text-neutral-600">{p.category}</td>
                <td className="py-2 pr-4 font-mono text-sm">{p.year}</td>
                <td className="py-2 font-mono text-sm">{p.area.toLocaleString('en-US')} m²</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-10 border-t border-black pt-6">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">Contact</h2>
        <p className="mt-3 font-grotesk text-base">{SITE.address}</p>
        <p className="font-mono text-sm">{SITE.email}</p>
      </section>

      <footer className="mt-10 font-mono text-[0.7rem] uppercase tracking-wide text-neutral-400">
        © Atelier Forma 2009—2026 — {SITE.tagline}
      </footer>

      <a href="/" className="mt-8 inline-block font-mono text-xs underline print:hidden">
        ← Back to site
      </a>
    </main>
  );
}
