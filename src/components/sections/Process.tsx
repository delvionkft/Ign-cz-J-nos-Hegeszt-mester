/**
 * FOLYAMAT – NÉGY LÉPÉS
 * A `meta` mezőben lévő tényadatok a site.config.ts `facts` objektumából jönnek.
 * Ha egy tényadat nincs kitöltve, az azt tartalmazó mondat kimarad.
 */
import { processSteps, segments } from '@/content'
import { useSegment } from '@/hooks/useSegment'
import { interpolate } from '@/lib/text'
import { Section, SectionHeading } from '@/components/ui/Section'

export function Process() {
  const { segment } = useSegment()
  const copy = segments[segment].process
  const steps = processSteps[segment]

  return (
    <Section id="folyamat" tone="panel" labelledBy="folyamat-cim">
      <SectionHeading id="folyamat-cim" kicker="Folyamat" title={copy.title} subtitle={copy.subtitle} />

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => {
          const meta = step.meta ? interpolate(step.meta) : ''
          return (
            <li key={step.id} className="relative flex flex-col rounded-sm border border-white/10 bg-ink/50 p-5">
              <span
                aria-hidden="true"
                className="mb-3 font-display text-3xl font-bold leading-none text-brand"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-base font-semibold uppercase leading-tight text-paper">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-alu">{step.description}</p>
              {meta && (
                <p className="mt-3 border-t border-white/10 pt-3 text-sm font-medium text-brand-light">
                  {meta}
                </p>
              )}
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
