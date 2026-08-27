import { weldShowcase } from '@/content/weldShowcase'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

/**
 * VALÓS VARRATOK – integrált vizuális bizonyíték.
 *
 * Nem önálló referenciaszekció: a Technológia szekció része, közvetlenül az
 * eljárások leírása után. Aszimmetrikus, „megtervezett” elrendezés – egy álló
 * makrófelvétel a bal oldalon, két négyzetes részlet mellette egymás alatt.
 * A tartalom (képek, alt szöveg, felvezetés) a tartalmi rétegből érkezik.
 */

// Az egyes képkeretek elrendezése. A képek a SAJÁT képarányukban jelennek meg
// (álló makró = álló, részletek = négyzet), így nincs erős levágás. Mobilon
// egymás alatt, sm-től 2 oszlop, lg-től három egyenlő hasáb – a két négyzet
// függőlegesen középre igazítva a magasabb álló kép mellett.
const FRAME_CLASSES = [
  'aspect-[46/100] mx-auto w-full max-w-[20rem] sm:col-span-2 lg:col-span-4 lg:mx-0 lg:max-w-none',
  'aspect-square sm:col-span-1 lg:col-span-4 lg:self-center',
  'aspect-square sm:col-span-1 lg:col-span-4 lg:self-center',
]

export function CraftShowcase() {
  return (
    <div data-testid="weld-showcase">
      <div className="mb-8 flex items-center gap-4">
        <span aria-hidden="true" className="h-px w-10 bg-brand" />
        <p className="font-display text-label font-semibold uppercase text-brand-light">
          {weldShowcase.kicker}
        </p>
        <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-12 lg:items-start">
        {weldShowcase.shots.map((shot, index) => (
          <Reveal
            key={shot.id}
            delay={Math.min(index * 90, 180)}
            className={cn(
              'group relative overflow-hidden rounded-sm bg-panel shadow-edge',
              FRAME_CLASSES[index] ?? 'aspect-square',
            )}
          >
            <img
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              data-testid={`weld-image-${index + 1}`}
            />
            {/* Finom belső keret a mélységért (sötét fátyol nélkül, hogy jól látszódjon a kép) */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
            />
            {/* Műszaki sarokjelek – hoverre jelennek meg */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-white/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
