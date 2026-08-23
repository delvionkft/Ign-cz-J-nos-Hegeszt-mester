/**
 * HOZZÁJÁRULÁS-ALAPÚ MÉRÉS
 * ------------------------
 * Marketingcélú követőkód (GA4, GTM, Meta Pixel) KIZÁRÓLAG kifejezett
 * hozzájárulás után töltődik be. Hozzájárulás előtt semmilyen külső
 * kérés nem indul – az események addig csak a helyi `dataLayer`-be kerülnek.
 */
import { tracking } from '@/content/site.config'

export type ConsentState = 'granted' | 'denied' | 'unknown'

export interface ConsentValue {
  marketing: ConsentState
  version: string
}

const STORAGE_KEY = 'consent'

type Listener = (value: ConsentValue) => void
const listeners = new Set<Listener>()

let current: ConsentValue = { marketing: 'unknown', version: tracking.consentVersion }
let scriptsLoaded = false

function safeRead(): ConsentValue | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentValue
    if (parsed.version !== tracking.consentVersion) return null
    return parsed
  } catch {
    return null
  }
}

function safeWrite(value: ConsentValue) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {
    // Privát böngészés vagy letiltott tárolás: a hozzájárulás a munkamenetre él.
  }
}

/** Google Consent Mode v2 – alapértelmezés: minden megtagadva. */
function pushConsentDefaults() {
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({
    event: 'consent_default',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  })
}

function pushConsentUpdate(state: ConsentState) {
  const value = state === 'granted' ? 'granted' : 'denied'
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({
    event: 'consent_update',
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  })
  window.gtag?.('consent', 'update', {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  })
}

function injectScript(src: string, async = true) {
  const script = document.createElement('script')
  script.src = src
  script.async = async
  document.head.appendChild(script)
  return script
}

/** A mérőkódok betöltése – csak hozzájárulás után hívódik meg. */
function loadTrackingScripts() {
  if (scriptsLoaded) return
  scriptsLoaded = true

  window.dataLayer = window.dataLayer ?? []

  if (tracking.gtmId) {
    injectScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(tracking.gtmId)}`)
    window.dataLayer.push({ event: 'gtm.js', 'gtm.start': Date.now() })
  }

  if (tracking.ga4Id) {
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tracking.ga4Id)}`)
    window.gtag =
      window.gtag ??
      function gtag(...args: unknown[]) {
        window.dataLayer?.push(args)
      }
    window.gtag('js', new Date())
    window.gtag('config', tracking.ga4Id, { send_page_view: true })
  }

  if (tracking.metaPixelId) {
    // Meta Pixel minimál betöltő – csak hozzájárulás után fut le.
    const fbq: ((...args: unknown[]) => void) & { queue?: unknown[] } = (...args: unknown[]) => {
      fbq.queue = fbq.queue ?? []
      fbq.queue.push(args)
    }
    window.fbq = window.fbq ?? fbq
    injectScript('https://connect.facebook.net/en_US/fbevents.js')
    window.fbq('init', tracking.metaPixelId)
    window.fbq('track', 'PageView')
  }
}

/** Inicializálás az alkalmazás indulásakor. */
export function initConsent(): ConsentValue {
  pushConsentDefaults()
  const stored = safeRead()
  if (stored) {
    current = stored
    if (stored.marketing === 'granted') {
      pushConsentUpdate('granted')
      loadTrackingScripts()
    } else {
      pushConsentUpdate('denied')
    }
  }
  return current
}

export function getConsent(): ConsentValue {
  return current
}

/** Hozzájárulás beállítása a látogató döntése alapján. */
export function setConsent(marketing: ConsentState): void {
  current = { marketing, version: tracking.consentVersion }
  safeWrite(current)
  pushConsentUpdate(marketing)
  if (marketing === 'granted') loadTrackingScripts()
  listeners.forEach((listener) => listener(current))
}

/** A hozzájárulás visszavonása / újbóli bekérése („Süti beállítások”). */
export function resetConsent(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // nem kritikus
  }
  current = { marketing: 'unknown', version: tracking.consentVersion }
  pushConsentUpdate('denied')
  listeners.forEach((listener) => listener(current))
}

export function onConsentChange(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Van-e egyáltalán beállított mérőazonosító. */
export function hasTrackingConfigured(): boolean {
  return Boolean(tracking.ga4Id || tracking.gtmId || tracking.metaPixelId)
}
