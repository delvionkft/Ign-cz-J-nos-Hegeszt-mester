/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_FORM_ENDPOINT?: string
  readonly VITE_FORM_MODE?: 'multipart' | 'json'
  readonly VITE_GA4_ID?: string
  readonly VITE_GTM_ID?: string
  readonly VITE_META_PIXEL_ID?: string
  readonly VITE_PHONE_DISPLAY?: string
  readonly VITE_PHONE_HREF?: string
  readonly VITE_PHONE_DISPLAY_SECONDARY?: string
  readonly VITE_PHONE_HREF_SECONDARY?: string
  readonly VITE_WHATSAPP_NUMBER?: string
  readonly VITE_VIBER_NUMBER?: string
  readonly VITE_EMAIL?: string
  readonly VITE_EMAIL_SECONDARY?: string
  readonly VITE_REQUIRE_COMPLETE_CONTENT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
  fbq?: (...args: unknown[]) => void
}
