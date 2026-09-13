function icon(paths) {
  return function Icon({ className = 'h-5 w-5', strokeWidth = 2.5 }) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {paths}
      </svg>
    )
  }
}

export const IconCheck = icon(<path d="M5 12.5l4.5 4.5L19 7.5" />)
export const IconX = icon(<path d="M6 6l12 12M18 6L6 18" />)
export const IconPlus = icon(<path d="M12 5v14M5 12h14" />)
export const IconMinus = icon(<path d="M5 12h14" />)
export const IconDownload = icon(<path d="M12 4v11m-4.5-4.5L12 15l4.5-4.5M5 20h14" />)
export const IconRuler = icon(
  <>
    <path d="M3 17.5 17.5 3 21 6.5 6.5 21z" />
    <path d="M7.5 13l2 2M10.5 10l2 2M13.5 7l2 2" />
  </>,
)
export const IconScale = icon(
  <>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
    <path d="M7.5 10a5.5 5.5 0 0 1 9 0" />
    <path d="M12 12l2-3" />
  </>,
)
