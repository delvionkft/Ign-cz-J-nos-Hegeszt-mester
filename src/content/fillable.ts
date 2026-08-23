/**
 * Kötelezően kitöltendő tartalmak jelölése.
 *
 * Használat a tartalmi fájlokban:
 *
 *   phoneDisplay: todo('Telefonszám, pl. +36 30 123 4567'),
 *
 * Az így megjelölt mezők:
 *  - fejlesztői módban láthatóan meg vannak jelölve az oldalon (Tartalmi teendők panel),
 *  - production buildben nem jelennek meg nyers helykitöltőként,
 *  - a `npm run check:content` parancs kilistázza és hibával áll le, ha maradt kitöltetlen.
 */

/** A jelölés prefixe. Nem jelenik meg élesben. */
export const TODO_PREFIX = '⁣TODO⁣:'

/** Kitöltendő tartalom létrehozása, magyar nyelvű útmutatóval. */
export function todo(hint: string): string {
  return `${TODO_PREFIX}${hint}`
}

/** Igaz, ha az érték még kitöltetlen helykitöltő (vagy üres). */
export function isTodo(value: unknown): value is string {
  return typeof value === 'string' && (value.trim() === '' || value.startsWith(TODO_PREFIX))
}

/** A kitöltendő mező magyar nyelvű útmutatója. */
export function todoHint(value: string): string {
  return value.startsWith(TODO_PREFIX) ? value.slice(TODO_PREFIX.length) : 'Kitöltendő tartalom'
}

/**
 * Élesben megjelenítendő érték.
 * Kitöltetlen tartalom esetén `null`, így a komponens elrejtheti az adott elemet.
 */
export function resolve(value: string | undefined | null): string | null {
  if (value == null) return null
  return isTodo(value) ? null : value
}
