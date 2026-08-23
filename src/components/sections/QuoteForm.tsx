/**
 * FOTÓFELTÖLTÉSES AJÁNLATKÉRŐ ŰRLAP
 * ---------------------------------
 * Az oldal fő konverziós pontja.
 *
 * - A mezők a kiválasztott szegmenshez igazodnak (B2B esetén partneri kapcsolatfelvétel).
 * - A kategória a problémaválasztóból töltődik, és módosítható.
 * - A képfeltöltés típus- és méretellenőrzést végez, előnézetet mutat, eltávolítás lehetséges.
 * - Hibaüzenet soha nem csak színnel jelenik meg (ikon + szöveg + aria-invalid).
 * - A tényleges küldést a src/lib/formAdapter.ts végzi; hamis sikerüzenet élesben nem lehetséges.
 */
import { forwardRef, useEffect, useId, useRef, useState } from 'react'
import { formEndpoint, legalLinks, problemCards, segments } from '@/content'
import { resolve } from '@/content/fillable'
import type { ProblemId } from '@/content/types'
import { useSegment } from '@/hooks/useSegment'
import { track } from '@/lib/analytics'
import { submitLead } from '@/lib/formAdapter'
import type { SubmitResult } from '@/lib/formAdapter'
import { cn, formatBytes } from '@/lib/utils'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { ContactChannels, hasContactChannels } from '@/components/ui/ContactChannels'

interface PhotoItem {
  id: string
  file: File
  /** Object URL az előnézethez; HEIC esetén a böngésző nem tudja megjeleníteni. */
  previewUrl: string
  previewable: boolean
}

interface Errors {
  name?: string
  phone?: string
  company?: string
  message?: string
  photos?: string
  consent?: string
}

const PREVIEWABLE = ['image/jpeg', 'image/png', 'image/webp']

/** Magyar telefonszám elfogadó, de nem túl szigorú ellenőrzés. */
function isValidPhone(value: string): boolean {
  const digits = value.replace(/[^\d]/g, '')
  return digits.length >= 9 && digits.length <= 13 && /^[\d\s+()/-]+$/.test(value)
}

export function QuoteForm() {
  const { segment, problem, selectProblem } = useSegment()
  const copy = segments[segment].form
  const isB2b = segment === 'b2b'

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<SubmitResult | null>(null)

  const started = useRef(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const cameraInputRef = useRef<HTMLInputElement | null>(null)
  const summaryRef = useRef<HTMLDivElement | null>(null)
  const ids = useId()

  const fieldId = (key: string) => `${ids}-${key}`

  // Object URL-ek felszabadítása.
  useEffect(() => {
    return () => {
      photos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const markStarted = () => {
    if (started.current) return
    started.current = true
    track('form_start', { location: 'quote_form', segment, problem, contactMethod: 'form' })
  }

  const addFiles = (fileList: FileList | null, source: 'file' | 'camera') => {
    if (!fileList || fileList.length === 0) return
    markStarted()

    const incoming = Array.from(fileList)
    const accepted: PhotoItem[] = []
    let rejection: string | null = null

    for (const file of incoming) {
      if (photos.length + accepted.length >= formEndpoint.maxPhotos) {
        rejection = `Legfeljebb ${formEndpoint.maxPhotos} képet lehet feltölteni.`
        break
      }
      const typeOk =
        formEndpoint.acceptedTypes.includes(file.type) ||
        /\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)
      if (!typeOk) {
        rejection = `A(z) „${file.name}” fájl típusa nem támogatott. JPG, PNG, WebP vagy HEIC fájlt tudok fogadni.`
        continue
      }
      if (file.size > formEndpoint.maxFileSizeMb * 1024 * 1024) {
        rejection = `A(z) „${file.name}” fájl túl nagy (${formatBytes(file.size)}). Fájlonként legfeljebb ${formEndpoint.maxFileSizeMb} MB tölthető fel.`
        continue
      }
      accepted.push({
        id: `${file.name}-${file.size}-${accepted.length}-${photos.length}`,
        file,
        previewUrl: URL.createObjectURL(file),
        previewable: PREVIEWABLE.includes(file.type),
      })
    }

    if (accepted.length > 0) {
      setPhotos((current) => [...current, ...accepted])
      setErrors((current) => ({ ...current, photos: rejection ?? undefined }))
      track('photo_upload', {
        location: 'quote_form',
        segment,
        problem,
        count: accepted.length,
        source,
      })
    } else if (rejection) {
      setErrors((current) => ({ ...current, photos: rejection ?? undefined }))
      track('form_error', { location: 'quote_form', segment, problem, field: 'photos', reason: rejection })
    }
  }

  const removePhoto = (id: string) => {
    setPhotos((current) => {
      const target = current.find((photo) => photo.id === id)
      if (target) URL.revokeObjectURL(target.previewUrl)
      return current.filter((photo) => photo.id !== id)
    })
  }

  const validate = (): Errors => {
    const next: Errors = {}
    if (name.trim().length < 2) next.name = 'Kérlek, add meg a neved.'
    if (!isValidPhone(phone)) next.phone = 'Kérlek, adj meg egy érvényes telefonszámot, hogy vissza tudjak hívni.'
    if (isB2b && company.trim().length < 2) next.company = 'Kérlek, add meg a cég nevét.'
    if (isB2b && message.trim().length < 3)
      next.message = 'Írd le röviden, milyen típusú munkákhoz keresel partnert.'
    if (copy.photosRequired && photos.length === 0)
      next.photos = 'Legalább egy fotó szükséges, hogy megmondjam, javítható-e.'
    if (!consent) next.consent = 'Az ajánlatadáshoz szükséges az adatkezelési hozzájárulás.'
    return next
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const validation = validate()
    setErrors(validation)

    if (Object.keys(validation).length > 0) {
      track('form_error', {
        location: 'quote_form',
        segment,
        problem,
        fields: Object.keys(validation).join(','),
      })
      // Fókusz az első hibás mezőre.
      const first = Object.keys(validation)[0]
      document.getElementById(fieldId(first))?.focus()
      return
    }

    setSubmitting(true)
    const problemLabel = problem
      ? (problemCards.find((card) => card.id === problem)?.title ?? '')
      : segments[segment].label

    const response = await submitLead({
      segment,
      problem,
      problemLabel,
      name: name.trim(),
      phone: phone.trim(),
      company: isB2b ? company.trim() : undefined,
      message: message.trim(),
      consent,
      photos: photos.map((photo) => photo.file),
      source: Object.fromEntries(new URLSearchParams(window.location.search).entries()),
      pageUrl: window.location.href,
    })

    setSubmitting(false)
    setResult(response)

    if (response.status === 'success') {
      track('lead_submit', {
        location: 'quote_form',
        segment,
        problem,
        contactMethod: 'form',
        photo_count: photos.length,
        mocked: response.mocked,
      })
    } else {
      track('form_error', {
        location: 'quote_form',
        segment,
        problem,
        reason: response.status,
      })
    }

    window.setTimeout(() => summaryRef.current?.focus(), 0)
  }

  const privacy = legalLinks.find((link) => link.id === 'privacy')
  const privacyHref = privacy ? resolve(privacy.href) : null

  return (
    <Section id="ajanlatkeres" tone="pit" labelledBy="ajanlatkeres-cim" index="09" glow="brand" glowAt={{ x: '35%', y: '35%' }}>
      <SectionHeading
        id="ajanlatkeres-cim"
        kicker="Ajánlatkérés"
        title={copy.title}
        subtitle={copy.subtitle}
      />

      <div className="grid gap-5 lg:grid-cols-[1.55fr_1fr] lg:gap-8">
        {/* --- Az űrlap --- */}
        <div className="corner-marks relative border border-white/15 bg-panel/50 p-5 shadow-lift backdrop-blur-sm sm:p-8">
          {result?.status === 'success' ? (
            <SuccessPanel mocked={result.mocked} onReset={() => setResult(null)} ref={summaryRef} />
          ) : (
            <form onSubmit={onSubmit} noValidate>
              {(result?.status === 'error' || result?.status === 'unconfigured') && (
                <div
                  ref={summaryRef}
                  tabIndex={-1}
                  role="alert"
                  className="mb-5 flex gap-3 rounded-sm border border-brand bg-brand/10 p-4"
                >
                  <Icon name="alert" size={20} className="mt-0.5 shrink-0 text-brand-light" />
                  <div>
                    <p className="text-sm font-semibold text-paper">A küldés nem sikerült</p>
                    <p className="mt-1 text-sm text-alu">{result.message}</p>
                    <ContactChannels location="form_error" className="mt-3" />
                  </div>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id={fieldId('name')}
                  label={isB2b ? 'Kapcsolattartó neve' : 'Neved'}
                  error={errors.name}
                  required
                >
                  <input
                    id={fieldId('name')}
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    onFocus={markStarted}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? `${fieldId('name')}-error` : undefined}
                    className={inputClass(Boolean(errors.name))}
                  />
                </Field>

                {isB2b && (
                  <Field id={fieldId('company')} label="Cégnév" error={errors.company} required>
                    <input
                      id={fieldId('company')}
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                      onFocus={markStarted}
                      aria-invalid={Boolean(errors.company)}
                      aria-describedby={errors.company ? `${fieldId('company')}-error` : undefined}
                      className={inputClass(Boolean(errors.company))}
                    />
                  </Field>
                )}

                <Field id={fieldId('phone')} label="Telefonszám" error={errors.phone} required>
                  <input
                    id={fieldId('phone')}
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+36 30 123 4567"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    onFocus={markStarted}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? `${fieldId('phone')}-error` : undefined}
                    className={inputClass(Boolean(errors.phone))}
                  />
                </Field>

                <Field id={fieldId('category')} label="Miről van szó" hint="A választásod alapján előre kitöltve">
                  <select
                    id={fieldId('category')}
                    name="category"
                    value={problem ?? ''}
                    onChange={(event) => {
                      markStarted()
                      const value = event.target.value as ProblemId | ''
                      if (value) selectProblem(value, 'quote_form_select')
                    }}
                    className={inputClass(false)}
                  >
                    <option value="" disabled>
                      Válassz kategóriát
                    </option>
                    {problemCards.map((card) => (
                      <option key={card.id} value={card.id}>
                        {card.title}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-4">
                <Field
                  id={fieldId('message')}
                  label={isB2b ? 'Milyen típusú munkákhoz keresel partnert?' : 'Rövid leírás'}
                  error={errors.message}
                  required={isB2b}
                  hint={isB2b ? undefined : 'Elég egy mondat – a részleteket a fotók elmondják.'}
                >
                  <input
                    id={fieldId('message')}
                    name="message"
                    type="text"
                    maxLength={180}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onFocus={markStarted}
                    placeholder={
                      isB2b
                        ? 'Pl. alumínium alkatrészek javítása szervizmunkákhoz'
                        : 'Pl. letört a váltóház füle, a szerviz cserét javasolt'
                    }
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? `${fieldId('message')}-error` : undefined}
                    className={inputClass(Boolean(errors.message))}
                  />
                </Field>
              </div>

              {/* --- Képfeltöltés --- */}
              <div className="mt-5">
                <PhotoUpload
                  id={fieldId('photos')}
                  photos={photos}
                  required={copy.photosRequired}
                  error={errors.photos}
                  onPick={() => fileInputRef.current?.click()}
                  onCamera={() => cameraInputRef.current?.click()}
                  onRemove={removePhoto}
                />
                <input
                  ref={fileInputRef}
                  id={fieldId('photos')}
                  type="file"
                  name="photos"
                  multiple
                  accept={formEndpoint.acceptAttribute}
                  onChange={(event) => {
                    addFiles(event.target.files, 'file')
                    event.target.value = ''
                  }}
                  className="sr-only"
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(event) => {
                    addFiles(event.target.files, 'camera')
                    event.target.value = ''
                  }}
                  className="sr-only"
                  aria-hidden="true"
                  tabIndex={-1}
                />
              </div>

              {/* --- Hozzájárulás --- */}
              <div className="mt-5">
                <label htmlFor={fieldId('consent')} className="flex cursor-pointer items-start gap-3">
                  <input
                    id={fieldId('consent')}
                    name="consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => {
                      markStarted()
                      setConsent(event.target.checked)
                    }}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={errors.consent ? `${fieldId('consent')}-error` : undefined}
                    className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-sm border-alu/50 bg-transparent text-brand accent-[#D71920]"
                  />
                  <span className="text-sm leading-relaxed text-alu">
                    Hozzájárulok, hogy a megadott adataimat az ajánlatadáshoz és a kapcsolatfelvételhez
                    felhasználják.{' '}
                    {privacyHref ? (
                      <a
                        href={privacyHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-light underline underline-offset-2 hover:text-paper"
                      >
                        Adatkezelési tájékoztató
                      </a>
                    ) : (
                      <span className="text-steel">(Adatkezelési tájékoztató)</span>
                    )}
                    <span className="text-brand-light" aria-hidden="true">
                      {' '}
                      *
                    </span>
                  </span>
                </label>
                {errors.consent && <ErrorText id={`${fieldId('consent')}-error`}>{errors.consent}</ErrorText>}
              </div>

              <Button type="submit" size="lg" disabled={submitting} className="mt-7 w-full">
                {submitting ? 'Küldés folyamatban…' : copy.submitLabel}
              </Button>

              <p className="mt-3 text-xs leading-relaxed text-steel">
                A csillaggal jelölt mezők kitöltése kötelező. Az ajánlatkérés nem jár kötelezettséggel.
              </p>
            </form>
          )}
        </div>

        {/* --- Alternatív csatornák --- */}
        <aside className="h-fit border border-white/12 bg-pit p-5 shadow-edge sm:p-7 lg:sticky lg:top-32">
          {hasContactChannels() && (
            <>
              <h3 className="font-display text-lg font-semibold uppercase leading-tight text-paper">
                Nem szeretnél űrlapot kitölteni?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-alu">
                Küldd el a fotókat közvetlenül WhatsAppon vagy Viberen – ugyanúgy megkapod az előzetes ársávot.
              </p>
              <ContactChannels location="form_sidebar" variant="stack" className="mt-4 mb-6" />
            </>
          )}

          <h4 className="font-display text-label font-semibold uppercase text-steel">
            Milyen fotó a jó?
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-alu">
            {[
              'Egy közeli a sérülésről, éles fókusszal',
              'Egy távolabbi az egész alkatrészről',
              'Ha van, egy kép a beépítési helyről',
              'Természetes fény vagy jó megvilágítás',
            ].map((tip) => (
              <li key={tip} className="flex gap-2">
                <Icon name="check" size={16} className="mt-0.5 shrink-0 text-brand" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------

function inputClass(hasError: boolean) {
  return cn(
    'w-full rounded-sm border bg-ink px-3.5 py-3 text-base text-paper shadow-edge transition-colors duration-150',
    'placeholder:text-steel focus:border-brand focus:outline-none',
    hasError ? 'border-brand' : 'border-white/15 hover:border-alu/40',
  )
}

function Field({
  id,
  label,
  error,
  required,
  hint,
  children,
}: {
  id: string
  label: string
  error?: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-paper">
        {label}
        {required && (
          <span className="text-brand-light" aria-hidden="true">
            {' '}
            *
          </span>
        )}
        {required && <span className="sr-only"> (kötelező)</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-steel">{hint}</p>}
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  )
}

/** Hibaüzenet – ikon + szöveg, nem csak szín. */
function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-start gap-1.5 text-sm text-brand-light">
      <Icon name="alert" size={15} className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </p>
  )
}

function PhotoUpload({
  id,
  photos,
  required,
  error,
  onPick,
  onCamera,
  onRemove,
}: {
  id: string
  photos: PhotoItem[]
  required: boolean
  error?: string
  onPick: () => void
  onCamera: () => void
  onRemove: (id: string) => void
}) {
  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-paper">
        Fotók
        {required ? (
          <>
            <span className="text-brand-light" aria-hidden="true">
              {' '}
              *
            </span>
            <span className="sr-only"> (kötelező)</span>
          </>
        ) : (
          <span className="ml-1 text-xs font-normal text-steel">(opcionális)</span>
        )}
      </p>

      <div
        className={cn(
          'rounded-sm border border-dashed p-5',
          error ? 'border-brand bg-brand/[0.07]' : 'border-white/20 bg-ink/60',
        )}
      >
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={onPick} aria-describedby={`${id}-hint`}>
            <Icon name="upload" size={18} />
            Fotó kiválasztása
          </Button>
          {/* Mobilon közvetlen kamerahasználat. */}
          <Button variant="secondary" onClick={onCamera} className="sm:hidden">
            <Icon name="camera" size={18} />
            Fotózás most
          </Button>
        </div>

        <p id={`${id}-hint`} className="mt-2 text-xs leading-relaxed text-steel">
          {photos.length}/{formEndpoint.maxPhotos} kép • JPG, PNG, WebP vagy HEIC • fájlonként legfeljebb{' '}
          {formEndpoint.maxFileSizeMb} MB
        </p>

        {photos.length > 0 && (
          <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {photos.map((photo) => (
              <li key={photo.id} className="relative">
                <div className="aspect-square overflow-hidden rounded-sm border border-white/10 bg-panel">
                  {photo.previewable ? (
                    <img
                      src={photo.previewUrl}
                      alt={`Feltöltött kép: ${photo.file.name}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    // HEIC/HEIF előnézetet a böngészők nem tudnak megjeleníteni.
                    <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-1 text-center">
                      <Icon name="camera" size={18} className="text-steel" />
                      <span className="w-full truncate text-[10px] text-alu">{photo.file.name}</span>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(photo.id)}
                  className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-ink text-alu transition-colors hover:bg-brand hover:text-white"
                  aria-label={`${photo.file.name} eltávolítása`}
                >
                  <Icon name="close" size={13} />
                </button>
                <span className="mt-1 block text-[10px] text-steel">{formatBytes(photo.file.size)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  )
}

const SuccessPanel = forwardRef<HTMLDivElement, { mocked: boolean; onReset: () => void }>(
  function SuccessPanel({ mocked, onReset }, ref) {
    return (
      <div ref={ref} tabIndex={-1} role="status" className="py-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-sm border border-brand bg-brand/10">
          <Icon name="check" size={26} className="text-brand-light" />
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold uppercase text-paper">
          Megkaptam, köszönöm!
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-alu">
          Átnézem a fotókat, és jelentkezem az előzetes ársávval és a várható átfutással. Ha közben
          eszedbe jut valami, hívj nyugodtan.
        </p>

        {mocked && import.meta.env.DEV && (
          <p className="mt-4 rounded-sm border border-brand/50 bg-brand/10 p-3 text-xs leading-relaxed text-brand-light">
            FEJLESZTŐI MOCK: nincs beállítva <code>VITE_FORM_ENDPOINT</code>, ezért a beküldés csak
            szimulált. Production buildben ilyenkor hibaüzenet jelenik meg, nem sikeres állapot.
          </p>
        )}

        <ContactChannels location="form_success" className="mt-5" />

        <button
          type="button"
          onClick={onReset}
          className="mt-5 text-sm text-alu underline underline-offset-4 transition-colors hover:text-paper"
        >
          Új ajánlatkérés küldése
        </button>
      </div>
    )
  },
)
