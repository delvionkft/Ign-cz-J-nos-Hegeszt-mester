/**
 * INTERAKTÍV PROBLÉMAVÁLASZTÓ
 * ---------------------------
 * Nem dekoratív szolgáltatásrács: a kattintás ténylegesen átváltja a
 * fájdalomblokkot, a galériát, az ártáblázatot, a folyamatot, a garanciát,
 * a GYIK-et és az ajánlatkérő űrlap kategóriáját.
 *
 * Akadálymentesség: `radiogroup` minta roving tabindexszel – Tab a csoportra,
 * nyílbillentyűk a kártyák között, Enter/Space a kiválasztáshoz.
 */
import { useRef } from 'react'
import { problemCards, segments } from '@/content'
import type { ProblemId } from '@/content/types'
import { useSegment } from '@/hooks/useSegment'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'

export function ProblemSelector() {
  const { problem, segment, selectProblem } = useSegment()
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([])

  // Ha még nincs konkrét választás, a jelenlegi szegmens első kártyája kapja a fókuszt.
  const focusIndex = problem
    ? problemCards.findIndex((card) => card.id === problem)
    : Math.max(0, problemCards.findIndex((card) => card.segment === segment))

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End']
    if (!keys.includes(event.key)) return
    event.preventDefault()

    let next = index
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % problemCards.length
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
      next = (index - 1 + problemCards.length) % problemCards.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = problemCards.length - 1

    buttonsRef.current[next]?.focus()
    selectProblem(problemCards[next].id, 'problem_selector_keyboard')
  }

  return (
    <Section id="javitasok" labelledBy="javitasok-cim">
      <SectionHeading
        id="javitasok-cim"
        kicker="Problémaválasztó"
        title="Miben tudok segíteni?"
        subtitle="Válaszd ki, milyen javításra vagy gyártásra van szükséged, és az oldal megmutatja a releváns munkákat, árakat és tudnivalókat."
      />

      <div
        role="radiogroup"
        aria-labelledby="javitasok-cim"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {problemCards.map((card, index) => {
          const selected = problem === card.id
          return (
            <button
              key={card.id}
              ref={(node) => {
                buttonsRef.current[index] = node
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={index === focusIndex ? 0 : -1}
              onClick={() => selectProblem(card.id, 'problem_selector')}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                'group relative flex h-full flex-col rounded-sm border p-4 text-left transition-colors duration-150 sm:p-5',
                selected
                  ? 'border-brand bg-brand/10'
                  : 'border-white/10 bg-panel/60 hover:border-alu/50 hover:bg-panel',
              )}
            >
              {/* Aktív állapot jelzése színen kívül is (ikon + vastag él). */}
              {selected && (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 bg-brand"
                />
              )}

              <span className="mb-3 flex items-center justify-between gap-3">
                <Icon
                  name={card.icon}
                  size={28}
                  className={cn('transition-colors', selected ? 'text-brand-light' : 'text-steel group-hover:text-alu')}
                />
                {selected && (
                  <span className="flex items-center gap-1 rounded-sm bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    <Icon name="check" size={12} />
                    Kiválasztva
                  </span>
                )}
              </span>

              <span className="font-display text-lg font-semibold uppercase leading-tight text-paper">
                {card.title}
              </span>
              <span className="mt-2 text-sm leading-relaxed text-alu">{card.description}</span>

              <span className="mt-3 flex flex-wrap gap-1.5">
                {card.examples.map((example) => (
                  <span
                    key={example}
                    className="rounded-sm border border-white/10 px-2 py-0.5 text-[11px] text-alu/80"
                  >
                    {example}
                  </span>
                ))}
              </span>
            </button>
          )
        })}
      </div>

      <p aria-live="polite" className="mt-5 text-sm text-alu">
        Aktuális nézet:{' '}
        <strong className="font-semibold text-paper">{segments[segment].label}</strong>
        {problem && (
          <>
            {' – '}
            {problemCards.find((card) => card.id === problem)?.title}
          </>
        )}
        . Az alábbi szekciók ehhez igazodnak.
      </p>
    </Section>
  )
}

export type { ProblemId }
