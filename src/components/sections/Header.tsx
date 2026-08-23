import { useEffect, useState } from 'react'
import { business, contact } from '@/content/site.config'
import { resolve } from '@/content/fillable'
import { track } from '@/lib/analytics'
import { cn, scrollToSection } from '@/lib/utils'
import { useActiveSection } from '@/hooks/useInView'
import { useScrolledPast } from '@/hooks/useMedia'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { SparkLink } from '@/components/ui/SparkLink'

export const NAV_ITEMS = [
  { id: 'javitasok', label: 'Javítások' },
  { id: 'referenciak', label: 'Referenciák' },
  { id: 'arak', label: 'Árak' },
  { id: 'folyamat', label: 'Folyamat' },
  { id: 'gyik', label: 'GYIK' },
]

const NAV_IDS = NAV_ITEMS.map((item) => item.id)

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolledPast(24)
  const active = useActiveSection(NAV_IDS)

  const name = resolve(business.shortName) ?? resolve(business.name)
  const logo = resolve(business.logoSrc)
  const phone = resolve(contact.phoneHref)
  const phoneLabel = resolve(contact.phoneDisplay)

  // A menü zárása Escape-re.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const go = (id: string) => {
    setMenuOpen(false)
    scrollToSection(id)
  }

  const goToForm = (location: string) => {
    setMenuOpen(false)
    track('cta_click', { location, contactMethod: 'form', cta: 'foto_kuldes' })
    scrollToSection('ajanlatkeres')
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-150',
        scrolled || menuOpen ? 'border-b border-white/10 bg-ink/95 backdrop-blur' : 'bg-ink/70 backdrop-blur-sm',
      )}
    >
      <div className="container-content flex h-16 items-center justify-between gap-3">
        {/* Logó / cégnév */}
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault()
            go('top')
          }}
          className="flex min-w-0 items-center gap-2.5"
        >
          {logo ? (
            <img src={logo} alt="" width={36} height={36} className="h-9 w-auto" />
          ) : (
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center border border-brand bg-brand/10 font-display text-sm font-bold text-brand-light shadow-edge"
            >
              AW
            </span>
          )}
          <span className="min-w-0 truncate font-display text-base font-semibold uppercase tracking-[0.04em] text-paper sm:text-lg">
            {name ?? 'Alumínium- és rozsdamentes hegesztés'}
          </span>
        </a>

        {/* Asztali navigáció */}
        <nav aria-label="Fő navigáció" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <SparkLink
                  href={`#${item.id}`}
                  active={active === item.id}
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    go(item.id)
                  }}
                >
                  {item.label}
                </SparkLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {phone && (
            <a
              href={`tel:${phone}`}
              onClick={() => track('phone_click', { location: 'header', contactMethod: 'phone' })}
              className="hidden items-center gap-2 px-3 py-2 font-display text-sm font-semibold tracking-wide text-paper transition-colors duration-150 hover:text-brand-light sm:flex"
            >
              <Icon name="phone" size={16} className="text-brand" />
              <span>{phoneLabel}</span>
            </a>
          )}

          <Button onClick={() => goToForm('header')} className="hidden sm:inline-flex">
            Fotót küldök
          </Button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobil-menu"
            aria-label={menuOpen ? 'Menü bezárása' : 'Menü megnyitása'}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 text-paper transition-colors hover:bg-white/5 lg:hidden"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      {/* Mobil menü */}
      <div
        id="mobil-menu"
        hidden={!menuOpen}
        className="border-t border-white/10 bg-ink lg:hidden"
      >
        <nav aria-label="Mobil navigáció" className="container-content py-3">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault()
                    go(item.id)
                  }}
                  className="block border-b border-white/5 py-3 text-base font-medium text-paper"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2 pb-2">
            <Button onClick={() => goToForm('mobile_menu')} size="lg">
              Fotót küldök, kérek árat
            </Button>
            {phone && (
              <Button
                as="a"
                href={`tel:${phone}`}
                variant="secondary"
                size="lg"
                onClick={() => track('phone_click', { location: 'mobile_menu', contactMethod: 'phone' })}
              >
                <Icon name="phone" size={18} />
                {phoneLabel}
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
