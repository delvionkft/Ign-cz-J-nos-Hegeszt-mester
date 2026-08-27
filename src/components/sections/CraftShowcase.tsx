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

// Egységes, rendezett elrendezés: mindhárom kép AZONOS méretű keretben,
// azonos képaránnyal (object-cover). Mobilon egymás alatt, sm-től három
// egyenlő oszlop – így egyik sem nagyobb a másiknál.
const FRAME_CLASS = 'aspect-[4/5]'

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        {weldShowcase.shots.map((shot, index) => (
          <Reveal
            key={shot.id}
            delay={Math.min(index * 90, 180)}
            className={cn(
              'group relative overflow-hidden rounded-sm bg-panel shadow-edge',
              FRAME_CLASS,
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
