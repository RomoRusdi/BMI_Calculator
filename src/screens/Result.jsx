import BmiGauge from '../components/BmiGauge.jsx'
import Button from '../components/Button.jsx'
import Mascot from '../components/Mascot.jsx'
import Stepper from '../components/Stepper.jsx'
import TopBar from '../components/TopBar.jsx'
import { IconCheck } from '../components/Icons.jsx'
import { CATEGORIES, calcBmi, getCategory, idealRange, needleAngle, weightDelta } from '../lib/bmi.js'
import { fmt, fmtKg } from '../lib/format.js'

export default function Result({ draft, onSave, onEdit, onClose }) {
  const bmi = calcBmi(draft.height, draft.weight)
  const category = getCategory(bmi)
  const [low, high] = idealRange(draft.height)
  const delta = weightDelta(draft.height, draft.weight)

  let advice = 'Berat kamu sudah di rentang ideal. Pertahankan!'
  if (delta > 0) advice = `Naikkan sekitar ${fmt(delta)} kg untuk masuk rentang normal.`
  if (delta < 0) advice = `Turunkan sekitar ${fmt(-delta)} kg untuk masuk rentang normal.`

  return (
    <>
      <TopBar onClose={onClose} closeLabel="Tutup tanpa menyimpan" />
      <div className="bg-card pb-8 pt-2">
        <Stepper current={3} />
      </div>

      <main className="no-scrollbar min-h-0 flex-1 animate-rise overflow-y-auto px-5 pb-6 pt-6">
        <h1 className="text-[30px] font-bold leading-[1.1] tracking-tight">
          {draft.name ? `${draft.name}, ini hasil BMI kamu` : 'Ini hasil BMI kamu'}
        </h1>
        <p className="mt-2 text-sm text-white/70">
          Dari tinggi {draft.height} cm dan berat {fmtKg(draft.weight)} kg. Salah input? Ketuk “Ubah data”.
        </p>

        <section className="sticker relative mt-6 overflow-hidden rounded-2xl bg-lime p-5 text-ink">
          <p className="font-mono text-[11px] font-bold uppercase tracking-wider">BMI kamu</p>
          <p className="mt-1 text-[76px] font-bold leading-[0.9] tracking-tighter tabular-nums">{fmt(bmi)}</p>
          <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            <span className="h-2 w-2 rounded-full" style={{ background: category.color }} />
            {category.label}
          </span>
          <Mascot
            mood={category.mood}
            needle={needleAngle(bmi)}
            className="absolute -bottom-5 right-0 h-44 w-auto animate-pop"
          />
        </section>

        <section className="mt-6 rounded-2xl bg-card p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-mute">Posisi kamu</p>
          <div className="mt-2">
            <BmiGauge bmi={bmi} />
          </div>
        </section>

        <section className="mt-3 rounded-2xl bg-card p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-mute">
            Berat ideal untuk tinggi {draft.height} cm
          </p>
          <p className="mt-1 text-2xl font-bold tabular-nums">
            {fmt(low)} – {fmt(high)} <span className="text-base text-lime">kg</span>
          </p>
          <p className="mt-1 text-sm text-white/70">{advice}</p>
        </section>

        <h2 className="mt-7 text-lg font-bold">Kategori BMI</h2>
        <p className="text-xs text-mute">Klasifikasi Kemenkes RI untuk dewasa</p>
        <ul className="mt-1">
          {CATEGORIES.map((c) => {
            const active = c.key === category.key
            return (
              <li key={c.key} className="flex items-center gap-3 border-b border-line py-3 last:border-0">
                <span className="h-9 w-9 shrink-0 rounded-full p-[3px]" style={{ background: c.color }}>
                  <span className="block h-full w-full rounded-full border-2 border-ink/80" />
                </span>
                <span className={`flex-1 text-sm font-semibold ${active ? 'text-white' : 'text-white/55'}`}>
                  {c.label}
                </span>
                <span className="font-mono text-xs text-mute">{c.range}</span>
                {active ? (
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-lime text-ink" aria-label="Kategori kamu">
                    <IconCheck className="h-3.5 w-3.5" strokeWidth={3.5} />
                  </span>
                ) : (
                  <span className="h-6 w-6 rounded-full border-2 border-line" />
                )}
              </li>
            )
          })}
        </ul>

        <section className="mt-4 rounded-2xl bg-card-2 px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-wider text-mute">Saran buat kamu:</p>
          <p className="mt-0.5 text-sm leading-relaxed text-white/85">{category.tip}</p>
        </section>

        {draft.age < 18 && (
          <p className="mt-3 rounded-2xl border-2 border-dashed border-amber/60 px-4 py-3 text-xs leading-relaxed text-amber">
            Kamu di bawah 18 tahun — hasil ini memakai standar dewasa. Cek grafik BMI-menurut-usia bersama tenaga
            kesehatan untuk hasil yang tepat.
          </p>
        )}

        <p className="mt-4 text-[11px] leading-relaxed text-mute">
          BMI adalah alat skrining, bukan diagnosis. Konsultasikan dengan tenaga kesehatan untuk penilaian menyeluruh.
        </p>
      </main>

      <footer className="bg-night px-5 pb-[max(env(safe-area-inset-bottom),16px)] pt-3">
        <Button className="w-full" onClick={onSave}>
          Simpan ke riwayat
        </Button>
        <Button variant="ghost" className="mt-1 w-full" onClick={onEdit}>
          Ubah data
        </Button>
      </footer>
    </>
  )
}
