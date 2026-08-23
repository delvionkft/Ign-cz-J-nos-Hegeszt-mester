import { technologies } from '@/content/technology'
import { Section, SectionHeading } from '@/components/ui/Section'

/**
 * TECHNOLÓGIA – KÖZÉRTHETŐEN
 * Nem gépnevek és amperértékek: minden pont azt magyarázza el,
 * mit jelent az eljárás az ügyfélnek.
 */
export function Technology() {
  return (
    <Section id="technologia" tone="panel" labelledBy="technologia-cim">
      <SectionHeading
        id="technologia-cim"
        kicker="Technológia"
        title="Milyen eljárással dolgozom, és ez neked mit jelent"
        subtitle="Nem a gépek típusa a lényeg, hanem hogy melyik eljárás mire jó – és mit nyersz vele."
      />

      <ul className="grid gap-4 sm:grid-cols-2">
        {technologies.map((tech, index) => (
          <li
            key={tech.id}
            className="flex gap-4 rounded-sm border border-white/10 bg-ink/50 p-5"
          >
            <span
              aria-hidden="true"
              className="font-display text-2xl font-bold leading-none text-brand"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold uppercase leading-tight text-paper">
                {tech.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-alu">{tech.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
