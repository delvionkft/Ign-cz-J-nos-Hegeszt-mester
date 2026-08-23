/**
 * GYIK – VALÓDI KIFOGÁSKEZELÉS
 * A strukturált adat kizárólag a ténylegesen látható kérdésekből és a
 * megjelenített válaszszövegből épül fel.
 */
import { useEffect, useMemo } from 'react'
import { faqs, segments } from '@/content'
import { useSegment } from '@/hooks/useSegment'
import { interpolate } from '@/lib/text'
import { applyFaqSchema } from '@/lib/seo'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
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
    <Section id="gyik" labelledBy="gyik-cim" index="08" glow="arc" glowAt={{ x: '20%', y: '25%' }}>
      <div className="grid gap-10 lg:grid-cols-[minmax(16rem,20rem)_1fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="mb-4 flex items-center gap-3 font-display text-label font-semibold uppercase text-brand-light">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-brand" />
            GYIK
          </p>
          <h2 id="gyik-cim" className="text-display-lg">
            Amit a legtöbben megkérdeznek
          </h2>
          <p className="mt-5 text-base leading-relaxed text-alu">
            {segments[segment].label} – a leggyakoribb kérdések és az őszinte válaszok.
          </p>
          <p className="tabular mt-6 border-t border-white/10 pt-4 font-display text-label font-semibold uppercase text-steel">
            {items.length} kérdés
          </p>
        </Reveal>

        <Reveal delay={60}>
          <Accordion items={items} defaultOpenId={items[0]?.id} />
        </Reveal>
      </div>
    </Section>
  )
}
