/**
 * A FÁJDALOM KIMONDÁSA
 * --------------------
 * Az oldal érzelmi magja: a csere és a javítás ára egymás mellett,
 * nagy léptékben. Szegmensfüggő tartalom, valós ársávokkal.
 */
import { segments } from '@/content'
import { isTodo, todoHint } from '@/content/fillable'
import { useSegment } from '@/hooks/useSegment'
import { Section, TechLabel } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { scrollToSection } from '@/lib/utils'
import { track } from '@/lib/analytics'

export function PainPoint() {
  const { segment } = useSegment()
  const copy = segments[segment].pain
  const c = copy.comparison

  const replacement = !isTodo(c.replacementValue) ? c.replacementValue : null
  const solution = !isTodo(c.solutionValue) ? c.solutionValue : null
  const saving = !isTodo(c.savingValue) ? c.savingValue : null
  const leadTime = !isTodo(c.leadTimeValue) ? c.leadTimeValue : null
  const hasComparison = Boolean(replacement || solution)

  return (
    <Section id="miert" tone="pit" labelledBy="miert-cim" index="02" glow="brand" glowAt={{ x: '22%', y: '55%' }}>
      <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        {/* ---------------- Az állítás ---------------- */}
        <div>
          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-display text-label font-semibold uppercase text-brand-light">
              <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-brand" />
              {copy.kicker}
            </p>
            <h2 id="miert-cim" className="text-display-xl">
              {copy.headline}
            </h2>
          </Reveal>

          <Reveal delay={70}>
            {/* Bal oldali piros sín: a bekezdés idézetként, nem futószövegként olvas. */}
            <blockquote className="mt-8 border-l-2 border-brand pl-5 sm:pl-6">
              <p className="max-w-prose text-base leading-relaxed text-alu sm:text-lg">{copy.body}</p>
            </blockquote>
          </Reveal>
        </div>

        {/* ---------------- Az összehasonlítás ---------------- */}
        <Reveal delay={110}>
          <div className="corner-marks relative h-full border border-white/12 bg-panel/50 p-5 shadow-lift backdrop-blur-sm sm:p-7">
            <TechLabel className="mb-7">Mivel érdemes összevetni</TechLabel>

            {hasComparison ? (
              <dl className="tabular space-y-6">
                {replacement && (
                  <div>
                    <dt className="text-sm text-steel">{c.replacementLabel}</dt>
                    <dd className="mt-1.5 font-display text-numeral-lg font-bold text-steel line-through decoration-steel/60 decoration-2">
                      {replacement}
                    </dd>
                  </div>
                )}

                {replacement && solution && (
                  <div aria-hidden="true" className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-white/10" />
                    <Icon name="arrow-right" size={18} className="rotate-90 text-brand" />
                    <span className="h-px flex-1 bg-white/10" />
                  </div>
                )}

                {solution && (
                  <div>
                    <dt className="text-sm text-alu">{c.solutionLabel}</dt>
                    <dd className="mt-1.5 font-display text-numeral-xl font-bold text-brand-light">
                      {solution}
                    </dd>
                  </div>
                )}

                {(saving || leadTime) && (
                  <div className="grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
                    {saving && (
                      <div>
                        <dt className="text-xs uppercase tracking-wider text-steel">
                          {c.savingLabel}
                        </dt>
                        <dd className="mt-1 text-sm leading-snug text-paper">{saving}</dd>
                      </div>
                    )}
                    {leadTime && (
                      <div>
                        <dt className="text-xs uppercase tracking-wider text-steel">
                          {c.leadTimeLabel}
                        </dt>
                        <dd className="mt-1 text-sm leading-snug text-paper">{leadTime}</dd>
                      </div>
                    )}
                  </div>
                )}
              </dl>
            ) : (
              <div className="space-y-5">
                <p className="text-base leading-relaxed text-alu">
                  A konkrét összeg a munkadarabtól függ. Küldj néhány fotót, és megírom, mennyibe
                  kerülne a csere, és mennyibe kerül a javítás.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    track('cta_click', {
                      location: 'pain_comparison',
                      contactMethod: 'form',
                      cta: 'osszehasonlitas',
                    })
                    scrollToSection('ajanlatkeres')
                  }}
                >
                  Kérek konkrét összehasonlítást
                </Button>
              </div>
            )}

            {import.meta.env.DEV && (
              <ul className="mt-6 space-y-1 border-t border-brand/30 pt-4 text-[11px] text-brand-light">
                {[
                  c.replacementValue,
                  c.solutionValue,
                  c.savingValue,
                  c.leadTimeValue,
                ]
                  .filter(isTodo)
                  .map((value) => (
                    <li key={value}>Kitöltendő – {todoHint(value)}</li>
                  ))}
              </ul>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
