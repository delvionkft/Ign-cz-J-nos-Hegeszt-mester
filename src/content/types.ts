/**
 * A landing oldal teljes tartalmi típusrendszere.
 *
 * Minden szöveg, ár, referencia és elérhetőség a `src/content/` mappából jön.
 * A komponensek kódját NEM kell módosítani tartalomcseréhez.
 */

/** A három fő vevőszegmens. */
export type SegmentId = 'urgent' | 'custom' | 'b2b'

/** A problémaválasztó hat kártyájának azonosítói (URL-ben is ezek szerepelnek). */
export type ProblemId =
  | 'alu-ontveny'
  | 'auto-motor'
  | 'felni-cso-vaz'
  | 'egyedi-alu'
  | 'rozsdamentes-gasztro'
  | 'b2b'

/**
 * Kötelezően kitöltendő tartalom jelölése.
 *
 * A `todo()` segédfüggvénnyel létrehozott érték üres stringként viselkedik,
 * de a tartalmi ellenőrző (`src/content/validate.ts`, `npm run check:content`)
 * felismeri és kigyűjti. Fejlesztői módban láthatóan meg is jelöljük.
 */
export type Fillable = string

// ---------------------------------------------------------------------------

export interface Business {
  /** Vállalkozás pontos, cégjegyzék/nyilvántartás szerinti neve. */
  name: Fillable
  /** Rövid név a fejlécben és a logó mellett. */
  shortName: Fillable
  /** Egy mondatos, tényszerű leírás (meta description alapja is). */
  tagline: Fillable
  /** Logó elérési útja a `public/` mappán belül, pl. `/images/logo.svg`. */
  logoSrc: Fillable
  /** Az oldal éles URL-je, canonical és structured data céljára. */
  siteUrl: Fillable
  /** Adószám / nyilvántartási szám (impresszumhoz). */
  taxId: Fillable
  /** Jogi forma, pl. egyéni vállalkozó / Kft. */
  legalForm: Fillable
}

export interface Contact {
  /** Megjelenített telefonszám, pl. „+36 30 123 4567”. */
  phoneDisplay: Fillable
  /** `tel:` linkhez, nemzetközi formátumban, szóköz nélkül: „+36301234567”. */
  phoneHref: Fillable
  /** Másodlagos, megjelenített telefonszám (opcionális). */
  phoneDisplaySecondary: Fillable
  /** Másodlagos `tel:` szám nemzetközi formátumban, szóköz nélkül. */
  phoneHrefSecondary: Fillable
  /** WhatsApp szám nemzetközi formátumban, `+` és szóköz nélkül: „36301234567”. */
  whatsapp: Fillable
  /** Viber szám nemzetközi formátumban, `+` jellel: „+36301234567”. */
  viber: Fillable
  email: Fillable
  /** Másodlagos e-mail cím (opcionális). */
  emailSecondary: Fillable
  /** Előre kitöltött üzenet a WhatsApp/Viber linkekhez. */
  messagePrefill: string
}

export interface ServiceArea {
  /** Telephely teljes címe. */
  address: Fillable
  city: Fillable
  postalCode: Fillable
  country: string
  /** Természetes nyelvű vonzáskörzet-leírás (NEM településnév-felsorolás). */
  description: Fillable
  /** Rövid változat a hero alcímébe. */
  short: Fillable
  /** Google Maps beágyazás URL-je (Megosztás → Térkép beágyazása → src érték). */
  mapEmbedUrl: Fillable
  /** Google Maps útvonaltervező link. */
  mapLinkUrl: Fillable
  latitude: number | null
  longitude: number | null
  /** Behozható-e a munka a műhelybe, és milyen feltétellel. */
  dropOff: Fillable
  /** Van-e helyszíni kiszállás, milyen körben és feltétellel. */
  onSite: Fillable
}

export interface OpeningHour {
  /** ISO nap rövidítés a structured datához: Mo, Tu, We, Th, Fr, Sa, Su. */
  day: 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su'
  label: string
  /** „08:00” formátumban, vagy `null`, ha zárva. */
  opens: string | null
  closes: string | null
}

export interface TrustMetric {
  id: string
  /** A kiemelt érték, pl. „12+”. Üresen hagyva a metrika nem jelenik meg élesben. */
  value: Fillable
  label: string
  /** Rövid magyarázat, mi támasztja alá. */
  proof?: string
  /** Piros kiemelés semleges fehér helyett – sürgősségi/kivételes elemekhez. */
  accent?: boolean
}

export interface SegmentCopy {
  id: SegmentId
  label: string
  /** Rövid megnevezés az űrlapon és a mérési eseményekben. */
  shortLabel: string
  pain: {
    kicker: string
    headline: string
    body: string
    /** Összehasonlító blokk. Üres ársávok esetén a sor visszafogottan jelenik meg. */
    comparison: {
      replacementLabel: string
      replacementValue: Fillable
      solutionLabel: string
      solutionValue: Fillable
      savingLabel: string
      savingValue: Fillable
      leadTimeLabel: string
      leadTimeValue: Fillable
    }
  }
  gallery: {
    title: string
    subtitle: string
  }
  pricing: {
    title: string
    subtitle: string
    /** B2B esetén ártáblázat helyett együttműködési modellek jelennek meg. */
    mode: 'table' | 'models'
  }
  process: {
    title: string
    subtitle: string
  }
  form: {
    title: string
    subtitle: string
    submitLabel: string
    /** B2B-nél a fotó nem kötelező. */
    photosRequired: boolean
  }
}

export interface ProblemCard {
  id: ProblemId
  segment: SegmentId
  title: string
  description: string
  /** Néhány konkrét példa, amit a látogató felismer. */
  examples: string[]
  icon: 'cast' | 'engine' | 'wheel' | 'frame' | 'steel' | 'handshake'
}

export interface GalleryCase {
  id: string
  segment: SegmentId
  problem: ProblemId
  /** Rövid, felismerhető megnevezés, pl. „Váltóház letört füle”. */
  title: string
  /** Mi volt a hiba vagy a feladat. */
  issue: Fillable
  /** Milyen javítás vagy gyártás történt. */
  solution: Fillable
  /** Mennyi ideig tartott, pl. „1 munkanap”. */
  duration: Fillable
  /** Mennyibe került volna a csere vagy az új termék. */
  replacementCost: Fillable
  /** Mennyibe került a javítás vagy a gyártás. */
  repairCost: Fillable
  /** Anyag megnevezése, pl. „alumínium öntvény”. */
  material: Fillable
  images: {
    before: Fillable
    after: Fillable
    /** Kötelező alt szöveg – kép hiányában is a helykitöltő feliratát adja. */
    beforeAlt: string
    afterAlt: string
  }
}

export interface PriceRow {
  id: string
  segment: SegmentId
  /** Munka vagy alkatrész típusa. */
  job: string
  /** Új alkatrész / csere becsült ára. */
  replacement: Fillable
  /** Javítás vagy gyártás ára -tól/-ig. */
  price: Fillable
  /** Várható átfutás. */
  leadTime: Fillable
  note?: string
}

export interface CooperationModel {
  id: string
  title: string
  description: string
  /** Mit tartalmaz a modell – tényszerű pontok. */
  points: string[]
}

export interface ProcessStep {
  id: string
  title: string
  description: string
  /** Opcionális, tényadatot tartalmazó kiegészítés (config-ból). */
  meta?: Fillable
}

export interface Guarantee {
  title: string
  headline: string
  primaryClaim: Fillable
  secondaryClaim: string
  /** Pontos, ellenőrizhető garanciális feltételek. */
  terms: Fillable[]
  /** Amire a garancia kifejezetten nem terjed ki (teherviselő, biztonságkritikus). */
  exclusions: string[]
  /** Szegmensspecifikus kiegészítés. */
  bySegment: Record<SegmentId, string>
}

export interface Faq {
  id: string
  segment: SegmentId
  question: string
  answer: string
}

export interface TechnologyItem {
  id: string
  title: string
  /** Ügyfélnyelven: mit jelent ez neki. */
  description: string
}

export interface WeldShot {
  id: string
  /** Kép elérési útja a `public/` mappán belül, pl. `/images/weld-macro-1.webp`. */
  src: Fillable
  /** Kötelező, tényszerű alt szöveg – NEM marketingállítás. */
  alt: string
}

export interface WeldShowcase {
  /** Rövid, őszinte felvezetés – a képek a vállalkozó saját munkái. */
  kicker: string
  shots: WeldShot[]
}

export interface LegalLink {
  id: string
  label: string
  href: Fillable
  /** Új lapon nyíljon-e. */
  external?: boolean
}

export interface Tracking {
  /** GA4 mérési azonosító, pl. „G-XXXXXXXXXX”. Üres = nincs betöltve semmi. */
  ga4Id: string
  /** Google Tag Manager konténer, pl. „GTM-XXXXXXX”. */
  gtmId: string
  /** Meta Pixel azonosító. */
  metaPixelId: string
  /** Süti-hozzájárulás verziója – növelve újra bekéri a hozzájárulást. */
  consentVersion: string
}

export interface FormConfig {
  /** Backend / CRM végpont. Üres és production build esetén az űrlap nem küld. */
  endpoint: string
  /** `multipart` (fájlfeltöltéssel) vagy `json` (fájl nélkül, base64 nélkül). */
  mode: 'multipart' | 'json'
  maxPhotos: number
  /** Fájlonkénti maximális méret MB-ban. */
  maxFileSizeMb: number
  acceptedTypes: string[]
  acceptAttribute: string
}

/** A tényadatok, amelyeket a szövegekben `{token}` formában lehet hivatkozni. */
export interface Facts {
  /** Válaszidő ajánlatkérésre, pl. „2 óra”. */
  responseTime: Fillable
  /** Jellemző átfutási idő, pl. „24–72 óra”. */
  leadTime: Fillable
  /** Garancia időtartama a varratra, pl. „6 hónap”. */
  warrantyPeriod: Fillable
  /** Heti szabad kapacitás, pl. „20 munkaóra”. */
  weeklyCapacity: Fillable
  /** Hegesztői minősítés(ek) pontos megnevezése. */
  certifications: Fillable
  /** Tapasztalat években. */
  experienceYears: Fillable
}
