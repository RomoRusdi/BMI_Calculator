import Logo from './Logo.jsx'

/** Desktop-only backdrop echoing the reference: lime squiggle, asterisk, corner logo. */
export default function Decor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <path
          d="M-80 360 C 120 320 250 170 420 230 C 610 300 470 640 650 650 C 820 660 760 120 940 70 C 1090 30 1110 380 1270 430 C 1370 460 1450 380 1540 300"
          stroke="#c5f04a"
          strokeWidth="40"
          strokeLinecap="round"
        />
      </svg>
      <svg viewBox="0 0 48 48" className="absolute right-14 top-12 h-14 w-14">
        <path
          d="M24 4v40M6.7 14l34.6 20M6.7 34l34.6-20"
          stroke="#c5f04a"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute bottom-12 left-12">
        <Logo tone="lime" className="text-5xl" />
      </div>
    </div>
  )
}
