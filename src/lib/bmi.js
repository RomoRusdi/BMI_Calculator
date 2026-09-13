// WHO adult BMI categories. `max` is exclusive and applied to the BMI rounded
// to one decimal, so the category always matches the number shown on screen.
export const CATEGORIES = [
  {
    key: 'under',
    label: 'Kurus',
    range: '< 18,5',
    min: 15,
    max: 18.5,
    color: '#8ec5ff',
    mood: 'worried',
    tip: 'Tambah asupan kalori dari makanan bergizi — protein, karbohidrat kompleks, dan lemak sehat — serta latihan kekuatan. Konsultasikan ke dokter bila berat terus turun.',
  },
  {
    key: 'normal',
    label: 'Normal',
    range: '18,5 – 24,9',
    min: 18.5,
    max: 25,
    color: '#c5f04a',
    mood: 'happy',
    tip: 'Mantap! Pertahankan pola makan seimbang, aktif bergerak minimal 150 menit per minggu, dan tidur yang cukup.',
  },
  {
    key: 'over',
    label: 'Gemuk',
    range: '25 – 29,9',
    min: 25,
    max: 30,
    color: '#ffc857',
    mood: 'think',
    tip: 'Kurangi gula dan makanan olahan, perbanyak sayur, dan tambah aktivitas fisik. Turun 5–10% berat badan saja sudah berdampak besar.',
  },
  {
    key: 'obese',
    label: 'Obesitas',
    range: '≥ 30',
    min: 30,
    max: 40,
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
  return CATEGORIES.find((c) => value < c.max) ?? CATEGORIES[CATEGORIES.length - 1]
}

/** Healthy weight range (BMI 18.5–24.9) for a given height, in kg. */
export function idealRange(heightCm) {
  const m2 = (heightCm / 100) ** 2
  return [18.5 * m2, 24.9 * m2]
}

/** kg to gain (positive) or lose (negative) to reach the healthy range; 0 when inside it. */
export function weightDelta(heightCm, weightKg) {
  const [lo, hi] = idealRange(heightCm)
  if (weightKg < lo) return lo - weightKg
  if (weightKg > hi) return hi - weightKg
  return 0
}

/**
 * Position (0–1) on a gauge where each category gets an equal quarter,
 * which keeps the narrow "normal" band readable.
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
