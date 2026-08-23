/**
 * ŰRLAP ADAPTER
 * -------------
 * Egyetlen bekötési pont az ajánlatkérő űrlap és a backend / CRM között.
 * A komponens nem tud a végpontról – csak ezt a függvényt hívja.
 *
 * BEKÖTÉS:
 *  1. Állítsd be a `VITE_FORM_ENDPOINT` értékét a `.env` fájlban.
 *  2. Ha a rendszered nem `multipart/form-data`-t vár, állítsd `VITE_FORM_MODE=json`-ra
 *     (ilyenkor a fájlok NEM kerülnek elküldésre, csak a mezők).
 *  3. Ha egyedi formátum kell (pl. saját CRM), a `submitLead` függvény
 *     `buildMultipart` / `buildJson` részét írd át – más helyen nem kell módosítani.
 *
 * Elvárt válasz: 2xx HTTP státusz. A válasz törzse nem kötelező.
 *
 * FONTOS: ha nincs beállítva végpont, production buildben az űrlap
 * SOHA nem mutat sikeres beküldést – helyette a közvetlen elérhetőségekre irányít.
 */
import { formEndpoint } from '@/content/site.config'
import type { ProblemId, SegmentId } from '@/content/types'

export interface LeadPayload {
  segment: SegmentId
  problem: ProblemId | null
  problemLabel: string
  name: string
  phone: string
  /** Csak B2B esetén. */
  company?: string
  /** Rövid leírás / milyen munkákhoz keres partnert. */
  message: string
  consent: boolean
  photos: File[]
  /** Honnan érkezett a látogató (URL query paraméterek). */
  source: Record<string, string>
  /** Az oldal URL-je a beküldés pillanatában. */
  pageUrl: string
}

export type SubmitResult =
  | { status: 'success'; mocked: boolean }
  | { status: 'error'; message: string }
  | { status: 'unconfigured'; message: string }

function buildMultipart(payload: LeadPayload): FormData {
  const data = new FormData()
  data.append('segment', payload.segment)
  data.append('problem', payload.problem ?? '')
  data.append('problem_label', payload.problemLabel)
  data.append('name', payload.name)
  data.append('phone', payload.phone)
  if (payload.company) data.append('company', payload.company)
  data.append('message', payload.message)
  data.append('consent', String(payload.consent))
  data.append('page_url', payload.pageUrl)
  data.append('source', JSON.stringify(payload.source))
  payload.photos.forEach((file, index) => {
    data.append(`photo_${index + 1}`, file, file.name)
  })
  data.append('photo_count', String(payload.photos.length))
  return data
}

function buildJson(payload: LeadPayload): string {
  return JSON.stringify({
    segment: payload.segment,
    problem: payload.problem,
    problem_label: payload.problemLabel,
    name: payload.name,
    phone: payload.phone,
    company: payload.company ?? null,
    message: payload.message,
    consent: payload.consent,
    page_url: payload.pageUrl,
    source: payload.source,
    photo_count: payload.photos.length,
    photo_names: payload.photos.map((file) => file.name),
  })
}

export function isEndpointConfigured(): boolean {
  return formEndpoint.endpoint.trim().length > 0
}

export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  if (!isEndpointConfigured()) {
    if (import.meta.env.DEV) {
      // Fejlesztői mock: NEM megy ki hálózati kérés, a válasz jelölten szimulált.
      console.info('[form] MOCK beküldés (nincs VITE_FORM_ENDPOINT):', payload)
      await new Promise((resolve) => setTimeout(resolve, 600))
      return { status: 'success', mocked: true }
    }
    return {
      status: 'unconfigured',
      message:
        'Az űrlap küldése jelenleg nincs beállítva. Kérlek, küldd el a fotókat közvetlenül telefonon, WhatsAppon vagy Viberen.',
    }
  }

  try {
    const useMultipart = formEndpoint.mode === 'multipart'
    const response = await fetch(formEndpoint.endpoint, {
      method: 'POST',
      // multipart esetén a böngésző állítja be a boundary-t, ezért nincs Content-Type
      headers: useMultipart ? { Accept: 'application/json' } : { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: useMultipart ? buildMultipart(payload) : buildJson(payload),
    })

    if (!response.ok) {
      return {
        status: 'error',
        message: `A küldés nem sikerült (hibakód: ${response.status}). Kérlek, próbáld újra, vagy hívj telefonon.`,
      }
    }

    return { status: 'success', mocked: false }
  } catch {
    return {
      status: 'error',
      message: 'A küldés nem sikerült – ellenőrizd az internetkapcsolatot, vagy hívj telefonon.',
    }
  }
}
