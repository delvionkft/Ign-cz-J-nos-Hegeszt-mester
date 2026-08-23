import { forwardRef } from 'react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-sm font-display uppercase tracking-wide ' +
  'transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60 text-center'

const variants: Record<Variant, string> = {
  // Piros csak a legfontosabb elemeken. Fehér szöveg pirosan: AA kontraszt.
  primary: 'bg-brand text-white hover:bg-brand-dark active:bg-brand-dark',
  secondary: 'border border-alu/40 bg-transparent text-paper hover:border-alu hover:bg-white/5',
  ghost: 'text-alu hover:text-paper hover:bg-white/5',
}

const sizes: Record<Size, string> = {
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' }

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps | LinkProps>(
  function Button({ variant = 'primary', size = 'md', className, children, ...props }, ref) {
    const classes = cn(base, variants[variant], sizes[size], className)

    if (props.as === 'a') {
      const { as: _as, ...anchorProps } = props as LinkProps
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...anchorProps}>
          {children}
        </a>
      )
    }

    const { as: _as, type, ...buttonProps } = props as ButtonProps
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type ?? 'button'}
        className={classes}
        {...buttonProps}
      >
        {children}
      </button>
    )
  },
)
