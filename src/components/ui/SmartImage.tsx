/**
 * Képmegjelenítő elrendezésugrás nélkül.
 *
 * Ha a kép még nincs feltöltve (kitöltendő tartalom), semleges, egyértelműen
 * cserélhető képi helyet mutat – nem tör el az elrendezés, és élesben sem
 * jelenik meg nyers helykitöltő szöveg.
 */
import { isTodo } from '@/content/fillable'
import { cn } from '@/lib/utils'
import { Icon } from './Icon'

interface SmartImageProps {
  src: string
  alt: string
  /** Képarány, pl. `4/3`. Az elrendezésugrás elkerüléséhez kötelező. */
  ratio?: string
  className?: string
  imgClassName?: string
  /** A hero képnél `eager` + `high`, minden más esetben lazy. */
  priority?: boolean
  sizes?: string
  /** Felirat a helykitöltőn – mit ábrázoljon a kép. */
  placeholderLabel?: string
}

export function SmartImage({
  src,
  alt,
  ratio = '4 / 3',
  className,
  imgClassName,
  priority = false,
  sizes,
  placeholderLabel,
}: SmartImageProps) {
  const missing = isTodo(src)

  return (
    <div
      className={cn('relative w-full overflow-hidden bg-panel', className)}
      style={{ aspectRatio: ratio }}
    >
      {missing ? (
        <Placeholder label={placeholderLabel ?? alt} />
      ) : (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          className={cn('h-full w-full object-cover', imgClassName)}
        />
      )}
    </div>
  )
}

/** Semleges, műszaki hangulatú képi hely – valós fotóval cserélendő. */
function Placeholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-panel bg-brushed p-4 text-center">
      {/* Műszaki sarokjelek */}
      <span aria-hidden="true" className="absolute left-2 top-2 h-4 w-4 border-l border-t border-steel/60" />
      <span aria-hidden="true" className="absolute right-2 top-2 h-4 w-4 border-r border-t border-steel/60" />
      <span aria-hidden="true" className="absolute bottom-2 left-2 h-4 w-4 border-b border-l border-steel/60" />
      <span aria-hidden="true" className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-steel/60" />

      <Icon name="camera" size={28} className="text-steel" />
      <p className="max-w-[26ch] text-xs leading-snug text-alu">{label}</p>
      {import.meta.env.DEV && (
        <p className="rounded-sm border border-brand/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-light">
          Fotó kitöltendő
        </p>
      )}
    </div>
  )
}
