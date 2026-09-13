import Button from '../components/Button.jsx'
import Logo from '../components/Logo.jsx'
import Mascot from '../components/Mascot.jsx'
import { IconDownload, IconRuler, IconScale, IconX } from '../components/Icons.jsx'
import { getCategory, needleAngle, round1 } from '../lib/bmi.js'
import { dateLabel, fmt, fmtKg, initials, relativeDay, timeLabel } from '../lib/format.js'

const TABS = [
  { key: 'latest', label: 'Terakhir' },
  { key: 'history', label: 'Riwayat' },
]

export default function Home({ profile, history, tab, onTab, onStart, onDelete, onHelp, onInstall }) {
  return (
    <>
      <header className="flex items-center justify-between bg-card px-5 pb-3 pt-[max(env(safe-area-inset-top),16px)]">
        <Logo />
        <div className="flex items-center gap-3">
          {onInstall && (
            <button
              type="button"
              onClick={onInstall}
              className="flex h-8 items-center gap-1.5 rounded-full border-2 border-line px-3 text-xs font-bold uppercase tracking-wide transition hover:border-lime hover:text-lime"
            >
              <IconDownload className="h-3.5 w-3.5" strokeWidth={3} />
              Pasang
            </button>
          )}
          <button
            type="button"
            onClick={onHelp}
            aria-label="Apa itu BMI?"
            className="grid h-7 w-7 place-items-center rounded-full bg-white text-sm font-bold text-ink transition active:scale-90"
          >
            ?
          </button>
          <span className="h-10 w-10 rounded-full bg-lime p-[3px]" title={profile.name || undefined}>
            <span className="grid h-full w-full place-items-center rounded-full border-2 border-ink font-logo text-xs text-ink">
              {initials(profile.name)}
            </span>
          </span>
        </div>
      </header>

      <main className="no-scrollbar min-h-0 flex-1 animate-rise overflow-y-auto px-5 pb-10 pt-5">
        <section className="sticker flex items-center gap-3 rounded-2xl bg-lime p-4 text-ink">
          <div className="grid h-14 w-14 shrink-0 -rotate-6 place-items-center rounded-lg border-2 border-ink bg-white">
            <IconScale className="h-8 w-8" strokeWidth={2.2} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold leading-tight">Cek BMI kamu</h2>
            <p className="mt-0.5 text-xs leading-snug text-ink/75">Cukup tinggi & berat badan. Kurang dari semenit.</p>
          </div>
          <button
            type="button"
            onClick={onStart}
            className="shrink-0 rounded-lg bg-ink px-3.5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition active:scale-95"
          >
            Mulai
          </button>
        </section>

        <h1 className="mt-7 truncate text-[32px] font-semibold tracking-tight">
          {profile.name ? `Hai, ${profile.name}` : 'Data kamu'}
        </h1>

        <div role="tablist" className="mt-3 grid grid-cols-2 border-b border-line">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => onTab(t.key)}
              className={`relative pb-2.5 text-sm font-medium transition ${tab === t.key ? 'text-white' : 'text-mute'}`}
            >
              {t.label}
              {t.key === 'history' && history.length > 0 && (
                <span className="ml-1.5 font-mono text-[11px] text-mute">{history.length}</span>
              )}
              {tab === t.key && <span className="absolute inset-x-0 -bottom-px h-[3px] bg-lime" />}
            </button>
          ))}
        </div>

        {history.length === 0 ? (
          <EmptyState onStart={onStart} />
        ) : tab === 'latest' ? (
          <LatestCard entry={history[0]} previous={history[1]} />
        ) : (
          <HistoryList history={history} onDelete={onDelete} />
        )}
      </main>
    </>
  )
}

function LatestCard({ entry, previous }) {
  const category = getCategory(entry.bmi)
  const change = previous ? round1(round1(entry.bmi) - round1(previous.bmi)) : null

  return (
    <article key={entry.id} className="mt-5 animate-rise overflow-hidden rounded-2xl bg-card">
      <div className="p-3">
        <div
          className="relative flex h-44 items-end overflow-hidden rounded-xl p-4 text-ink"
          style={{
            background: category.color,
            backgroundImage: 'radial-gradient(rgb(0 0 0 / 0.12) 1.5px, transparent 1.5px)',
            backgroundSize: '14px 14px',
          }}
        >
          <div className="relative z-10">
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider">BMI kamu</p>
            <p className="text-[64px] font-bold leading-[0.9] tracking-tighter tabular-nums">{fmt(entry.bmi)}</p>
          </div>
          <Mascot
            mood={category.mood}
            needle={needleAngle(entry.bmi)}
            className="absolute -bottom-6 right-1 h-48 w-auto animate-pop"
          />
        </div>
      </div>

      <div className="px-4 pb-4">
        <h3 className="text-xl font-bold leading-tight">Kategori {category.label}</h3>
        <p className="mt-2 font-mono text-[11px] uppercase">
          <span className="text-lime">{relativeDay(entry.ts)}</span>
          <span className="text-mute">
            {' '}
            • {dateLabel(entry.ts)} | {timeLabel(entry.ts)}
          </span>
        </p>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-1.5 text-xs text-mute">
          <IconRuler className="h-3.5 w-3.5" strokeWidth={2} />
          {entry.height} cm · {fmtKg(entry.weight)} kg
          {change !== null && (
            <span className="text-white/80">
              {' '}
              · {change === 0 ? 'sama seperti sebelumnya' : `${change > 0 ? '▲' : '▼'} ${fmt(Math.abs(change))} dari sebelumnya`}
            </span>
          )}
        </p>
      </div>

      <div className="bg-card-2 px-4 py-3">
        <p className="font-mono text-[11px] uppercase tracking-wider text-mute">Saran buat kamu:</p>
        <p className="mt-0.5 text-xs leading-relaxed text-white/80">{category.tip}</p>
      </div>
    </article>
  )
}

function HistoryList({ history, onDelete }) {
  return (
    <ul className="mt-1 animate-rise">
      {history.map((entry) => {
        const category = getCategory(entry.bmi)
        return (
          <li key={entry.id} className="flex items-center gap-3 border-b border-line py-3">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-xs font-bold tabular-nums text-ink"
              style={{ background: category.color }}
            >
              {fmt(entry.bmi)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {category.label}
                <span className="font-normal text-mute">
                  {' '}
                  · {entry.height} cm, {fmtKg(entry.weight)} kg
                </span>
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase text-mute">
                {dateLabel(entry.ts)} | {timeLabel(entry.ts)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onDelete(entry.id)}
              aria-label={`Hapus catatan ${dateLabel(entry.ts)}`}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-ink transition active:scale-90"
            >
              <IconX className="h-3.5 w-3.5" strokeWidth={3.5} />
            </button>
          </li>
        )
      })}
    </ul>
  )
}

function EmptyState({ onStart }) {
  return (
    <div className="mt-8 flex flex-col items-center text-center">
      <Mascot mood="wave" className="h-40 w-auto animate-float" />
      <h3 className="mt-5 text-xl font-bold">Belum ada catatan</h3>
      <p className="mt-1 max-w-[16rem] text-sm text-mute">Hitung BMI pertamamu dan hasilnya bakal muncul di sini.</p>
      <Button className="mt-6" onClick={onStart}>
        Hitung sekarang
      </Button>
    </div>
  )
}
