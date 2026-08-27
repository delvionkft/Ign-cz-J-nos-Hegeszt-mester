/**
 * VALÓS VARRATOK – A SAJÁT MUNKÁBÓL
 * ---------------------------------
 * Néhány közeli felvétel a vállalkozó saját hegesztési munkáiról. Nem külön
 * referenciagaléria, hanem vizuális bizonyíték a Technológia szekción belül.
 *
 * A képek a `public/images/` mappában, saját kiszolgálásúak (nincs külső kérés).
 * Az `alt` szöveg szándékosan tényszerű, leíró – nem tartalmaz kitalált
 * üzleti állítást (anyag, minősítés, ügyfélnév).
 */
import type { WeldShowcase } from './types'

export const weldShowcase: WeldShowcase = {
  kicker: 'A saját munkámból',
  shots: [
    {
      id: 'weld-1',
      src: '/images/weld-macro-1.webp',
      alt: 'Közeli felvétel egy körben futó hegesztési varratról egy fémcsövön',
    },
    {
      id: 'weld-2',
      src: '/images/weld-macro-2.png',
      alt: 'Hegesztett fémalkatrész belső varrata közelről',
    },
    {
      id: 'weld-3',
      src: '/images/weld-macro-3.png',
      alt: 'Egyenletes hegesztési varrat részlete egy kör keresztmetszetű alkatrészen',
    },
  ],
}
