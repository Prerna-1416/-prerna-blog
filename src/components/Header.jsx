import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import useScrollHide from '../hooks/useScrollHide'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/blogs', label: 'Blogs' },
]

export default function Header() {
  const hidden = useScrollHide()
  const location = useLocation()

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-sm border-b border-black/5"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl font-bold text-text tracking-tight">
          Prerna
        </Link>
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'text-accent'
                  : 'text-muted hover:text-text'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/blogs"
            className="text-sm font-medium px-4 py-1.5 rounded-full bg-text text-white hover:bg-text/90 transition-colors"
          >
            Get started
          </Link>
        </nav>
      </div>
    </motion.header>
  )
}
