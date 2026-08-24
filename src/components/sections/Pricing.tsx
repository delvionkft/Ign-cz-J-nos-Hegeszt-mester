/**
 * ÁR-HORGONY
 * ----------
 * Szegmensenként változó: javításnál és gyártásnál ártáblázat,
 * B2B-nél együttműködési modellek.
 *
 * A táblázat akkor is látszik, ha egy-egy ársáv még nincs kitöltve –
 * a munkatípusok valós tartalmat hordoznak, így az ár-horgony nem tűnik el.
 *
 * ELRENDEZÉS: a fejrész (cím, magyarázat, CTA) asztali nézetben megtapad
 * a bal oldalon, miközben a hosszabb táblázat/kártyalista mellette görög –
 * ugyanaz a minta, mint a galériánál, a technológiánál és a GYIK-nél.
 */
import { cooperationModels, priceRanges, segments } from '@/content'
import { resolve } from '@/content/fillable'
import { useSegment } from '@/hooks/useSegment'
import { useInViewOnce } from '@/hooks/useInView'
import { track } from '@/lib/analytics'
import { scrollToSection } from '@/lib/utils'
import { Section } from '@/components/ui/Section'
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
    <Section id="arak" tone="pit" labelledBy="arak-cim" index="05" glow="brand" glowAt={{ x: '70%', y: '40%' }}>
      <div className="grid gap-10 lg:grid-cols-[minmax(16rem,22rem)_1fr] lg:gap-14">
        {/* ---------------- Megtapadó fejrész ---------------- */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 font-display text-label font-semibold uppercase text-brand-light">
              <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-brand" />
              Árak
            </p>
            <h2 id="arak-cim" className="text-display-lg">
              {copy.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-alu">{copy.subtitle}</p>
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-8 space-y-5 border-t border-white/10 pt-6">
              <p className="flex items-start gap-3 text-sm leading-relaxed text-alu">
                <Icon name="info" size={18} className="mt-0.5 shrink-0 text-brand" />
                <span>
                  A fenti sávok tájékoztató jellegűek. A pontos árat a munkadarab ismeretében,
                  fotó alapján adom meg – ez még nem megrendelés.
                </span>
              </p>
              <Button
                className="w-full sm:w-auto"
                onClick={() => {
                  track('cta_click', { location: 'pricing', contactMethod: 'form', cta: 'arajanlat' })
                  scrollToSection('ajanlatkeres')
                }}
              >
                Kérek pontos árat
              </Button>
            </div>
          </Reveal>
        </div>

        {/* ---------------- A táblázat / kártyák ---------------- */}
        <div ref={ref}>{copy.mode === 'models' ? <CooperationGrid /> : <PriceTable rows={rows} />}</div>
      </div>
    </Section>
  )
}

function PriceTable({ rows }: { rows: typeof priceRanges }) {
  if (rows.length === 0) return null

  return (
    <Reveal>
      {/* A táblázat saját vízszintes görgetést kap, hogy az oldal ne csorduljon túl. */}
      <div className="overflow-x-auto border border-white/12 bg-ink/40 shadow-lift backdrop-blur-sm">
        <table className="tabular w-full min-w-[42rem] border-collapse text-left">
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
                className="border-x border-brand/40 bg-brand/[0.14] px-5 py-4 font-display text-label font-semibold uppercase text-brand-light"
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
                  <td className="border-x border-brand/30 bg-brand/[0.08] px-5 py-4">
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
          <div className="hover-lift relative h-full rounded-sm border border-white/10 bg-panel/60 p-6 shadow-edge hover:border-brand/50 hover:shadow-glow">
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
