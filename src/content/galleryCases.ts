/**
 * ELŐTTE-UTÁNA REFERENCIAGALÉRIA
 * ------------------------------
 * Ez az oldal legerősebb bizonyítékblokkja. Kizárólag VALÓS, elvégzett munka
 * kerülhet ide. Az alábbi 15 tétel előkészített hely: a szerkezet (kategória,
 * szegmens, megnevezés) készen áll, a tényadatokat és a fotókat kell pótolni.
 *
 * MINDEN TÉTELHEZ SZÜKSÉGES:
 *  - előtte és utána fotó (`images.before`, `images.after`)
 *  - mi volt a hiba vagy a feladat (`issue`)
 *  - milyen javítás/gyártás történt (`solution`)
 *  - mennyi ideig tartott (`duration`)
 *  - mennyibe került volna a csere / új termék (`replacementCost`)
 *  - mennyibe került a javítás/gyártás (`repairCost`)
 *
 * FOTÓZÁSI ÚTMUTATÓ: lásd README.md → „Milyen fotók kellenek”.
 *
 * PÉLDA a kitöltött formára (a valós adatokat írd be a `todo(...)` helyére):
 *
 *   {
 *     id: 'valtohaz-ful',
 *     segment: 'urgent',
 *     problem: 'auto-motor',
 *     title: 'Váltóház letört füle',
 *     issue: 'A rögzítő fül teljesen letört, a váltó nem volt rögzíthető.',
 *     solution: 'Előmelegítés után AWI hegesztés, majd a furat visszamunkálása.',
 *     duration: '1 munkanap',
 *     replacementCost: '210 000 Ft (komplett váltóház)',
 *     repairCost: '42 000 Ft',
 *     material: 'alumínium öntvény',
 *     images: { before: '/images/gallery/valtohaz-elotte.webp', ... },
 *   }
 */
import { todo } from './fillable'
import type { GalleryCase, ProblemId, SegmentId } from './types'

interface CaseSeed {
  id: string
  segment: SegmentId
  problem: ProblemId
  title: string
  /** Mit ábrázoljon a fotó – ez adja a helykitöltő feliratát és az alt szöveget. */
  subject: string
}

/** Előkészített referenciahely valós adatokra váró mezőkkel. */
function caseSlot(seed: CaseSeed): GalleryCase {
  return {
    id: seed.id,
    segment: seed.segment,
    problem: seed.problem,
    title: seed.title,
    issue: todo(`„${seed.title}” – mi volt a hiba vagy a feladat (1–2 mondat)`),
    solution: todo(`„${seed.title}” – milyen javítás vagy gyártás történt (1–2 mondat)`),
    duration: todo(`„${seed.title}” – mennyi ideig tartott, pl. „1 munkanap”`),
    replacementCost: todo(`„${seed.title}” – mennyibe került volna a csere vagy az új termék`),
    repairCost: todo(`„${seed.title}” – mennyibe került a javítás vagy a gyártás`),
    material: todo(`„${seed.title}” – anyag, pl. „alumínium öntvény” vagy „rozsdamentes acél”`),
    images: {
      before: todo(`„${seed.title}” – ELŐTTE fotó (public/images/gallery/, WebP vagy AVIF)`),
      after: todo(`„${seed.title}” – UTÁNA fotó (public/images/gallery/, WebP vagy AVIF)`),
      beforeAlt: `${seed.subject} – állapot a javítás előtt`,
      afterAlt: `${seed.subject} – állapot a javítás után`,
    },
  }
}

export const galleryCases: GalleryCase[] = [
  // --- Sürgős javítás ------------------------------------------------------
  caseSlot({
    id: 'valtohaz-ful',
    segment: 'urgent',
    problem: 'auto-motor',
    title: 'Váltóház letört füle',
    subject: 'Alumínium váltóház letört rögzítő füle',
  }),
  caseSlot({
    id: 'motorblokk',
    segment: 'urgent',
    problem: 'auto-motor',
    title: 'Motorblokk repedés',
    subject: 'Repedt motorblokk alumínium öntvény',
  }),
  caseSlot({
    id: 'olajteknyo',
    segment: 'urgent',
    problem: 'auto-motor',
    title: 'Sérült olajteknő',
    subject: 'Alumínium olajteknő sérült fala',
  }),
  caseSlot({
    id: 'intercooler',
    segment: 'urgent',
    problem: 'auto-motor',
    title: 'Intercooler szivárgás',
    subject: 'Alumínium intercooler szivárgó csonkja',
  }),
  caseSlot({
    id: 'klimacso',
    segment: 'urgent',
    problem: 'felni-cso-vaz',
    title: 'Klímacső törés',
    subject: 'Alumínium klímacső törött szakasza',
  }),
  caseSlot({
    id: 'alu-felni',
    segment: 'urgent',
    problem: 'felni-cso-vaz',
    title: 'Alumínium felni repedés',
    subject: 'Repedt alumínium felni pereme',
  }),
  caseSlot({
    id: 'kipufogo',
    segment: 'urgent',
    problem: 'felni-cso-vaz',
    title: 'Kipufogó javítás',
    subject: 'Kilyukadt kipufogódob és cső',
  }),
  caseSlot({
    id: 'kerekparvaz',
    segment: 'urgent',
    problem: 'felni-cso-vaz',
    title: 'Kerékpárváz repedés',
    subject: 'Repedt alumínium kerékpárváz csatlakozási pontja',
  }),
  caseSlot({
    id: 'alu-ontveny-egyeb',
    segment: 'urgent',
    problem: 'alu-ontveny',
    title: 'Ipari alumíniumöntvény',
    subject: 'Törött ipari alumíniumöntvény alkatrész',
  }),
  caseSlot({
    id: 'szivattyuhaz',
    segment: 'urgent',
    problem: 'alu-ontveny',
    title: 'Szivattyúház törés',
    subject: 'Törött alumínium szivattyúház',
  }),

  // --- Egyedi gyártás ------------------------------------------------------
  caseSlot({
    id: 'alu-letra',
    segment: 'custom',
    problem: 'egyedi-alu',
    title: 'Egyedi alumínium létra',
    subject: 'Méretre gyártott alumínium létra',
  }),
  caseSlot({
    id: 'rampa',
    segment: 'custom',
    problem: 'egyedi-alu',
    title: 'Alumínium rámpa',
    subject: 'Egyedi méretű alumínium felhajtó rámpa',
  }),
  caseSlot({
    id: 'kutyaszallito',
    segment: 'custom',
    problem: 'egyedi-alu',
    title: 'Kutyaszállító box',
    subject: 'Alumínium kutyaszállító box csomagtérbe',
  }),
  caseSlot({
    id: 'medencelatra',
    segment: 'custom',
    problem: 'rozsdamentes-gasztro',
    title: 'Medencelétra és kapaszkodó',
    subject: 'Rozsdamentes medencelétra és kapaszkodó',
  }),
  caseSlot({
    id: 'steg-fartukor',
    segment: 'custom',
    problem: 'egyedi-alu',
    title: 'Stég és fartükör elem',
    subject: 'Alumínium stégelem és csónak fartükör',
  }),
  caseSlot({
    id: 'gasztro-asztal',
    segment: 'custom',
    problem: 'rozsdamentes-gasztro',
    title: 'Gasztro munkaasztal',
    subject: 'Rozsdamentes gasztro munkaasztal',
  }),
  caseSlot({
    id: 'elszivo-ernyo',
    segment: 'custom',
    problem: 'rozsdamentes-gasztro',
    title: 'Elszívóernyő',
    subject: 'Rozsdamentes konyhai elszívóernyő',
  }),
  caseSlot({
    id: 'palinkafozo',
    segment: 'custom',
    problem: 'rozsdamentes-gasztro',
    title: 'Pálinkafőző kiegészítő',
    subject: 'Rozsdamentes pálinkafőző kiegészítő elem',
  }),

  // --- B2B -----------------------------------------------------------------
  caseSlot({
    id: 'b2b-autoszerelo',
    segment: 'b2b',
    problem: 'b2b',
    title: 'Autószerelő műhelynek',
    subject: 'Autószerelő műhelynek alvállalkozásban végzett alumíniumjavítás',
  }),
  caseSlot({
    id: 'b2b-kivitelezo',
    segment: 'b2b',
    problem: 'b2b',
    title: 'Építőipari kivitelezőnek',
    subject: 'Kivitelezőnek gyártott alumínium szerkezeti elem',
  }),
  caseSlot({
    id: 'b2b-mezogazdasag',
    segment: 'b2b',
    problem: 'b2b',
    title: 'Mezőgazdasági szolgáltatónak',
    subject: 'Mezőgazdasági géphez végzett hegesztési javítás',
  }),
  caseSlot({
    id: 'b2b-sorozat',
    segment: 'b2b',
    problem: 'b2b',
    title: 'Sorozatjellegű megrendelés',
    subject: 'Sorozatban gyártott, azonos alumínium elemek',
  }),
]
