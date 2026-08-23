/**
 * A FÁJDALOM KIMONDÁSA
 * Szegmensfüggő tartalom + valós ársávokra épülő összehasonlítás.
 */
import { segments } from '@/content'
import { isTodo, todoHint } from '@/content/fillable'
import { useSegment } from '@/hooks/useSegment'
import { Section } from '@/components/ui/Section'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { scrollToSection } from '@/lib/utils'
import { track } from '@/lib/analytics'

export function PainPoint() {
  const { segment } = useSegment()
  const copy = segments[segment].pain
  const c = copy.comparison

  const rows = [
    { key: 'replacement', label: c.replacementLabel, value: c.replacementValue, tone: 'neutral' as const },
    { key: 'solution', label: c.solutionLabel, value: c.solutionValue, tone: 'accent' as const },
    { key: 'saving', label: c.savingLabel, value: c.savingValue, tone: 'neutral' as const },
    { key: 'leadTime', label: c.leadTimeLabel, value: c.leadTimeValue, tone: 'neutral' as const },
  ]

  const filled = rows.filter((row) => !isTodo(row.value))

  return (
    <Section id="miert" tone="panel" labelledBy="miert-cim">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div>
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
            {copy.kicker}
          </p>
          <h2 id="miert-cim" className="text-2xl/[1.15] sm:text-3xl/[1.15] lg:text-4xl/[1.12]">
            {copy.headline}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-alu sm:text-lg">{copy.body}</p>
        </div>

        {/* Összehasonlítás */}
        <div className="rounded-sm border border-white/10 bg-ink/60 p-5 sm:p-6">
          <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-alu">
            <Icon name="info" size={16} className="text-brand" />
            Mivel érdemes összevetni
          </h3>

          {filled.length > 0 ? (
            <dl className="divide-y divide-white/10">
              {filled.map((row) => (
                <div key={row.key} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                  <dt className="text-sm text-alu">{row.label}</dt>
                  <dd
                    className={
                      row.tone === 'accent'
                        ? 'font-display text-lg font-semibold text-brand-light'
                        : 'font-display text-lg font-semibold text-paper'
                    }
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-alu">
                A konkrét összeg a munkadarabtól függ. Küldj néhány fotót, és megírom, mennyibe kerülne
                a csere, és mennyibe kerül a javítás.
              </p>
              <Button
                variant="secondary"
                onClick={() => {
                  track('cta_click', { location: 'pain_comparison', contactMethod: 'form', cta: 'osszehasonlitas' })
                  scrollToSection('ajanlatkeres')
                }}
              >
                Kérek konkrét összehasonlítást
              </Button>
            </div>
          )}

          {import.meta.env.DEV && filled.length < rows.length && (
            <ul className="mt-4 space-y-1 border-t border-brand/30 pt-3 text-[11px] text-brand-light">
              {rows
                .filter((row) => isTodo(row.value))
                .map((row) => (
                  <li key={row.key}>Kitöltendő – {todoHint(row.value)}</li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  )
}
