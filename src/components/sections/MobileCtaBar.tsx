/**
 * MOBIL ALSÓ CTA-SÁV
 * Mindig elérhető „Fotót küldök” és „Hívás” gomb kis képernyőn.
 */
import { contact } from '@/content/site.config'
import { resolve } from '@/content/fillable'
import { track } from '@/lib/analytics'
import { scrollToSection } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'

export function MobileCtaBar() {
  const phone = resolve(contact.phoneHref)

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 backdrop-blur sm:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex gap-2 p-2">
        <button
          type="button"
          onClick={() => {
            track('cta_click', { location: 'sticky_mobile', contactMethod: 'form', cta: 'foto_kuldes' })
            scrollToSection('ajanlatkeres')
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-brand px-4 py-3 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors active:bg-brand-dark"
        >
          <Icon name="camera" size={18} />
          Fotót küldök
        </button>

        {phone && (
          <a
            href={`tel:${phone}`}
            onClick={() => track('phone_click', { location: 'sticky_mobile', contactMethod: 'phone' })}
            className="flex items-center justify-center gap-2 rounded-sm border border-alu/40 px-4 py-3 font-display text-sm font-semibold uppercase tracking-wide text-paper transition-colors active:bg-white/10"
          >
            <Icon name="phone" size={18} />
            Hívás
          </a>
        )}
      </div>
    </div>
  )
}
