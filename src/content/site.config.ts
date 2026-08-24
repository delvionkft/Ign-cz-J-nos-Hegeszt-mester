/**
 * KÖZPONTI VÁLLALKOZÁSI KONFIGURÁCIÓ
 * ----------------------------------
 * Ez a fájl tartalmazza az összes cégadatot, elérhetőséget és tényadatot.
 * A `todo(...)` jelöléssel ellátott mezőket a vállalkozás valós adataival
 * KELL kitölteni – ezek nélkül az oldal nem tekinthető élesíthetőnek.
 *
 * A `.env` fájlban megadott értékek (VITE_*) felülírják az itt megadottakat,
 * így az érzékeny vagy környezetfüggő adatok a repóból kihagyhatók.
 *
 * Teljes lista és magyarázat: CONTENT_CHECKLIST.md
 */
import { todo } from './fillable'
import type {
  Business,
  Contact,
  Facts,
  FormConfig,
  LegalLink,
  OpeningHour,
  ServiceArea,
  Tracking,
  TrustMetric,
} from './types'

// Node alatt (pl. `npm run check:content`) az import.meta.env nem létezik.
const env: ImportMetaEnv = import.meta.env ?? ({} as ImportMetaEnv)

/** Env érték, ha van és nem üres; különben a fallback. */
function fromEnv(value: string | undefined, fallback: string): string {
  return value && value.trim() !== '' ? value.trim() : fallback
}

// ---------------------------------------------------------------------------
// 1. VÁLLALKOZÁS
// ---------------------------------------------------------------------------
export const business: Business = {
  // A logóban szereplő márkanév. Ha a nyilvántartás szerinti hivatalos név
  // ettől eltér (pl. jogi forma is szerepel benne), írd át erre a pontosra.
  name: 'HRJ Profitech',
  shortName: 'HRJ Profitech',
  tagline: todo(
    'Egy mondatos, tényszerű leírás. Pl.: „Alumínium- és rozsdamentes hegesztés, öntvényjavítás és egyedi gyártás.”',
  ),
  logoSrc: '/images/logo.webp',
  siteUrl: fromEnv(env.VITE_SITE_URL, todo('Az oldal éles URL-je, pl. https://pelda.hu')),
  taxId: todo('Adószám vagy nyilvántartási szám (impresszumhoz)'),
  legalForm: todo('Jogi forma, pl. egyéni vállalkozó'),
}

// ---------------------------------------------------------------------------
// 2. ELÉRHETŐSÉG
// ---------------------------------------------------------------------------
export const contact: Contact = {
  phoneDisplay: fromEnv(env.VITE_PHONE_DISPLAY, '+36 30 540 2954'),
  phoneHref: fromEnv(env.VITE_PHONE_HREF, '+36305402954'),
  // WhatsApp és Viber nincs megerősítve – amíg todo, a gombok nem jelennek meg.
  whatsapp: fromEnv(env.VITE_WHATSAPP_NUMBER, todo('WhatsApp szám + és szóköz nélkül, pl. 36301234567')),
  viber: fromEnv(env.VITE_VIBER_NUMBER, todo('Viber szám + jellel, pl. +36301234567')),
  email: fromEnv(env.VITE_EMAIL, 'hetesi.balazs@gmail.com'),
  messagePrefill:
    'Jó napot! Alumínium/rozsdamentes hegesztéssel kapcsolatban írok, küldök fotót a munkadarabról.',
}

// ---------------------------------------------------------------------------
// 3. TELEPHELY ÉS VONZÁSKÖRZET
// ---------------------------------------------------------------------------
export const serviceArea: ServiceArea = {
  address: todo('Telephely teljes címe (utca, házszám)'),
  city: todo('Település'),
  postalCode: todo('Irányítószám'),
  country: 'HU',
  description: todo(
    'A vonzáskörzet természetes nyelvű leírása. Pl.: „A műhely [település]en működik, a környező kistérségből ' +
      'napi szinten érkeznek munkák. Nagyobb szerkezeteknél [X] km-es körzetben helyszíni felmérést is vállalok.” ' +
      'NE településnév-felsorolás legyen.',
  ),
  short: todo('Rövid vonzáskörzet a hero alcímébe, pl. „[Település] és környéke”'),
  mapEmbedUrl: todo(
    'Google Maps beágyazási URL. Google Maps → Megosztás → Térkép beágyazása → az iframe src értéke.',
  ),
  mapLinkUrl: todo('Google Maps útvonaltervező link a telephelyhez'),
  latitude: null, // KITÖLTENDŐ: földrajzi szélesség, pl. 47.4979
  longitude: null, // KITÖLTENDŐ: földrajzi hosszúság, pl. 19.0402
  dropOff: todo(
    'Műhelybe behozott munkák feltételei. Pl.: „A munkadarab előzetes egyeztetés után behozható, ' +
      'a szétszerelt, tiszta alkatrész gyorsítja a javítást.”',
  ),
  onSite: todo(
    'Helyszíni kiszállás feltételei. Pl.: „Helyszíni munkát [X] km-es körzetben vállalok, ' +
      'kiszállási díj [összeg], amit elvállalt munka esetén jóváírok.” Ha nincs kiszállás, azt írd ide.',
  ),
}

// ---------------------------------------------------------------------------
// 4. NYITVATARTÁS
// ---------------------------------------------------------------------------
// KITÖLTENDŐ: a valós nyitvatartás. `null` érték = aznap zárva.
export const openingHours: OpeningHour[] = [
  { day: 'Mo', label: 'Hétfő', opens: '', closes: '' },
  { day: 'Tu', label: 'Kedd', opens: '', closes: '' },
  { day: 'We', label: 'Szerda', opens: '', closes: '' },
  { day: 'Th', label: 'Csütörtök', opens: '', closes: '' },
  { day: 'Fr', label: 'Péntek', opens: '', closes: '' },
  { day: 'Sa', label: 'Szombat', opens: null, closes: null },
  { day: 'Su', label: 'Vasárnap', opens: null, closes: null },
]

// ---------------------------------------------------------------------------
// 5. TÉNYADATOK
// ---------------------------------------------------------------------------
// Ezekre a szövegek `{token}` formában hivatkoznak, így egy helyen módosíthatók.
// Csak akkor töltsd ki, ha a vállalkozás tényleges kapacitása ezt lehetővé teszi.
export const facts: Facts = {
  responseTime: todo('Ajánlati válaszidő, pl. „2 óra”'),
  leadTime: todo('Jellemző átfutási idő, pl. „24–72 óra”'),
  warrantyPeriod: todo('A varratra vállalt garancia időtartama, pl. „6 hónap”'),
  weeklyCapacity: todo('Heti szabad kapacitás, pl. „20 munkaóra” (B2B GYIK-hez)'),
  certifications: todo('Hegesztői minősítés(ek) pontos megnevezése, pl. „MSZ EN ISO 9606-2 141 / 131”'),
  experienceYears: todo('Szakmában eltöltött évek száma, pl. „12”'),
}

// ---------------------------------------------------------------------------
// 6. BIZALMI SÁV
// ---------------------------------------------------------------------------
// Csak konkrét, bizonyítható elem kerülhet ide. Üres `value` esetén az elem
// production buildben nem jelenik meg (nem lesz üres doboz az oldalon).
export const trustMetrics: TrustMetric[] = [
  {
    // Konkrét, megerősített szolgáltatás – ezért nem todo(), ellentétben
    // a lenti, még bizonyítékra váró számadatokkal.
    id: 'sos',
    value: 'SOS',
    label: 'azonnali javítás igény szerint',
    proof: 'Hívj, és megbeszéljük, mikor tudlak fogadni',
    accent: true,
  },
  {
    id: 'experience',
    value: todo('Tapasztalat években, pl. „12+”'),
    label: 'év hegesztési tapasztalat',
    proof: 'Alumínium, öntvény és rozsdamentes munkák',
  },
  {
    id: 'jobs',
    value: todo('Elvégzett javítások száma, pl. „800+”'),
    label: 'elvégzett javítás',
    proof: 'Javítás és egyedi gyártás összesen',
  },
  {
    id: 'certification',
    value: todo('Hegesztői minősítés rövid jelölése, pl. „ISO 9606-2”'),
    label: 'hegesztői minősítés',
    proof: 'A minősítés másolata a műhelyben megtekinthető',
  },
  {
    id: 'warranty',
    value: todo('A varratra vállalt garancia, pl. „6 hónap”'),
    label: 'írott garancia a varratra',
    proof: 'A garancia feltételei a munkalapon szerepelnek',
  },
  {
    id: 'leadtime',
    value: todo('Jellemző átfutás, pl. „24–72 óra”'),
    label: 'jellemző átfutási idő',
    proof: 'A munka bonyolultságától függően',
  },
]

// ---------------------------------------------------------------------------
// 7. JOGI LINKEK
// ---------------------------------------------------------------------------
export const legalLinks: LegalLink[] = [
  { id: 'privacy', label: 'Adatkezelési tájékoztató', href: todo('Adatkezelési tájékoztató URL-je') },
  { id: 'imprint', label: 'Impresszum', href: todo('Impresszum URL-je') },
]

// ---------------------------------------------------------------------------
// 8. MÉRÉS
// ---------------------------------------------------------------------------
// Üresen hagyva semmilyen mérőkód nem töltődik be. A kódok kizárólag
// marketing hozzájárulás után kerülnek betöltésre (lásd src/lib/consent.ts).
export const tracking: Tracking = {
  ga4Id: fromEnv(env.VITE_GA4_ID, ''),
  gtmId: fromEnv(env.VITE_GTM_ID, ''),
  metaPixelId: fromEnv(env.VITE_META_PIXEL_ID, ''),
  consentVersion: '1',
}

// ---------------------------------------------------------------------------
// 9. ŰRLAP VÉGPONT
// ---------------------------------------------------------------------------
export const formEndpoint: FormConfig = {
  endpoint: fromEnv(env.VITE_FORM_ENDPOINT, ''),
  mode: (env.VITE_FORM_MODE as FormConfig['mode']) ?? 'multipart',
  maxPhotos: 5,
  maxFileSizeMb: 10,
  acceptedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'],
  acceptAttribute: 'image/jpeg,image/png,image/webp,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.heic,.heif',
}
