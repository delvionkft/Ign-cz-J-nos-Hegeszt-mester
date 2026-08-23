/**
 * GARANCIA
 * Pontos feltételek + kifejezett kizárások teherviselő és
 * biztonságkritikus szerkezetekre.
 */
import { guarantee } from '@/content/guarantee'
import { isTodo, resolve } from '@/content/fillable'
import { useSegment } from '@/hooks/useSegment'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'

export function GuaranteeSection() {
  const { segment } = useSegment()
  const primary = resolve(guarantee.primaryClaim)
  const terms = guarantee.terms.filter((term) => !isTodo(term))

  return (
    <Section id="garancia" tone="panel" labelledBy="garancia-cim" index="07" glow="brand" glowAt={{ x: '25%', y: '40%' }}>
      <SectionHeading id="garancia-cim" kicker={guarantee.title} title={guarantee.headline} />

      <div className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
        {/* ---------------- Amit vállal ---------------- */}
        <Reveal>
          <div className="surface-brand corner-marks relative h-full p-6 shadow-glow-lg sm:p-9">
            <span className="mb-6 inline-flex h-14 w-14 items-center justify-center border border-white/40 bg-white/10 backdrop-blur-sm">
              <Icon name="shield" size={28} className="text-white" />
            </span>

            <h3 className="font-display text-display-md font-semibold uppercase text-white">
              {primary ?? 'Írott garancia a hegesztési varratra.'}
            </h3>

            <p className="mt-5 max-w-prose text-base leading-relaxed text-white/90">
              {guarantee.secondaryClaim}
            </p>
            <p className="mt-3 max-w-prose text-base leading-relaxed text-white/80">
              {guarantee.bySegment[segment]}
            </p>

            {terms.length > 0 && (
              <>
                <p className="mt-9 flex items-center gap-3 font-display text-label font-semibold uppercase text-white/70">
                  <span className="whitespace-nowrap">A garancia feltételei</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-white/25" />
                </p>
                <ul className="mt-4 space-y-3">
                  {terms.map((term) => (
                    <li key={term} className="flex gap-3 text-sm leading-relaxed text-white">
                      <Icon name="check" size={17} className="mt-0.5 shrink-0 text-white/80" />
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {import.meta.env.DEV && terms.length < guarantee.terms.length && (
              <p className="mt-6 border-t border-white/30 pt-3 text-[11px] text-white/80">
                Kitöltendő: {guarantee.terms.length - terms.length} garanciális feltétel
                (src/content/guarantee.ts)
              </p>
            )}
          </div>
        </Reveal>

        {/* ---------------- Amit nem vállal ---------------- */}
        <Reveal delay={70}>
          <div className="h-full border border-white/12 bg-pit p-6 shadow-edge sm:p-9">
            <span className="mb-6 inline-flex h-12 w-12 items-center justify-center border border-white/15">
              <Icon name="alert" size={24} className="text-steel" />
            </span>

            <h3 className="font-display text-display-md font-semibold uppercase text-paper">
              Amire nem vállalok garanciát
            </h3>
            <p className="mt-5 text-base leading-relaxed text-alu">
              Korlátozás nélküli garanciát teherviselő és biztonságkritikus szerkezetekre
              felelősséggel nem lehet vállalni. Ezeket előre, írásban tisztázzuk.
            </p>

            <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {guarantee.exclusions.map((item) => (
                <li key={item} className="flex gap-3 py-3 text-sm leading-relaxed text-alu">
                  <span aria-hidden="true" className="mt-2.5 h-px w-3.5 shrink-0 bg-steel" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
