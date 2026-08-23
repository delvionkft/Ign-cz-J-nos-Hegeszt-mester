/**
 * HELYI SEO LÁBAZAT
 * Természetes nyelvű vonzáskörzet-leírás, nem településnév-felsorolás.
 */
import { business, contact, openingHours, serviceArea } from '@/content/site.config'
import { resolve } from '@/content/fillable'
import { track } from '@/lib/analytics'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Icon } from '@/components/ui/Icon'

export function LocalSeo() {
  const name = resolve(business.name) ?? resolve(business.shortName)
  const address = resolve(serviceArea.address)
  const city = resolve(serviceArea.city)
  const postalCode = resolve(serviceArea.postalCode)
  const areaText = resolve(serviceArea.description)
  const dropOff = resolve(serviceArea.dropOff)
  const onSite = resolve(serviceArea.onSite)
  const phone = resolve(contact.phoneHref)
  const phoneLabel = resolve(contact.phoneDisplay)
  const email = resolve(contact.email)
  const mapEmbed = resolve(serviceArea.mapEmbedUrl)
  const mapLink = resolve(serviceArea.mapLinkUrl)

  const openDays = openingHours.filter((day) => day.opens && day.closes)
  const fullAddress = [postalCode, city, address].filter(Boolean).join(' ')

  return (
    <Section id="kapcsolat" labelledBy="kapcsolat-cim" index="10">
      <SectionHeading
        id="kapcsolat-cim"
        kicker="Elérhetőség"
        title="Hol találsz meg, és hova járok ki"
        subtitle={areaText ?? undefined}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Adatok */}
        <div className="space-y-6">
          <dl className="tabular divide-y divide-white/10 border-y border-white/10">
            {name && (
              <Row icon="shield" label="Vállalkozás">
                {name}
              </Row>
            )}
            {fullAddress && (
              <Row icon="pin" label="Telephely">
                {fullAddress}
                {mapLink && (
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-brand-light underline underline-offset-2 hover:text-paper"
                  >
                    Útvonal
                  </a>
                )}
              </Row>
            )}
            {phone && (
              <Row icon="phone" label="Telefon">
                <a
                  href={`tel:${phone}`}
                  onClick={() => track('phone_click', { location: 'local_seo', contactMethod: 'phone' })}
                  className="text-paper underline underline-offset-2 hover:text-brand-light"
                >
                  {phoneLabel}
                </a>
              </Row>
            )}
            {email && (
              <Row icon="mail" label="E-mail">
                <a
                  href={`mailto:${email}`}
                  className="text-paper underline underline-offset-2 hover:text-brand-light"
                >
                  {email}
                </a>
              </Row>
            )}
            {openDays.length > 0 && (
              <Row icon="clock" label="Nyitvatartás">
                <ul className="space-y-0.5">
                  {openingHours.map((day) => (
                    <li key={day.day} className="flex justify-between gap-4">
                      <span>{day.label}</span>
                      <span className={day.opens ? 'text-paper' : 'text-steel'}>
                        {day.opens && day.closes ? `${day.opens} – ${day.closes}` : 'zárva'}
                      </span>
                    </li>
                  ))}
                </ul>
              </Row>
            )}
          </dl>

          {(dropOff || onSite) && (
            <div className="grid gap-3 sm:grid-cols-2">
              {dropOff && (
                <InfoCard title="Behozott munkák">{dropOff}</InfoCard>
              )}
              {onSite && <InfoCard title="Helyszíni kiszállás">{onSite}</InfoCard>}
            </div>
          )}
        </div>

        {/* Térkép */}
        <div className="corner-marks relative min-h-[20rem] overflow-hidden border border-white/12 bg-panel shadow-edge">
          {mapEmbed ? (
            <iframe
              src={mapEmbed}
              title={`${name ?? 'A műhely'} elhelyezkedése a térképen`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[20rem] w-full border-0"
            />
          ) : (
            <div className="flex h-full min-h-[20rem] flex-col items-center justify-center gap-3 bg-brushed p-6 text-center">
              <Icon name="pin" size={28} className="text-steel" />
              <p className="max-w-[30ch] text-sm text-alu">
                A műhely pontos helye a térképen – a Google Maps beágyazás beállítása után jelenik meg.
              </p>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}

function Row({
  icon,
  label,
  children,
}: {
  icon: 'shield' | 'pin' | 'phone' | 'mail' | 'clock'
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
      <dt className="flex items-center gap-2 text-sm text-steel">
        <Icon name={icon} size={16} className="text-brand" />
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-alu">{children}</dd>
    </div>
  )
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-white/12 bg-panel/50 p-5 shadow-edge">
      <h3 className="font-display text-label font-semibold uppercase text-brand-light">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-alu">{children}</p>
    </div>
  )
}
