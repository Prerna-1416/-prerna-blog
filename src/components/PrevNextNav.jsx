import { Link } from 'react-router-dom'

export default function PrevNextNav({ prev, next }) {
  return (
    <div className="flex justify-between gap-4 mt-10 pt-6 border-t border-black/5">
      {prev ? (
        <Link
          to={`/blog/${prev.slug}`}
          className="group flex-1"
        >
          <span className="text-xs text-muted font-medium">&larr; Previous</span>
          <p className="text-sm font-medium text-text group-hover:text-accent transition-colors mt-0.5">
            {prev.title}
          </p>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          to={`/blog/${next.slug}`}
          className="group flex-1 text-right"
        >
          <span className="text-xs text-muted font-medium">Next &rarr;</span>
          <p className="text-sm font-medium text-text group-hover:text-accent transition-colors mt-0.5">
            {next.title}
          </p>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  )
}
