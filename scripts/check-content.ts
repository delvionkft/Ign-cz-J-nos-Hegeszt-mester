/**
 * Tartalmi ellenőrző parancssorból.
 *
 *   npm run check:content
 *
 * Kilistázza a még kitöltetlen, kötelező tartalmakat. Ha maradt teendő,
 * 1-es hibakóddal áll le – így CI-ben vagy élesítés előtti ellenőrzésben
 * megfogható, hogy az oldal még nem tekinthető késznek.
 */
import { auditContent } from '../src/content/validate'

const missing = auditContent()

if (missing.length === 0) {
  console.log('\n✅ Minden kötelező tartalom ki van töltve. Az oldal élesíthető.\n')
  process.exit(0)
}

console.log(`\n⚠️  ${missing.length} kitöltetlen kötelező tartalom maradt:\n`)

const grouped = new Map<string, typeof missing>()
for (const item of missing) {
  const group = item.path.split(/[.[]/)[0]
  const list = grouped.get(group) ?? []
  list.push(item)
  grouped.set(group, list)
}

for (const [group, items] of grouped) {
  console.log(`── ${group} (${items.length})`)
  for (const item of items) {
    console.log(`   • ${item.path}`)
    console.log(`     ${item.hint}`)
  }
  console.log('')
}

console.log('Részletes leírás: CONTENT_CHECKLIST.md\n')
process.exit(1)
