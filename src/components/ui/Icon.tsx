/**
 * Ikonkészlet – egyszerű, műszaki vonalrajzok, inline SVG-ként.
 * Nincs külső ikonkönyvtár, így nem növeli a JS csomagot.
 */
import type { SVGProps } from 'react'

export type IconName =
  | 'cast'
  | 'engine'
  | 'wheel'
  | 'frame'
  | 'steel'
  | 'handshake'
  | 'phone'
  | 'whatsapp'
  | 'viber'
  | 'mail'
  | 'camera'
  | 'upload'
  | 'close'
  | 'menu'
  | 'check'
  | 'arrow-right'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'alert'
  | 'clock'
  | 'pin'
  | 'shield'
  | 'zoom'
  | 'info'

const paths: Record<IconName, JSX.Element> = {
  // Öntvény / tört alkatrész
  cast: (
    <>
      <path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7Z" />
      <path d="m9 7 2.5 4.5L9 14l3 3" />
    </>
  ),
  // Motorblokk
  engine: (
    <>
      <path d="M3 10h3V7h5v3h4l3 3v4h2v3H5v-6H3v-4Z" />
      <path d="M8 4h4" />
    </>
  ),
  // Felni
  wheel: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v5M12 15v5M4 12h5M15 12h5" />
    </>
  ),
  // Váz / szerkezet
  frame: (
    <>
      <path d="M4 4h16v16H4z" />
      <path d="M4 4l16 16M20 4 4 20" />
    </>
  ),
  // Rozsdamentes lemez
  steel: (
    <>
      <path d="M3 7h18v10H3z" />
      <path d="M7 7v10M11 7v10M15 7v10" />
    </>
  ),
  // Partnerség
  handshake: (
    <>
      <path d="m3 12 4-4 5 3 5-3 4 4-4 5-3-2-2 2-3-2-3 2-3-5Z" />
    </>
  ),
  phone: <path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />,
  whatsapp: (
    <>
      <path d="M4 20l1.4-4A8 8 0 1 1 8 18.6L4 20Z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.4 1-1l-1.6-.8-.9.9a5.6 5.6 0 0 1-2.6-2.6l.9-.9L10.5 9c-.6 0-1.5.1-1.5.5Z" />
    </>
  ),
  viber: (
    <>
      <path d="M12 3c4.5 0 7 2.4 7 6.6 0 4.2-2.5 6.6-7 6.6-.7 0-1.3 0-1.9-.1L6 19v-3.2C4.7 14.6 4 12.6 4 9.6 4 5.4 7.5 3 12 3Z" />
      <path d="M9.5 8c0 2.5 1.8 4.4 4.2 4.6" />
    </>
  ),
  mail: (
    <>
      <path d="M3 6h18v12H3z" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M4 16v3h16v-3" />
    </>
  ),
  close: <path d="M5 5l14 14M19 5 5 19" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  check: <path d="m4 12 5 5L20 6" />,
  'arrow-right': <path d="M4 12h15m-6-6 6 6-6 6" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  'chevron-left': <path d="m15 6-6 6 6 6" />,
  'chevron-right': <path d="m9 6 6 6-6 6" />,
  alert: (
    <>
      <path d="M12 4 2.5 20h19L12 4Z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3Z" />
      <path d="m8.5 12 2.5 2.5L16 10" />
    </>
  ),
  zoom: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.5-4.5M11 9v4M9 11h4" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
}

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: number
}

export function Icon({ name, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  )
}
