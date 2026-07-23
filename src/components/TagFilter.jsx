import TagBadge from './TagBadge'

export default function TagFilter({ tags, activeTag, onTagClick }) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <TagBadge
        tag="All"
        active={!activeTag}
        onClick={() => onTagClick(null)}
      />
      {tags.map((tag) => (
        <TagBadge
          key={tag}
          tag={tag}
          active={activeTag === tag}
          onClick={() => onTagClick(tag)}
        />
      ))}
    </div>
  )
}
