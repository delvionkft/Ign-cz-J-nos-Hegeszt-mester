/**
 * Akadálymentes modális ablak.
 * - Escape-re zár
 * - fókuszcsapda a tartalmon belül
 * - a háttér görgetése tiltott, amíg nyitva van
 * - visszaadja a fókuszt a megnyitó elemnek
 */
import { useCallback, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './Icon'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  /** Nyíl-billentyűs léptetés (galéria). */
  onPrev?: () => void
  onNext?: () => void
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'

export function Modal({ open, onClose, title, children, onPrev, onNext }: ModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === 'ArrowLeft' && onPrev) {
        onPrev()
        return
      }
      if (event.key === 'ArrowRight' && onNext) {
        onNext()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      )
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    },
    [onClose, onPrev, onNext],
  )

  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement as HTMLElement | null
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    // Fókusz a panelre, hogy a billentyűzet azonnal itt működjön.
    const timer = window.setTimeout(() => {
      const target = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)
      target?.focus()
    }, 0)

    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = overflow
      previouslyFocused.current?.focus?.()
    }
  }, [open, handleKeyDown])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/85 p-0 sm:items-center sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto border border-white/10 bg-panel shadow-2xl animate-fade-in sm:rounded-lg"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-sm bg-ink/80 text-alu transition-colors hover:bg-ink hover:text-paper"
          aria-label="Bezárás"
        >
          <Icon name="close" size={20} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
