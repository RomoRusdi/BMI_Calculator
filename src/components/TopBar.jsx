import Logo from './Logo.jsx'
import { IconX } from './Icons.jsx'

export default function TopBar({ onClose, closeLabel = 'Tutup' }) {
  return (
    <header className="grid grid-cols-[40px_1fr_40px] items-center bg-card px-4 pb-3 pt-[max(env(safe-area-inset-top),16px)]">
      <span />
      <div className="flex justify-center">
        <Logo />
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/10 active:scale-90"
        >
          <IconX className="h-5 w-5" />
        </button>
      )}
    </header>
  )
}
