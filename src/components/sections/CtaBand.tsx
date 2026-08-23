/**
 * TELJES SZÉLESSÉGŰ CTA-SÁV
 * -------------------------
 * A bizonyítékblokk (galéria) után következik: a látogató épp most látta,
 * hogy ezeket nem kellett lecserélni – itt kap közvetlen utat az ajánlatkéréshez.
 */
import { contact } from '@/content/site.config'
import { resolve } from '@/content/fillable'
import { track } from '@/lib/analytics'
import { scrollToSection } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'

export function CtaBand() {
  const phone = resolve(contact.phoneHref)
  const phoneLabel = resolve(contact.phoneDisplay)

  return (
    <section aria-labelledby="cta-sav-cim" className="surface-brand relative isolate overflow-hidden">
      {/* Műszaki raszter a tömör piros felületen – nem marad üres színmező. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-grid-sm opacity-[0.18]"
      />

      <div className="container-content py-14 sm:py-16">
        <Reveal className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2.5 font-display text-label font-semibold uppercase text-white/70">
              <span aria-hidden="true" className="h-2 w-2 bg-white" />
              A tiéd is javítható lehet
            </p>
            <h2 id="cta-sav-cim" className="mt-4 text-display-lg text-white">
              Egy fotó elég ahhoz, hogy megmondjam
            </h2>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-white/85 sm:text-lg">
              Fotózd le a sérülést közelről és távolabbról is. Megírom, javíthatónak látom-e,
              milyen ársávra és milyen átfutásra számíthatsz.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:shrink-0">
            <button
              type="button"
              onClick={() => {
                track('cta_click', { location: 'cta_band', contactMethod: 'form', cta: 'foto_kuldes' })
                scrollToSection('ajanlatkeres')
              }}
              className="hover-lift inline-flex items-center justify-center gap-2 rounded-sm bg-ink px-7 py-4 font-display text-base font-semibold uppercase tracking-wide text-paper shadow-lift hover:bg-pit"
            >
              <Icon name="camera" size={20} className="text-brand-light" />
              Fotót küldök
            </button>

            {phone && (
              <a
                href={`tel:${phone}`}
                onClick={() => track('phone_click', { location: 'cta_band', contactMethod: 'phone' })}
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/50 px-7 py-4 font-display text-base font-semibold uppercase tracking-wide text-white transition-colors duration-150 hover:bg-white/10"
              >
                <Icon name="phone" size={20} />
                {phoneLabel ?? 'Hívás'}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
