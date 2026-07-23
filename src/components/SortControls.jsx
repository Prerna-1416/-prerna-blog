const sortOptions = [
  { key: 'newest', label: 'Newest First' },
  { key: 'oldest', label: 'Oldest First' },
  { key: 'readingTime', label: 'Reading Time' },
  { key: 'alpha', label: 'A–Z' },
]

export default function SortControls({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {sortOptions.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={`text-sm font-medium transition-colors ${
            value === opt.key
              ? 'text-accent border-b-2 border-accent'
              : 'text-muted hover:text-text'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
