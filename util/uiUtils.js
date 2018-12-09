export function getDateKey(date) {
  return date.toISOString().substring(0, 10)
};