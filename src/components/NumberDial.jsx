import { useState } from 'react'
import { IconMinus, IconPlus } from './Icons.jsx'
import { fmt } from '../lib/format.js'

function RoundButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-line text-white transition hover:border-lime hover:text-lime active:scale-90"
    >
      {children}
    </button>
  )
}

export default function NumberDial({ label, hint, unit, value, onChange, min, max, step = 1, nudge = step, digits = 0 }) {
  // While typing we keep the raw text so partial input like "7" or "65," isn't clobbered.
  const [draft, setDraft] = useState(null)

  const set = (v) => {
    const clamped = Math.min(max, Math.max(min, v))
    setDraft(null)
    onChange(Number((Math.round(clamped / step) * step).toFixed(digits)))
  }

  const text = draft ?? fmt(value, digits)
  const percent = ((value - min) / (max - min)) * 100

  return (
    <div className="rounded-2xl bg-card p-4">
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-mute">
        <span>{label}</span>
        {hint && <span className="normal-case">{hint}</span>}
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <RoundButton label={`Kurangi ${label}`} onClick={() => set(value - nudge)}>
          <IconMinus />
        </RoundButton>

        <label className="flex min-w-0 items-baseline justify-center gap-1.5">
          <input
            inputMode={digits ? 'decimal' : 'numeric'}
            aria-label={label}
            value={text}
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              setDraft(e.target.value)
              const n = parseFloat(e.target.value.replace(',', '.'))
              if (!Number.isNaN(n) && n >= min && n <= max) onChange(n)
            }}
            onBlur={() => setDraft(null)}
            style={{ width: `${Math.max(text.length, 2) + 0.3}ch` }}
            className="bg-transparent text-center text-[56px] font-bold leading-none tracking-tight tabular-nums outline-none"
          />
          <span className="text-lg font-bold text-lime">{unit}</span>
        </label>

        <RoundButton label={`Tambah ${label}`} onClick={() => set(value + nudge)}>
          <IconPlus />
        </RoundButton>
      </div>

      <input
        type="range"
        aria-label={`Geser ${label}`}
        className="range mt-3"
        style={{ '--p': `${percent}%` }}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
      />
      <div className="flex justify-between font-mono text-[10px] text-mute">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}
