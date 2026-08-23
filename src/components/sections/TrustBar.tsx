import { trustMetrics } from '@/content/site.config'
import { isTodo, todoHint } from '@/content/fillable'
import { Reveal } from '@/components/ui/Reveal'

/**
 * BIZALMI SÁV
 * Nagy, kondenzált számadatok mérőléc-osztással elválasztva.
 * Csak konkrét, bizonyítható elem kerülhet ide – kitöltetlen metrika
 * élesben nem jelenik meg, fejlesztői módban viszont jelölve van.
 */
export function TrustBar() {
  const visible = trustMetrics.filter((metric) => !isTodo(metric.value))
  const pending = trustMetrics.filter((metric) => isTodo(metric.value))

  if (visible.length === 0 && !import.meta.env.DEV) return null

  return (
    <section aria-label="Bizalmi adatok" className="border-b border-white/10 bg-panel/25">
      <div className="container-content">
        <ul className="tabular grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-5">
          {visible.map((metric, index) => (
            <Reveal as="li" key={metric.id} delay={index * 40}>
              <div className="relative h-full py-7 pr-4 sm:py-9">
                {/* Függőleges osztóvonal – csak a második elemtől, hogy ne lógjon ki. */}
                <span
                  aria-hidden="true"
                  className="absolute -left-4 top-6 hidden h-[calc(100%-3rem)] w-px bg-white/10 sm:block [li:first-child_&]:hidden"
                />
                <p className="font-display text-numeral-lg font-bold text-paper">{metric.value}</p>
                <p className="mt-2 text-sm leading-snug text-alu">{metric.label}</p>
                {metric.proof && (
                  <p className="mt-1.5 text-xs leading-snug text-steel">{metric.proof}</p>
                )}
              </div>
            </Reveal>
          ))}

          {import.meta.env.DEV &&
            pending.map((metric) => (
              <li key={metric.id} className="py-7 pr-4 sm:py-9">
                <p className="font-display text-lg font-semibold uppercase text-brand-light">
                  Kitöltendő
                </p>
                <p className="mt-2 text-sm leading-snug text-alu">{metric.label}</p>
                <p className="mt-1.5 text-xs leading-snug text-steel">{todoHint(metric.value)}</p>
              </li>
            ))}
        </ul>
      </div>
    </section>
  )
}
