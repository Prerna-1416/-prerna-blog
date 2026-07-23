import useActiveHeading from '../hooks/useActiveHeading'

function TocLink({ id, text, level, active }) {
  return (
    <a
      href={`#${id}`}
      className={`block text-sm transition-colors ${
        level === 1 ? 'font-semibold mt-2' : level === 2 ? 'pl-3' : 'pl-6'
      } ${
        active === id
          ? 'text-accent font-medium'
          : 'text-muted hover:text-text'
      }`}
    >
      {text}
    </a>
  )
}

export default function TableOfContents({ headings }) {
  const ids = headings.map((h) => h.id)
  const active = useActiveHeading(ids)

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <nav className="hidden lg:block sticky top-24 w-56 shrink-0 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
          Table of Contents
        </h4>
        <div className="space-y-1">
          {headings.map((h) => (
            <TocLink key={h.id} {...h} active={active} />
          ))}
        </div>
      </nav>

      {/* Mobile: collapsible drawer */}
      <details className="lg:hidden bg-white border border-black/5 rounded-xl mb-6">
        <summary className="text-sm font-medium px-4 py-3 cursor-pointer text-muted hover:text-text transition-colors">
          Table of Contents
        </summary>
        <div className="px-4 pb-3 space-y-1 border-t border-black/5 pt-2">
          {headings.map((h) => (
            <TocLink key={h.id} {...h} active={active} />
          ))}
        </div>
      </details>
    </>
  )
}
