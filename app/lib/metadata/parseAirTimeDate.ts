import { parse } from 'date-fns'

export function parseAirTimeDate(date: string): Date {
  const dateWithoutMs = date.replace(/\.\d+$/, '')
  return parse(dateWithoutMs, 'yyyy-MM-dd HH:mm:ss', new Date())
}
