export default function Footer() {
  return (
    <footer className="border-t border-black/5 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Prerna. All rights reserved.</p>
      </div>
    </footer>
  )
}
