import { hero } from '@/content/hero'
import { contact, serviceArea } from '@/content/site.config'
import { resolve } from '@/content/fillable'
import { track } from '@/lib/analytics'
import { scrollToSection } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { BeforeAfter } from '@/components/ui/BeforeAfter'

export function Hero() {
  const area = resolve(serviceArea.short)
  const phone = resolve(contact.phoneHref)
  const caption = resolve(hero.showcase.caption)

  const subheadline = area
    ? `${hero.subheadlineBase} ${area} területén.`
    : `${hero.subheadlineBase}.`

  return (
    <section id="top" className="relative overflow-hidden border-b border-white/5 pt-16">
      {/* Visszafogott, fémes háttérfelület – nem gradiens-dekoráció. */}
      <div aria-hidden="true" className="absolute inset-0 bg-brushed opacity-60" />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-0 h-full w-[60%] skew-x-[-12deg] bg-panel/50"
      />

      <div className="container-content relative py-10 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* Szöveges oldal */}
          <div>
            <p className="mb-5 inline-flex flex-wrap items-center gap-x-2 rounded-sm border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-alu sm:text-xs">
              {hero.kicker}
            </p>

            <h1 className="text-3xl/[1.1] sm:text-4xl/[1.08] lg:text-[3.25rem]/[1.05]">
              Amit máshol azt mondták, hogy{' '}
              <span className="text-brand-light">nem javítható, csak cserélhető</span> – azt én
              megjavítom.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-alu sm:text-lg">
              {subheadline}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={() => {
                  track('cta_click', { location: 'hero', contactMethod: 'form', cta: 'foto_kuldes' })
                  scrollToSection('ajanlatkeres')
                }}
                className="sm:min-w-[16rem]"
              >
                <Icon name="camera" size={20} />
                {hero.primaryCta}
              </Button>

              {phone && (
                <Button
                  as="a"
                  href={`tel:${phone}`}
                  variant="secondary"
                  size="lg"
                  onClick={() => track('phone_click', { location: 'hero', contactMethod: 'phone' })}
                >
                  <Icon name="phone" size={20} />
                  {hero.secondaryCta}
                </Button>
              )}
            </div>

            <p className="mt-5 flex items-start gap-2 text-sm text-steel">
              <Icon name="info" size={16} className="mt-0.5 shrink-0 text-steel" />
              <span className="text-alu/80">
                A fotó alapján megmondom, javíthatónak látom-e – ez még nem megrendelés.
              </span>
            </p>
          </div>

          {/* Előtte-utána munka */}
          <figure className="relative">
            <BeforeAfter
              before={hero.showcase.before}
              after={hero.showcase.after}
              beforeAlt={hero.showcase.beforeAlt}
              afterAlt={hero.showcase.afterAlt}
              ratio="4 / 3"
              priority
              placeholderLabel="Ide kerül a legmeggyőzőbb előtte-utána munka fotópárja"
              className="border border-white/10"
            />
            {caption && (
              <figcaption className="mt-3 text-sm text-alu">{caption}</figcaption>
            )}
          </figure>
        </div>
      </div>
    </section>
  )
}
