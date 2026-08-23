/**
 * GYIK – VALÓDI KIFOGÁSKEZELÉS
 * A strukturált adat kizárólag a ténylegesen látható kérdésekből és a
 * megjelenített válaszszövegből épül fel, így nem térhet el a látható tartalomtól.
 */
import { useEffect, useMemo } from 'react'
import { faqs, segments } from '@/content'
import { useSegment } from '@/hooks/useSegment'
import { interpolate } from '@/lib/text'
import { applyFaqSchema } from '@/lib/seo'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Accordion } from '@/components/ui/Accordion'

export function Faq() {
  const { segment } = useSegment()

  const items = useMemo(
    () =>
      faqs
        .filter((faq) => faq.segment === segment)
        .map((faq) => ({ id: faq.id, question: faq.question, answer: interpolate(faq.answer) }))
        .filter((faq) => faq.answer.length > 0),
    [segment],
  )

  useEffect(() => {
    applyFaqSchema(items)
  }, [items])

  return (
    <Section id="gyik" labelledBy="gyik-cim">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
        <SectionHeading
          id="gyik-cim"
          kicker="GYIK"
          title="Amit a legtöbben megkérdeznek"
          subtitle={`${segments[segment].label} – a leggyakoribb kérdések és az őszinte válaszok.`}
          className="mb-0"
        />
        <div>
          <Accordion items={items} defaultOpenId={items[0]?.id} />
        </div>
      </div>
    </Section>
  )
}
