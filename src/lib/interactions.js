import { useCallback, useEffect, useRef, useState } from 'react'

/** True only on devices with a real pointer and no reduced-motion preference. */
export function useFinePointer() {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia?.('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return

    const update = () => setFine(mq.matches && !reduce?.matches)
    update()

    mq.addEventListener?.('change', update)
    reduce?.addEventListener?.('change', update)
    return () => {
      mq.removeEventListener?.('change', update)
      reduce?.removeEventListener?.('change', update)
    }
  }, [])

  return fine
}

/**
 * Perspective tilt following the cursor. Writes CSS custom properties rather
 * than React state, so it never re-renders on pointer move.
 */
export function useTilt({ max = 5, lift = -4 } = {}) {
  const ref = useRef(null)
  const frame = useRef(null)
  const fine = useFinePointer()

  const onMove = useCallback(
    (e) => {
      if (!fine) return
      const el = ref.current
      if (!el) return
      if (frame.current) cancelAnimationFrame(frame.current)

      frame.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        el.style.setProperty('--rx', `${px * max * 2}deg`)
        el.style.setProperty('--ry', `${-py * max * 2}deg`)
        el.style.setProperty('--lift', `${lift}px`)
      })
    },
    [fine, max, lift],
  )

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    if (frame.current) cancelAnimationFrame(frame.current)
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--lift', '0px')
  }, [])

  useEffect(() => () => frame.current && cancelAnimationFrame(frame.current), [])

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave }
}

/** Magnetic pull toward the cursor while it is near the element. */
export function useMagnet({ strength = 0.35 } = {}) {
  const ref = useRef(null)
  const frame = useRef(null)
  const fine = useFinePointer()

  const onMove = useCallback(
    (e) => {
      if (!fine) return
      const el = ref.current
      if (!el) return
      if (frame.current) cancelAnimationFrame(frame.current)

      frame.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        el.style.setProperty('--mx', `${dx * strength}px`)
        el.style.setProperty('--my', `${dy * strength}px`)
      })
    },
    [fine, strength],
  )

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    if (frame.current) cancelAnimationFrame(frame.current)
    el.style.setProperty('--mx', '0px')
    el.style.setProperty('--my', '0px')
  }, [])

  useEffect(() => () => frame.current && cancelAnimationFrame(frame.current), [])

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave }
}

/**
 * Normalised pointer position (-0.5 to 0.5) over an element, for parallax.
 * Returns a ref to attach and writes --px / --py onto it.
 */
export function useParallax({ damp = 1 } = {}) {
  const ref = useRef(null)
  const frame = useRef(null)
  const fine = useFinePointer()

  useEffect(() => {
    if (!fine) return
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      if (frame.current) cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        el.style.setProperty('--px', (px * damp).toFixed(3))
        el.style.setProperty('--py', (py * damp).toFixed(3))
      })
    }

    const onLeave = () => {
      el.style.setProperty('--px', '0')
      el.style.setProperty('--py', '0')
    }

    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [fine, damp])

  return ref
}
