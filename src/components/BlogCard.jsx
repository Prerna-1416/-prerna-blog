import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import BlogCardSVG from '../lib/cardSVG.jsx'

export default function BlogCard({ post, index = 0 }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block relative overflow-hidden rounded-2xl bg-white border border-black/5 hover:shadow-lg hover:shadow-black/5 transition-all duration-300"
      >
        <div className="relative h-44 overflow-hidden bg-bg">
          <BlogCardSVG slug={post.slug} />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 text-xs text-muted mb-2">
            {post.date && <time>{post.date}</time>}
            <span>{post.readingTime}</span>
          </div>
          <h3 className="font-serif text-lg font-semibold text-text mb-1.5 group-hover:text-accent transition-colors">
            {post.title}
          </h3>
          {post.description && (
            <p className="text-sm text-muted leading-relaxed line-clamp-2">
              {post.description}
            </p>
          )}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-accent/5 text-accent/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <span className="inline-block mt-3 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
            Read More &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
