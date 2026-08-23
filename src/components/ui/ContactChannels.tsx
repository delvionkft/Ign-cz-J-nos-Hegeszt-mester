/**
 * Telefon / WhatsApp / Viber gombsor.
 * Csak a ténylegesen konfigurált csatornák jelennek meg (nincs törött link).
 */
import { contact } from '@/content/site.config'
import { resolve } from '@/content/fillable'
import { track } from '@/lib/analytics'
import { Icon } from './Icon'
import { cn } from '@/lib/utils'

/** Van-e legalább egy beállított kapcsolatfelvételi csatorna. */
export function hasContactChannels(): boolean {
  return Boolean(resolve(contact.phoneHref) || resolve(contact.whatsapp) || resolve(contact.viber))
}

interface ContactChannelsProps {
  /** A mérési eseménybe kerülő hely, pl. `form`, `footer`. */
  location: string
  className?: string
  variant?: 'row' | 'stack'
}

export function ContactChannels({ location, className, variant = 'row' }: ContactChannelsProps) {
  const phone = resolve(contact.phoneHref)
  const phoneLabel = resolve(contact.phoneDisplay)
  const whatsapp = resolve(contact.whatsapp)
  const viber = resolve(contact.viber)
  const prefill = encodeURIComponent(contact.messagePrefill)

  const items: Array<{ key: string; href: string; label: string; icon: 'phone' | 'whatsapp' | 'viber'; onClick: () => void }> = []

  if (phone) {
    items.push({
      key: 'phone',
      href: `tel:${phone}`,
      label: phoneLabel ?? 'Telefon',
      icon: 'phone',
      onClick: () => track('phone_click', { location, contactMethod: 'phone' }),
    })
  }
  if (whatsapp) {
    items.push({
      key: 'whatsapp',
      href: `https://wa.me/${whatsapp}?text=${prefill}`,
      label: 'WhatsApp',
      icon: 'whatsapp',
      onClick: () => track('whatsapp_click', { location, contactMethod: 'whatsapp' }),
    })
  }
  if (viber) {
    items.push({
      key: 'viber',
      href: `viber://chat?number=${encodeURIComponent(viber)}`,
      label: 'Viber',
      icon: 'viber',
      onClick: () => track('viber_click', { location, contactMethod: 'viber' }),
    })
  }

  if (items.length === 0) return null

  return (
    <ul className={cn('flex gap-2', variant === 'stack' ? 'flex-col' : 'flex-wrap', className)}>
      {items.map((item) => (
        <li key={item.key} className={variant === 'stack' ? '' : 'flex-1 min-w-[9rem]'}>
          <a
            href={item.href}
            onClick={item.onClick}
            {...(item.key === 'whatsapp' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="flex w-full items-center justify-center gap-2 rounded-sm border border-alu/30 bg-white/5 px-3 py-2.5 text-sm font-medium text-paper transition-colors hover:border-alu hover:bg-white/10"
          >
            <Icon name={item.icon} size={18} className="text-brand-light" />
            <span>{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
