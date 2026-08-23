/**
 * GARANCIA
 * Pontos feltételek + kifejezett kizárások teherviselő és
 * biztonságkritikus szerkezetekre.
 */
import { guarantee } from '@/content/guarantee'
import { isTodo, resolve } from '@/content/fillable'
import { useSegment } from '@/hooks/useSegment'
import { Section, SectionHeading, TechLabel } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'

export function GuaranteeSection() {
  const { segment } = useSegment()
  const primary = resolve(guarantee.primaryClaim)
  const terms = guarantee.terms.filter((term) => !isTodo(term))

  return (
    <Section id="garancia" tone="panel" labelledBy="garancia-cim" index="07">
      <SectionHeading id="garancia-cim" kicker={guarantee.title} title={guarantee.headline} />

      <div className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
        {/* ---------------- Amit vállal ---------------- */}
        <Reveal>
          <div className="corner-marks relative h-full border border-brand/40 bg-brand/[0.06] p-6 shadow-edge sm:p-8">
            <span className="mb-6 inline-flex h-12 w-12 items-center justify-center border border-brand bg-brand/10">
              <Icon name="shield" size={24} className="text-brand-light" />
            </span>

            <h3 className="font-display text-display-md font-semibold uppercase text-paper">
              {primary ?? 'Írott garancia a hegesztési varratra.'}
            </h3>

            <p className="mt-5 max-w-prose text-base leading-relaxed text-alu">
              {guarantee.secondaryClaim}
            </p>
            <p className="mt-3 max-w-prose text-base leading-relaxed text-alu">
              {guarantee.bySegment[segment]}
            </p>

            {terms.length > 0 && (
              <>
                <TechLabel className="mt-8">A garancia feltételei</TechLabel>
                <ul className="mt-4 space-y-3">
                  {terms.map((term) => (
                    <li key={term} className="flex gap-3 text-sm leading-relaxed text-paper">
                      <Icon name="check" size={17} className="mt-0.5 shrink-0 text-brand" />
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {import.meta.env.DEV && terms.length < guarantee.terms.length && (
              <p className="mt-6 border-t border-brand/30 pt-3 text-[11px] text-brand-light">
                Kitöltendő: {guarantee.terms.length - terms.length} garanciális feltétel
                (src/content/guarantee.ts)
              </p>
            )}
          </div>
        </Reveal>

        {/* ---------------- Amit nem vállal ---------------- */}
        <Reveal delay={70}>
          <div className="h-full border border-white/12 bg-pit p-6 shadow-edge sm:p-8">
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
