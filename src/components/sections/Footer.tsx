import { business, contact, legalLinks } from '@/content/site.config'
import { resolve } from '@/content/fillable'
import { hasTrackingConfigured } from '@/lib/consent'
import { scrollToSection } from '@/lib/utils'
import { NAV_ITEMS } from './Header'
import { Icon } from '@/components/ui/Icon'

interface FooterProps {
  onOpenCookieSettings: () => void
}

export function Footer({ onOpenCookieSettings }: FooterProps) {
  const name = resolve(business.name) ?? resolve(business.shortName)
  const legalForm = resolve(business.legalForm)
  const taxId = resolve(business.taxId)
  const phone = resolve(contact.phoneHref)
  const phoneLabel = resolve(contact.phoneDisplay)
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-ink pb-safe-cta pt-10 sm:pb-10">
      <div className="container-content">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-semibold uppercase text-paper">
              {name ?? 'Alumínium- és rozsdamentes hegesztés'}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-alu">
              Alumínium, öntvény és rozsdamentes alkatrészek javítása, valamint egyedi szerkezetek gyártása.
            </p>
            {phone && (
              <a
                href={`tel:${phone}`}
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-paper hover:text-brand-light"
              >
                <Icon name="phone" size={16} className="text-brand" />
                {phoneLabel}
              </a>
            )}
          </div>

          <nav aria-label="Lábléc navigáció">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-alu">Oldal</h2>
            <ul className="mt-3 space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault()
                      scrollToSection(item.id)
                    }}
                    className="text-sm text-alu hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#ajanlatkeres"
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToSection('ajanlatkeres')
                  }}
                  className="text-sm text-alu hover:text-paper"
                >
                  Ajánlatkérés
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-alu">Jogi</h2>
            <ul className="mt-3 space-y-2">
              {legalLinks.map((link) => {
                const href = resolve(link.href)
                return (
                  <li key={link.id}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-alu hover:text-paper"
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
                    className="text-sm text-alu underline-offset-2 hover:text-paper hover:underline"
                  >
                    Süti beállítások
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-alu">
              Cégadatok
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-alu">
              {legalForm && <li>{legalForm}</li>}
              {taxId && <li>Adószám: {taxId}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-xs text-steel">
          <p>
            © {year} {name ?? ''} Minden jog fenntartva.
          </p>
        </div>
      </div>
    </footer>
  )
}
