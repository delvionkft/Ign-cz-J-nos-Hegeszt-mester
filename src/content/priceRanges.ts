/**
 * ÁR-HORGONY
 * ----------
 * Szegmensenként legalább hat tipikus munka. KIZÁRÓLAG valós, ellenőrzött
 * ársávok kerülhetnek ide. Egyetlen fix „mindenre érvényes” ár nem használható.
 *
 * Kitöltési minta:
 *   replacement: '180 000 – 260 000 Ft',
 *   price: '38 000 – 75 000 Ft',
 *   leadTime: '1–2 munkanap',
 */
import { todo } from './fillable'
import type { CooperationModel, PriceRow } from './types'

function priceSlot(id: string, segment: PriceRow['segment'], job: string, note?: string): PriceRow {
  return {
    id,
    segment,
    job,
    replacement: todo(`„${job}” – új alkatrész / csere becsült ára`),
    price: todo(`„${job}” – javítás vagy gyártás ára -tól/-ig`),
    leadTime: todo(`„${job}” – várható átfutás`),
    note,
  }
}

export const priceRanges: PriceRow[] = [
  // --- Sürgős javítás ------------------------------------------------------
  priceSlot('u-1', 'urgent', 'Letört fül / szem visszahegesztése öntvényen'),
  priceSlot('u-2', 'urgent', 'Repedt öntvényház javítása előmelegítéssel'),
  priceSlot('u-3', 'urgent', 'Alumínium felni pereme vagy küllője'),
  priceSlot('u-4', 'urgent', 'Klímacső vagy vékonyfalú alumínium cső'),
  priceSlot('u-5', 'urgent', 'Intercooler / hűtő csonk szivárgás'),
  priceSlot('u-6', 'urgent', 'Kipufogórendszer javítása'),
  priceSlot('u-7', 'urgent', 'Kerékpárváz repedés javítása'),
  priceSlot('u-8', 'urgent', 'Olajteknő vagy alsó burkolat javítása'),

  // --- Egyedi gyártás ------------------------------------------------------
  priceSlot('c-1', 'custom', 'Egyedi alumínium létra (méretre)'),
  priceSlot('c-2', 'custom', 'Alumínium felhajtó rámpa'),
  priceSlot('c-3', 'custom', 'Alumínium szállítóbox (pl. kutyaszállító)'),
  priceSlot('c-4', 'custom', 'Rozsdamentes medencelétra / kapaszkodó'),
  priceSlot('c-5', 'custom', 'Rozsdamentes gasztro munkaasztal'),
  priceSlot('c-6', 'custom', 'Rozsdamentes elszívóernyő'),
  priceSlot('c-7', 'custom', 'Stég- vagy csónakelem (fartükör, tartó)'),
  priceSlot('c-8', 'custom', 'Egyedi tartó- vagy vázszerkezet, folyóméterre'),
]

/**
 * B2B EGYÜTTMŰKÖDÉSI MODELLEK
 * Partnereknél ártáblázat helyett ez jelenik meg.
 */
export const cooperationModels: CooperationModel[] = [
  {
    id: 'eseti',
    title: 'Eseti alvállalkozói munka',
    description:
      'Egy-egy konkrét munkadarab átadása, amikor házon belül nincs hozzá alumínium- vagy rozsdamentes kapacitás.',
    points: [
      'Munkánkénti árazás, fotó vagy a darab alapján',
      'Nincs keretvállalás, nincs minimum mennyiség',
      'A végfelhasználóval te maradsz kapcsolatban',
    ],
  },
  {
    id: 'visszatero',
    title: 'Visszatérő partneri együttműködés',
    description:
      'Rendszeres munkaátadás előre egyeztetett feltételekkel, kiszámítható átfutással.',
    points: [
      'Partneri ársáv rendszeres megrendelés esetén',
      'Előre egyeztetett átvételi és átadási rend',
      'Havi összesített számlázás igény szerint',
    ],
  },
  {
    id: 'sorozat',
    title: 'Sorozatjellegű megrendelés',
    description:
      'Azonos vagy hasonló elemek ismétlődő gyártása, ahol a darabszám és a sablonozás csökkenti az egységárat.',
    points: [
      'Mintadarab és jóváhagyás után indul a sorozat',
      'Darabszámtól függő egységár',
      'Ütemezett részszállítás egyeztetés szerint',
    ],
  },
  {
    id: 'keretszerzodes',
    title: 'Egyedi keretszerződés',
    description:
      'Írásos keret a vállalási feltételekről: átfutás, sürgősségi sáv, elszámolás, felelősség.',
    points: [
      'Rögzített vállalási és átfutási feltételek',
      'Sürgősségi sáv külön díjazással',
      'Fizetési és garanciális feltételek írásban',
    ],
  },
]
