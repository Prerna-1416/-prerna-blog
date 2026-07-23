function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

function seeded(s) {
  let x = Math.sin(s * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

const gradients = [
  ['from-emerald-50', 'to-teal-50'],
  ['from-rose-50', 'to-orange-50'],
  ['from-blue-50', 'to-indigo-50'],
  ['from-amber-50', 'to-yellow-50'],
  ['from-violet-50', 'to-fuchsia-50'],
  ['from-cyan-50', 'to-sky-50'],
  ['from-lime-50', 'to-green-50'],
  ['from-pink-50', 'to-red-50'],
]

function Arc({ x, y, r, deg, ...props }) {
  const start = ((90 - deg / 2) * Math.PI) / 180
  const end = ((90 + deg / 2) * Math.PI) / 180
  const x1 = x + r * Math.cos(start)
  const y1 = y - r * Math.sin(start)
  const x2 = x + r * Math.cos(end)
  const y2 = y - r * Math.sin(end)
  const large = deg > 180 ? 1 : 0
  return (
    <path
      d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 0 ${x2} ${y2}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      {...props}
    />
  )
}

function elementLibrary(seed, cx, cy, w, h) {
  const s = (i) => seeded(seed + i * 137)
  const elems = []
  let ei = 0

  const add = (fn) => { elems.push(fn); ei++ }

  const r = () => s(ei * 7 + 3)

  // blueprint arc
  add(() => (
    <Arc
      key="arc"
      x={cx + w * 0.3 + r() * w * 0.2}
      y={cy + h * 0.3 + r() * h * 0.2}
      r={Math.min(w, h) * (0.15 + r() * 0.15)}
      deg={60 + r() * 60}
      opacity={0.08 + r() * 0.07}
    />
  ))

  // dashed guide line
  add(() => (
    <line
      key="guide"
      x1={cx + r() * w * 0.6}
      y1={cy + r() * h * 0.6}
      x2={cx + w * 0.8 + r() * w * 0.2}
      y2={cy + r() * h * 0.6}
      stroke="currentColor"
      strokeWidth="0.5"
      strokeDasharray="2 4"
      opacity={0.06 + r() * 0.06}
    />
  ))

  // coordinate crosshair
  add(() => {
    const xx = cx + w * 0.2 + r() * w * 0.6
    const yy = cy + h * 0.2 + r() * h * 0.6
    return (
      <g key="cross" opacity={0.08 + r() * 0.06}>
        <line x1={xx - 10} y1={yy} x2={xx + 10} y2={yy} stroke="currentColor" strokeWidth="0.5" />
        <line x1={xx} y1={yy - 10} x2={xx} y2={yy + 10} stroke="currentColor" strokeWidth="0.5" />
        <circle cx={xx} cy={yy} r={2} fill="currentColor" opacity={0.3} />
      </g>
    )
  })

  // ruler ticks
  add(() => {
    const xx = cx + w * 0.1 + r() * w * 0.7
    const yy = cy + h * 0.7 + r() * h * 0.2
    return (
      <g key="ruler" opacity={0.07 + r() * 0.05}>
        <line x1={xx} y1={yy} x2={xx + 50} y2={yy} stroke="currentColor" strokeWidth="0.4" />
        {[0, 10, 20, 30, 40, 50].map((dx) => (
          <line
            key={dx}
            x1={xx + dx}
            y1={yy}
            x2={xx + dx}
            y2={yy + (dx % 10 === 0 ? 6 : 3)}
            stroke="currentColor"
            strokeWidth="0.4"
          />
        ))}
      </g>
    )
  })

  // binary digits
  add(() => {
    const xx = cx + r() * w * 0.8
    const yy = cy + r() * h * 0.8
    return (
      <text
        key="binary"
        x={xx}
        y={yy}
        fontSize="6"
        fill="currentColor"
        opacity={0.08 + r() * 0.06}
        fontFamily="monospace"
      >
        {r() > 0.5 ? '01' : '10'}
      </text>
    )
  })

  // cipher wheel
  add(() => {
    const xx = cx + w * 0.15 + r() * w * 0.5
    const yy = cy + h * 0.15 + r() * h * 0.5
    const rr = 10 + r() * 8
    return (
      <g key="cipher" opacity={0.06 + r() * 0.05}>
        <circle cx={xx} cy={yy} r={rr} fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx={xx} cy={yy} r={rr * 0.7} fill="none" stroke="currentColor" strokeWidth="0.3" />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * 2 * Math.PI) / 8
          return (
            <line
              key={i}
              x1={xx + rr * 0.7 * Math.cos(a)}
              y1={yy + rr * 0.7 * Math.sin(a)}
              x2={xx + rr * Math.cos(a)}
              y2={yy + rr * Math.sin(a)}
              stroke="currentColor"
              strokeWidth="0.3"
            />
          )
        })}
      </g>
    )
  })

  // network node
  add(() => {
    const xx = cx + w * 0.2 + r() * w * 0.5
    const yy = cy + h * 0.2 + r() * h * 0.5
    const xx2 = cx + w * 0.4 + r() * w * 0.5
    const yy2 = cy + h * 0.3 + r() * h * 0.5
    return (
      <g key="node" opacity={0.07 + r() * 0.05}>
        <line x1={xx} y1={yy} x2={xx2} y2={yy2} stroke="currentColor" strokeWidth="0.3" />
        <circle cx={xx} cy={yy} r={2.5} fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx={xx} cy={yy} r={1} fill="currentColor" opacity={0.3} />
      </g>
    )
  })

  // organic leaf
  add(() => {
    const xx = cx + r() * w * 0.7
    const yy = cy + r() * h * 0.7
    return (
      <path
        key="leaf"
        d={`M ${xx} ${yy} C ${xx + 8} ${yy - 4}, ${xx + 12} ${yy + 2}, ${xx} ${yy + 8} C ${xx - 12} ${yy + 2}, ${xx - 8} ${yy - 4}, ${xx} ${yy} Z`}
        fill="currentColor"
        opacity={0.04 + r() * 0.04}
      />
    )
  })

  // compass circle
  add(() => (
    <circle
      key="compass"
      cx={cx + w * 0.3 + r() * w * 0.4}
      cy={cy + h * 0.3 + r() * h * 0.4}
      r={8 + r() * 10}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.4"
      strokeDasharray="3 3"
      opacity={0.06 + r() * 0.05}
    />
  ))

  // star
  add(() => {
    const xx = cx + r() * w * 0.9
    const yy = cy + r() * h * 0.9
    const d = 4 + r() * 3
    return (
      <path
        key="star"
        d={`M ${xx} ${yy - d} L ${xx + d * 0.3} ${yy - d * 0.3} L ${xx + d} ${yy} L ${xx + d * 0.3} ${yy + d * 0.3} L ${xx} ${yy + d} L ${xx - d * 0.3} ${yy + d * 0.3} L ${xx - d} ${yy} L ${xx - d * 0.3} ${yy - d * 0.3} Z`}
        fill="currentColor"
        opacity={0.06 + r() * 0.06}
      />
    )
  })

  // ink dots
  add(() => {
    const xx = cx + w * 0.3 + r() * w * 0.5
    const yy = cy + h * 0.3 + r() * h * 0.5
    return (
      <g key="inkdots" opacity={0.05 + r() * 0.05}>
        <circle cx={xx} cy={yy} r={1.5} fill="currentColor" />
        <circle cx={xx + 4 + r() * 4} cy={yy - 2 - r() * 3} r={1} fill="currentColor" />
      </g>
    )
  })

  // angle indicator
  add(() => {
    const xx = cx + w * 0.1 + r() * w * 0.6
    const yy = cy + h * 0.1 + r() * h * 0.6
    const ang = 30 + r() * 60
    const rad = 12 + r() * 8
    const a1 = (0 * Math.PI) / 180
    const a2 = (ang * Math.PI) / 180
    return (
      <g key="angle" opacity={0.06 + r() * 0.04}>
        <path
          d={`M ${xx} ${yy} L ${xx + rad * 2} ${yy}`}
          stroke="currentColor" strokeWidth="0.3"
        />
        <path
          d={`M ${xx} ${yy} L ${xx + rad * 1.5 * Math.cos(a2)} ${yy - rad * 1.5 * Math.sin(a2)}`}
          stroke="currentColor" strokeWidth="0.3"
        />
        <path
          d={`M ${xx + rad * Math.cos(a1)} ${yy - rad * Math.sin(a1)} A ${rad} ${rad} 0 0 0 ${xx + rad * Math.cos(a2)} ${yy - rad * Math.sin(a2)}`}
          fill="none" stroke="currentColor" strokeWidth="0.3"
        />
      </g>
    )
  })

  // hex pair
  add(() => {
    const pairs = ['A3', '7F', '9C', '4E', 'B1', 'D8', '2A', 'F5']
    const p = pairs[Math.floor(r() * pairs.length)]
    const xx = cx + r() * w * 0.8
    const yy = cy + r() * h * 0.8
    return (
      <text
        key="hex"
        x={xx}
        y={yy}
        fontSize="5"
        fill="currentColor"
        opacity={0.06 + r() * 0.05}
        fontFamily="monospace"
      >
        {p}
      </text>
    )
  })

  // measurement line
  add(() => {
    const xx = cx + w * 0.1 + r() * w * 0.3
    const yy = cy + h * 0.4 + r() * h * 0.3
    return (
      <g key="measure" opacity={0.06 + r() * 0.04}>
        <line x1={xx} y1={yy} x2={xx + 40} y2={yy} stroke="currentColor" strokeWidth="0.3" />
        <line x1={xx} y1={yy - 2} x2={xx} y2={yy + 2} stroke="currentColor" strokeWidth="0.3" />
        <line x1={xx + 40} y1={yy - 2} x2={xx + 40} y2={yy + 2} stroke="currentColor" strokeWidth="0.3" />
        <text x={xx + 16} y={yy - 3} fontSize="4" fill="currentColor" opacity={0.5}>
          — —
        </text>
      </g>
    )
  })

  return { elements: elems, gradient: gradients[seed % gradients.length] }
}

export default function BlogCardSVG({ slug, className = '' }) {
  const seed = hash(slug)
  const { elements, gradient } = elementLibrary(seed, 0, 0, 400, 200)

  return (
    <svg
      viewBox="0 0 400 200"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`card-bg-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.03" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.08" />
        </linearGradient>
        <filter id={`card-texture-${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
          <feBlend in="SourceGraphic" in2="gray" mode="multiply" />
        </filter>
      </defs>
      <rect width="400" height="200" fill={`url(#card-bg-${seed})`} />
      <g filter={`url(#card-texture-${seed})`} className="text-text">
        {elements.map((el, i) => (
          <g key={i}>{el}</g>
        ))}
      </g>
    </svg>
  )
}
