import { trustMetrics } from '@/content/site.config'
import { isTodo, todoHint } from '@/content/fillable'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'

/**
 * BIZALMI SÁV
 * Nagy, kondenzált számadatok, természetes szélességű blokkokban –
 * NEM merev rácsban, hogy egy-két kitöltött elem se hasson üres,
 * hiányos sornak. Csak konkrét, bizonyítható elem kerülhet ide –
 * kitöltetlen metrika élesben nem jelenik meg, fejlesztői módban
 * viszont jelölve van.
 */
export function TrustBar() {
  const visible = trustMetrics.filter((metric) => !isTodo(metric.value))
  const pending = trustMetrics.filter((metric) => isTodo(metric.value))

  if (visible.length === 0 && !import.meta.env.DEV) return null

  return (
    <section aria-label="Bizalmi adatok" className="border-b border-white/10 bg-panel/25">
      <div className="container-content">
        <ul className="tabular flex flex-wrap">
          {visible.map((metric, index) => (
            <Reveal
              as="li"
              key={metric.id}
              delay={index * 40}
              className="max-w-[15rem] border-l border-white/10 py-7 pl-6 pr-6 first:border-l-0 first:pl-0 sm:py-9 sm:pl-8 sm:pr-8"
            >
              <p
                className={cn(
                  'font-display text-numeral-lg font-bold',
                  metric.accent ? 'text-brand-light' : 'text-paper',
                )}
              >
                {metric.value}
              </p>
              <p className="mt-2 text-sm leading-snug text-alu">{metric.label}</p>
              {metric.proof && (
                <p className="mt-1.5 text-xs leading-snug text-steel">{metric.proof}</p>
              )}
            </Reveal>
          ))}

          {import.meta.env.DEV &&
            pending.map((metric) => (
              <li
                key={metric.id}
                className="max-w-[15rem] border-l border-dashed border-brand/30 py-7 pl-6 pr-6 first:border-l-0 first:pl-0 sm:py-9 sm:pl-8 sm:pr-8"
              >
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
