const DAY = 86_400_000

export function fmt(n, digits = 1) {
  return Number(n).toLocaleString('id-ID', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

export const fmtKg = (kg) => fmt(kg, Number.isInteger(kg) ? 0 : 1)

export function relativeDay(ts, now = Date.now()) {
  const a = new Date(ts).setHours(0, 0, 0, 0)
  const b = new Date(now).setHours(0, 0, 0, 0)
  const days = Math.round((b - a) / DAY)
  if (days <= 0) return 'Hari ini'
  if (days === 1) return 'Kemarin'
  if (days < 7) return `${days} hari lalu`
  if (days < 30) return `${Math.floor(days / 7)} minggu lalu`
  if (days < 365) return `${Math.floor(days / 30)} bulan lalu`
  return `${Math.floor(days / 365)} tahun lalu`
}

const dateFormat = new Intl.DateTimeFormat('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })
const timeFormat = new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' })

export const dateLabel = (ts) => dateFormat.format(ts)
export const timeLabel = (ts) => timeFormat.format(ts)

export function toFeet(cm) {
  let feet = Math.floor(cm / 2.54 / 12)
  let inches = Math.round(cm / 2.54 - feet * 12)
  if (inches === 12) {
    feet += 1
    inches = 0
  }
  return `${feet} ft ${inches} in`
}

export const toPounds = (kg) => `${Math.round(kg * 2.20462)} lb`

export function initials(name) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return 'HI'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}
