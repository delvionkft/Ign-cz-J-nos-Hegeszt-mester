/**
 * A HÁROM FŐ VEVŐSZEGMENS
 * -----------------------
 * A problémaválasztóban tett kattintás ezt a három objektumot váltja.
 * Új szegmens felvételéhez elég ezt a fájlt bővíteni – a komponensek
 * automatikusan az itteni szövegeket használják.
 */
import { todo } from './fillable'
import type { SegmentCopy, SegmentId } from './types'

export const segmentOrder: SegmentId[] = ['urgent', 'custom', 'b2b']

export const segments: Record<SegmentId, SegmentCopy> = {
  // -------------------------------------------------------------------------
  urgent: {
    id: 'urgent',
    label: 'Sürgős javítás',
    shortLabel: 'Javítás',
    pain: {
      kicker: 'A tipikus helyzet',
      headline: 'Csak komplett egységben kapható.',
      body:
        'A bontóban sincs, újonnan pedig csak egy sokkal drágább komplett egységgel együtt rendelhető. ' +
        'Attól, hogy más műhely nem vállalja az alumínium vagy öntvény javítását, még nem biztos, ' +
        'hogy az egész alkatrészt cserélni kell.',
      comparison: {
        replacementLabel: 'Új alkatrész / komplett csere',
        replacementValue: todo('Tipikus cserekötség ársávja, pl. „180 000 – 400 000 Ft”'),
        solutionLabel: 'Javítás nálam',
        solutionValue: todo('Tipikus javítási ársáv, pl. „35 000 – 90 000 Ft”'),
        savingLabel: 'Becsült megtakarítás',
        savingValue: todo('Becsült megtakarítás, pl. „a csere árának 60–80%-a”'),
        leadTimeLabel: 'Várható átfutás',
        leadTimeValue: todo('Átfutás javításnál, pl. „24–72 óra”'),
      },
    },
    gallery: {
      title: 'Ezeket nem kellett lecserélni',
      subtitle:
        'Valós javítások, amelyekre máshol azt mondták, hogy csak komplett egységgel oldható meg. ' +
        'Minden esethez ott az eredeti hiba, az elvégzett munka és a két ár.',
    },
    pricing: {
      title: 'Mennyibe kerül a javítás?',
      subtitle:
        'A pontos ár az anyagtól, a sérülés helyétől, a hozzáférhetőségtől és a szükséges előkészítéstől függ. ' +
        'Fotó alapján rövid időn belül adok előzetes ársávot.',
      mode: 'table',
    },
    process: {
      title: 'Négy lépés a kész javításig',
      subtitle: 'Nincs hosszú ajánlatkérési procedúra. A fotó általában elég az induláshoz.',
    },
    form: {
      title: 'Küldj fotót, és megmondom, javítható-e',
      subtitle:
        'Fotózd le a sérülést közelről és távolabbról is. A képek alapján előzetes ársávot és várható átfutást kapsz.',
      submitLabel: 'Fotók küldése, árat kérek',
      photosRequired: true,
    },
  },

  // -------------------------------------------------------------------------
  custom: {
    id: 'custom',
    label: 'Egyedi gyártás',
    shortLabel: 'Gyártás',
    pain: {
      kicker: 'A tipikus helyzet',
      headline: 'Nem találsz olyat, ami pontosan passzol?',
      body:
        'A szabványos méret sokszor csak kompromisszum. Ha ismert a szükséges méret, használat és terhelés, ' +
        'az alkatrész vagy szerkezet pontosan az adott helyre gyártható.',
      comparison: {
        replacementLabel: 'Gyári, szabványos termék',
        replacementValue: todo('Tipikus gyári termék ársávja, pl. „90 000 – 250 000 Ft”'),
        solutionLabel: 'Egyedi gyártás nálam',
        solutionValue: todo('Tipikus egyedi gyártási ársáv, pl. „110 000 – 280 000 Ft”'),
        savingLabel: 'Amit cserébe kapsz',
        savingValue: todo('Pl. „pontos méret, a valós terhelésre méretezve, utólagos átalakítás nélkül”'),
        leadTimeLabel: 'Várható gyártási idő',
        leadTimeValue: todo('Gyártási idő, pl. „5–15 munkanap”'),
      },
    },
    gallery: {
      title: 'Ezek pontosan a helyükre készültek',
      subtitle:
        'Egyedi alumínium- és rozsdamentes szerkezetek, amelyek méretre, adott helyre és adott terhelésre készültek.',
    },
    pricing: {
      title: 'Mennyibe kerül az egyedi gyártás?',
      subtitle:
        'Az ár az anyagmennyiségtől, a szerkezet méretétől, a hegesztett varratok hosszától és a felületkezeléstől függ. ' +
        'Méret és fotó vagy vázlat alapján előzetes ársávot adok.',
      mode: 'table',
    },
    process: {
      title: 'Négy lépés a kész szerkezetig',
      subtitle: 'Kézi vázlat és néhány méret is elég az induláshoz.',
    },
    form: {
      title: 'Küldj vázlatot vagy fotót a helyről',
      subtitle:
        'Elég egy kézi rajz a méretekkel, vagy néhány fotó arról a helyről, ahová a szerkezet készül. ' +
        'Ez alapján előzetes ársávot és gyártási időt kapsz.',
      submitLabel: 'Vázlat küldése, árat kérek',
      photosRequired: true,
    },
  },

  // -------------------------------------------------------------------------
  b2b: {
    id: 'b2b',
    label: 'B2B partnerség',
    shortLabel: 'Partnerség',
    pain: {
      kicker: 'A tipikus helyzet',
      headline: 'Egy ritka javítás miatt ne veszítsd el az ügyfeled.',
      body:
        'Ha nincs házon belül megfelelő alumínium- vagy rozsdamentes hegesztési kapacitás, ' +
        'legyen egy megbízható háttérpartner, akinek továbbadhatod a munkát.',
      comparison: {
        replacementLabel: 'Elutasított munka értéke',
        replacementValue: todo('Pl. „egy elveszített szervizmunka átlagos értéke a partnernél”'),
        solutionLabel: 'Alvállalkozói díj',
        solutionValue: todo('Alvállalkozói óradíj vagy munkánkénti ársáv'),
        savingLabel: 'Partneri feltétel',
        savingValue: todo('Pl. „viszonteladói ársáv visszatérő partnereknek”'),
        leadTimeLabel: 'Vállalt átfutás',
        leadTimeValue: todo('B2B átfutás, pl. „2–5 munkanap, sürgősségi sávval”'),
      },
    },
    gallery: {
      title: 'Partnereknek végzett munkák',
      subtitle:
        'Autószerelő műhelyeknek, kivitelezőknek és mezőgazdasági szolgáltatóknak végzett javítások és gyártások.',
    },
    pricing: {
      title: 'Hogyan tudunk együtt dolgozni?',
      subtitle:
        'Partnereknél nem egy-egy munkadarab árazása a kérdés, hanem a keret: milyen munkákat adsz át, ' +
        'milyen átfutással és milyen elszámolással.',
      mode: 'models',
    },
    process: {
      title: 'Négy lépés az első átadott munkáig',
      subtitle: 'Az első munka után már telefonon is egyeztethetünk.',
    },
    form: {
      title: 'Keressünk közös keretet',
      subtitle:
        'Írd meg, milyen típusú munkákhoz keresel hegesztő partnert, és felveszem veled a kapcsolatot. ' +
        'Fotót ilyenkor nem kötelező küldeni.',
      submitLabel: 'Kapcsolatfelvételt kérek',
      photosRequired: false,
    },
  },
}

export const defaultSegment: SegmentId = 'urgent'
