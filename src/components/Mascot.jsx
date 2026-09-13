const INK = '#0f0f0f'
const LIME = '#c5f04a'

// A little bathroom-scale character in the spirit of the reference mascot.
const POSES = {
  wave: {
    left: 'M62 130 Q34 136 40 162',
    leftHand: [42, 166],
    right: 'M158 110 Q186 98 186 66',
    rightHand: [186, 58],
    finger: 'M187 48 L189 32',
  },
  happy: {
    left: 'M62 112 Q34 100 34 68',
    leftHand: [34, 60],
    right: 'M158 112 Q186 100 186 68',
    rightHand: [186, 60],
  },
  think: {
    left: 'M62 130 Q34 140 44 168',
    leftHand: [46, 172],
    right: 'M160 128 Q182 150 146 156',
    rightHand: [142, 156],
    rightInFront: true,
  },
  worried: {
    left: 'M62 118 Q34 112 42 84',
    leftHand: [44, 76],
    right: 'M158 118 Q186 112 178 84',
    rightHand: [176, 76],
  },
}

function Limb({ d }) {
  return (
    <>
      <path d={d} stroke={INK} strokeWidth="20" />
      <path d={d} stroke={LIME} strokeWidth="10" />
    </>
  )
}

function Hand({ at: [x, y] }) {
  return <circle cx={x} cy={y} r="11" fill={LIME} stroke={INK} strokeWidth="5" />
}

function Eyes({ mood }) {
  if (mood === 'happy') {
    return (
      <g stroke={INK} strokeWidth="5" fill="none">
        <path d="M84 131 Q92 119 100 131" />
        <path d="M120 131 Q128 119 136 131" />
      </g>
    )
  }
  const look = mood === 'think' ? 3 : 0
  return (
    <g>
      <ellipse cx={92 + look} cy="128" rx="5.5" ry="8.5" fill={INK} />
      <ellipse cx={128 + look} cy="128" rx="5.5" ry="8.5" fill={INK} />
      <circle cx={94 + look} cy="124" r="1.8" fill="#fff" />
      <circle cx={130 + look} cy="124" r="1.8" fill="#fff" />
      {mood === 'worried' && (
        <g stroke={INK} strokeWidth="4">
          <path d="M83 116 L99 110" />
          <path d="M137 116 L121 110" />
        </g>
      )}
      {mood === 'think' && <path d="M120 112 L138 110" stroke={INK} strokeWidth="4" />}
    </g>
  )
}

function Mouth({ mood }) {
  switch (mood) {
    case 'happy':
      return <path d="M94 145 Q110 168 126 145 Z" fill={INK} stroke={INK} strokeWidth="4" />
    case 'think':
      return <path d="M100 153 Q111 149 122 152" stroke={INK} strokeWidth="5" fill="none" />
    case 'worried':
      return <path d="M97 157 Q110 145 123 157" stroke={INK} strokeWidth="5" fill="none" />
    default:
      return <path d="M96 146 Q110 160 124 146" stroke={INK} strokeWidth="5" fill="none" />
  }
}

export default function Mascot({ mood = 'wave', needle = 0, className = '' }) {
  const pose = POSES[mood] ?? POSES.wave
  const rightArm = (
    <>
      <Limb d={pose.right} />
      {pose.finger && <Limb d={pose.finger} />}
      <Hand at={pose.rightHand} />
    </>
  )

  return (
    <svg
      viewBox="0 0 220 240"
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Maskot CekBMI"
      overflow="visible"
    >
      {/* legs */}
      <Limb d="M92 172 Q88 196 78 210" />
      <Limb d="M128 172 Q134 196 144 210" />
      <ellipse cx="70" cy="214" rx="17" ry="9" fill={LIME} stroke={INK} strokeWidth="5" />
      <ellipse cx="152" cy="214" rx="17" ry="9" fill={LIME} stroke={INK} strokeWidth="5" />

      {/* arms behind the body */}
      <Limb d={pose.left} />
      <Hand at={pose.leftHand} />
      {!pose.rightInFront && rightArm}

      <g transform="rotate(-5 110 115)">
        <rect x="56" y="46" width="108" height="132" rx="28" fill={LIME} stroke={INK} strokeWidth="6" />
        {/* scale dial */}
        <rect x="76" y="62" width="68" height="40" rx="15" fill={INK} />
        <g stroke={LIME} strokeWidth="3">
          <path d="M88 92 l-4 -2" />
          <path d="M110 76 v-4" />
          <path d="M132 92 l4 -2" />
        </g>
        <g transform="translate(110 97)">
          <path
            d="M0 0 V-20"
            stroke={LIME}
            strokeWidth="4"
            style={{
              transform: `rotate(${needle}deg)`,
              transformOrigin: '0 0',
              transition: 'transform 0.6s cubic-bezier(0.3, 1.6, 0.5, 1)',
            }}
          />
          <circle r="4" fill={LIME} />
        </g>
        <Eyes mood={mood} />
        <Mouth mood={mood} />
      </g>

      {pose.rightInFront && rightArm}

      {mood === 'worried' && (
        <path d="M168 44 q7 11 0 16 q-7 -5 0 -16 z" fill="#8ec5ff" stroke={INK} strokeWidth="3" />
      )}
    </svg>
  )
}
