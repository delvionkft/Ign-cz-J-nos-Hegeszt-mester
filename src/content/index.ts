/**
 * KÖZPONTI TARTALMI BELÉPÉSI PONT
 * -------------------------------
 * A komponensek innen kérik le a tartalmat. Szerkesztéshez a mappa
 * többi fájlját kell módosítani, komponenskódot nem.
 */
export * from './types'
export * from './fillable'

export { business, contact, serviceArea, openingHours, facts, trustMetrics, legalLinks, tracking, formEndpoint } from './site.config'
export { segments, segmentOrder, defaultSegment } from './segments'
export { problemCards, problemCardById } from './problemCards'
export { galleryCases } from './galleryCases'
export { priceRanges, cooperationModels } from './priceRanges'
export { processSteps } from './processSteps'
export { guarantee } from './guarantee'
export { technologies } from './technology'
export { faqs } from './faqs'
export { hero } from './hero'

import { business, contact, serviceArea, openingHours, facts, trustMetrics, legalLinks, tracking, formEndpoint } from './site.config'
import { segments } from './segments'
import { problemCards } from './problemCards'
import { galleryCases } from './galleryCases'
import { priceRanges, cooperationModels } from './priceRanges'
import { processSteps } from './processSteps'
import { guarantee } from './guarantee'
import { technologies } from './technology'
import { faqs } from './faqs'
import { hero } from './hero'

/** Teljes tartalmi konfiguráció egyetlen objektumban. */
export const content = {
  business,
  hero,
  contact,
  serviceArea,
  openingHours,
  facts,
  trustMetrics,
  segments,
  problemCards,
  galleryCases,
  priceRanges,
  cooperationModels,
  processSteps,
  guarantee,
  technologies,
  faqs,
  legalLinks,
  tracking,
  formEndpoint,
}

export type Content = typeof content
