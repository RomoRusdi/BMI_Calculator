import { useEffect } from 'react'
import { IconCheck } from './Icons.jsx'

export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(onDismiss, 3500)
    return () => clearTimeout(timer)
  }, [toast, onDismiss])

  if (!toast) return null

  return (
    <div
      key={toast.id}
      role="status"
      className="absolute inset-x-0 bottom-[max(env(safe-area-inset-bottom),20px)] z-50 flex animate-rise justify-center px-5"
    >
      <div className="flex items-center gap-3 rounded-full bg-white py-2 pl-3 pr-2 text-sm font-semibold text-ink shadow-xl">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-lime">
          <IconCheck className="h-3.5 w-3.5" strokeWidth={3.5} />
        </span>
        {toast.message}
        {toast.action ? (
          <button
            type="button"
            onClick={() => {
              toast.action.run()
              onDismiss()
            }}
            className="rounded-full bg-ink px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
          >
            {toast.action.label}
          </button>
        ) : (
          <span className="w-1" />
        )}
      </div>
    </div>
  )
}
