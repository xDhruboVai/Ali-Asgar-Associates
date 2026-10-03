import type { ReactElement } from 'react'

/**
 * An isometric drawing of a four-storey building on its site, used by the
 * turnkey section. Every part carries the stage of the journey it belongs to
 * (data-stage 1–6) and, where it is built floor by floor, its floor and role,
 * so Motion.tsx can assemble it in order: the plot, the grid, the outline,
 * the structure, the floors under a crane, then the finished facade.
 *
 * The markup is the finished building, so without motion it is simply shown
 * complete. The outline and the crane are temporary (`bd-temp`) and hidden
 * in that final state.
 */

const W = 150 // plan width (x)
const D = 100 // plan depth (y)
const H = 34 // floor to floor
const T = 5 // slab thickness
const FLOORS = 4
const ROOF = FLOORS * H

type P = [x: number, y: number, z: number]
type Faces = { top: string; left: string; right: string }

const round = (n: number) => Math.round(n * 10) / 10

/** Builds the drawing once; the geometry never changes. */
function draw() {
  const bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
  const iso = ([x, y, z]: P): [number, number] => {
    const sx = round((x - y) * 0.866)
    const sy = round((x + y) * 0.5 - z)
    bounds.minX = Math.min(bounds.minX, sx)
    bounds.maxX = Math.max(bounds.maxX, sx)
    bounds.minY = Math.min(bounds.minY, sy)
    bounds.maxY = Math.max(bounds.maxY, sy)
    return [sx, sy]
  }
  const pts = (ps: P[]) => ps.map((p) => iso(p).join(',')).join(' ')

  let key = 0
  const k = () => key++
  const poly = (ps: P[], className: string) => <polygon key={k()} points={pts(ps)} className={className} />
  const path = (ps: P[], className: string) => <polyline key={k()} points={pts(ps)} className={className} />
  const line = (a: P, b: P, className: string) => {
    const [x1, y1] = iso(a)
    const [x2, y2] = iso(b)
    return <line key={k()} x1={x1} y1={y1} x2={x2} y2={y2} className={className} />
  }
  /** A box; only the faces seen from this side are drawn. */
  const box = (x: number, y: number, w: number, d: number, z: number, h: number, f: Faces) => {
    const [x1, y1, z1] = [x + w, y + d, z + h]
    return [
      poly([[x, y1, z], [x1, y1, z], [x1, y1, z1], [x, y1, z1]], f.left),
      poly([[x1, y, z], [x1, y1, z], [x1, y1, z1], [x1, y, z1]], f.right),
      poly([[x, y, z1], [x1, y, z1], [x1, y1, z1], [x, y1, z1]], f.top),
    ]
  }
  /** A circle lying on a horizontal plane. */
  const disc = (x: number, y: number, z: number, r: number, className: string) => {
    const [cx, cy] = iso([x, y, z])
    return <ellipse key={k()} cx={cx} cy={cy} rx={round(r * 1.2247)} ry={round(r * 0.7071)} className={className} />
  }
  const label = (x: number, y: number, z: number, text: string) => {
    const [cx, cy] = iso([x, y, z])
    return (
      <text key={k()} x={cx} y={cy} className="bd-label" textAnchor="middle" dominantBaseline="central">
        {text}
      </text>
    )
  }

  const solid: Faces = { top: 'bd-top', left: 'bd-left', right: 'bd-right' }
  const red: Faces = { top: 'bd-red', left: 'bd-red-deep', right: 'bd-red-deep' }

  const groups: ReactElement[] = []
  const group = (stage: number, children: ReactElement[], extra: { floor?: number; role?: string; temp?: boolean } = {}) =>
    groups.push(
      <g
        key={k()}
        data-stage={stage || undefined}
        data-floor={extra.floor}
        data-role={extra.role}
        className={extra.temp ? 'bd-temp' : undefined}
      >
        {children}
      </g>,
    )

  const GX = [-45, W + 60] // ground plate, x
  const GY = [-40, D + 45] // ground plate, y
  const colsX = [6, W / 2, W - 6]
  const colsY = [6, D / 2, D - 6]

  // 0 — the empty site: a ground plate and its shadow.
  group(0, [
    poly(
      [[GX[0] + 14, GY[0] + 14, -8], [GX[1] + 14, GY[0] + 14, -8], [GX[1] + 14, GY[1] + 14, -8], [GX[0] + 14, GY[1] + 14, -8]],
      'bd-shadow',
    ),
    ...box(GX[0], GY[0], GX[1] - GX[0], GY[1] - GY[0], -8, 8, { top: 'bd-ground', left: 'bd-left', right: 'bd-right' }),
  ])

  // 1 — Vision: the plot boundary.
  group(1, [
    path([[-36, -30, 0], [W + 50, -30, 0], [W + 50, D + 36, 0], [-36, D + 36, 0], [-36, -30, 0]], 'bd-plot'),
  ])

  // 2 — Planning: the footprint and the structural grid, with its bubbles.
  const grid: ReactElement[] = [path([[0, 0, 0], [W, 0, 0], [W, D, 0], [0, D, 0], [0, 0, 0]], 'bd-dash')]
  colsY.forEach((y, i) => {
    grid.push(line([-14, y, 0], [W + 16, y, 0], 'bd-axis'), disc(W + 22, y, 0, 6, 'bd-bubble'), label(W + 22, y, 0, 'ABC'[i]))
  })
  colsX.forEach((x, i) => {
    grid.push(line([x, -14, 0], [x, D + 16, 0], 'bd-axis'), disc(x, D + 22, 0, 6, 'bd-bubble'), label(x, D + 22, 0, String(i + 1)))
  })
  group(2, grid)

  // 4 — Engineering: pile caps under every column.
  const footings: ReactElement[] = []
  for (const x of colsX) for (const y of colsY) footings.push(...box(x - 5, y - 5, 10, 10, 0, 3, red))
  group(4, footings, { role: 'footings' })

  // Floor by floor, back to front: the designed frame (4), the columns (5),
  // the walls (6) and the slab (5).
  for (let f = 1; f <= FLOORS; f++) {
    const z0 = (f - 1) * H
    const z1 = f * H - T

    const frame: ReactElement[] = []
    for (const x of colsX) for (const y of colsY) frame.push(line([x, y, z0], [x, y, f * H], 'bd-frame'))
    frame.push(path([[colsX[0], D - 6, f * H], [colsX[2], D - 6, f * H], [colsX[2], 6, f * H]], 'bd-frame'))
    group(4, frame, { floor: f, role: 'frame' })

    const cols: ReactElement[] = []
    for (const x of colsX) for (const y of colsY) cols.push(line([x, y, z0], [x, y, z1], 'bd-col'))
    group(5, cols, { floor: f, role: 'cols' })

    // Walls with ribbon windows on the two faces in view; the entrance on the ground floor.
    const walls: ReactElement[] = [
      poly([[0, D, z0], [W, D, z0], [W, D, z1], [0, D, z1]], 'bd-left'),
      poly([[W, 0, z0], [W, D, z0], [W, D, z1], [W, 0, z1]], 'bd-right'),
    ]
    for (let i = 0; i < 5; i++) {
      if (f === 1 && i === 2) continue
      const x = 9 + i * 28.5
      walls.push(poly([[x, D, z0 + 7], [x + 18, D, z0 + 7], [x + 18, D, z1 - 6], [x, D, z1 - 6]], 'bd-glass'))
    }
    for (let i = 0; i < 3; i++) {
      const y = 10 + i * 30
      walls.push(poly([[W, y, z0 + 7], [W, y + 20, z0 + 7], [W, y + 20, z1 - 6], [W, y, z1 - 6]], 'bd-glass'))
    }
    if (f === 1) walls.push(poly([[W / 2 - 10, D, 0], [W / 2 + 10, D, 0], [W / 2 + 10, D, 21], [W / 2 - 10, D, 21]], 'bd-red'))
    group(6, walls, { floor: f, role: 'walls' })

    group(5, box(0, 0, W, D, z1, T, solid), { floor: f, role: 'slab' })
  }

  // 6 — Completion: the parapet, the stair room and the water tank on the roof.
  group(
    6,
    [
      ...box(0, 0, W, D, ROOF, 6, solid),
      path([[5, 5, ROOF + 6], [W - 5, 5, ROOF + 6], [W - 5, D - 5, ROOF + 6], [5, D - 5, ROOF + 6], [5, 5, ROOF + 6]], 'bd-thin'),
      ...box(16, 14, 38, 30, ROOF + 6, 16, solid),
      ...box(W - 42, 16, 22, 18, ROOF + 6, 10, red),
    ],
    { role: 'roof' },
  )

  // 1 — Vision: trees on the site, in front of the building.
  const tree = (x: number, y: number, s: number) => {
    const [cx, cy] = iso([x, y, 22 * s])
    return [
      line([x, y, 0], [x, y, 16 * s], 'bd-trunk'),
      <circle key={k()} cx={cx} cy={cy} r={round(9 * s)} className="bd-tree" />,
    ]
  }
  group(1, [...tree(-28, D - 2, 1), ...tree(-20, D + 26, 0.8), ...tree(W + 52, D + 40, 1.1)])

  // 3 — Design: the drawn envelope of the whole building, hidden edges included.
  const t = ROOF + 6
  group(
    3,
    [
      path([[0, 0, 0], [0, 0, t], [W, 0, t], [W, D, t], [0, D, t], [0, 0, t]], 'bd-dash'),
      line([W, 0, 0], [W, 0, t], 'bd-dash'),
      line([W, D, 0], [W, D, t], 'bd-dash'),
      line([0, D, 0], [0, D, t], 'bd-dash'),
      ...[1, 2, 3].map((f) => path([[0, D, f * H], [W, D, f * H], [W, 0, f * H]], 'bd-dash bd-dash--fine')),
    ],
    { temp: true },
  )

  // 5 — Construction: a tower crane beside the building.
  const cx = W + 26
  const cy = -14
  const top = ROOF + 44
  const crane: ReactElement[] = [
    ...box(cx - 6, cy - 6, 12, 12, 0, 4, red),
    line([cx - 2, cy, 4], [cx - 2, cy, top], 'bd-crane'),
    line([cx + 2, cy, 4], [cx + 2, cy, top], 'bd-crane'),
  ]
  for (let z = 4; z < top - 8; z += 12) crane.push(line([cx - 2, cy, z], [cx + 2, cy, z + 12], 'bd-crane-thin'))
  crane.push(
    line([cx - 120, cy, top], [cx + 30, cy, top], 'bd-crane'),
    line([cx, cy, top + 16], [cx - 104, cy, top], 'bd-crane-thin'),
    line([cx, cy, top + 16], [cx + 28, cy, top], 'bd-crane-thin'),
    line([cx - 76, cy, top], [cx - 76, cy, ROOF + 22], 'bd-cable'),
    ...box(cx - 84, cy - 6, 16, 12, ROOF + 14, 6, solid),
    ...box(cx + 18, cy - 5, 12, 10, top - 8, 8, red),
  )
  group(5, crane, { role: 'crane', temp: true })

  const pad = 12
  const viewBox = [
    bounds.minX - pad,
    bounds.minY - pad,
    bounds.maxX - bounds.minX + pad * 2,
    bounds.maxY - bounds.minY + pad * 2,
  ]
    .map(round)
    .join(' ')
  return { groups, viewBox }
}

const DRAWING = draw()

export function BuildingDrawing() {
  return (
    <svg className="bd" viewBox={DRAWING.viewBox} role="img" aria-labelledby="bd-title">
      <title id="bd-title">
        Isometric drawing of a four-storey building on its site, built up stage by stage from the plot to the finished
        building
      </title>
      {DRAWING.groups}
    </svg>
  )
}
