/**
 * ÁR-HORGONY
 * ----------
 * Szegmensenként változó: javításnál és gyártásnál ártáblázat,
 * B2B-nél együttműködési modellek.
 *
 * A táblázat akkor is látszik, ha egy-egy ársáv még nincs kitöltve –
 * a munkatípusok valós tartalmat hordoznak, így az ár-horgony nem tűnik el.
 */
import { cooperationModels, priceRanges, segments } from '@/content'
import { resolve } from '@/content/fillable'
import { useSegment } from '@/hooks/useSegment'
import { useInViewOnce } from '@/hooks/useInView'
import { track } from '@/lib/analytics'
import { scrollToSection } from '@/lib/utils'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
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
    <Section id="arak" tone="pit" labelledBy="arak-cim" index="05">
      <SectionHeading id="arak-cim" kicker="Árak" title={copy.title} subtitle={copy.subtitle} />

      <div ref={ref}>
        {copy.mode === 'models' ? <CooperationGrid /> : <PriceTable rows={rows} />}
      </div>

      <Reveal delay={80}>
        <div className="mt-6 flex flex-col gap-5 border border-white/12 bg-panel/40 p-5 shadow-edge sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="flex items-start gap-3 text-sm leading-relaxed text-alu">
            <Icon name="info" size={18} className="mt-0.5 shrink-0 text-brand" />
            <span>
              A fenti sávok tájékoztató jellegűek. A pontos árat a munkadarab ismeretében, fotó
              alapján adom meg – ez még nem megrendelés.
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
      </Reveal>
    </Section>
  )
}

function PriceTable({ rows }: { rows: typeof priceRanges }) {
  if (rows.length === 0) return null

  return (
    <Reveal>
      {/* A táblázat saját vízszintes görgetést kap, hogy az oldal ne csorduljon túl. */}
      <div className="overflow-x-auto border border-white/12 shadow-edge">
        <table className="tabular w-full min-w-[46rem] border-collapse text-left">
          <caption className="sr-only">
            Tipikus munkák becsült ársávjai és átfutási ideje
          </caption>
          <thead>
            <tr className="border-b border-white/12 bg-panel/70">
              <th
                scope="col"
                className="px-5 py-4 font-display text-label font-semibold uppercase text-alu"
              >
                Munka / alkatrész
              </th>
              <th
                scope="col"
                className="px-5 py-4 font-display text-label font-semibold uppercase text-steel"
              >
                Új alkatrész vagy csere
              </th>
              {/* A javítás oszlopa kap vizuális elsőbbséget – ez a döntési pont. */}
              <th
                scope="col"
                className="border-x border-brand/30 bg-brand/[0.07] px-5 py-4 font-display text-label font-semibold uppercase text-brand-light"
              >
                Javítás / gyártás ára
              </th>
              <th
                scope="col"
                className="px-5 py-4 font-display text-label font-semibold uppercase text-steel"
              >
                Várható átfutás
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row) => {
              const price = resolve(row.price)
              const replacement = resolve(row.replacement)
              const leadTime = resolve(row.leadTime)
              return (
                <tr key={row.id} className="align-top transition-colors duration-150 hover:bg-white/[0.03]">
                  <th scope="row" className="px-5 py-4 text-sm font-medium text-paper">
                    {row.job}
                    {row.note && (
                      <span className="mt-1 block text-xs font-normal text-steel">{row.note}</span>
                    )}
                  </th>
                  <td className="px-5 py-4 text-sm text-alu">
                    {replacement ? (
                      <span className="line-through decoration-steel/70">{replacement}</span>
                    ) : (
                      <Pending />
                    )}
                  </td>
                  <td className="border-x border-brand/25 bg-brand/[0.05] px-5 py-4">
                    {price ? (
                      <span className="font-display text-lg font-bold text-brand-light">{price}</span>
                    ) : (
                      <Pending />
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-alu">{leadTime ?? <Pending />}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Reveal>
  )
}

/**
 * Kitöltetlen cella. Élesben visszafogott, semleges felirat – a piros szín
 * kizárólag a valós árakon marad kiemelés.
 */
function Pending() {
  return import.meta.env.DEV ? (
    <span className="font-display text-label font-semibold uppercase text-brand-light">
      Kitöltendő
    </span>
  ) : (
    <span className="text-sm text-steel">Fotó alapján</span>
  )
}

function CooperationGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {cooperationModels.map((model, index) => (
        <Reveal as="li" key={model.id} delay={Math.min(index * 45, 135)} className="h-full">
          <div className="card h-full p-6">
            <span
              aria-hidden="true"
              className="tabular absolute right-5 top-5 font-display text-3xl font-bold leading-none text-white/[0.06]"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="pr-12 font-display text-display-md font-semibold uppercase leading-tight text-paper">
              {model.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-alu">{model.description}</p>
            <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-4">
              {model.points.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm text-alu">
                  <Icon name="check" size={16} className="mt-0.5 shrink-0 text-brand" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </ul>
  )
}
