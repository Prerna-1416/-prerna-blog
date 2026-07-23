import { useState, useEffect } from 'react'

export default function useActiveHeading(headingIds) {
  const [active, setActive] = useState('')

  useEffect(() => {
    if (!headingIds.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    headingIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headingIds])

  return active
}
