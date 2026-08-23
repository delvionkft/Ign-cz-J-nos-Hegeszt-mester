/**
 * GYIK harmonika – natív `button` + `aria-expanded`, billentyűzettel kezelhető.
 */
import { useId, useState } from 'react'
import { Icon } from './Icon'
import { cn } from '@/lib/utils'

export interface AccordionItemData {
  id: string
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItemData[]
  /** Alapból nyitott elem azonosítója. */
  defaultOpenId?: string
}

export function Accordion({ items, defaultOpenId }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null)
  const baseId = useId()

  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item) => {
        const isOpen = openId === item.id
        const panelId = `${baseId}-${item.id}-panel`
        const buttonId = `${baseId}-${item.id}-button`

        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                data-open={isOpen}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="group flex w-full items-center justify-between gap-5 py-5 text-left font-sans text-base font-medium normal-case tracking-normal text-paper transition-colors duration-150 hover:text-brand-light sm:py-6 sm:text-lg"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center border transition-colors duration-150',
                    isOpen
                      ? 'border-brand bg-brand text-white'
                      : 'border-white/15 text-brand group-hover:border-alu/40',
                  )}
                >
                  <Icon
                    name="chevron-down"
                    size={18}
                    className={cn('transition-transform duration-150', isOpen && 'rotate-180')}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="max-w-prose pb-6 pr-4 text-sm leading-relaxed text-alu sm:pr-12 sm:text-base"
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
