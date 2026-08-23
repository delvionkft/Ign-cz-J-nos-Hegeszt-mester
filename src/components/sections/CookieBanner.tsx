/**
 * SÜTI SÁV
 * Nem agresszív felugró ablak: alsó sáv, amely nem blokkolja az oldalt.
 * Marketingcélú mérőkód kizárólag „Elfogadom” után töltődik be.
 */
import { useEffect, useState } from 'react'
import { getConsent, hasTrackingConfigured, onConsentChange, setConsent } from '@/lib/consent'
import { legalLinks } from '@/content/site.config'
import { resolve } from '@/content/fillable'
import { Button } from '@/components/ui/Button'

interface CookieBannerProps {
  /** Kívülről (lábléc „Süti beállítások”) is megnyitható. */
  forceOpen: boolean
  onDismiss: () => void
}

export function CookieBanner({ forceOpen, onDismiss }: CookieBannerProps) {
  const [state, setState] = useState(() => getConsent().marketing)

  useEffect(() => onConsentChange((value) => setState(value.marketing)), [])

  // Ha nincs beállított mérőazonosító, nincs mit engedélyezni.
  if (!hasTrackingConfigured()) return null
  if (state !== 'unknown' && !forceOpen) return null

  const privacy = legalLinks.find((link) => link.id === 'privacy')
  const privacyHref = privacy ? resolve(privacy.href) : null

  const choose = (value: 'granted' | 'denied') => {
    setConsent(value)
    onDismiss()
  }

  return (
    <div
      role="region"
      aria-label="Süti beállítások"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/15 bg-panel/98 backdrop-blur sm:bottom-0"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.75rem)' }}
    >
      <div className="container-content flex flex-col gap-3 pt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-sm leading-relaxed text-alu">
          Az oldal működéséhez szükséges sütiket mindig használjuk. Statisztikai és marketingcélú
          mérést csak a hozzájárulásoddal indítunk.{' '}
          {privacyHref && (
            <a
              href={privacyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-light underline underline-offset-2 hover:text-paper"
            >
              Részletek
            </a>
          )}
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="secondary" onClick={() => choose('denied')}>
            Csak a szükséges
          </Button>
          <Button onClick={() => choose('granted')}>Elfogadom</Button>
        </div>
      </div>
    </div>
  )
}
