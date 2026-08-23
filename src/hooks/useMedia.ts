import { useEffect, useState } from 'react'

/** Media query figyelése SSR-biztos módon. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** A látogató kérte-e a mozgás csökkentését. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/** Görgetett-e már a látogató az adott pixelmennyiség alá. */
export function useScrolledPast(offset: number): boolean {
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    const onScroll = () => setPassed(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return passed
}
