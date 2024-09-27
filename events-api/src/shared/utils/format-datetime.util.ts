export function formatDateTime(date: Date) {
  const addZeroIfOneDigit = (n: number) => (n < 10 ? `0${n}` : n);
  return `${date.getFullYear()}-${addZeroIfOneDigit(date.getMonth() + 1)}-${addZeroIfOneDigit(date.getDate())} ${addZeroIfOneDigit(date.getHours())}:${addZeroIfOneDigit(date.getMinutes())}:${addZeroIfOneDigit(date.getSeconds())}`;
}
