import { trustMetrics } from '@/content/site.config'
import { isTodo, todoHint } from '@/content/fillable'

/**
 * BIZALMI SÁV
 * Csak konkrét, bizonyítható elemek. Kitöltetlen metrika élesben nem jelenik meg,
 * fejlesztői módban viszont látszik, hogy mit kell pótolni.
 */
export function TrustBar() {
  const visible = trustMetrics.filter((metric) => !isTodo(metric.value))
  const pending = trustMetrics.filter((metric) => isTodo(metric.value))

  if (visible.length === 0 && !import.meta.env.DEV) return null

  return (
    <section aria-label="Bizalmi adatok" className="border-b border-white/10 bg-panel/60">
      <div className="container-content py-5 sm:py-6">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
          {visible.map((metric) => (
            <li key={metric.id} className="border-l-2 border-brand pl-3">
              <p className="font-display text-xl font-semibold leading-none text-paper sm:text-2xl">
                {metric.value}
              </p>
              <p className="mt-1.5 text-xs leading-snug text-alu sm:text-sm">{metric.label}</p>
              {metric.proof && <p className="mt-1 text-[11px] leading-snug text-steel">{metric.proof}</p>}
            </li>
          ))}

          {import.meta.env.DEV &&
            pending.map((metric) => (
              <li key={metric.id} className="border-l-2 border-dashed border-brand/50 pl-3">
                <p className="font-display text-sm font-semibold uppercase text-brand-light">Kitöltendő</p>
                <p className="mt-1 text-xs leading-snug text-alu">{metric.label}</p>
                <p className="mt-1 text-[11px] leading-snug text-steel">{todoHint(metric.value)}</p>
              </li>
            ))}
        </ul>
      </div>
    </section>
  )
}
