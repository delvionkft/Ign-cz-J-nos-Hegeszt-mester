import { useEffect, useState } from 'react'
import { SegmentProvider } from '@/hooks/useSegment'
import { initConsent } from '@/lib/consent'
import { applyLocalBusinessSchema, applySeo } from '@/lib/seo'

import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { SegmentBar } from '@/components/sections/SegmentBar'
import { ProblemSelector } from '@/components/sections/ProblemSelector'
import { PainPoint } from '@/components/sections/PainPoint'
import { Gallery } from '@/components/sections/Gallery'
import { CtaBand } from '@/components/sections/CtaBand'
import { Technology } from '@/components/sections/Technology'
import { Pricing } from '@/components/sections/Pricing'
import { Process } from '@/components/sections/Process'
import { GuaranteeSection } from '@/components/sections/GuaranteeSection'
import { Faq } from '@/components/sections/Faq'
import { QuoteForm } from '@/components/sections/QuoteForm'
import { LocalSeo } from '@/components/sections/LocalSeo'
import { Footer } from '@/components/sections/Footer'
import { MobileCtaBar } from '@/components/sections/MobileCtaBar'
import { CookieBanner } from '@/components/sections/CookieBanner'
import { ContentAudit } from '@/components/ContentAudit'

export default function App() {
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false)

  useEffect(() => {
    // Hozzájárulás-alapú mérés indítása (mérőkód csak engedély után töltődik).
    initConsent()
    // SEO és strukturált adatok a központi konfigurációból.
    applySeo()
    applyLocalBusinessSchema()
  }, [])

  return (
    <SegmentProvider>
      <a
        href="#javitasok"
        className="sr-only-focusable absolute left-3 top-3 z-[200] rounded-sm bg-brand px-4 py-2 text-sm font-semibold text-white"
      >
        Ugrás a tartalomra
      </a>

      <Header />
      {/* Görgetés közben is látható és váltható szegmens-kontextus. */}
      <SegmentBar />

      <main id="main">
        {/* 1. Hero – egyetlen erős ígéret */}
        <Hero />
        {/* 2. Bizalmi sáv */}
        <TrustBar />
        {/* 3. Interaktív problémaválasztó – innen vált minden alábbi szekció */}
        <ProblemSelector />
        {/* 4. A fájdalom kimondása */}
        <PainPoint />
        {/* 5. Előtte-utána referenciagaléria */}
        <Gallery />
        {/* Teljes szélességű CTA-sáv közvetlenül a bizonyíték után */}
        <CtaBand />
        {/* 6. Technológia közérthetően */}
        <Technology />
        {/* 7. Ár-horgony */}
        <Pricing />
        {/* 8. Folyamat négy lépésben */}
        <Process />
        {/* 9. Garancia */}
        <GuaranteeSection />
        {/* 10. GYIK */}
        <Faq />
        {/* 11. Fotófeltöltéses ajánlatkérő űrlap */}
        <QuoteForm />
        {/* 12. Helyi SEO lábazat */}
        <LocalSeo />
      </main>

      <Footer onOpenCookieSettings={() => setCookieSettingsOpen(true)} />

      <MobileCtaBar />
      <CookieBanner forceOpen={cookieSettingsOpen} onDismiss={() => setCookieSettingsOpen(false)} />
      <ContentAudit />
    </SegmentProvider>
  )
}
