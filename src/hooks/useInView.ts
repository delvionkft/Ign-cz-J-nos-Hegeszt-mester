import { useEffect, useRef, useState } from 'react'

/**
 * Egyszeri láthatóság-figyelés (pl. `price_section_view` eseményhez).
 * A callback legfeljebb egyszer fut le.
 */
export function useInViewOnce<T extends HTMLElement>(
  onEnter: () => void,
  options: IntersectionObserverInit = { threshold: 0.35 },
) {
  const ref = useRef<T | null>(null)
  const fired = useRef(false)
  const handler = useRef(onEnter)
  handler.current = onEnter

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true
          handler.current()
          observer.disconnect()
        }
      }
    }, options)

    observer.observe(node)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}

/** Az éppen látható szekció azonosítója – a fejléc aktív állapotához. */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )

    const nodes = ids.map((id) => document.getElementById(id)).filter((n): n is HTMLElement => Boolean(n))
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [ids])

  return active
}
