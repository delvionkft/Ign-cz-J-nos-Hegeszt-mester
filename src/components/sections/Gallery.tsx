/**
 * ELŐTTE-UTÁNA REFERENCIAGALÉRIA
 * ------------------------------
 * Az oldal legerősebb bizonyítékblokkja. A szekciócím és a szűrő asztali
 * nézetben megtapad, miközben a munkák mellette görögnek – így a szűrés
 * végig kéznél marad.
 */
import { useMemo, useState } from 'react'
import { galleryCases, problemCards, segments } from '@/content'
import type { GalleryCase, ProblemId } from '@/content/types'
import { isTodo, resolve } from '@/content/fillable'
import { useSegment } from '@/hooks/useSegment'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { SmartImage } from '@/components/ui/SmartImage'
import { BeforeAfter } from '@/components/ui/BeforeAfter'
import { Modal } from '@/components/ui/Modal'
import { Icon } from '@/components/ui/Icon'

export function Gallery() {
  const { segment } = useSegment()
  const copy = segments[segment].gallery
  const [filter, setFilter] = useState<ProblemId | 'all'>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const segmentCases = useMemo(
    () => galleryCases.filter((item) => item.segment === segment),
    [segment],
  )

  const filters = useMemo(() => problemCards.filter((card) => card.segment === segment), [segment])

  // Szegmensváltáskor a szűrő visszaáll – így nem marad üres a lista.
  const activeFilter = filters.some((f) => f.id === filter) ? filter : 'all'

  const visible = useMemo(
    () =>
      activeFilter === 'all'
        ? segmentCases
        : segmentCases.filter((item) => item.problem === activeFilter),
    [segmentCases, activeFilter],
  )

  const openCase = (index: number) => {
    setOpenIndex(index)
    track('gallery_case_open', {
      location: 'gallery',
      case_id: visible[index]?.id,
      filter: activeFilter,
    })
  }

  const current = openIndex !== null ? visible[openIndex] : null

  return (
    <Section id="referenciak" labelledBy="referenciak-cim" index="03">
      <div className="grid gap-10 lg:grid-cols-[minmax(16rem,22rem)_1fr] lg:gap-14">
        {/* ---------------- Megtapadó fejrész ---------------- */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 font-display text-label font-semibold uppercase text-brand-light">
              <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-brand" />
              Referenciák
            </p>
            <h2 id="referenciak-cim" className="text-display-lg">
              {copy.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-alu">{copy.subtitle}</p>
          </Reveal>

          {filters.length > 1 && (
            <Reveal delay={60}>
              <div
                role="group"
                aria-label="Referenciák szűrése"
                className="mt-8 flex flex-wrap gap-2 border-t border-white/10 pt-6"
              >
                <FilterChip active={activeFilter === 'all'} onClick={() => setFilter('all')}>
                  Összes
                  <Count>{segmentCases.length}</Count>
                </FilterChip>
                {filters.map((card) => {
                  const count = segmentCases.filter((item) => item.problem === card.id).length
                  if (count === 0) return null
                  return (
                    <FilterChip
                      key={card.id}
                      active={activeFilter === card.id}
                      onClick={() => setFilter(card.id)}
                    >
                      {card.title}
                      <Count>{count}</Count>
                    </FilterChip>
                  )
                })}
              </div>
            </Reveal>
          )}
        </div>

        {/* ---------------- A munkák ---------------- */}
        <div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {visible.map((item, index) => (
              <Reveal as="li" key={item.id} delay={Math.min((index % 4) * 45, 135)}>
                <CaseCard item={item} onOpen={() => openCase(index)} />
              </Reveal>
            ))}
          </ul>

          {visible.length === 0 && (
            <p className="rounded-sm border border-white/10 bg-panel/50 p-8 text-center text-sm text-alu">
              Ehhez a szűréshez jelenleg nincs feltöltött munka.
            </p>
          )}
        </div>
      </div>

      <Modal
        open={current !== null}
        onClose={() => setOpenIndex(null)}
        title={current ? `${current.title} – előtte-utána` : ''}
        onPrev={
          openIndex !== null && visible.length > 1
            ? () => setOpenIndex((openIndex - 1 + visible.length) % visible.length)
            : undefined
        }
        onNext={
          openIndex !== null && visible.length > 1
            ? () => setOpenIndex((openIndex + 1) % visible.length)
            : undefined
        }
      >
        {current && <CaseDetail item={current} index={openIndex ?? 0} total={visible.length} />}
      </Modal>
    </Section>
  )
}

function Count({ children }: { children: React.ReactNode }) {
  return (
    <span className="tabular ml-2 text-[11px] font-normal opacity-60">{children}</span>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center rounded-sm border px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide transition-colors duration-150',
        active
          ? 'border-brand bg-brand text-white'
          : 'border-white/12 bg-panel/50 text-alu hover:border-alu/40 hover:text-paper',
      )}
    >
      {children}
    </button>
  )
}

function CaseCard({ item, onOpen }: { item: GalleryCase; onOpen: () => void }) {
  const issue = resolve(item.issue)
  const repairCost = resolve(item.repairCost)
  const replacementCost = resolve(item.replacementCost)
  const duration = resolve(item.duration)

  return (
    <button
      type="button"
      onClick={onOpen}
      className="card card-hover group flex h-full w-full flex-col overflow-hidden text-left"
    >
      {/* Előtte / utána – piros varrat választja el a két állapotot. */}
      <div className="relative grid grid-cols-2">
        <SmartImage
          src={item.images.before}
          alt={item.images.beforeAlt}
          ratio="1 / 1"
          sizes="(max-width: 640px) 50vw, 220px"
          placeholderLabel={item.title}
        />
        <SmartImage
          src={item.images.after}
          alt={item.images.afterAlt}
          ratio="1 / 1"
          sizes="(max-width: 640px) 50vw, 220px"
          placeholderLabel={item.title}
        />

        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-brand"
        />
        <span className="absolute left-2 top-2 bg-ink/85 px-1.5 py-0.5 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-alu">
          Előtte
        </span>
        <span className="absolute right-2 top-2 bg-brand px-1.5 py-0.5 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-white">
          Utána
        </span>
        <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center bg-ink/85 text-alu transition-colors duration-150 group-hover:bg-brand group-hover:text-white">
          <Icon name="zoom" size={16} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-display-sm font-semibold uppercase text-paper">
          {item.title}
        </h3>
        {issue && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-alu">{issue}</p>}

        {(replacementCost || repairCost || duration) && (
          <dl className="tabular mt-auto flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-sm">
            {replacementCost && (
              <div className="min-w-0">
                <dt className="text-xs text-steel">Csere ára lett volna</dt>
                <dd className="text-alu line-through decoration-steel">{replacementCost}</dd>
              </div>
            )}
            {repairCost && (
              <div className="min-w-0">
                <dt className="text-xs text-steel">Amibe került</dt>
                <dd className="font-display text-lg font-bold text-brand-light">{repairCost}</dd>
              </div>
            )}
            {duration && (
              <div className="min-w-0">
                <dt className="text-xs text-steel">Átfutás</dt>
                <dd className="text-alu">{duration}</dd>
              </div>
            )}
          </dl>
        )}

        {import.meta.env.DEV && isTodo(item.images.before) && (
          <p className="mt-4 border-t border-brand/30 pt-2.5 text-[11px] text-brand-light">
            Kitöltendő: fotók és adatok
          </p>
        )}
      </div>
    </button>
  )
}

function CaseDetail({ item, index, total }: { item: GalleryCase; index: number; total: number }) {
  const rows = [
    { label: 'Mi volt a hiba / feladat', value: resolve(item.issue) },
    { label: 'Mi történt', value: resolve(item.solution) },
    { label: 'Anyag', value: resolve(item.material) },
    { label: 'Mennyi ideig tartott', value: resolve(item.duration) },
    { label: 'Csere / új termék ára lett volna', value: resolve(item.replacementCost) },
    { label: 'Javítás / gyártás ára', value: resolve(item.repairCost) },
  ].filter((row) => row.value)

  const category = problemCards.find((card) => card.id === item.problem)

  return (
    <div>
      <BeforeAfter
        before={item.images.before}
        after={item.images.after}
        beforeAlt={item.images.beforeAlt}
        afterAlt={item.images.afterAlt}
        ratio="16 / 10"
        placeholderLabel={`${item.title} – előtte-utána fotópár helye`}
      />

      <div className="p-5 sm:p-7">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <h2 className="font-display text-display-md font-semibold uppercase text-paper">
            {item.title}
          </h2>
          {category && (
            <span className="border border-white/12 px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-steel">
              {category.title}
            </span>
          )}
          <span className="tabular ml-auto text-xs text-steel">
            {index + 1} / {total}
          </span>
        </div>

        {rows.length > 0 ? (
          <dl className="tabular divide-y divide-white/10 border-y border-white/10">
            {rows.map((row) => (
              <div key={row.label} className="grid gap-1 py-3.5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <dt className="text-sm text-steel">{row.label}</dt>
                <dd className="text-sm leading-relaxed text-paper">{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="text-sm text-alu">
            Ehhez a munkához a részletes adatok feltöltése folyamatban van.
          </p>
        )}

        {total > 1 && (
          <p className="mt-5 text-xs text-steel">
            Tipp: a bal és jobb nyílbillentyűvel léptethetsz a munkák között.
          </p>
        )}
      </div>
    </div>
  )
}
