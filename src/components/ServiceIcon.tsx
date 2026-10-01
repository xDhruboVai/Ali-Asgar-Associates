/** Line illustrations for the five service lines, drawn like drawing-sheet symbols. */
export function ServiceIcon({ id, className }: { id: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[id] ?? ICONS.consultancy}
    </svg>
  )
}

const ICONS: Record<string, React.ReactNode> = {
  // Floor plan
  consultancy: (
    <>
      <path d="M6 6h52v52H6z" />
      <path d="M6 30h22M36 30h22M32 6v16M32 38v20" />
      <path d="M28 30a8 8 0 0 1 8-8" />
      <path d="M44 58v-10h14" />
    </>
  ),
  // Braced structural frame
  structural: (
    <>
      <path d="M10 58V8M32 58V8M54 58V8" />
      <path d="M10 8h44M10 25h44M10 42h44" />
      <path d="M10 42l22-17M32 25l22 17M10 25L32 8" />
      <path d="M4 58h56" />
    </>
  ),
  // Existing building under inspection
  dea: (
    <>
      <path d="M8 58V20h24v38M32 58V32h14" />
      <path d="M14 28h4M22 28h4M14 36h4M22 36h4M14 44h4M22 44h4" />
      <circle cx="46" cy="26" r="12" />
      <path d="M46 20v12M40 26h12M55 35l7 7" />
      <path d="M4 58h56" />
    </>
  ),
  // Tower crane
  'construction-management': (
    <>
      <path d="M20 58V10M26 58V10M20 10h6" />
      <path d="M20 18l6 8M26 26l-6 8M20 34l6 8M26 42l-6 8" />
      <path d="M8 16h52M23 4v6M23 4l33 12M23 4L10 16" />
      <path d="M48 16v14M44 30h8v6h-8z" />
      <path d="M12 58h22" />
    </>
  ),
  // Finished building and key
  turnkey: (
    <>
      <path d="M8 58V14l18-8v52M26 22h14v36" />
      <path d="M14 22h6M14 30h6M14 38h6M14 46h6M31 30h4M31 38h4M31 46h4" />
      <circle cx="51" cy="24" r="6" />
      <path d="M51 30v22M51 44h5M51 50h5" />
      <path d="M4 58h56" />
    </>
  ),
}
