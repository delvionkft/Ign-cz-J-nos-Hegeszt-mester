/**
 * SEO ÉS STRUKTURÁLT ADATOK
 * -------------------------
 * A title, meta description, canonical, Open Graph és a LocalBusiness
 * strukturált adat a központi konfigurációból épül fel.
 *
 * FONTOS: érvénytelen vagy helykitöltő strukturált adat nem kerül ki –
 * ha a kötelező mezők (név, cím, telefon) hiányoznak, a JSON-LD blokk
 * egyszerűen nem jön létre.
 */
import { business, contact, openingHours, serviceArea } from '@/content/site.config'
import { technologies } from '@/content/technology'
import { resolve } from '@/content/fillable'
import { interpolate } from './text'
import type { Faq } from '@/content/types'

const FALLBACK_TITLE =
  'Alumínium- és rozsdamentes hegesztés – öntvényjavítás és egyedi gyártás'

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    document.head.appendChild(el)
  }
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

/** Title, meta description, canonical és Open Graph beállítása. */
export function applySeo(): void {
  const name = resolve(business.name) ?? resolve(business.shortName)
  const area = resolve(serviceArea.short)

  const titleParts = [
    'Alumínium- és rozsdamentes hegesztés',
    area ? `${area} – öntvényjavítás és egyedi gyártás` : 'öntvényjavítás és egyedi gyártás',
    name,
  ].filter(Boolean)

  const title = titleParts.length > 1 ? titleParts.join(' | ') : FALLBACK_TITLE

  const description = interpolate(
    'Alumínium, öntvény és rozsdamentes alkatrészek javítása és egyedi gyártása. ' +
      'Amit máshol cserére ítéltek, azt sok esetben meg lehet javítani. Küldj fotót, és előzetes árat kapsz.',
  )

  document.title = title
  upsertMeta('meta[name="description"]', { name: 'description', content: description })

  const url = resolve(business.siteUrl)
  if (url) upsertLink('canonical', url)

  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
  upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'hu_HU' })
  if (url) upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url })
  if (name) upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: name })

  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
}

/** JSON-LD blokk beillesztése vagy frissítése. */
function upsertJsonLd(id: string, data: unknown | null) {
  const existing = document.getElementById(id)
  if (!data) {
    existing?.remove()
    return
  }
  const script = existing instanceof HTMLScriptElement ? existing : document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.textContent = JSON.stringify(data)
  if (!existing) document.head.appendChild(script)
}

/** LocalBusiness strukturált adat – csak érvényes, kitöltött adatokból. */
export function buildLocalBusiness(): Record<string, unknown> | null {
  const name = resolve(business.name)
  const phone = resolve(contact.phoneHref)
  const street = resolve(serviceArea.address)
  const city = resolve(serviceArea.city)

  // Kötelező minimum: név, telefon, cím. Ezek nélkül nem adunk ki JSON-LD-t.
  if (!name || !phone || !street || !city) return null

  const hours = openingHours
    .filter((day) => day.opens && day.closes)
    .map((day) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${
        { Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday', Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday' }[
          day.day
        ]
      }`,
      opens: day.opens,
      closes: day.closes,
    }))

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    description: resolve(business.tagline) ?? undefined,
    telephone: phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: street,
      addressLocality: city,
      postalCode: resolve(serviceArea.postalCode) ?? undefined,
      addressCountry: serviceArea.country,
    },
    makesOffer: technologies.map((tech) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: tech.title, description: tech.description },
    })),
  }

  const email = resolve(contact.email)
  if (email) data.email = email

  const url = resolve(business.siteUrl)
  if (url) data.url = url

  const logo = resolve(business.logoSrc)
  if (logo && url) data.image = new URL(logo, url).toString()

  if (serviceArea.latitude !== null && serviceArea.longitude !== null) {
    data.geo = {
      '@type': 'GeoCoordinates',
      latitude: serviceArea.latitude,
      longitude: serviceArea.longitude,
    }
  }

  const areaServed = resolve(serviceArea.description)
  if (areaServed) data.areaServed = { '@type': 'Place', name: resolve(serviceArea.short) ?? city }

  if (hours.length > 0) data.openingHoursSpecification = hours

  return data
}

/**
 * FAQPage strukturált adat – KIZÁRÓLAG a ténylegesen látható kérdésekből.
 * A megjelenített válaszszöveget kapja, hogy ne térhessen el a látható tartalomtól.
 */
export function buildFaqSchema(visible: Array<Pick<Faq, 'question'> & { answer: string }>) {
  if (visible.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: visible.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function applyLocalBusinessSchema(): void {
  upsertJsonLd('ld-localbusiness', buildLocalBusiness())
}

export function applyFaqSchema(visible: Array<Pick<Faq, 'question'> & { answer: string }>): void {
  upsertJsonLd('ld-faq', buildFaqSchema(visible))
}
