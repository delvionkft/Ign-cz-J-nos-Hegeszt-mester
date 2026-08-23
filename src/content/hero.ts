/**
 * HERO – EGYETLEN ERŐS ÍGÉRET
 * ---------------------------
 * A `showcase` a hero melletti előtte-utána munka. Ide a legmeggyőzőbb,
 * legjobb minőségű fotópár kerüljön – ez a kép a landing legfontosabb vizuális
 * bizonyítéka, ezért kiemelten optimalizált (preload, eager betöltés).
 */
import { todo } from './fillable'

export const hero = {
  /**
   * Hero háttérvideó. Cseréhez elég ide másik fájlt megadni a public/video/
   * mappából. A poszterkép addig látszik, amíg a videó töltődik, illetve
   * csökkentett mozgás esetén a videó helyett.
   */
  video: {
    /**
     * Két forrás a teljes böngésző-lefedettséghez: a WebM/VP9-et a Chrome,
     * Firefox, Edge és az újabb Safari játssza le, az MP4/H.264 pedig
     * mindenhol máshol tartalék. A böngésző csak az egyiket tölti le.
     */
    sources: [
      { src: '/video/hero-welding.webm', type: 'video/webm' },
      { src: '/video/hero-welding.mp4', type: 'video/mp4' },
    ],
    poster: '/video/hero-welding-poster.webp',
    /** Képernyőolvasónak – a videó dekoratív, de a tartalmát leírjuk. */
    description: 'Hegesztés közben készült felvétel: ívfény és szikrák a műhelyben.',
  },
  kicker: 'Alumínium- és rozsdamentes hegesztés • AWI / MIG • javítás és egyedi gyártás',
  headline: 'Amit máshol azt mondták, hogy nem javítható, csak cserélhető – azt én megjavítom.',
  /** A vonzáskörzet a site.config.ts `serviceArea.short` mezőjéből egészíti ki. */
  subheadlineBase:
    'Autó- és motoralkatrészek, öntvények, felnik, csövek, valamint egyedi alumínium- és rozsdamentes ' +
    'szerkezetek javítása és gyártása',
  primaryCta: 'Fotót küldök, kérek árat',
  /** A hero alján futó műszaki felirat-sáv elemei. */
  specStrip: [
    'AWI / TIG hegesztés',
    'MIG hegesztés',
    'Alumínium',
    'Alumínium öntvény',
    'Rozsdamentes acél',
    'Öntvényjavítás előmelegítéssel',
    'Egyedi gyártás',
    'Passziválás',
  ],
  secondaryCta: 'Hívás most',
  showcase: {
    before: todo('HERO előtte fotó (a legmeggyőzőbb munka, WebP/AVIF, min. 1200px széles)'),
    after: todo('HERO utána fotó (ugyanaz a munkadarab, azonos nézetből fotózva)'),
    beforeAlt: 'Sérült alumínium alkatrész a javítás előtt',
    afterAlt: 'Ugyanaz az alumínium alkatrész a hegesztéses javítás után',
    /** Rövid felirat a kép alá – mi látható rajta. */
    caption: todo('Egy mondat a hero munkáról, pl. „Repedt váltóház – javítva csere helyett”'),
  },
}
