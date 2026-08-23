import { hero } from '@/content/hero'
import { contact, serviceArea } from '@/content/site.config'
import { resolve } from '@/content/fillable'
import { track } from '@/lib/analytics'
import { scrollToSection } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { BeforeAfter } from '@/components/ui/BeforeAfter'
import { Reveal } from '@/components/ui/Reveal'

/** A hero fölötti műszaki adatsáv elemei – az anyag- és eljáráskör egy pillantásra. */
const SPEC_STRIP = ['AWI / TIG', 'MIG', 'Alumínium', 'Öntvény', 'Rozsdamentes']

export function Hero() {
  const area = resolve(serviceArea.short)
  const phone = resolve(contact.phoneHref)
  const caption = resolve(hero.showcase.caption)

  const subheadline = area ? `${hero.subheadlineBase} ${area} területén.` : `${hero.subheadlineBase}.`

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      {/* Műszaki rajzot idéző raszter – nagyon halvány, nem dekoráció-halmozás. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.55]"
      />
      {/* Ferde alumíniumlemez-sík a jobb oldalon. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 hidden h-full w-[55%] skew-x-[-11deg] bg-panel/40 bg-brushed lg:block"
      />

      <div className="container-content relative">
        <div className="grid items-center gap-9 py-10 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-14">
          {/* ---------------- Szöveges oldal ---------------- */}
          <div>
            <Reveal>
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-label font-semibold uppercase text-steel">
                <span className="text-brand-light">Alumínium- és rozsdamentes hegesztés</span>
                <span aria-hidden="true" className="text-white/20">
                  /
                </span>
                <span>AWI · MIG</span>
                <span aria-hidden="true" className="text-white/20">
                  /
                </span>
                <span>javítás és egyedi gyártás</span>
              </p>
            </Reveal>

            <Reveal delay={60}>
              {/* A hangsúly az ígéreten van: az ítélet semleges, a válasz piros. */}
              <h1 className="mt-5 text-display-2xl">
                Amit máshol azt mondták, hogy nem javítható, csak cserélhető –{' '}
                <span className="text-brand-light">azt én megjavítom</span>.
              </h1>
            </Reveal>

            <Reveal delay={110}>
              <p className="mt-6 max-w-prose text-base leading-relaxed text-alu sm:text-lg">
                {subheadline}
              </p>
            </Reveal>

            <Reveal delay={150}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={() => {
                    track('cta_click', { location: 'hero', contactMethod: 'form', cta: 'foto_kuldes' })
                    scrollToSection('ajanlatkeres')
                  }}
                  className="sm:min-w-[17rem]"
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

              <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-alu/80">
                <Icon name="info" size={16} className="mt-0.5 shrink-0 text-steel" />
                <span>A fotó alapján megmondom, javíthatónak látom-e – ez még nem megrendelés.</span>
              </p>
            </Reveal>
          </div>

          {/* ---------------- Előtte-utána munka ---------------- */}
          {/* Asztali nézetben a képblokk a képernyő jobb széléig fut ki. */}
          <Reveal delay={80} className="lg:mr-[calc(50%-50vw)]">
            <figure className="corner-marks relative border border-white/12 bg-pit p-2 shadow-lift sm:p-3">
              <BeforeAfter
                before={hero.showcase.before}
                after={hero.showcase.after}
                beforeAlt={hero.showcase.beforeAlt}
                afterAlt={hero.showcase.afterAlt}
                ratio="3 / 2"
                priority
                placeholderLabel="Ide kerül a legmeggyőzőbb előtte-utána munka fotópárja"
              />

              {/* Rajzlap-fejléc: mit ábrázol a kép. */}
              <figcaption className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/10 px-1 pt-2.5 sm:mt-3 sm:pt-3">
                <span className="font-display text-label font-semibold uppercase text-brand-light">
                  Referencia
                </span>
                <span className="text-sm text-alu">
                  {caption ?? 'Előtte-utána munka – a csúszkával összehasonlítható'}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>

      {/* ---------------- Műszaki adatsáv ---------------- */}
      <div className="relative border-y border-white/10 surface-sunk">
        <div className="container-content">
          <ul className="tabular flex flex-wrap items-center gap-x-6 gap-y-2 py-3.5 font-display text-label font-semibold uppercase text-steel sm:gap-x-10">
            {SPEC_STRIP.map((spec) => (
              <li key={spec} className="flex items-center gap-2.5">
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-brand" />
                {spec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
