import { FOOTER, SITE } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="bg-graphite px-5 py-20 text-concrete sm:px-8">
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <span className="font-grotesk text-lg font-bold uppercase tracking-label">{SITE.name}</span>
          <p className="mt-4 max-w-[18ch] font-grotesk text-concrete/60">{SITE.tagline}</p>
        </div>

        {FOOTER.columns.map((col) => (
          <div key={col.label}>
            <span className="label !text-copper">{col.label}</span>
            <ul className="mt-4 space-y-2.5">
              {col.items.map((item) => (
                <li key={item}>
                  <span className="cursor-default font-mono text-xs uppercase tracking-wide text-concrete/70 transition-colors duration-slow hover:text-copper">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-concrete/15 pt-6 sm:flex-row sm:items-center">
        <span className="font-mono text-xs text-concrete/50">{SITE.coordinate} — Zürich</span>
        <span className="font-mono text-xs text-concrete/50">{FOOTER.closing}</span>
      </div>
    </footer>
  );
}
