/**
 * FOLYAMAT – MAXIMUM NÉGY LÉPÉS
 * -----------------------------
 * Minden felesleges lépés növeli a döntési súrlódást, ezért négynél több
 * lépést ne vegyél fel. A `meta` mezőben lévő tényadatok a site.config.ts
 * `facts` objektumából jönnek `{token}` formában.
 */
import type { ProcessStep, SegmentId } from './types'

export const processSteps: Record<SegmentId, ProcessStep[]> = {
  urgent: [
    {
      id: 'u1',
      title: 'Küldesz néhány fotót',
      description:
        'Fotózd le a sérülést közelről és távolabbról is, hogy látszódjon a környezete. Elég az űrlap, a WhatsApp vagy a Viber.',
    },
    {
      id: 'u2',
      title: 'Fotó alapján előzetes ajánlatot kapsz',
      description:
        'Megírom, javíthatónak látom-e, milyen ársávra és milyen átfutásra számíthatsz.',
      meta: 'Jellemzően {responseTime} belül visszajelzek.',
    },
    {
      id: 'u3',
      title: 'Behozod a munkát, vagy egyeztetjük a helyszíni felmérést',
      description:
        'A legtöbb alkatrészt egyszerűbb behozni. Nagyobb, beépített szerkezetnél helyszíni felmérésben egyezünk meg.',
    },
    {
      id: 'u4',
      title: 'A javítás elkészül',
      description:
        'A kész munkát átnézzük együtt, és megkapod írásban a varratra vállalt garanciát.',
      meta: 'A legtöbb javítás {leadTime} alatt elkészül.',
    },
  ],

  custom: [
    {
      id: 'c1',
      title: 'Küldesz vázlatot vagy fotót',
      description:
        'Elég egy kézi rajz a fő méretekkel, vagy néhány fotó arról a helyről, ahová a szerkezet készül.',
    },
    {
      id: 'c2',
      title: 'Előzetes ajánlatot kapsz',
      description:
        'Tisztázzuk az anyagot, a terhelést és a felületkezelést, majd megkapod az előzetes ársávot és a gyártási időt.',
      meta: 'Jellemzően {responseTime} belül visszajelzek.',
    },
    {
      id: 'c3',
      title: 'Méretegyeztetés vagy helyszíni felmérés',
      description:
        'Beépített szerkezetnél a pontos méretet helyszínen veszem fel, hogy utólagos igazítás ne kelljen.',
    },
    {
      id: 'c4',
      title: 'A gyártás elkészül',
      description:
        'Átadás előtt együtt nézzük át a kész szerkezetet, és tisztázzuk a beépítés módját.',
    },
  ],

  b2b: [
    {
      id: 'b1',
      title: 'Megírod, milyen munkákat adnál át',
      description:
        'Elég a munkatípus és a várható mennyiség. Fotó ilyenkor nem szükséges.',
    },
    {
      id: 'b2',
      title: 'Egyeztetjük a feltételeket',
      description:
        'Átfutás, sürgősségi sáv, árazás, átadás-átvétel és számlázás – mindezt előre tisztázzuk.',
      meta: 'Heti szabad kapacitás: {weeklyCapacity}.',
    },
    {
      id: 'b3',
      title: 'Első próbamunka',
      description:
        'Egy konkrét munkadarabon látod a minőséget és az átfutást, mielőtt bármit hosszabb távra vállalnál.',
    },
    {
      id: 'b4',
      title: 'Rendszeres együttműködés',
      description:
        'Bejáratott átadási renddel a további munkák már telefonon vagy üzenetben indíthatók.',
    },
  ],
}
