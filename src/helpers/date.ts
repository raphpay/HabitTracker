export function getDateKey(date: Date = new Date()) {
  return date.toISOString().split('T')[0]
}
