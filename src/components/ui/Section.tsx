import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  /** Világosabb panelfelület a váltakozó ritmushoz. */
  tone?: 'base' | 'panel'
  labelledBy?: string
}

export function Section({ id, children, className, tone = 'base', labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'scroll-mt-24 py-14 sm:py-20',
        tone === 'panel' && 'bg-panel/40 border-y border-white/5',
        className,
      )}
    >
      <div className="container-content">{children}</div>
    </section>
  )
}

interface SectionHeadingProps {
  id?: string
  kicker?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  id,
  kicker,
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn('mb-8 sm:mb-12', align === 'center' && 'text-center mx-auto max-w-3xl', className)}>
      {kicker && (
        <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">
          <span aria-hidden="true" className="h-px w-8 bg-brand" />
          {kicker}
        </p>
      )}
      <h2 id={id} className="text-2xl/[1.15] sm:text-3xl/[1.15] lg:text-4xl/[1.12]">
        {title}
      </h2>
      {subtitle && <p className="mt-4 max-w-3xl text-base leading-relaxed text-alu">{subtitle}</p>}
    </header>
  )
}
