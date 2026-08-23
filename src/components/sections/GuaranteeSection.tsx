/**
 * GARANCIA
 * Pontos feltételek + kifejezett kizárások teherviselő és
 * biztonságkritikus szerkezetekre.
 */
import { guarantee } from '@/content/guarantee'
import { isTodo, resolve } from '@/content/fillable'
import { useSegment } from '@/hooks/useSegment'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Icon } from '@/components/ui/Icon'

export function GuaranteeSection() {
  const { segment } = useSegment()
  const primary = resolve(guarantee.primaryClaim)
  const terms = guarantee.terms.filter((term) => !isTodo(term))

  return (
    <Section id="garancia" labelledBy="garancia-cim">
      <SectionHeading id="garancia-cim" kicker={guarantee.title} title={guarantee.headline} />

      <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        {/* Fő állítás */}
        <div className="rounded-sm border border-brand/40 bg-brand/5 p-5 sm:p-6">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold uppercase text-paper">
            <Icon name="shield" size={22} className="text-brand" />
            {primary ?? 'Írott garancia a hegesztési varratra.'}
          </h3>

          <p className="mt-4 text-sm leading-relaxed text-alu">{guarantee.secondaryClaim}</p>
          <p className="mt-3 text-sm leading-relaxed text-alu">{guarantee.bySegment[segment]}</p>

          {terms.length > 0 && (
            <>
              <h4 className="mt-6 font-display text-sm font-semibold uppercase tracking-wider text-alu">
                A garancia feltételei
              </h4>
              <ul className="mt-3 space-y-2">
                {terms.map((term) => (
                  <li key={term} className="flex gap-2 text-sm leading-relaxed text-paper">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-brand" />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {import.meta.env.DEV && terms.length < guarantee.terms.length && (
            <p className="mt-4 border-t border-brand/30 pt-3 text-[11px] text-brand-light">
              Kitöltendő: {guarantee.terms.length - terms.length} garanciális feltétel
              (src/content/guarantee.ts)
            </p>
          )}
        </div>

        {/* Kizárások – szándékosan explicit */}
        <div className="rounded-sm border border-white/10 bg-panel/60 p-5 sm:p-6">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold uppercase text-paper">
            <Icon name="alert" size={22} className="text-alu" />
            Amire nem vállalok garanciát
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-alu">
            Korlátozás nélküli garanciát teherviselő és biztonságkritikus szerkezetekre felelősséggel
            nem lehet vállalni. Ezeket előre, írásban tisztázzuk.
          </p>
          <ul className="mt-4 space-y-2">
            {guarantee.exclusions.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-relaxed text-alu">
                <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-steel" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
