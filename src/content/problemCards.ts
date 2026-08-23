/**
 * PROBLÉMAVÁLASZTÓ KÁRTYÁK
 * ------------------------
 * A hat kártya azonosítója kerül az URL `?kategoria=` paraméterébe és az
 * ajánlatkérő űrlap kategóriamezőjébe. A `segment` mező köti a kártyát
 * a három fő szegmens egyikéhez.
 */
import type { ProblemCard } from './types'

export const problemCards: ProblemCard[] = [
  {
    id: 'alu-ontveny',
    segment: 'urgent',
    title: 'Alumínium- és öntvényjavítás',
    description:
      'Repedt, letört vagy kilyukadt alumínium és öntvény alkatrészek javítása – jellemzően ott, ahol máshol cserét javasoltak.',
    examples: ['Letört fül vagy szem', 'Repedt öntvényház', 'Kilyukadt alumínium fal'],
    icon: 'cast',
  },
  {
    id: 'auto-motor',
    segment: 'urgent',
    title: 'Autó- és motoralkatrész',
    description:
      'Jármű- és motoralkatrészek javítása, amikor az adott elem külön nem, csak drága komplett egységben rendelhető.',
    examples: ['Váltóház', 'Motorblokk', 'Olajteknő', 'Intercooler'],
    icon: 'engine',
  },
  {
    id: 'felni-cso-vaz',
    segment: 'urgent',
    title: 'Felni, cső vagy kerékpárváz',
    description:
      'Vékonyabb falú alumínium alkatrészek javítása, ahol a hőbevitel pontos kontrollja a kritikus pont.',
    examples: ['Alumínium felni', 'Klímacső', 'Kipufogó', 'Kerékpárváz'],
    icon: 'wheel',
  },
  {
    id: 'egyedi-alu',
    segment: 'custom',
    title: 'Egyedi alumíniumgyártás',
    description:
      'Méretre készülő alumínium szerkezetek oda, ahol a szabványos, boltban kapható méret nem passzol.',
    examples: ['Létra', 'Rámpa', 'Szállítóbox', 'Kapaszkodó'],
    icon: 'frame',
  },
  {
    id: 'rozsdamentes-gasztro',
    segment: 'custom',
    title: 'Rozsdamentes és gasztro gyártás',
    description:
      'Rozsdamentes acél szerkezetek gyártása és javítása, hegesztés utáni felületkezeléssel.',
    examples: ['Munkaasztal', 'Elszívóernyő', 'Tartály-kiegészítő', 'Polcrendszer'],
    icon: 'steel',
  },
  {
    id: 'b2b',
    segment: 'b2b',
    title: 'Céges / B2B együttműködés',
    description:
      'Hegesztési háttérkapacitás műhelyeknek, kivitelezőknek és szolgáltatóknak – eseti vagy visszatérő alapon.',
    examples: ['Alvállalkozói munka', 'Visszatérő megrendelés', 'Sorozatjellegű gyártás'],
    icon: 'handshake',
  },
]

export const problemCardById = Object.fromEntries(
  problemCards.map((card) => [card.id, card]),
) as Record<ProblemCard['id'], ProblemCard>
