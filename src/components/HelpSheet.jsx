import { useEffect } from 'react'
import Button from './Button.jsx'
import { CATEGORIES } from '../lib/bmi.js'

export default function HelpSheet({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="absolute inset-0 z-40 flex items-end">
      <button type="button" aria-label="Tutup" onClick={onClose} className="absolute inset-0 animate-fade bg-black/60" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-title"
        className="no-scrollbar relative max-h-[88%] w-full animate-sheet overflow-y-auto rounded-t-3xl bg-card px-5 pb-[max(env(safe-area-inset-bottom),24px)] pt-3"
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-line" />
        <h2 id="help-title" className="text-2xl font-bold tracking-tight">
          Apa itu BMI?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/80">
          BMI (Body Mass Index) atau Indeks Massa Tubuh adalah angka yang membandingkan berat dengan tinggi badan.
          Dipakai untuk skrining cepat apakah berat badan kamu termasuk ideal.
        </p>

        <div className="mt-4 rounded-xl bg-night p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-mute">Rumus</p>
          <p className="mt-1 font-mono text-sm font-bold text-lime">BMI = berat (kg) ÷ tinggi (m)²</p>
          <p className="mt-2 text-xs text-mute">Contoh: 65 kg, 170 cm → 65 ÷ (1,7 × 1,7) = 22,5</p>
        </div>

        <ul className="mt-4">
          {CATEGORIES.map((c) => (
            <li key={c.key} className="flex items-center gap-3 border-b border-line py-2.5 last:border-0">
              <span className="h-3 w-3 rounded-full" style={{ background: c.color }} />
              <span className="flex-1 text-sm font-semibold">{c.label}</span>
              <span className="font-mono text-xs text-mute">{c.range}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs leading-relaxed text-mute">
          BMI tidak membedakan otot dan lemak, jadi atlet berotot bisa terbaca “gemuk”. Untuk anak di bawah 18 tahun,
          ibu hamil, dan lansia, hasilnya perlu dibaca oleh tenaga kesehatan.
        </p>

        <Button className="mt-5 w-full" onClick={onClose}>
          Oke, paham
        </Button>
      </div>
    </div>
  )
}
