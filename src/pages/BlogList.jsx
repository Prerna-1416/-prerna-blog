import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionReveal from '../components/SectionReveal'
import SearchBar from '../components/SearchBar'
import SortControls from '../components/SortControls'
import TagFilter from '../components/TagFilter'
import BlogCard from '../components/BlogCard'
import {
  getAllPosts,
  getAllTags,
  searchPosts,
  filterByTag,
  sortPosts,
} from '../lib/posts'

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTag, setActiveTag] = useState(null)
  const [sortKey, setSortKey] = useState('newest')

  const allPosts = useMemo(() => getAllPosts(), [])
  const allTags = useMemo(() => getAllTags(), [])

  const filtered = useMemo(() => {
    let result = allPosts
    result = searchPosts(result, searchQuery)
    result = filterByTag(result, activeTag)
    return sortPosts(result, sortKey)
  }, [allPosts, searchQuery, activeTag, sortKey])

  return (
    <div className="pt-20 pb-16 sm:pt-24 sm:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text mb-2">
            All Posts
          </h1>
          <p className="text-muted text-sm sm:text-base mb-6">
            Explore articles on writing, learning, and ideas.
          </p>
        </SectionReveal>

        {/* Controls */}
        <div className="space-y-4 mb-8">
          <SectionReveal>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </SectionReveal>
          <SectionReveal>
            <SortControls value={sortKey} onChange={setSortKey} />
          </SectionReveal>
          {allTags.length > 0 && (
            <SectionReveal>
              <TagFilter
                tags={allTags}
                activeTag={activeTag}
                onTagClick={setActiveTag}
              />
            </SectionReveal>
          )}
        </div>

        {/* Posts Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <p className="text-muted text-base">No posts found.</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveTag(null)
                  setSortKey('newest')
                }}
                className="mt-2 text-sm text-accent hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
