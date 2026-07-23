export default function TagBadge({ tag, active, onClick }) {
  const classes = `inline-block text-xs font-medium px-2.5 py-0.5 rounded-full border transition-all ${
    active
      ? 'bg-accent text-white border-accent'
      : 'border-accent/30 text-accent hover:border-accent/60'
  }`

  if (onClick) {
    return (
      <button onClick={onClick} className={classes}>
        {tag}
      </button>
    )
  }

  return <span className={classes}>{tag}</span>
}
