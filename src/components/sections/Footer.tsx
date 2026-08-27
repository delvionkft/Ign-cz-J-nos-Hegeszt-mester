/**
 * LÁBLÉC
 * ------
 * Az oldal lezárása: elérhetőségek, gyors szegmensválasztás, navigáció,
 * jogi linkek és cégadatok. A szegmens gyorslinkek ugyanazt az állapotot
 * állítják, mint a problémaválasztó – a lábléc így nem zsákutca.
 */
import { business, contact, legalLinks, openingHours, serviceArea } from '@/content/site.config'
import { segmentOrder, segments } from '@/content'
import { hero } from '@/content/hero'
import { resolve } from '@/content/fillable'
import type { SegmentId } from '@/content/types'
import { useSegment } from '@/hooks/useSegment'
import { hasTrackingConfigured } from '@/lib/consent'
import { scrollToSection } from '@/lib/utils'
import { NAV_ITEMS } from './Header'
import { Icon } from '@/components/ui/Icon'
import { ContactChannels, hasContactChannels } from '@/components/ui/ContactChannels'
import { Reveal } from '@/components/ui/Reveal'

interface FooterProps {
  onOpenCookieSettings: () => void
}

export function Footer({ onOpenCookieSettings }: FooterProps) {
  const { selectSegment } = useSegment()

  const name = resolve(business.name) ?? resolve(business.shortName)
  const shortName = resolve(business.shortName) ?? name
  const tagline = resolve(business.tagline)
  const logo = resolve(business.logoSrc)
  const legalForm = resolve(business.legalForm)
  const taxId = resolve(business.taxId)
  const phone = resolve(contact.phoneHref)
  const phoneLabel = resolve(contact.phoneDisplay)
  const phoneSecondary = resolve(contact.phoneHrefSecondary)
  const phoneSecondaryLabel = resolve(contact.phoneDisplaySecondary)
  const email = resolve(contact.email)
  const emailSecondary = resolve(contact.emailSecondary)
  const city = resolve(serviceArea.city)
  const address = resolve(serviceArea.address)
  const postalCode = resolve(serviceArea.postalCode)
  const areaShort = resolve(serviceArea.short)
  const fullAddress = [postalCode, city, address].filter(Boolean).join(' ')
  const openDays = openingHours.filter((day) => day.opens && day.closes)
  const year = new Date().getFullYear()
  // Cégnév hiányában a szakma neve áll a vízjelben, hogy a lezárás akkor is
  // megálljon a lábán, amíg a tartalom nincs kitöltve.
  const watermark = shortName ?? 'Hegesztés'

  const goToSegment = (id: SegmentId) => {
    selectSegment(id, 'footer')
    scrollToSection('javitasok')
  }

  return (
    <footer className="relative isolate overflow-hidden bg-pit pb-safe-cta pt-16 sm:pb-10 sm:pt-20">
      {/* Háttérrétegek: műszaki raszter + piros izzás a bal alsó sarokban. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-grid opacity-50"
      />
      <div
        aria-hidden="true"
        className="glow-brand pointer-events-none absolute inset-0 -z-10 [--glow-x:12%] [--glow-y:85%]"
      />

      <div className="container-content">
        <div className="section-rule mb-12" aria-hidden="true" />

        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8">
          {/* ---------- Márka és elérhetőség ---------- */}
          <Reveal>
            <div className="flex items-center gap-3">
              {logo ? (
                <img src={logo} alt="" width={44} height={44} className="h-11 w-auto" />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center border border-brand bg-brand/10 font-display text-sm font-bold text-brand-light shadow-edge"
                >
                  AW
                </span>
              )}
              <p className="font-display text-display-sm font-semibold uppercase text-paper">
                {name ?? 'Alumínium- és rozsdamentes hegesztés'}
              </p>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-alu">
              {tagline ??
                'Alumínium, öntvény és rozsdamentes alkatrészek javítása, valamint egyedi szerkezetek gyártása.'}
            </p>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {hero.specStrip.slice(0, 5).map((spec) => (
                <li
                  key={spec}
                  className="border border-white/10 px-2 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-steel"
                >
                  {spec}
                </li>
              ))}
            </ul>

            {hasContactChannels() && <ContactChannels location="footer" className="mt-6 max-w-sm" />}

            {(fullAddress || areaShort) && (
              <p className="mt-6 flex items-start gap-2.5 text-sm text-alu">
                <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-brand" />
                <span>
                  {fullAddress || areaShort}
                  {fullAddress && areaShort && (
                    <span className="block text-steel">Vonzáskörzet: {areaShort}</span>
                  )}
                </span>
              </p>
            )}
          </Reveal>

          {/* ---------- Szegmens gyorsválasztó ---------- */}
          <Reveal delay={60}>
            <h2 className="font-display text-label font-semibold uppercase text-steel">
              Miben segítek
            </h2>
            <ul className="mt-4 space-y-2.5">
              {segmentOrder.map((id) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => goToSegment(id)}
                    className="group flex items-center gap-2 text-left text-sm text-alu transition-colors duration-150 hover:text-paper"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-3 bg-steel transition-[width,background-color] duration-200 group-hover:w-5 group-hover:bg-brand"
                    />
                    {segments[id].label}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* ---------- Navigáció ---------- */}
          <Reveal delay={100}>
            <nav aria-label="Lábléc navigáció">
              <h2 className="font-display text-label font-semibold uppercase text-steel">Oldal</h2>
              <ul className="mt-4 space-y-2.5">
                {[...NAV_ITEMS, { id: 'ajanlatkeres', label: 'Ajánlatkérés' }].map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => {
                        event.preventDefault()
                        scrollToSection(item.id)
                      }}
                      className="group flex items-center gap-2 text-sm text-alu transition-colors duration-150 hover:text-paper"
                    >
                      <span
                        aria-hidden="true"
                        className="h-px w-3 bg-steel transition-[width,background-color] duration-200 group-hover:w-5 group-hover:bg-brand"
                      />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          {/* ---------- Nyitvatartás és jogi ---------- */}
          <Reveal delay={140}>
            {openDays.length > 0 && (
              <>
                <h2 className="font-display text-label font-semibold uppercase text-steel">
                  Nyitvatartás
                </h2>
                <ul className="tabular mt-4 space-y-1.5 text-sm">
                  {openingHours.map((day) => (
                    <li key={day.day} className="flex justify-between gap-3">
                      <span className="text-alu">{day.label}</span>
                      <span className={day.opens ? 'text-paper' : 'text-steel'}>
                        {day.opens && day.closes ? `${day.opens}–${day.closes}` : 'zárva'}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2
              className={`font-display text-label font-semibold uppercase text-steel ${
                openDays.length > 0 ? 'mt-8' : ''
              }`}
            >
              Jogi
            </h2>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => {
                const href = resolve(link.href)
                return (
                  <li key={link.id}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-alu transition-colors duration-150 hover:text-paper"
                      >
                        {link.label}
                      </a>
                    ) : (
                      // Törött link helyett nem kattintható elem.
                      <span className="text-sm text-steel">{link.label}</span>
                    )}
                  </li>
                )
              })}
              {hasTrackingConfigured() && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenCookieSettings}
                    className="text-sm text-alu underline-offset-4 transition-colors duration-150 hover:text-paper hover:underline"
                  >
                    Süti beállítások
                  </button>
                </li>
              )}
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    data-testid="footer-email-primary"
                    className="text-sm text-alu transition-colors duration-150 hover:text-paper"
                  >
                    {email}
                  </a>
                </li>
              )}
              {emailSecondary && emailSecondary !== email && (
                <li>
                  <a
                    href={`mailto:${emailSecondary}`}
                    data-testid="footer-email-secondary"
                    className="text-sm text-alu transition-colors duration-150 hover:text-paper"
                  >
                    {emailSecondary}
                  </a>
                </li>
              )}
            </ul>
          </Reveal>
        </div>

        {/* ---------- Záró sáv ---------- */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-steel">
            © {year} {name ?? ''} · Minden jog fenntartva.
            {(legalForm || taxId) && (
              <span className="mt-1 block">
                {[legalForm, taxId && `Adószám: ${taxId}`].filter(Boolean).join(' · ')}
              </span>
            )}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {phone && (
              <a
                href={`tel:${phone}`}
                data-testid="footer-phone-primary"
                className="font-display text-sm font-semibold tracking-wide text-paper transition-colors duration-150 hover:text-brand-light"
              >
                {phoneLabel}
              </a>
            )}
            {phoneSecondary && phoneSecondary !== phone && (
              <a
                href={`tel:${phoneSecondary}`}
                data-testid="footer-phone-secondary"
                className="font-display text-sm font-semibold tracking-wide text-paper transition-colors duration-150 hover:text-brand-light"
              >
                {phoneSecondaryLabel}
              </a>
            )}
            <button
              type="button"
              onClick={() => scrollToSection('top')}
              className="group flex items-center gap-2 border border-white/15 px-3 py-2 font-display text-label font-semibold uppercase text-alu transition-colors duration-150 hover:border-brand hover:text-paper"
            >
              <Icon
                name="chevron-down"
                size={14}
                className="rotate-180 text-brand transition-transform duration-200 group-hover:-translate-y-0.5"
              />
              Vissza a tetejére
            </button>
          </div>
        </div>
      </div>

      {/*
        Nagy méretű, alig látható vízjel – az oldal lezárása.
        Cégnév hiányában a szakma neve áll ott, hogy a lezárás akkor is
        megálljon a lábán, amíg a tartalom nincs kitöltve.
      */}
      <p
        aria-hidden="true"
        /*
          A betűméret a felirat hosszához igazodik, így hosszabb cégnév sem
          lóg ki: a kondenzált nagybetűk átlagos szélessége kb. 0,52em,
          ebből adódik a ~190vw / karakterszám képlet.
        */
        style={{ fontSize: `min(17vw, ${(190 / Math.max(watermark.length, 7)).toFixed(1)}vw)` }}
        className="pointer-events-none mt-10 select-none overflow-hidden whitespace-nowrap text-center font-display font-bold uppercase leading-[0.78] text-white/[0.03] sm:mt-6"
      >
        {watermark}
      </p>
    </footer>
  )
}
