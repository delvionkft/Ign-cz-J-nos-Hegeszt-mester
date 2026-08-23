/**
 * Könnyű parallax effekt.
 *
 * A görgetés arányában eltolja az elemet `transform`-mal (nem `top`-pal),
 * így a böngésző a kompozitorban futtatja, és nem okoz újrarajzolást.
 *
 * Kikapcsol, ha a látogató csökkentett mozgást kért, vagy ha a képernyő
 * kicsi – mobilon a parallax több kárt okoz, mint hasznot.
 */
import { useEffect, useRef } from 'react'

export function useParallax<T extends HTMLElement>(strength = 0.18) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const small = window.matchMedia('(max-width: 767px)')

    let frame = 0
    let active = false

    const apply = () => {
      frame = 0
      const rect = node.getBoundingClientRect()
      // Csak akkor számolunk, ha az elem a képernyő közelében van.
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return
      const offset = -rect.top * strength
      node.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(apply)
    }

    const enable = () => {
      if (active) return
      active = true
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      apply()
    }

    const disable = () => {
      if (!active) return
      active = false
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
      node.style.transform = ''
    }

    const sync = () => {
      if (reduced.matches || small.matches) disable()
      else enable()
    }

    sync()
    reduced.addEventListener('change', sync)
    small.addEventListener('change', sync)

    return () => {
      reduced.removeEventListener('change', sync)
      small.removeEventListener('change', sync)
      disable()
    }
  }, [strength])

  return ref
}
