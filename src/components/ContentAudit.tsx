/**
 * TARTALMI TEENDŐK PANEL – KIZÁRÓLAG FEJLESZTŐI MÓDBAN
 * Kilistázza a még kitöltetlen, kötelező tartalmakat és azok helyét.
 * Production buildben ez a komponens nem renderel semmit.
 */
import { useMemo, useState } from 'react'
import { auditContent } from '@/content/validate'
import { Icon } from '@/components/ui/Icon'

export function ContentAudit() {
  const [open, setOpen] = useState(false)
  const missing = useMemo(() => (import.meta.env.DEV ? auditContent() : []), [])

  if (!import.meta.env.DEV || missing.length === 0) return null

  return (
    <div className="fixed bottom-20 right-3 z-[70] max-w-[min(26rem,calc(100vw-1.5rem))] sm:bottom-4">
      {open ? (
        <div className="max-h-[70vh] overflow-y-auto rounded-sm border border-brand bg-ink shadow-2xl">
          <div className="sticky top-0 flex items-center justify-between gap-3 border-b border-brand/40 bg-ink px-4 py-3">
            <p className="font-display text-sm font-semibold uppercase text-brand-light">
              Tartalmi teendők ({missing.length})
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-alu hover:text-paper"
              aria-label="Panel bezárása"
            >
              <Icon name="close" size={18} />
            </button>
          </div>
          <ol className="divide-y divide-white/10">
            {missing.map((item) => (
              <li key={item.path} className="px-4 py-2.5">
                <p className="font-mono text-[11px] text-brand-light">{item.path}</p>
                <p className="mt-0.5 text-xs leading-snug text-alu">{item.hint}</p>
              </li>
            ))}
          </ol>
          <p className="border-t border-white/10 px-4 py-3 text-[11px] leading-snug text-steel">
            Ez a panel csak fejlesztői módban látszik. Parancssorból: <code>npm run check:content</code>
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-sm border border-brand bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-wider text-brand-light shadow-lg"
        >
          <Icon name="alert" size={16} />
          Tartalmi teendők ({missing.length})
        </button>
      )}
    </div>
  )
}
