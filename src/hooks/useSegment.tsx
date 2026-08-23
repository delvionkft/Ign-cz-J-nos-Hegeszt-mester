/**
 * SZEGMENSÁLLAPOT
 * ---------------
 * Az oldal egyetlen megosztott állapota: melyik problémakártyát választotta
 * a látogató, és ebből melyik fő szegmens következik.
 *
 * A választás:
 *  - bekerül az URL `?kategoria=` paraméterébe (megosztható, visszatölthető),
 *  - eltárolódik, így oldalfrissítés után is visszaáll,
 *  - mérési eseményt küld,
 *  - frissíti a fájdalomblokkot, galériát, árakat, folyamatot, garanciát, GYIK-et és az űrlapot.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { defaultSegment, problemCardById, problemCards } from '@/content'
import type { ProblemId, SegmentId } from '@/content/types'
import { setAnalyticsContext, track } from '@/lib/analytics'

const QUERY_KEY = 'kategoria'
const STORAGE_KEY = 'selected-problem'

interface SegmentContextValue {
  segment: SegmentId
  problem: ProblemId | null
  /** Kiválasztás. A `location` a mérési eseménybe kerül. */
  selectProblem: (problem: ProblemId, location: string) => void
  /** Csak a fő szegmens váltása (pl. galéria szűrő fejlécéből). */
  selectSegment: (segment: SegmentId, location: string) => void
}

const SegmentContext = createContext<SegmentContextValue | null>(null)

function isProblemId(value: string | null): value is ProblemId {
  return Boolean(value) && problemCards.some((card) => card.id === value)
}

function readInitialProblem(): ProblemId | null {
  if (typeof window === 'undefined') return null

  const fromUrl = new URLSearchParams(window.location.search).get(QUERY_KEY)
  if (isProblemId(fromUrl)) return fromUrl

  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY)
    if (isProblemId(stored)) return stored
  } catch {
    // tárolás nem elérhető – nem kritikus
  }
  return null
}

export function SegmentProvider({ children }: { children: ReactNode }) {
  const [problem, setProblem] = useState<ProblemId | null>(() => readInitialProblem())
  const [segmentOverride, setSegmentOverride] = useState<SegmentId | null>(null)

  const segment: SegmentId = problem ? problemCardById[problem].segment : segmentOverride ?? defaultSegment

  // URL, tárolás és mérési kontextus szinkronizálása.
  useEffect(() => {
    const url = new URL(window.location.href)
    if (problem) {
      url.searchParams.set(QUERY_KEY, problem)
      try {
        window.sessionStorage.setItem(STORAGE_KEY, problem)
      } catch {
        // nem kritikus
      }
    } else {
      url.searchParams.delete(QUERY_KEY)
    }
    window.history.replaceState({}, '', url)
    setAnalyticsContext(segment, problem)
  }, [problem, segment])

  // Vissza/előre gomb kezelése.
  useEffect(() => {
    const onPopState = () => {
      const fromUrl = new URLSearchParams(window.location.search).get(QUERY_KEY)
      setProblem(isProblemId(fromUrl) ? fromUrl : null)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const selectProblem = useCallback((next: ProblemId, location: string) => {
    setProblem((current) => {
      // Ismételt kattintás ugyanarra a kártyára megtartja a kiválasztást.
      const value = current === next ? current : next
      track('segment_select', {
        segment: problemCardById[value].segment,
        problem: value,
        location,
      })
      return value
    })
    setSegmentOverride(null)
  }, [])

  const selectSegment = useCallback((next: SegmentId, location: string) => {
    setProblem(null)
    setSegmentOverride(next)
    track('segment_select', { segment: next, problem: null, location })
  }, [])

  const value = useMemo(
    () => ({ segment, problem, selectProblem, selectSegment }),
    [segment, problem, selectProblem, selectSegment],
  )

  return <SegmentContext.Provider value={value}>{children}</SegmentContext.Provider>
}

export function useSegment(): SegmentContextValue {
  const ctx = useContext(SegmentContext)
  if (!ctx) throw new Error('useSegment csak SegmentProvider-en belül használható')
  return ctx
}
