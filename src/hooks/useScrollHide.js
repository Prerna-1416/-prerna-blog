import { useState, useEffect, useRef } from 'react'

export default function useScrollHide() {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY > lastY.current && currentY > 60) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return hidden
}
