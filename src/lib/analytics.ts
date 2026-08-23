/**
 * MÉRÉSI RENDSZER
 * ---------------
 * Minden fontos interakció egyetlen `track()` hívásba fut be. Az események
 * a `window.dataLayer`-be kerülnek (GTM ezt olvassa), és ha van betöltött
 * GA4, akkor `gtag('event', ...)` hívásként is elmennek.
 *
 * FONTOS: hozzájárulás előtt semmilyen külső kérés nem indul – a dataLayer
 * pusholás helyi művelet, a mérőkódok betöltéséről a src/lib/consent.ts dönt.
 *
 * Az események teljes listája és paraméterezése a README.md-ben található.
 */
import { scrollDepth } from './utils'
import type { ProblemId, SegmentId } from '@/content/types'

export type AnalyticsEvent =
  | 'segment_select'
  | 'cta_click'
  | 'phone_click'
  | 'whatsapp_click'
  | 'viber_click'
  | 'gallery_case_open'
  | 'price_section_view'
  | 'form_start'
  | 'photo_upload'
  | 'lead_submit'
  | 'form_error'

export interface EventParams {
  /** Kiválasztott fő szegmens. */
  segment?: SegmentId
  /** Kiválasztott problématípus (a problémaválasztó kártya azonosítója). */
  problem?: ProblemId | null
  /** A CTA helye az oldalon, pl. `hero`, `sticky_mobile`, `header`. */
  location?: string
  /** Kapcsolattartási mód, pl. `phone`, `whatsapp`, `viber`, `form`. */
  contactMethod?: 'phone' | 'whatsapp' | 'viber' | 'form'
  /** Bármilyen további, eseményspecifikus adat. */
  [key: string]: unknown
}

/** Az aktuális szegmenskontextus, hogy minden esemény tartalmazza. */
let context: { segment: SegmentId | null; problem: ProblemId | null } = {
  segment: null,
  problem: null,
}

export function setAnalyticsContext(segment: SegmentId | null, problem: ProblemId | null): void {
  context = { segment, problem }
}

/** Esemény küldése. Kliensoldalon mindig biztonságos meghívni. */
export function track(event: AnalyticsEvent, params: EventParams = {}): void {
  if (typeof window === 'undefined') return

  const payload = {
    event,
    segment: params.segment ?? context.segment ?? undefined,
    problem: params.problem ?? context.problem ?? undefined,
    page_position: params.page_position ?? scrollDepth(),
    ...params,
  }

  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(payload)

  // GA4 közvetlen esemény, ha be van töltve (csak hozzájárulás után lehet).
  const { event: _event, ...ga4Params } = payload
  window.gtag?.('event', event, ga4Params)

  if (import.meta.env.DEV) {
    // Fejlesztői visszajelzés – production buildben nem fut le.
    console.info('[analytics]', event, ga4Params)
  }
}
