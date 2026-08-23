/**
 * SZEGMENS-KONTEXTUSSÁV
 * ---------------------
 * Az oldal legfontosabb mechanikája, hogy a tartalom a kiválasztott
 * szegmenshez igazodik. Ez a sáv teszi ezt görgetés közben is láthatóvá
 * és visszaválthatóvá – a látogatónak nem kell felgörgetnie a választóhoz.
 *
 * Csak akkor jelenik meg, amikor a problémaválasztó már elhagyta a képernyőt,
 * és az ajánlatkérő űrlap még nem ért oda.
 */
import { useEffect, useState } from 'react'
import { problemCards, segmentOrder, segments } from '@/content'
import type { SegmentId } from '@/content/types'
import { useSegment } from '@/hooks/useSegment'
import { cn, scrollToSection } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'

export function SegmentBar() {
  const { segment, problem, selectSegment } = useSegment()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const selector = document.getElementById('javitasok')
    const form = document.getElementById('ajanlatkeres')
    if (!selector || !form) return

    const state = { pastSelector: false, atForm: false }
    const update = () => setVisible(state.pastSelector && !state.atForm)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === selector) {
            // A választó teljesen kigörgött felfelé.
            state.pastSelector = !entry.isIntersecting && entry.boundingClientRect.top < 0
          }
          if (entry.target === form) {
            state.atForm = entry.isIntersecting
          }
        }
        update()
      },
      { threshold: 0, rootMargin: '-120px 0px 0px 0px' },
    )

    observer.observe(selector)
    observer.observe(form)
    return () => observer.disconnect()
  }, [])

  const activeCard = problem ? problemCards.find((card) => card.id === problem) : null

  const onSelect = (next: SegmentId) => {
    selectSegment(next, 'segment_bar')
  }

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        'fixed inset-x-0 top-16 z-40 border-b border-white/10 bg-ink/95 backdrop-blur transition-transform duration-200',
        visible ? 'translate-y-0' : '-translate-y-[calc(100%+4rem)]',
      )}
    >
      <div className="container-content">
        <div className="flex h-[46px] items-center gap-3">
          <p className="hidden shrink-0 items-center gap-2 font-display text-label font-semibold uppercase text-steel sm:flex">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-brand" />
            Nézet
          </p>

          {/* Szegmensválasztó – görgethető kis képernyőn, nem törik. */}
          <div
            role="group"
            aria-label="Szegmens váltása"
            className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto"
          >
            {segmentOrder.map((id) => {
              const active = segment === id
              return (
                <button
                  key={id}
                  type="button"
                  tabIndex={visible ? 0 : -1}
                  aria-pressed={active}
                  onClick={() => onSelect(id)}
                  className={cn(
                    'shrink-0 rounded-sm border px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide transition-colors duration-150',
                    active
                      ? 'border-brand bg-brand text-white'
                      : 'border-white/12 text-alu hover:border-alu/40 hover:text-paper',
                  )}
                >
                  {segments[id].label}
                </button>
              )
            })}
          </div>

          {activeCard && (
            <p className="hidden min-w-0 shrink items-center gap-2 text-xs text-steel lg:flex">
              <span aria-hidden="true" className="h-px w-4 bg-steel" />
              <span className="truncate">{activeCard.title}</span>
            </p>
          )}

          <button
            type="button"
            tabIndex={visible ? 0 : -1}
            onClick={() => scrollToSection('javitasok')}
            className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-alu transition-colors hover:text-paper"
          >
            <Icon name="chevron-down" size={14} className="rotate-180" />
            <span className="hidden sm:inline">Választó</span>
          </button>
        </div>
      </div>
    </div>
  )
}
