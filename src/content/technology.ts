/**
 * TECHNOLÓGIA – KÖZÉRTHETŐEN
 * --------------------------
 * Nem gépnevek és amperértékek: minden pont azt magyarázza el,
 * mit jelent az adott eljárás az ügyfélnek.
 */
import type { TechnologyItem } from './types'

export const technologies: TechnologyItem[] = [
  {
    id: 'awi',
    title: 'AWI / TIG hegesztés',
    description:
      'Pontos, tiszta és jól kontrollálható eljárás vékonyabb alumínium- és rozsdamentes alkatrészek javításához. ' +
      'Kevesebb utómunkát és esztétikusabb varratot tesz lehetővé.',
  },
  {
    id: 'mig',
    title: 'MIG hegesztés',
    description:
      'Gyors és stabil megoldás nagyobb méretű vagy hosszabb varratot igénylő szerkezetek gyártásához.',
  },
  {
    id: 'ontveny',
    title: 'Öntvényjavítás előmelegítéssel',
    description:
      'Az anyag megfelelő előkészítése és előmelegítése csökkenti a repedés kockázatát, és lehetővé teszi ' +
      'olyan alkatrészek javítását is, amelyeket máshol cserére ítéltek.',
  },
  {
    id: 'passzivalas',
    title: 'Rozsdamentes passziválás',
    description:
      'A hegesztés utáni megfelelő felületkezelés segít helyreállítani a rozsdamentes anyag korrózióálló felületét.',
  },
]
