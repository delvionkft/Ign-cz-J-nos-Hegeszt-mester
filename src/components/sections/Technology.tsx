import { technologies } from '@/content/technology'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

/**
 * TECHNOLÓGIA – KÖZÉRTHETŐEN
 * Nem gépnevek és amperértékek: minden pont azt magyarázza el,
 * mit jelent az eljárás az ügyfélnek.
 */
export function Technology() {
  return (
    <Section id="technologia" tone="panel" labelledBy="technologia-cim" index="04" glow="arc" glowAt={{ x: '18%', y: '70%' }}>
      <div className="grid gap-10 lg:grid-cols-[minmax(16rem,20rem)_1fr] lg:gap-16">
        <SectionHeading
          id="technologia-cim"
          kicker="Technológia"
          title="Milyen eljárással dolgozom, és ez neked mit jelent"
          subtitle="Nem a gépek típusa a lényeg, hanem hogy melyik eljárás mire jó – és mit nyersz vele."
          className="mb-0 lg:sticky lg:top-32 lg:self-start"
        />

        <ul className="divide-y divide-white/10 border-y border-white/10">
          {technologies.map((tech, index) => (
            <Reveal as="li" key={tech.id} delay={Math.min(index * 45, 135)}>
              <div className="group grid gap-3 py-7 transition-colors duration-200 hover:bg-white/[0.02] sm:grid-cols-[4rem_1fr] sm:gap-6">
                <span
                  aria-hidden="true"
                  className="tabular font-display text-2xl font-bold leading-none text-brand transition-[text-shadow] duration-200 group-hover:[text-shadow:0_0_18px_rgba(215,25,32,0.8)]"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-display-md font-semibold uppercase text-paper">
                    {tech.title}
                  </h3>
                  <p className="mt-3 max-w-prose text-base leading-relaxed text-alu">
                    {tech.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  )
}
