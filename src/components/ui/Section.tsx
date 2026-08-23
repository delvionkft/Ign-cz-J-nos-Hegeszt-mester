import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

type Tone = 'base' | 'panel' | 'pit'
type Glow = 'none' | 'brand' | 'arc'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  tone?: Tone
  labelledBy?: string
  /**
   * Kétjegyű sorszám a bal margón. A landing egy megtervezett sorrend,
   * ezért a számozás valós információt hordoz, nem díszítés.
   */
  index?: string
  /** Felső hajszálvonal a szekció elején. */
  rule?: boolean
  /** Nagy, lágy fényfolt a háttérben. A `--glow-x/y` a fókuszpontját állítja. */
  glow?: Glow
  /** A fényfolt pozíciója, pl. `{ x: '20%', y: '30%' }`. */
  glowAt?: { x: string; y: string }
}

const tones: Record<Tone, string> = {
  base: '',
  panel: 'bg-panel/25',
  pit: 'bg-pit',
}

export function Section({
  id,
  children,
  className,
  tone = 'base',
  labelledBy,
  index,
  rule = true,
  glow = 'none',
  glowAt,
}: SectionProps) {
  const glowStyle = glowAt
    ? ({ '--glow-x': glowAt.x, '--glow-y': glowAt.y } as React.CSSProperties)
    : undefined

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'relative isolate scroll-mt-32 overflow-hidden py-16 sm:py-24 lg:py-28',
        tones[tone],
        className,
      )}
    >
      {glow !== 'none' && (
        <div
          aria-hidden="true"
          style={glowStyle}
          className={cn(
            'pointer-events-none absolute inset-0 -z-10',
            glow === 'brand' ? 'glow-brand' : 'glow-arc',
          )}
        />
      )}
      {rule && (
        <div className="container-content">
          <div className="section-rule" aria-hidden="true" />
        </div>
      )}

      <div className="container-content relative pt-10 sm:pt-14">
        {index && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-4 right-4 font-display text-5xl font-bold leading-none text-white/[0.05] sm:-top-6 sm:right-6 sm:text-6xl lg:-top-8 lg:right-10 lg:text-7xl"
          >
            {index}
          </span>
        )}
        {children}
      </div>
    </section>
  )
}

interface SectionHeadingProps {
  id?: string
  kicker?: string
  title: ReactNode
  subtitle?: string
  className?: string
  /** Kisebb léptékű változat oldalsó oszlopokhoz. */
  size?: 'lg' | 'md'
}

export function SectionHeading({
  id,
  kicker,
  title,
  subtitle,
  className,
  size = 'lg',
}: SectionHeadingProps) {
  return (
    <Reveal as="header" className={cn('mb-10 sm:mb-14', className)}>
      {kicker && (
        <p className="mb-4 flex items-center gap-3 font-display text-label font-semibold uppercase text-brand-light">
          <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-brand" />
          {kicker}
        </p>
      )}
      <h2 id={id} className={size === 'lg' ? 'text-display-lg' : 'text-display-md'}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 max-w-prose text-base leading-relaxed text-alu sm:text-lg">{subtitle}</p>
      )}
    </Reveal>
  )
}

/** Műszaki eyebrow-felirat mérőléc-osztással – szekción belüli alcímekhez. */
export function TechLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 font-display text-label font-semibold uppercase text-steel',
        className,
      )}
    >
      <span className="whitespace-nowrap">{children}</span>
      <span aria-hidden="true" className="tick-row h-2 flex-1" />
    </p>
  )
}
