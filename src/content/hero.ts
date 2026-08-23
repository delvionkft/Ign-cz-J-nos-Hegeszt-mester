/**
 * HERO – EGYETLEN ERŐS ÍGÉRET
 * ---------------------------
 * A `showcase` a hero melletti előtte-utána munka. Ide a legmeggyőzőbb,
 * legjobb minőségű fotópár kerüljön – ez a kép a landing legfontosabb vizuális
 * bizonyítéka, ezért kiemelten optimalizált (preload, eager betöltés).
 */
import { todo } from './fillable'

export const hero = {
  kicker: 'Alumínium- és rozsdamentes hegesztés • AWI / MIG • javítás és egyedi gyártás',
  headline: 'Amit máshol azt mondták, hogy nem javítható, csak cserélhető – azt én megjavítom.',
  /** A vonzáskörzet a site.config.ts `serviceArea.short` mezőjéből egészíti ki. */
  subheadlineBase:
    'Autó- és motoralkatrészek, öntvények, felnik, csövek, valamint egyedi alumínium- és rozsdamentes ' +
    'szerkezetek javítása és gyártása',
  primaryCta: 'Fotót küldök, kérek árat',
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
