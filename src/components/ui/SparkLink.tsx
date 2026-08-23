/**
 * SZIKRÁZÓ NAVIGÁCIÓS LINK
 * ------------------------
 * Kurzor alá érve apró szikrák pattannak ki a link alsó éléből, és a piros
 * aláhúzás balról behúz – ugyanaz a mozdulat, mint amikor a hegesztőpálca
 * hozzáér az anyaghoz.
 *
 * Megvalósítás:
 *  - tiszta CSS, minden szikra egy 2-3 px-es elem `transform` + `opacity`
 *    animációval, tehát a böngésző a kompozitorban futtatja,
 *  - a szikrák `aria-hidden` és `pointer-events: none`, így nem zavarják
 *    sem a képernyőolvasót, sem a kattintást,
 *  - `prefers-reduced-motion` esetén nincs szikra, csak a színváltás
 *    és az aláhúzás – az állapot így is egyértelmű.
 */
import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * A szikrák röppályája. Szándékosan kézzel hangolt, nem véletlenszerű:
 * így minden link ugyanazt a felismerhető mozdulatot ismétli.
 * `x` – vízszintes kiindulás a linken belül, `dx/dy` – elmozdulás,
 * `d` – késleltetés, `s` – méret, `warm` – meleg (szikra) vagy piros tónus.
 */
const SPARKS = [
  { x: '12%', dx: '-11px', dy: '-20px', d: '0ms', s: 4, warm: true },
  { x: '30%', dx: '5px', dy: '-26px', d: '60ms', s: 3, warm: false },
  { x: '48%', dx: '-4px', dy: '-31px', d: '25ms', s: 4, warm: true },
  { x: '66%', dx: '12px', dy: '-22px', d: '100ms', s: 3, warm: false },
  { x: '84%', dx: '7px', dy: '-28px', d: '145ms', s: 3, warm: true },
  { x: '58%', dx: '-14px', dy: '-17px', d: '180ms', s: 2, warm: true },
] as const

interface SparkLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  /** Aktív (éppen látott) szekcióhoz tartozó link. */
  active?: boolean
}

export function SparkLink({ children, active = false, className, ...props }: SparkLinkProps) {
  return (
    <a
      {...props}
      className={cn(
        'group relative block px-3 py-2 font-display text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-150',
        active ? 'text-paper' : 'text-alu hover:text-paper',
        className,
      )}
    >
      {children}

      {/* Aláhúzás: aktív állapotban végig kint, hoverre balról behúz. */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-x-3 bottom-0.5 h-0.5 origin-left bg-brand transition-transform duration-200 ease-out',
          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100',
        )}
      />

      {/* Szikrák – csak hover/fókusz alatt futnak le, egyszer. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-3 bottom-0.5 hidden h-0 motion-safe:block"
      >
        {SPARKS.map((spark) => (
          <span
            key={spark.x}
            style={
              {
                left: spark.x,
                width: `${spark.s}px`,
                height: `${spark.s}px`,
                '--spark-dx': spark.dx,
                '--spark-dy': spark.dy,
                '--spark-dur': '760ms',
                animationDelay: spark.d,
              } as CSSProperties
            }
            className={cn(
              'absolute bottom-0 rounded-full opacity-0',
              spark.warm
                ? 'bg-ember shadow-[0_0_10px_2px_rgba(255,178,90,0.85)]'
                : 'bg-brand-light shadow-[0_0_10px_2px_rgba(255,90,96,0.85)]',
              'group-hover:animate-spark-fly group-focus-visible:animate-spark-fly',
            )}
          />
        ))}
      </span>
    </a>
  )
}
