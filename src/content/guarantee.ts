/**
 * GARANCIA
 * --------
 * A garancia terjedelmét KIZÁRÓLAG a vállalkozás valós vállalási feltételei
 * alapján szabad megfogalmazni. A `terms` lista kitöltendő – ne maradjon
 * benne általános ígéret konkrét tartalom nélkül.
 *
 * A kizárások (teherviselő, biztonságkritikus szerkezetek) szándékosan
 * fixek: korlátozás nélküli garanciát ezekre nem szabad vállalni.
 */
import { todo } from './fillable'
import type { Guarantee } from './types'

export const guarantee: Guarantee = {
  title: 'Garancia',
  headline: 'Nem ígérek lehetetlent – amit vállalok, azért viszont felelősséget vállalok.',
  primaryClaim: todo(
    'A varratra vállalt írott garancia pontos megfogalmazása és időtartama, ' +
      'pl. „Írott garancia a hegesztési varratra: 6 hónap, a munkalapon rögzítve.”',
  ),
  secondaryClaim:
    'Ha a munkadarab megvizsgálása után kiderül, hogy nem javítható, a vizsgálatért nem kérek pénzt.',
  terms: [
    todo('Mire terjed ki pontosan a garancia (pl. a varrat tömítettsége, repedésmentessége)'),
    todo('Mennyi ideig érvényes, és mikortól számít (átadás napja / számla kelte)'),
    todo('Mit kell tenni garanciális igény esetén (bejelentés módja, mit kell bemutatni)'),
    todo('Mi történik jogos igény esetén (javítás, ismételt hegesztés, munkadíj visszatérítése)'),
    todo('Milyen esetben szűnik meg a garancia (pl. utólagos beavatkozás, rendeltetésellenes használat)'),
  ],
  exclusions: [
    'Teherviselő szerkezetek (áthidaló, gerenda, tartóelem) statikai megfelelősége',
    'Nagy terhelésű vagy emelést végző szerkezetek (rámpa, emelőelem) terhelhetősége',
    'Közlekedésbiztonságot érintő alkatrészek a jármű további üzemeltetése során',
    'Az alapanyag rejtett hibája, korábbi javítás vagy anyagfáradás következményei',
    'A varraton kívüli, eredetileg is sérült vagy elhasználódott részek',
  ],
  bySegment: {
    urgent:
      'Javításnál a garancia az általam készített varratra vonatkozik. Ha a szétszerelés után derül ki, ' +
      'hogy a darab máshol is sérült, azt előre jelzem, és csak egyeztetés után folytatom.',
    custom:
      'Egyedi gyártásnál a garancia az elkészült szerkezet varrataira és a megbeszélt méretpontosságra vonatkozik. ' +
      'A terhelhetőséget előre, írásban rögzítjük – ezen felüli használatra garancia nem vállalható.',
    b2b:
      'Partneri munkánál a garanciális feltételek a keretmegállapodásban rögzülnek, ' +
      'beleértve a hibabejelentés és az újramunkálás rendjét.',
  },
}
