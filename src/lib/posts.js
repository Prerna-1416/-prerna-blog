import matter from 'gray-matter'

const modules = import.meta.glob('/content/blogs/**/*.md', { eager: true, query: '?raw', import: 'default' })

function computeReadingTime(content) {
  const words = content.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

function parsePosts() {
  const posts = Object.entries(modules).map(([path, raw]) => {
    const { data, content } = matter(raw)
    const slug = path
      .replace('/content/blogs/', '')
      .replace(/\.md$/, '')
      .replace(/\\/g, '/')

    return {
      slug,
      title: data.title || slug,
      date: data.date ? new Date(data.date).toISOString().split('T')[0] : null,
      description: data.description || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      readingTime: data.readingTime || computeReadingTime(content),
      content,
    }
  })

  posts.sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date) - new Date(a.date)
  })

  return posts
}

const allPosts = parsePosts()

export function getAllPosts() {
  return allPosts
}

export function getPostBySlug(slug) {
  return allPosts.find((p) => p.slug === slug) || null
}

export function getLatestPosts(n = 3) {
  return allPosts.slice(0, n)
}

export function getAdjacentPosts(slug) {
  const idx = allPosts.findIndex((p) => p.slug === slug)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? allPosts[idx - 1] : null,
    next: idx < allPosts.length - 1 ? allPosts[idx + 1] : null,
  }
}

export function getAllTags() {
  const tags = new Set()
  allPosts.forEach((p) => p.tags.forEach((t) => tags.add(t)))
  return [...tags].sort()
}

export function searchPosts(posts, query) {
  if (!query) return posts
  const q = query.toLowerCase()
  return posts.filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    )
  })
}

export function filterByTag(posts, tag) {
  if (!tag) return posts
  return posts.filter((p) => p.tags.includes(tag))
}

export function sortPosts(posts, key) {
  const sorted = [...posts]
  switch (key) {
    case 'oldest':
      sorted.sort((a, b) => {
        if (!a.date) return 1; if (!b.date) return -1
        return new Date(a.date) - new Date(b.date)
      })
      break
    case 'readingTime': {
      sorted.sort((a, b) => {
        const aMin = parseInt(a.readingTime) || 0
        const bMin = parseInt(b.readingTime) || 0
        return aMin - bMin
      })
      break
    }
    case 'alpha':
      sorted.sort((a, b) => a.title.localeCompare(b.title))
      break
    default:
      sorted.sort((a, b) => {
        if (!a.date) return 1; if (!b.date) return -1
        return new Date(b.date) - new Date(a.date)
      })
  }
  return sorted
}
