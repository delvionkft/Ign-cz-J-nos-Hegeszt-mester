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
import { useSegment } from '@/hooks/useSegment'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'

export function ProblemSelector() {
  const { problem, segment, selectProblem } = useSegment()
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([])

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
    <Section id="javitasok" labelledBy="javitasok-cim" index="01" glow="brand" glowAt={{ x: '82%', y: '18%' }}>
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
            <Reveal key={card.id} delay={Math.min(index * 45, 160)} className="h-full">
              <button
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
                  'hover-lift group relative flex h-full w-full flex-col overflow-hidden rounded-sm border p-5 text-left sm:p-6',
                  selected
                    ? 'border-brand bg-brand/[0.12] shadow-glow'
                    : 'border-white/10 bg-panel/55 shadow-edge hover:border-brand/50 hover:bg-panel hover:shadow-glow',
                )}
              >
                {/* Aktív jelzés színen kívül is: bal oldali sín + jelölés. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-y-0 left-0 w-1 transition-colors duration-150',
                    selected ? 'bg-brand' : 'bg-transparent group-hover:bg-white/15',
                  )}
                />

                <span className="mb-5 flex items-start justify-between gap-3">
                  <Icon
                    name={card.icon}
                    size={44}
                    strokeWidth={1.25}
                    className={cn(
                      'transition-[color,transform] duration-200 group-hover:scale-105',
                      selected ? 'text-brand-light' : 'text-steel group-hover:text-brand-light',
                    )}
                  />
                  <span
                    className={cn(
                      'shrink-0 rounded-sm px-2 py-1 font-display text-[10px] font-bold uppercase tracking-[0.14em] transition-colors duration-150',
                      selected
                        ? 'bg-brand text-white'
                        : 'border border-white/10 text-steel group-hover:text-alu',
                    )}
                  >
                    {selected ? 'Kiválasztva' : segments[card.segment].shortLabel}
                  </span>
                </span>

                <span className="font-display text-display-sm font-semibold uppercase text-paper">
                  {card.title}
                </span>
                <span className="mt-2.5 text-sm leading-relaxed text-alu">{card.description}</span>

                <span className="mt-5 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
                  {card.examples.map((example, exampleIndex) => (
                    <span key={example} className="text-xs text-steel">
                      {example}
                      {/* Elválasztó csak az elemek KÖZÖTT, az utolsó után nem. */}
                      {exampleIndex < card.examples.length - 1 && (
                        <span aria-hidden="true" className="ml-1.5 text-white/15">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </span>
              </button>
            </Reveal>
          )
        })}
      </div>

      <p
        aria-live="polite"
        className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-steel"
      >
        <span aria-hidden="true" className="h-px w-8 bg-brand" />
        Aktuális nézet:
        <strong className="font-display font-semibold uppercase text-paper">
          {segments[segment].label}
        </strong>
        {problem && <span>– {problemCards.find((card) => card.id === problem)?.title}</span>}
        <span>· az alábbi szekciók ehhez igazodnak.</span>
      </p>
    </Section>
  )
}
