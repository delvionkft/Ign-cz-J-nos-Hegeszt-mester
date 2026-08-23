/**
 * FOLYAMAT – NÉGY LÉPÉS
 * ---------------------
 * A lépések egy összekötött sínen ülnek: mobilon függőleges, asztali
 * nézetben vízszintes vonal köti össze őket, így a sorrend vizuálisan is
 * olvasható. A `meta` mezőben lévő tényadatok a site.config.ts `facts`
 * objektumából jönnek; kitöltetlen adat esetén a mondat kimarad.
 */
import { processSteps, segments } from '@/content'
import { useSegment } from '@/hooks/useSegment'
import { interpolate } from '@/lib/text'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

export function Process() {
  const { segment } = useSegment()
  const copy = segments[segment].process
  const steps = processSteps[segment]

  return (
    <Section id="folyamat" labelledBy="folyamat-cim" index="06">
      <SectionHeading
        id="folyamat-cim"
        kicker="Folyamat"
        title={copy.title}
        subtitle={copy.subtitle}
      />

      <div className="relative">
        {/* Összekötő sín – mobilon függőleges vonal. */}
        <span
          aria-hidden="true"
          className="absolute left-[15px] top-4 h-[calc(100%-2rem)] w-px bg-white/15 lg:hidden"
        />
        {/* Asztali nézetben mérőléc-osztású vízszintes sín a csomópontok magasságában. */}
        <span
          aria-hidden="true"
          className="tick-row absolute left-0 top-[13px] hidden h-1.5 w-full lg:block"
        />

        <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => {
            const meta = step.meta ? interpolate(step.meta) : ''
            return (
              <Reveal as="li" key={step.id} delay={Math.min(index * 55, 165)}>
                <div className="relative pl-12 lg:pl-0 lg:pr-6">
                  {/* Csomópont a sínen. */}
                  <span
                    aria-hidden="true"
                    className="tabular absolute left-0 top-0 z-10 flex h-8 w-8 items-center justify-center rounded-sm border border-brand bg-ink font-display text-sm font-bold text-brand-light lg:relative lg:mb-7"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className="font-display text-display-sm font-semibold uppercase leading-tight text-paper">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-alu">{step.description}</p>

                  {meta && (
                    <p className="mt-4 flex items-start gap-2 border-t border-white/10 pt-3.5 text-sm font-medium text-brand-light">
                      <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-brand" />
                      <span>{meta}</span>
                    </p>
                  )}
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}
