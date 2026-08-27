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

// Az egyes képkeretek elrendezése. Mobilon 2 oszlopos rács (az álló kép teljes
// szélességben), lg-től 12 oszlopos, ahol az álló kép két sort fog át.
const FRAME_CLASSES = [
  'col-span-2 aspect-[4/5] lg:col-span-5 lg:row-span-2 lg:aspect-auto lg:h-[34rem]',
  'col-span-1 aspect-square lg:col-span-7 lg:aspect-auto lg:h-[16.5rem]',
  'col-span-1 aspect-square lg:col-span-7 lg:aspect-auto lg:h-[16.5rem]',
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

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
        {weldShowcase.shots.map((shot, index) => (
          <Reveal
            key={shot.id}
            delay={Math.min(index * 90, 180)}
            className={cn(
              'group relative overflow-hidden rounded-sm bg-panel shadow-edge',
              FRAME_CLASSES[index] ?? 'col-span-1 aspect-square',
            )}
          >
            <img
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              data-testid={`weld-image-${index + 1}`}
            />
            {/* Finom belső keret + alsó sötét fátyol a mélységért */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent opacity-70"
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
