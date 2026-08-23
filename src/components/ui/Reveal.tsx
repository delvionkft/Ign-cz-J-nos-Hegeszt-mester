/**
 * Visszafogott görgetéses megjelenés (egyszeri, 220 ms).
 *
 * ROBUSZTUSSÁG: a tartalom soha nem maradhat láthatatlan.
 *  - Ha nincs IntersectionObserver, vagy a látogató csökkentett mozgást kért,
 *    a tartalom azonnal látszik.
 *  - Nem csak a „éppen látható" állapotra jelenítünk meg, hanem minden olyan
 *    értesítésre, amelynél az elem teteje már átlépte a képernyő alját.
 *    Gyors görgetésnél a böngésző összevonhatja az értesítéseket, és az elem
 *    „nem látható, mert már fölötte van" állapotban érkezik – ez a feltétel
 *    ezt is megjelenítésnek veszi.
 *  - Végső hálóként rövid időzítő után minden elem megjelenik.
 */
import { useEffect, useRef, useState } from 'react'
import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  /** Lépcsőzetes megjelenítéshez, ms-ban. Tartsd 0–160 között. */
  delay?: number
  className?: string
  as?: ElementType
}

/** Az elem teteje már átlépte a képernyő alját? */
function hasEnteredViewport(entry: IntersectionObserverEntry): boolean {
  if (entry.isIntersecting) return true
  const viewportHeight = entry.rootBounds?.height ?? window.innerHeight
  return entry.boundingClientRect.top < viewportHeight
}

export function Reveal({ children, delay = 0, className, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(
    () => typeof window === 'undefined' || typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    if (shown) return
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some(hasEnteredViewport)) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0 },
    )
    observer.observe(node)

    // Biztonsági háló: elakadt értesítés esetén sem maradhat rejtve a tartalom.
    const fallback = window.setTimeout(() => {
      const rect = node.getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        setShown(true)
        observer.disconnect()
      }
    }, 1200)

    return () => {
      window.clearTimeout(fallback)
      observer.disconnect()
    }
  }, [shown])

  return (
    <Tag
      ref={ref}
      data-shown={shown ? 'true' : 'false'}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn('reveal', className)}
    >
      {children}
    </Tag>
  )
}
