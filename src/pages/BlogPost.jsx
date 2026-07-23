import { useParams, Link } from 'react-router-dom'
import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import SectionReveal from '../components/SectionReveal'
import ReadingProgressBar from '../components/ReadingProgressBar'
import TableOfContents from '../components/TableOfContents'
import CopyCodeButton from '../components/CopyCodeButton'
import PrevNextNav from '../components/PrevNextNav'
import TagBadge from '../components/TagBadge'
import { getPostBySlug, getAdjacentPosts, getAllTags } from '../lib/posts'

function extractHeadings(markdown) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm
  const headings = []
  let match
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const text = match[2].replace(/[`*_~\[\]()]/g, '')
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
    headings.push({ id, text, level })
  }
  return headings
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)
  const { prev, next } = getAdjacentPosts(slug)

  const headings = useMemo(() => {
    if (!post) return []
    return extractHeadings(post.content)
  }, [post])

  if (!post) {
    return (
      <div className="pt-24 pb-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="font-serif text-3xl font-bold text-text mb-4">
            Post not found
          </h1>
          <Link
            to="/blogs"
            className="text-accent text-sm font-medium hover:underline"
          >
            &larr; Back to all posts
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <ReadingProgressBar />
      <article className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mx-auto mb-8">
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
            )}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted mt-4">
              {post.date && <time>{post.date}</time>}
              <span>&middot;</span>
              <span>{post.readingTime}</span>
            </div>
            {post.description && (
              <p className="text-base text-muted mt-4 leading-relaxed">
                {post.description}
              </p>
            )}
          </div>

          {/* Content + TOC */}
          <div className="flex gap-8 max-w-6xl mx-auto">
            <TableOfContents headings={headings} />

            <div className="flex-1 min-w-0 max-w-3xl">
              <SectionReveal>
                <div className="prose prose-lg prose-text max-w-none prose-headings:font-serif prose-headings:text-text prose-headings:scroll-mt-24 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-pre:bg-[#F8F9FA] prose-pre:border prose-pre:border-black/5 prose-pre:rounded-xl prose-code:text-accent prose-code:bg-accent/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-img:rounded-xl prose-blockquote:border-accent prose-blockquote:text-muted">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight, rehypeRaw]}
                    components={{
                      h1: ({ children, ...props }) => {
                        const id = String(children)
                          .toLowerCase()
                          .replace(/[^\w\s-]/g, '')
                          .replace(/\s+/g, '-')
                        return <h1 id={id} {...props}>{children}</h1>
                      },
                      h2: ({ children, ...props }) => {
                        const id = String(children)
                          .toLowerCase()
                          .replace(/[^\w\s-]/g, '')
                          .replace(/\s+/g, '-')
                        return <h2 id={id} {...props}>{children}</h2>
                      },
                      h3: ({ children, ...props }) => {
                        const id = String(children)
                          .toLowerCase()
                          .replace(/[^\w\s-]/g, '')
                          .replace(/\s+/g, '-')
                        return <h3 id={id} {...props}>{children}</h3>
                      },
                      pre: ({ children }) => (
                        <pre className="overflow-x-auto">
                          {children}
                        </pre>
                      ),
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                  <CopyCodeButton />
                </div>
              </SectionReveal>

              {/* Prev / Next */}
              <PrevNextNav prev={prev} next={next} />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
