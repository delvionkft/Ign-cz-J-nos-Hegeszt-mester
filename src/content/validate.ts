/**
 * TARTALMI ELLENŐRZŐ
 * ------------------
 * Végigjárja a tartalmi konfigurációt, és kigyűjti a még kitöltetlen,
 * kötelező mezőket.
 *
 * Használat:
 *  - fejlesztői módban: jobb alsó „Tartalmi teendők” panel az oldalon,
 *  - parancssorból: `npm run check:content` (hibakóddal áll le, ha maradt teendő).
 */
import { content } from './index'
import { isTodo, todoHint } from './fillable'

export interface MissingItem {
  /** Hol található az adat, pl. `business.name`. */
  path: string
  /** Mit kell ide írni. */
  hint: string
}

/** A tartalom bejárása és a kitöltetlen mezők összegyűjtése. */
export function collectMissing(root: unknown = content, prefix = ''): MissingItem[] {
  const found: MissingItem[] = []

  const walk = (node: unknown, path: string) => {
    if (typeof node === 'string') {
      if (isTodo(node)) found.push({ path, hint: todoHint(node) })
      return
    }
    if (Array.isArray(node)) {
      node.forEach((item, index) => {
        const id =
          item && typeof item === 'object' && 'id' in (item as Record<string, unknown>)
            ? String((item as Record<string, unknown>).id)
            : String(index)
        walk(item, `${path}[${id}]`)
      })
      return
    }
    if (node && typeof node === 'object') {
      for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
        // A nyitvatartást a strukturális ellenőrzés kezeli, itt ne duplázzuk.
        if (key === 'openingHours') continue
        walk(value, path ? `${path}.${key}` : key)
      }
    }
  }

  walk(root, prefix)
  return found
}

/** Külön ellenőrzött, nem string típusú kötelező mezők. */
export function collectStructuralIssues(): MissingItem[] {
  const issues: MissingItem[] = []

  if (content.serviceArea.latitude === null || content.serviceArea.longitude === null) {
    issues.push({
      path: 'serviceArea.latitude / longitude',
      hint: 'Földrajzi koordináták a LocalBusiness strukturált adathoz (Google Maps → jobb klikk a pontra)',
    })
  }

  const hasHours = content.openingHours.some((h) => h.opens && h.closes)
  if (!hasHours) {
    issues.push({
      path: 'openingHours',
      hint: 'Legalább egy nyitvatartási nap kitöltése (opens / closes, „08:00” formátumban)',
    })
  }

  if (!content.formEndpoint.endpoint) {
    issues.push({
      path: 'formEndpoint.endpoint (VITE_FORM_ENDPOINT)',
      hint: 'Az ajánlatkérő űrlap backend vagy CRM végpontja. Enélkül élesben az űrlap nem küld.',
    })
  }

  if (!content.tracking.ga4Id && !content.tracking.gtmId) {
    issues.push({
      path: 'tracking.ga4Id / tracking.gtmId (VITE_GA4_ID / VITE_GTM_ID)',
      hint: 'GA4 mérési azonosító vagy GTM konténer azonosító. Enélkül nincs marketingmérés.',
    })
  }

  const casesWithPhotos = content.galleryCases.filter(
    (c) => !isTodo(c.images.before) && !isTodo(c.images.after),
  )
  if (casesWithPhotos.length < 12) {
    issues.push({
      path: 'galleryCases',
      hint: `Legalább 12 valós előtte-utána munka szükséges. Jelenleg fotóval: ${casesWithPhotos.length}.`,
    })
  }

  for (const segment of ['urgent', 'custom'] as const) {
    const filled = content.priceRanges.filter((row) => row.segment === segment && !isTodo(row.price))
    if (filled.length < 6) {
      issues.push({
        path: `priceRanges (${segment})`,
        hint: `Legalább hat tipikus munka valós ársávja szükséges. Jelenleg kitöltve: ${filled.length}.`,
      })
    }
  }

  return issues
}

/** Minden hiányzó tartalom, csoportosításra kész formában. */
export function auditContent(): MissingItem[] {
  return [...collectStructuralIssues(), ...collectMissing()]
}
