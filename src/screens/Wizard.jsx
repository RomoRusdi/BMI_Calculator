import Button from '../components/Button.jsx'
import Mascot from '../components/Mascot.jsx'
import NumberDial from '../components/NumberDial.jsx'
import Stepper from '../components/Stepper.jsx'
import TopBar from '../components/TopBar.jsx'
import { calcBmi, getCategory, needleAngle } from '../lib/bmi.js'
import { fmt, toFeet, toPounds } from '../lib/format.js'

export default function Wizard({ step, draft, onChange, onNext, onBack, onClose }) {
  const update = (field) => (value) => onChange({ ...draft, [field]: value })

  return (
    <>
      <TopBar onClose={onClose} />
      <div className="bg-card pb-8 pt-2">
        <Stepper current={step} />
      </div>

      <main key={step} className="no-scrollbar min-h-0 flex-1 animate-rise overflow-y-auto px-5 pb-6 pt-6">
        {step === 0 && <StepProfile draft={draft} update={update} onNext={onNext} />}
        {step === 1 && <StepHeight draft={draft} update={update} />}
        {step === 2 && <StepWeight draft={draft} update={update} />}
      </main>

      <footer className="bg-night px-5 pb-[max(env(safe-area-inset-bottom),16px)] pt-3">
        <Button className="w-full" onClick={onNext}>
          {step === 2 ? 'Hitung BMI' : 'Lanjut'}
        </Button>
        <Button variant="ghost" className="mt-1 w-full" onClick={onBack}>
          {step === 0 ? 'Batal' : 'Kembali'}
        </Button>
      </footer>
    </>
  )
}

function Intro({ mood, needle, title, children }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Mascot mood={mood} needle={needle} className="h-32 w-auto animate-float" />
      <h1 className="mt-4 text-[30px] font-bold leading-[1.1] tracking-tight">{title}</h1>
      <p className="mt-2 max-w-[19rem] text-sm text-white/70">{children}</p>
    </div>
  )
}

function StepProfile({ draft, update, onNext }) {
  return (
    <>
      <Intro mood="wave" title="Kenalan dulu, yuk!">
        Nama dipakai buat nyapa kamu. Usia bantu kami membaca hasilnya.
      </Intro>

      <form
        className="mt-6 space-y-3"
        onSubmit={(e) => {
          e.preventDefault()
          onNext()
        }}
      >
        <label className="block rounded-2xl bg-card p-4 ring-lime transition focus-within:ring-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-mute">Nama panggilan (opsional)</span>
          <input
            value={draft.name}
            onChange={(e) => update('name')(e.target.value)}
            placeholder="Misal: Sasa"
            maxLength={20}
            autoComplete="nickname"
            className="mt-1 w-full bg-transparent text-2xl font-bold outline-none placeholder:text-white/25"
          />
        </label>

        <NumberDial label="Usia" unit="tahun" value={draft.age} onChange={update('age')} min={2} max={100} />
      </form>

      {draft.age < 18 && (
        <p className="mt-3 rounded-2xl border-2 border-dashed border-amber/60 px-4 py-3 text-xs leading-relaxed text-amber">
          Untuk usia di bawah 18 tahun, BMI dibaca dengan grafik persentil sesuai usia & jenis kelamin. Hasil di sini
          memakai standar dewasa, jadi anggap sebagai perkiraan saja.
        </p>
      )}
    </>
  )
}

function StepHeight({ draft, update }) {
  return (
    <>
      <Intro mood="think" title="Seberapa tinggi kamu?">
        Ukur tanpa alas kaki biar hasilnya akurat.
      </Intro>
      <div className="mt-6">
        <NumberDial
          label="Tinggi badan"
          hint={`≈ ${toFeet(draft.height)}`}
          unit="cm"
          value={draft.height}
          onChange={update('height')}
          min={80}
          max={230}
        />
      </div>
    </>
  )
}

function StepWeight({ draft, update }) {
  const bmi = calcBmi(draft.height, draft.weight)
  const category = getCategory(bmi)

  return (
    <>
      <Intro mood="wave" needle={needleAngle(bmi)} title="Berapa berat badanmu?">
        Paling pas ditimbang pagi hari sebelum sarapan.
      </Intro>
      <div className="mt-6">
        <NumberDial
          label="Berat badan"
          hint={`≈ ${toPounds(draft.weight)}`}
          unit="kg"
          value={draft.weight}
          onChange={update('weight')}
          min={10}
          max={250}
          step={0.1}
          nudge={0.5}
          digits={1}
        />
      </div>
      <div className="mt-3 flex items-center justify-between rounded-2xl border-2 border-dashed border-line px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-mute">Intip BMI</span>
        <span className="text-sm font-bold">
          {fmt(bmi)} · <span style={{ color: category.color }}>{category.label}</span>
        </span>
      </div>
    </>
  )
}
