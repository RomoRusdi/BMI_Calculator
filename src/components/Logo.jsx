export default function Logo({ tone = 'white', className = 'text-[22px]' }) {
  return (
    <span
      className={`inline-flex items-center font-logo leading-none tracking-tight ${
        tone === 'lime' ? 'text-lime' : 'text-white'
      } ${className}`}
    >
      <span className="mr-[0.1em] rounded-[0.14em] border-[0.09em] border-current px-[0.14em] pb-[0.04em] pt-[0.02em]">
        CEK
      </span>
      BMI
    </span>
  )
}
