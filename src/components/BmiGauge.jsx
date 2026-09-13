import { CATEGORIES, gaugePosition, getCategory } from '../lib/bmi.js'
import { fmt } from '../lib/format.js'

export default function BmiGauge({ bmi }) {
  const active = getCategory(bmi)
  const marker = Math.min(0.95, Math.max(0.05, gaugePosition(bmi)))

  return (
    <div>
      <div className="relative pt-8">
        <div
          className="absolute top-0 flex -translate-x-1/2 flex-col items-center transition-[left] duration-500"
          style={{ left: `${marker * 100}%` }}
        >
          <span className="rounded-md bg-white px-1.5 py-0.5 font-mono text-[11px] font-bold text-ink">{fmt(bmi)}</span>
          <span className="h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-white" />
        </div>
        <div className="flex h-3 gap-1">
          {CATEGORIES.map((c) => (
            <div
              key={c.key}
              className="flex-1 rounded-full"
              style={{ background: c.color, opacity: c.key === active.key ? 1 : 0.3 }}
            />
          ))}
        </div>
      </div>
      <div className="relative mt-2 h-4 font-mono text-[10px] text-mute">
        <span className="absolute left-0">{CATEGORIES[0].min}</span>
        {CATEGORIES.slice(1).map((c, i) => (
          <span
            key={c.key}
            className="absolute -translate-x-1/2"
            style={{ left: `${((i + 1) / CATEGORIES.length) * 100}%` }}
          >
            {fmt(c.min, Number.isInteger(c.min) ? 0 : 1)}
          </span>
        ))}
        <span className="absolute right-0">{CATEGORIES[CATEGORIES.length - 1].max}</span>
      </div>
    </div>
  )
}
