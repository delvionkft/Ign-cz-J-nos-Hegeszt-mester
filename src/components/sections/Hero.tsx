/**
 * HERO – VIDEÓS HÁTTÉRREL
 * -----------------------
 * A háttérben valós hegesztési felvétel fut. A szöveg olvashatóságát több
 * rétegű fátyol biztosítja, nem a videó véletlen sötét részei.
 *
 * Akadálymentesség és teljesítmény:
 *  - a videó néma, `playsInline`, és nem tölt le hangsávot (nincs is benne),
 *  - csökkentett mozgás esetén a videó helyett a poszterkép jelenik meg,
 *  - a látogató bármikor megállíthatja (WCAG 2.2.2),
 *  - a poszterkép azonnal kirajzolódik, így nincs üres, fekete első képernyő.
 */
import { useEffect, useRef, useState } from 'react'
import { hero } from '@/content/hero'
import { contact, serviceArea } from '@/content/site.config'
import { resolve } from '@/content/fillable'
import { track } from '@/lib/analytics'
import { scrollToSection } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/useMedia'
import { useParallax } from '@/hooks/useParallax'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

export function Hero() {
  const area = resolve(serviceArea.short)
  const phone = resolve(contact.phoneHref)
  const reducedMotion = usePrefersReducedMotion()

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const parallaxRef = useParallax<HTMLDivElement>(0.16)
  const [playing, setPlaying] = useState(true)

  // Csökkentett mozgás esetén a videó nem indul el.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (reducedMotion) {
      video.pause()
      setPlaying(false)
    }
  }, [reducedMotion])

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play()
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  const subheadline = area ? `${hero.subheadlineBase} ${area} területén.` : `${hero.subheadlineBase}.`

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-pit pt-16"
    >
      {/* ---------- Háttérréteg: videó + fátylak ---------- */}
      <div ref={parallaxRef} className="absolute inset-0 -z-10 will-change-transform">
        {/* A parallax miatt a réteg magasabb a szekciónál, hogy ne látszódjon ki
            az alja. Mobilon nincs parallax, ott pontosan kitölti a szekciót. */}
        <div className="absolute inset-0 md:inset-x-0 md:-top-[8%] md:h-[124%]">
          {reducedMotion ? (
            <img
              src={hero.video.poster}
              alt={hero.video.description}
              className="video-grade h-full w-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              className="video-grade h-full w-full object-cover"
              poster={hero.video.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={hero.video.description}
            >
              {hero.video.sources.map((source) => (
                <source key={source.src} src={source.src} type={source.type} />
              ))}
            </video>
          )}
        </div>
      </div>

      {/* Fátylak – sorrendben: oldalirányú, alsó, vignetta, műszaki raszter. */}
      <div aria-hidden="true" className="scrim-left pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden="true" className="scrim-bottom pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden="true" className="vignette pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-grid opacity-40"
      />
      {/* Az ívfény hideg izzása jobbra, a piros akcentus balra – a kettő kerete a szövegnek. */}
      <div
        aria-hidden="true"
        className="glow-arc animate-arc-flicker pointer-events-none absolute inset-0 -z-10 hidden lg:block"
      />
      <div
        aria-hidden="true"
        className="glow-brand pointer-events-none absolute inset-0 -z-10 [--glow-x:8%] [--glow-y:75%]"
      />

      {/* ---------- Tartalom ---------- */}
      <div className="container-content relative flex flex-1 items-center py-12 sm:py-16">
        <div className="max-w-4xl">
          <p className="animate-rise-in flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-label font-semibold uppercase text-alu">
            <span className="flex items-center gap-2 text-brand-light">
              <span aria-hidden="true" className="h-2 w-2 bg-brand" />
              Alumínium- és rozsdamentes hegesztés
            </span>
            <span aria-hidden="true" className="text-white/25">
              /
            </span>
            <span>AWI · MIG</span>
            <span aria-hidden="true" className="text-white/25">
              /
            </span>
            <span>javítás és egyedi gyártás</span>
          </p>

          <h1
            className="animate-rise-in mt-6 text-display-2xl [animation-delay:90ms] [text-shadow:0_2px_30px_rgba(0,0,0,0.6)]"
          >
            Amit máshol azt mondták, hogy nem javítható, csak cserélhető –{' '}
            <span className="text-brand-light">azt én megjavítom</span>.
          </h1>

          <p className="animate-rise-in mt-7 max-w-prose text-base leading-relaxed text-alu [animation-delay:180ms] sm:text-lg">
            {subheadline}
          </p>

          <div className="animate-rise-in mt-9 flex flex-col gap-3 [animation-delay:260ms] sm:flex-row">
            <Button
              size="lg"
              onClick={() => {
                track('cta_click', { location: 'hero', contactMethod: 'form', cta: 'foto_kuldes' })
                scrollToSection('ajanlatkeres')
              }}
              className="shadow-glow-lg sm:min-w-[18rem]"
            >
              <Icon name="camera" size={20} />
              {hero.primaryCta}
            </Button>

            {phone && (
              <Button
                as="a"
                href={`tel:${phone}`}
                variant="secondary"
                size="lg"
                onClick={() => track('phone_click', { location: 'hero', contactMethod: 'phone' })}
                className="backdrop-blur-sm"
              >
                <Icon name="phone" size={20} />
                {hero.secondaryCta}
              </Button>
            )}
          </div>

          <p className="animate-rise-in mt-6 flex items-start gap-2 text-sm leading-relaxed text-alu/85 [animation-delay:330ms]">
            <Icon name="info" size={16} className="mt-0.5 shrink-0 text-steel" />
            <span>A fotó alapján megmondom, javíthatónak látom-e – ez még nem megrendelés.</span>
          </p>
        </div>
      </div>

      {/* ---------- Vezérlők és görgetésjelző ---------- */}
      <div className="container-content relative flex items-end justify-between gap-4 pb-4">
        <button
          type="button"
          onClick={() => scrollToSection('javitasok')}
          className="group flex items-center gap-3 text-left"
        >
          <span className="relative flex h-9 w-6 shrink-0 items-start justify-center rounded-full border border-alu/40 pt-1.5 transition-colors duration-150 group-hover:border-brand">
            <span
              aria-hidden="true"
              className="animate-scroll-cue h-1.5 w-1 rounded-full bg-brand-light"
            />
          </span>
          <span className="font-display text-label font-semibold uppercase text-alu transition-colors duration-150 group-hover:text-paper">
            Görgess<span className="sr-only">, vagy ugorj a problémaválasztóhoz</span>
          </span>
        </button>

        {!reducedMotion && (
          <button
            type="button"
            onClick={togglePlayback}
            aria-pressed={!playing}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-ink/60 text-alu backdrop-blur transition-colors duration-150 hover:border-alu hover:text-paper"
          >
            {/* WCAG 2.2.2: az automatikusan induló mozgás megállítható. */}
            <span className="sr-only">
              {playing ? 'Háttérvideó megállítása' : 'Háttérvideó indítása'}
            </span>
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 4.5v15l13-7.5z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* ---------- Műszaki felirat-futósáv ---------- */}
      <div className="relative border-y border-white/10 bg-ink/85 backdrop-blur">
        <div className="marquee-mask overflow-hidden py-3.5">
          <div className="marquee-track">
            {/* Kétszer kirakva, hogy a görgetés folytonos legyen. */}
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center gap-8 pr-8 font-display text-label font-semibold uppercase text-steel sm:gap-12 sm:pr-12"
              >
                {hero.specStrip.map((spec) => (
                  <li key={spec} className="flex shrink-0 items-center gap-3 whitespace-nowrap">
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-brand" />
                    {spec}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
