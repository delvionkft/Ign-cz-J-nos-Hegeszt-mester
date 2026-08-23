/**
 * GYIK – VALÓDI KIFOGÁSKEZELÉS
 * ----------------------------
 * Minden válasz egy tényleges értékesítési akadályt old fel. Nem SEO-töltelék.
 *
 * A `{token}` jelölések a site.config.ts `facts` és `contact` objektumaiból
 * töltődnek fel. FONTOS: ha egy tényadat még nincs kitöltve, az azt tartalmazó
 * MONDAT automatikusan kimarad a megjelenített válaszból (lásd src/lib/text.ts),
 * így soha nem kerül ki féllábas vagy kitalált állítás az oldalra.
 * Ezért a tényadatot tartalmazó állítást mindig külön mondatba írd.
 */
import type { Faq } from './types'

export const faqs: Faq[] = [
  // =========================================================================
  // SÜRGŐS JAVÍTÁS
  // =========================================================================
  {
    id: 'u-strength',
    segment: 'urgent',
    question: 'Nem lesz gyengébb a javított rész?',
    answer:
      'A hegesztés a hő hatására mindig megváltoztatja az anyag szerkezetét a varrat környezetében – ezt nem lehet ' +
      'kikerülni, kezelni viszont igen. A megfelelő előkészítés, a kontrollált hőbevitel és az anyagnak megfelelő ' +
      'hozaganyag használata azt eredményezi, hogy a javított rész a rendeltetésszerű terhelést el tudja viselni. ' +
      'Ahol viszont a terhelés jellege miatt ez nem garantálható, ott ezt előre megmondom, és nem vállalom el a munkát.',
  },
  {
    id: 'u-castable',
    segment: 'urgent',
    question: 'Alumíniumot és öntvényt tényleg lehet tartósan javítani?',
    answer:
      'Igen, de nem minden esetben és nem mindegy, hogyan. Az öntvények szennyeződéseket és zárványokat ' +
      'tartalmazhatnak, ezért a javítás előtt ki kell tisztítani, meg kell nyitni a repedést, és az anyagot ' +
      'előmelegíteni. Ezt a lépéssort sok műhely nem vállalja, ezért mondják, hogy „csak cserélhető”. ' +
      'Ha a darab mégsem javítható, azt a vizsgálat után őszintén megmondom.',
  },
  {
    id: 'u-photo-price',
    segment: 'urgent',
    question: 'Fotó alapján megmondható a javítás ára?',
    answer:
      'Előzetes ársávot igen, pontos végösszeget nem. A fotóból látszik az anyag, a sérülés jellege és a ' +
      'hozzáférhetőség – ez a három dolog határozza meg az ár nagyságrendjét. A végleges árat akkor tudom ' +
      'megmondani, amikor a darab a kezemben van, és ha az eltérne az előzetestől, azt a munka megkezdése előtt jelzem.',
  },
  {
    id: 'u-time',
    segment: 'urgent',
    question: 'Mennyi idő alatt készül el?',
    answer:
      'A javítás ideje az előkészítéstől függ: a tisztítás, a szétszedés és az előmelegítés gyakran több időt vesz ' +
      'igénybe, mint maga a hegesztés. A legtöbb javítás {leadTime} alatt elkészül. Ha egy munka ennél hosszabb, ' +
      'azt már az ajánlatban jelzem.',
  },
  {
    id: 'u-extra-damage',
    segment: 'urgent',
    question: 'Mi történik, ha a szétszedés után további hibát találsz?',
    answer:
      'Megállok és felhívlak. Megmutatom, mit találtam, és megbeszéljük, hogy érdemes-e folytatni. ' +
      'Az eredetileg megbeszélt áron felül soha nem végzek munkát előzetes egyeztetés nélkül.',
  },
  {
    id: 'u-not-repairable',
    segment: 'urgent',
    question: 'Mi van akkor, ha végül nem javítható?',
    answer:
      'Megmondom, miért nem, és ha tudok, javaslok más irányt – például egy alkatrész részleges pótlását vagy ' +
      'egyedi gyártását. A munkadarab megvizsgálásáért ilyenkor nem kérek pénzt.',
  },
  {
    id: 'u-appointment',
    segment: 'urgent',
    question: 'Kell időpontot foglalni?',
    answer:
      'Igen, érdemes. Egy hegesztés közben megkezdett munkát nem lehet félbehagyni, ezért bejelentkezés nélkül ' +
      'előfordulhat, hogy várni kell. Egy telefon vagy üzenet elég, és megmondom, mikor tudod behozni.',
  },
  {
    id: 'u-onsite',
    segment: 'urgent',
    question: 'Van helyszíni kiszállás?',
    answer:
      'A kisebb alkatrészeket egyszerűbb és olcsóbb behozni a műhelybe, mert ott adott a megfelelő előkészítés ' +
      'és a stabil áramellátás. Beépített vagy mozgathatatlan szerkezetnél viszont helyszíni munkára is van mód – ' +
      'ennek feltételeit az oldal alján, a szolgáltatási területnél találod.',
  },

  // =========================================================================
  // EGYEDI GYÁRTÁS
  // =========================================================================
  {
    id: 'c-drawing',
    segment: 'custom',
    question: 'Elég egy kézi rajz, vagy pontos műszaki rajz kell?',
    answer:
      'Egy kézi vázlat is elég, ha rajta vannak a fő méretek és látszik, mihez kell illeszkednie. ' +
      'A legtöbb megrendelés így indul. Műszaki rajz esetén természetesen az alapján dolgozom, ' +
      'de nem feltétele az ajánlatadásnak.',
  },
  {
    id: 'c-survey',
    segment: 'custom',
    question: 'Helyszíni felmérést is vállalsz?',
    answer:
      'Beépített szerkezeteknél – kapaszkodó, medencelétra, stég, rámpa – érdemes helyszínen felvenni a méretet, ' +
      'mert néhány milliméteres eltérés is beépítési problémát okoz. A felmérés feltételeit és körzetét ' +
      'az oldal alján, a szolgáltatási területnél találod.',
  },
  {
    id: 'c-size',
    segment: 'custom',
    question: 'Milyen méretű munkát tudsz elkészíteni?',
    answer:
      'A méret határa jellemzően nem a hegesztés, hanem a szállíthatóság és a beemelhetőség. ' +
      'Nagyobb szerkezet készülhet több, helyszínen összeépíthető elemből is – ezt már a tervezéskor ' +
      'végiggondoljuk, hogy ne a beépítéskor derüljön ki a probléma.',
  },
  {
    id: 'c-material',
    segment: 'custom',
    question: 'Alumíniumból és rozsdamentesből is kérhető?',
    answer:
      'Mindkettőből. Az anyagválasztás a felhasználástól függ: alumíniumból könnyebb és jól mozgatható szerkezet ' +
      'készül, rozsdamentesből tartósabb és jobban tisztítható – ezért gasztro és vizes környezetben jellemzően az ' +
      'utóbbi a jó választás. Az ajánlatban megírom, melyiket miért javaslom.',
  },
  {
    id: 'c-leadtime',
    segment: 'custom',
    question: 'Mennyi a gyártási idő?',
    answer:
      'Az anyagbeszerzéstől és a szerkezet összetettségétől függ, ezért mindig a konkrét munkára adok határidőt. ' +
      'Az ajánlatban a gyártási idő is szerepel, és ha bármi csúszna, azt előre jelzem, nem a határidő napján.',
  },
  {
    id: 'c-single',
    segment: 'custom',
    question: 'Egyetlen darab is rendelhető?',
    answer:
      'Igen, a munkák nagy része egyedi darab. Nincs minimum mennyiség. ' +
      'Több azonos elem esetén viszont a sablonozás miatt az egységár általában kedvezőbb lesz.',
  },
  {
    id: 'c-install',
    segment: 'custom',
    question: 'Vállalsz beépítést is?',
    answer:
      'Egyszerűbb szerkezeteknél igen. Ahol viszont szakipari munka is kell – például falazat megbontása, ' +
      'burkolat visszaépítése vagy villanyszerelés –, ott a saját szakemberrel érdemes dolgozni, ' +
      'én pedig a beépítéshez szükséges pontos méretekkel és rögzítési pontokkal segítek.',
  },
  {
    id: 'c-estimate',
    segment: 'custom',
    question: 'Hogyan számítható ki az előzetes ár?',
    answer:
      'Négy tényezőből: a felhasznált anyag mennyiségéből és fajtájából, a hegesztett varratok hosszából, ' +
      'a szükséges megmunkálásból és a felületkezelésből. Ezért kérek méretet és vázlatot – ezekből ' +
      'nagy biztonsággal megadható az ársáv.',
  },

  // =========================================================================
  // B2B
  // =========================================================================
  {
    id: 'b-subcontract',
    segment: 'b2b',
    question: 'Vállalsz rendszeres alvállalkozói munkát?',
    answer:
      'Igen. A partneri munkák jelentős része pont ilyen: a műhely elvállalja az autót vagy a gépet, ' +
      'a hegesztést pedig átadja. A végfelhasználóval te maradsz kapcsolatban, én a munkadarabbal dolgozom.',
  },
  {
    id: 'b-invoice',
    segment: 'b2b',
    question: 'Számlaképes a szolgáltatás?',
    answer:
      'Igen, minden munkáról számla készül. Rendszeres együttműködésnél havi összesített számlázásban is ' +
      'meg tudunk állapodni, hogy ne darabonként kelljen adminisztrálni.',
  },
  {
    id: 'b-contract',
    segment: 'b2b',
    question: 'Köthető keretszerződés?',
    answer:
      'Köthető. Ebben rögzítjük a vállalt átfutást, a sürgősségi sáv feltételeit, az árazást, ' +
      'az átadás-átvétel rendjét és a garanciális eljárást. Így nem kell minden egyes munkánál újratárgyalni a feltételeket.',
  },
  {
    id: 'b-turnaround',
    segment: 'b2b',
    question: 'Milyen átfutással dolgozol?',
    answer:
      'A partneri munkákat előre egyeztetett sávban ütemezem, hogy a szerviz ne álljon meg miattuk. ' +
      'A jellemző átfutás {leadTime}. A pontos ütemezést a keretegyeztetéskor rögzítjük.',
  },
  {
    id: 'b-urgent',
    segment: 'b2b',
    question: 'Van sürgősségi javítási lehetőség?',
    answer:
      'Van, külön díjazással. A sürgősségi sáv azt jelenti, hogy a munkát soron kívül veszem be, ' +
      'ami a többi megrendelés ütemezését is érinti – ezért van külön ára, és ezért érdemes előre rögzíteni a feltételeit.',
  },
  {
    id: 'b-series',
    segment: 'b2b',
    question: 'Vállalsz sorozatjellegű munkát?',
    answer:
      'Igen. Sorozatnál először egy mintadarab készül el, azt jóváhagyod, és csak utána indul a gyártás. ' +
      'A darabszám és a sablonozás miatt az egységár ilyenkor jellemzően alacsonyabb, mint egyedi darabnál.',
  },
  {
    id: 'b-handover',
    segment: 'b2b',
    question: 'Hogyan történik az átadás és az átvétel?',
    answer:
      'Munkalappal, amin szerepel a darab azonosítása, az elvégzett munka és a garancia. ' +
      'Így a saját ügyfeled felé is dokumentálva van, mi történt az alkatrésszel.',
  },
  {
    id: 'b-capacity',
    segment: 'b2b',
    question: 'Mekkora heti kapacitás áll rendelkezésre?',
    answer:
      'A kapacitást szándékosan nem foglalom túl, hogy a vállalt határidők tarthatók maradjanak. ' +
      'A partnerek számára fenntartott heti kapacitás: {weeklyCapacity}. A pontos ütemezésről ' +
      'az első egyeztetésen beszélünk.',
  },
]
