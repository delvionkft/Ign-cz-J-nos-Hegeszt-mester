/**
 * ÁR-HORGONY
 * Szegmensenként változó: javításnál és gyártásnál ártáblázat,
 * B2B-nél együttműködési modellek.
 */
import { cooperationModels, priceRanges, segments } from '@/content'
import { resolve } from '@/content/fillable'
import { useSegment } from '@/hooks/useSegment'
import { useInViewOnce } from '@/hooks/useInView'
import { track } from '@/lib/analytics'
import { scrollToSection } from '@/lib/utils'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

export function Pricing() {
  const { segment } = useSegment()
  const copy = segments[segment].pricing

  const ref = useInViewOnce<HTMLDivElement>(() => {
    track('price_section_view', { location: 'pricing', segment })
  })

  const rows = priceRanges.filter((row) => row.segment === segment)

  return (
    <Section id="arak" labelledBy="arak-cim">
      <SectionHeading id="arak-cim" kicker="Árak" title={copy.title} subtitle={copy.subtitle} />

      <div ref={ref}>
        {copy.mode === 'models' ? <CooperationGrid /> : <PriceTable rows={rows} />}
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-sm border border-white/10 bg-panel/60 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-sm leading-relaxed text-alu">
          <Icon name="info" size={18} className="mt-0.5 shrink-0 text-brand" />
          <span>
            A fenti sávok tájékoztató jellegűek. A pontos árat a munkadarab ismeretében,
            fotó alapján adom meg – ez még nem megrendelés.
          </span>
        </p>
        <Button
          className="shrink-0"
          onClick={() => {
            track('cta_click', { location: 'pricing', contactMethod: 'form', cta: 'arajanlat' })
            scrollToSection('ajanlatkeres')
          }}
        >
          Kérek pontos árat
        </Button>
      </div>
    </Section>
  )
}

function PriceTable({ rows }: { rows: typeof priceRanges }) {
  // A munkatípusok valós tartalmat hordoznak, ezért a táblázat akkor is látszik,
  // ha egy-egy ársáv még nincs kitöltve – az ár-horgony így sem tűnik el teljesen.
  const display = rows

  if (display.length === 0) return null

  return (
    // A táblázat saját vízszintes görgetést kap, hogy az oldal ne csorduljon túl.
    <div className="overflow-x-auto rounded-sm border border-white/10">
      <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
        <caption className="sr-only">Tipikus munkák becsült ársávjai és átfutási ideje</caption>
        <thead>
          <tr className="bg-panel text-xs uppercase tracking-wider text-alu">
            <th scope="col" className="px-4 py-3 font-semibold">
              Munka / alkatrész
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Új alkatrész vagy csere
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Javítás / gyártás ára
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Várható átfutás
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {display.map((row) => {
            const price = resolve(row.price)
            const replacement = resolve(row.replacement)
            const leadTime = resolve(row.leadTime)
            return (
              <tr key={row.id} className="bg-ink/40 align-top">
                <th scope="row" className="px-4 py-3 font-medium text-paper">
                  {row.job}
                  {row.note && <span className="mt-1 block text-xs font-normal text-steel">{row.note}</span>}
                </th>
                <td className="px-4 py-3 text-alu">{replacement ?? <Pending />}</td>
                <td
                  className={
                    price ? 'px-4 py-3 font-display font-semibold text-brand-light' : 'px-4 py-3'
                  }
                >
                  {price ?? <Pending />}
                </td>
                <td className="px-4 py-3 text-alu">{leadTime ?? <Pending />}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/**
 * Kitöltetlen cella. Élesben visszafogott, semleges felirat – a piros szín
 * kizárólag a valós árakon marad kiemelés.
 */
function Pending() {
  return import.meta.env.DEV ? (
    <span className="text-xs uppercase tracking-wider text-brand-light">Kitöltendő</span>
  ) : (
    <span className="text-steel">Fotó alapján</span>
  )
}

function CooperationGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {cooperationModels.map((model, index) => (
        <li key={model.id} className="rounded-sm border border-white/10 bg-panel/60 p-5">
          <span aria-hidden="true" className="font-display text-sm font-bold text-brand">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-1 font-display text-lg font-semibold uppercase leading-tight text-paper">
            {model.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-alu">{model.description}</p>
          <ul className="mt-4 space-y-2">
            {model.points.map((point) => (
              <li key={point} className="flex gap-2 text-sm text-alu">
                <Icon name="check" size={16} className="mt-0.5 shrink-0 text-brand" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
