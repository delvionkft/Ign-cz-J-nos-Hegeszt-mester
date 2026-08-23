/**
 * Előtte-utána csúszka.
 *
 * A vezérlést egy teljes felületet lefedő `input[type=range]` végzi, ezért
 * érintőképernyőn és billentyűzettel (nyilak, Home/End) egyaránt működik,
 * egyedi pointer-kezelés nélkül.
 */
import { useId, useState } from 'react'
import { SmartImage } from './SmartImage'
import { isTodo } from '@/content/fillable'
import { cn } from '@/lib/utils'

interface BeforeAfterProps {
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
  ratio?: string
  className?: string
  priority?: boolean
  /** Felirat, ha még egyik fotó sincs feltöltve. */
  placeholderLabel?: string
}

export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
  ratio = '4 / 3',
  className,
  priority = false,
  placeholderLabel,
}: BeforeAfterProps) {
  const [value, setValue] = useState(50)
  const labelId = useId()

  // Ha még egyik fotó sincs feltöltve, egyetlen semleges képi helyet mutatunk –
  // két egyforma helykitöltő fölött a csúszka értelmetlen és zavaró lenne.
  const bothMissing = isTodo(before) && isTodo(after)

  if (bothMissing) {
    return (
      <figure className={cn('relative overflow-hidden bg-panel', className)}>
        <SmartImage
          src={before}
          alt={afterAlt}
          ratio={ratio}
          priority={priority}
          placeholderLabel={placeholderLabel ?? `Előtte-utána fotópár helye – ${afterAlt}`}
        />
      </figure>
    )
  }

  return (
    <figure className={cn('relative select-none overflow-hidden bg-panel', className)}>
      <div className="relative w-full" style={{ aspectRatio: ratio }}>
        {/* UTÁNA – alsó réteg */}
        <SmartImage
          src={after}
          alt={afterAlt}
          ratio={ratio}
          priority={priority}
          className="absolute inset-0 h-full"
          placeholderLabel={afterAlt}
        />

        {/* ELŐTTE – felső, levágott réteg */}
        <div
          className="absolute inset-0 h-full"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
          aria-hidden="true"
        >
          <SmartImage
            src={before}
            alt=""
            ratio={ratio}
            priority={priority}
            className="absolute inset-0 h-full"
            placeholderLabel={beforeAlt}
          />
        </div>

        {/* Elválasztó vonal és fogantyú */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-brand"
          style={{ left: `${value}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brand bg-ink/90">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4F4F2" strokeWidth="2" strokeLinecap="round">
              <path d="m10 7-4 5 4 5M14 7l4 5-4 5" />
            </svg>
          </span>
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-sm bg-ink/85 px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-alu">
          Előtte
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-sm bg-ink/85 px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-alu">
          Utána
        </span>

        {/* A tényleges vezérlő: teljes felületű, átlátszó range input. */}
        <label htmlFor={labelId} className="sr-only">
          Előtte-utána csúszka: húzd, vagy használd a nyílbillentyűket
        </label>
        <input
          id={labelId}
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          aria-valuetext={`${value}% – a kép ${value}%-áig a javítás előtti állapot látszik`}
          className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        />
      </div>
    </figure>
  )
}
