/** Feltételes osztálynév-összefűzés. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ')
}

/** Görgetés egy szekcióhoz, a rögzített fejléc magasságát figyelembe véve. */
export function scrollToSection(id: string): void {
  const target = document.getElementById(id)
  if (!target) return

  const headerOffset = 72
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' })

  // Fókusz átadása a billentyűzetes navigáció miatt.
  target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
}

/** Az oldal aktuális függőleges pozíciója százalékban (mérési eseményekhez). */
export function scrollDepth(): number {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  if (scrollable <= 0) return 0
  return Math.min(100, Math.round((window.scrollY / scrollable) * 100))
}

/** Fájlméret olvasható formában. */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
