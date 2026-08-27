import { useEffect, useRef, useState } from 'react'

/** True once the element has scrolled into view. Fires once, then disconnects. */
export function useInView(options) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...options },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [options])

  return [ref, inView]
}

/**
 * Fades and lifts its children into view once. The CSS class is inert under
 * prefers-reduced-motion, so this stays safe to wrap anything in.
 */
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'shown' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
