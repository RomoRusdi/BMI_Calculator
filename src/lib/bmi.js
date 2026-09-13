// Klasifikasi IMT dewasa Kemenkes RI (Pedoman Gizi Seimbang 2014).
// Thresholds are inclusive (`upTo`) and applied to the BMI rounded to one
// decimal, so the category always matches the number shown on screen.
// `min`/`max` describe each category's span on the gauge.
export const CATEGORIES = [
  {
    key: 'severe-under',
    label: 'Kurus Berat',
    range: '< 17,0',
    upTo: 16.9,
    min: 15,
    max: 17,
    color: '#6f9bff',
    mood: 'worried',
    tip: 'Berat badanmu jauh di bawah normal. Segera konsultasikan dengan dokter atau ahli gizi untuk mencari penyebabnya dan menyusun rencana menaikkan berat badan yang aman.',
  },
  {
    key: 'under',
    label: 'Kurus',
    range: '17,0 – 18,4',
    upTo: 18.4,
    min: 17,
    max: 18.5,
    color: '#a5d8ff',
    mood: 'think',
    tip: 'Tambah asupan kalori dari makanan bergizi — protein, karbohidrat kompleks, dan lemak sehat — serta latihan kekuatan. Konsultasikan ke dokter bila berat terus turun.',
  },
  {
    key: 'normal',
    label: 'Normal',
    range: '18,5 – 25,0',
    upTo: 25,
    min: 18.5,
    max: 25,
    color: '#c5f04a',
    mood: 'happy',
    tip: 'Mantap! Pertahankan pola makan seimbang, aktif bergerak minimal 150 menit per minggu, dan tidur yang cukup.',
  },
  {
    key: 'over',
    label: 'Gemuk',
    range: '25,1 – 27,0',
    upTo: 27,
    min: 25,
    max: 27,
    color: '#ffc857',
    mood: 'think',
    tip: 'Kurangi gula dan makanan olahan, perbanyak sayur, dan tambah aktivitas fisik. Turun 5–10% berat badan saja sudah berdampak besar.',
  },
  {
    key: 'obese',
    label: 'Obesitas',
    range: '> 27,0',
    upTo: Infinity,
    min: 27,
    max: 35,
    color: '#ff6b5b',
    mood: 'worried',
    tip: 'Risiko diabetes, hipertensi, dan penyakit jantung meningkat. Sebaiknya konsultasikan dengan dokter atau ahli gizi untuk rencana yang aman.',
  },
]

export const round1 = (n) => Math.round(n * 10) / 10

export function calcBmi(heightCm, weightKg) {
  const m = heightCm / 100
  return weightKg / (m * m)
}

export function getCategory(bmi) {
  const value = round1(bmi)
  return CATEGORIES.find((c) => value <= c.upTo) ?? CATEGORIES[CATEGORIES.length - 1]
}

/** Normal weight range (BMI 18.5–25.0, Kemenkes) for a given height, in kg. */
export function idealRange(heightCm) {
  const m2 = (heightCm / 100) ** 2
  return [18.5 * m2, 25 * m2]
}

/** kg to gain (positive) or lose (negative) to reach the healthy range; 0 when inside it. */
export function weightDelta(heightCm, weightKg) {
  const [lo, hi] = idealRange(heightCm)
  if (weightKg < lo) return lo - weightKg
  if (weightKg > hi) return hi - weightKg
  return 0
}

/**
 * Position (0–1) on a gauge where each category gets an equal share,
 * which keeps the narrow bands readable.
 */
export function gaugePosition(bmi) {
  const value = round1(bmi)
  const i = CATEGORIES.indexOf(getCategory(value))
  const c = CATEGORIES[i]
  const within = Math.min(1, Math.max(0, (value - c.min) / (c.max - c.min)))
  return (i + within) / CATEGORIES.length
}

/** Mascot's scale-needle angle in degrees for a BMI value. */
export const needleAngle = (bmi) => (gaugePosition(bmi) - 0.5) * 130
