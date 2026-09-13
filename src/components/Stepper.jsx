import { Fragment } from 'react'
import { IconCheck } from './Icons.jsx'

export const STEPS = ['Profil', 'Tinggi', 'Berat', 'Hasil']

export default function Stepper({ current }) {
  return (
    <ol className="flex items-start px-6" aria-label={`Langkah ${current + 1} dari ${STEPS.length}`}>
      {STEPS.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <Fragment key={label}>
            <li className="relative flex flex-col items-center" aria-current={active ? 'step' : undefined}>
              {done || active ? (
                <span className="h-10 w-10 rounded-full bg-lime p-[3px]">
                  <span className="grid h-full w-full place-items-center rounded-full border-2 border-ink text-sm font-bold text-ink">
                    {done ? <IconCheck className="h-4 w-4" strokeWidth={3.5} /> : i + 1}
                  </span>
                </span>
              ) : (
                <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-line bg-night text-sm font-semibold text-white">
                  {i + 1}
                </span>
              )}
              <span
                className={`absolute top-full mt-1.5 whitespace-nowrap text-xs font-medium transition-opacity ${
                  active ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {label}
              </span>
            </li>
            {i < STEPS.length - 1 && (
              <li aria-hidden="true" className={`mt-[19px] h-[3px] flex-1 ${done ? 'bg-lime' : 'bg-line'}`} />
            )}
          </Fragment>
        )
      })}
    </ol>
  )
}
