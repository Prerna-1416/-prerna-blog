import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionReveal from '../components/SectionReveal'
import BlogCard from '../components/BlogCard'
import HeroIllustration from '../components/HeroIllustration'
import { getLatestPosts } from '../lib/posts'

export default function Home() {
  const latestPosts = getLatestPosts(3)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-bg pt-20 pb-12 sm:pt-24 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left: Text */}
            <div className="flex-1 text-center lg:text-left">
              <SectionReveal>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight">
                  My thoughts
                  <br />
                  <span className="italic font-normal">and ideas</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-muted max-w-md mx-auto lg:mx-0 leading-relaxed">
                  A place to read, write, and deepen your understanding
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <Link
                    to="/blogs"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-text text-white font-medium text-sm hover:bg-text/90 transition-colors"
                  >
                    Read Blogs
                  </Link>
                  <a
                    href="#about"
                    className="inline-flex items-center px-6 py-3 rounded-full border border-text/20 text-text font-medium text-sm hover:bg-text/5 transition-colors"
                  >
                    About Me
                  </a>
                </div>
              </SectionReveal>
            </div>

            {/* Right: Illustration */}
            <SectionReveal className="w-full lg:w-[52%]">
              <HeroIllustration />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <SectionReveal>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-text mb-6">
                About Me
              </h2>
              <div className="w-12 h-0.5 bg-accent mx-auto mb-6" />
              <p className="text-base sm:text-lg text-muted leading-relaxed">
                Hi, I'm Prerna. I enjoy documenting what I learn and sharing ideas
                through writing. This blog is my personal space for thoughts,
                tutorials, and experiences.
              </p>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      {latestPosts.length > 0 && (
        <section className="pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-text">
                  Latest Posts
                </h2>
                <motion.div whileHover={{ x: 4 }}>
                  <Link
                    to="/blogs"
                    className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                  >
                    View all &rarr;
                  </Link>
                </motion.div>
              </div>
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post, i) => (
                <SectionReveal key={post.slug}>
                  <BlogCard post={post} index={i} />
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
