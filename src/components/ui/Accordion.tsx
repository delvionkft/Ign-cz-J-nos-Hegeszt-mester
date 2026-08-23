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
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left font-sans text-base font-medium normal-case tracking-normal text-paper transition-colors hover:text-brand-light sm:py-5 sm:text-lg"
              >
                <span>{item.question}</span>
                <Icon
                  name="chevron-down"
                  size={20}
                  className={cn(
                    'shrink-0 text-brand transition-transform duration-150',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5 pr-8 text-sm leading-relaxed text-alu sm:text-base"
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
