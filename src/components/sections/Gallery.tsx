/**
 * ELŐTTE-UTÁNA REFERENCIAGALÉRIA
 * Az oldal legerősebb bizonyítékblokkja. Szegmens szerint vált,
 * a szegmensen belül szolgáltatástípus szerint szűrhető.
 */
import { useMemo, useState } from 'react'
import { galleryCases, problemCards, segments } from '@/content'
import type { GalleryCase, ProblemId } from '@/content/types'
import { isTodo, resolve } from '@/content/fillable'
import { useSegment } from '@/hooks/useSegment'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import { Section, SectionHeading } from '@/components/ui/Section'
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

  const filters = useMemo(
    () => problemCards.filter((card) => card.segment === segment),
    [segment],
  )

  const visible = useMemo(
    () => (filter === 'all' ? segmentCases : segmentCases.filter((item) => item.problem === filter)),
    [segmentCases, filter],
  )

  // Szegmensváltáskor a szűrő visszaáll – így nem marad üres a lista.
  const activeFilter = filters.some((f) => f.id === filter) ? filter : 'all'

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
    <Section id="referenciak" labelledBy="referenciak-cim">
      <SectionHeading id="referenciak-cim" kicker="Referenciák" title={copy.title} subtitle={copy.subtitle} />

      {filters.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Referenciák szűrése">
          <FilterChip active={activeFilter === 'all'} onClick={() => setFilter('all')}>
            Összes ({segmentCases.length})
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
                {card.title} ({count})
              </FilterChip>
            )
          })}
        </div>
      )}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, index) => (
          <li key={item.id}>
            <CaseCard item={item} onOpen={() => openCase(index)} />
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="rounded-sm border border-white/10 bg-panel/60 p-6 text-center text-sm text-alu">
          Ehhez a szűréshez jelenleg nincs feltöltött munka.
        </p>
      )}

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
        'rounded-sm border px-3 py-1.5 text-sm font-medium transition-colors duration-150',
        active
          ? 'border-brand bg-brand text-white'
          : 'border-white/15 bg-panel/60 text-alu hover:border-alu/50 hover:text-paper',
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
      className="group flex h-full w-full flex-col rounded-sm border border-white/10 bg-panel/60 text-left transition-colors duration-150 hover:border-alu/50 hover:bg-panel"
    >
      <div className="relative grid grid-cols-2 gap-px bg-white/10">
        <div className="relative">
          <SmartImage
            src={item.images.before}
            alt={item.images.beforeAlt}
            ratio="1 / 1"
            sizes="(max-width: 640px) 50vw, 200px"
            placeholderLabel={item.title}
          />
          <span className="absolute left-1.5 top-1.5 rounded-sm bg-ink/85 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-alu">
            Előtte
          </span>
        </div>
        <div className="relative">
          <SmartImage
            src={item.images.after}
            alt={item.images.afterAlt}
            ratio="1 / 1"
            sizes="(max-width: 640px) 50vw, 200px"
            placeholderLabel={item.title}
          />
          <span className="absolute left-1.5 top-1.5 rounded-sm bg-brand px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            Utána
          </span>
        </div>
        <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-sm bg-ink/85 text-alu transition-colors group-hover:text-paper">
          <Icon name="zoom" size={16} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-semibold uppercase leading-tight text-paper">
          {item.title}
        </h3>
        {issue && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-alu">{issue}</p>}

        <dl className="mt-auto space-y-1.5 pt-4 text-sm">
          {replacementCost && (
            <div className="flex justify-between gap-3">
              <dt className="text-steel">Csere ára lett volna</dt>
              <dd className="text-right text-alu line-through decoration-steel">{replacementCost}</dd>
            </div>
          )}
          {repairCost && (
            <div className="flex justify-between gap-3">
              <dt className="text-alu">Amibe került</dt>
              <dd className="text-right font-display font-semibold text-brand-light">{repairCost}</dd>
            </div>
          )}
          {duration && (
            <div className="flex justify-between gap-3">
              <dt className="text-steel">Átfutás</dt>
              <dd className="text-right text-alu">{duration}</dd>
            </div>
          )}
        </dl>

        {import.meta.env.DEV && isTodo(item.images.before) && (
          <p className="mt-3 border-t border-brand/30 pt-2 text-[11px] text-brand-light">
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
      />

      <div className="p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h2 className="font-display text-xl font-semibold uppercase text-paper sm:text-2xl">{item.title}</h2>
          {category && (
            <span className="rounded-sm border border-white/15 px-2 py-0.5 text-xs text-alu">
              {category.title}
            </span>
          )}
          <span className="ml-auto text-xs text-steel">
            {index + 1} / {total}
          </span>
        </div>

        {rows.length > 0 ? (
          <dl className="divide-y divide-white/10 border-y border-white/10">
            {rows.map((row) => (
              <div key={row.label} className="grid gap-1 py-3 sm:grid-cols-[13rem_1fr] sm:gap-4">
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
          <p className="mt-4 text-xs text-steel">
            Tipp: a bal és jobb nyílbillentyűvel léptethetsz a munkák között.
          </p>
        )}
      </div>
    </div>
  )
}
