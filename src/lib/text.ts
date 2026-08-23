/**
 * Szöveges tokenek feloldása.
 *
 * A tartalmi fájlokban `{leadTime}` formában lehet tényadatra hivatkozni.
 * Ha az adott tényadat még nincs kitöltve a site.config.ts-ben, akkor az azt
 * tartalmazó MONDAT kimarad a megjelenített szövegből – így soha nem kerül ki
 * féllábas vagy kitalált állítás az oldalra.
 */
import { contact, facts, serviceArea, business } from '@/content/site.config'
import { resolve } from '@/content/fillable'

export type TokenMap = Record<string, string | null>

/** Az alapértelmezett, mindenhol elérhető tokenek. */
export function baseTokens(): TokenMap {
  return {
    businessName: resolve(business.name),
    shortName: resolve(business.shortName),
    phone: resolve(contact.phoneDisplay),
    email: resolve(contact.email),
    serviceArea: resolve(serviceArea.short),
    city: resolve(serviceArea.city),
    responseTime: resolve(facts.responseTime),
    leadTime: resolve(facts.leadTime),
    warrantyPeriod: resolve(facts.warrantyPeriod),
    weeklyCapacity: resolve(facts.weeklyCapacity),
    certifications: resolve(facts.certifications),
    experienceYears: resolve(facts.experienceYears),
  }
}

const TOKEN_RE = /\{([a-zA-Z0-9_]+)\}/g

/** Igaz, ha a szövegben minden token feloldható. */
export function tokensResolvable(text: string, tokens: TokenMap = baseTokens()): boolean {
  const matches = text.match(TOKEN_RE)
  if (!matches) return true
  return matches.every((raw) => {
    const key = raw.slice(1, -1)
    return Boolean(tokens[key])
  })
}

/**
 * Tokenek feloldása. A feloldhatatlan tokent tartalmazó mondatok kimaradnak.
 * Ha egyetlen mondat sem marad, üres stringet ad vissza.
 */
export function interpolate(text: string, tokens: TokenMap = baseTokens()): string {
  if (!text) return ''
  if (!text.includes('{')) return text

  // Mondatokra bontás úgy, hogy a záró írásjel a mondattal maradjon.
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) ?? [text]

  const kept = sentences.filter((sentence) => tokensResolvable(sentence, tokens))
  const joined = kept.join('')

  return joined.replace(TOKEN_RE, (raw, key: string) => tokens[key] ?? raw).trim()
}

/** Több szövegrész feloldása, az üresre redukálódottak eldobásával. */
export function interpolateList(items: string[], tokens: TokenMap = baseTokens()): string[] {
  return items.map((item) => interpolate(item, tokens)).filter((item) => item.length > 0)
}
