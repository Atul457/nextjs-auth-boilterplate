import { APP_CONST } from '@/constants/app.const'
import type { IGetExpiryTime } from './types'
import { format } from 'date-fns'

const timeMap = {
  sec: 1000,
  min: 1000 * 60,
  hr: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
  mon: 1000 * 60 * 60 * 24 * 30,
  yr: 1000 * 60 * 60 * 24 * 365,
  infinity: Number.MAX_SAFE_INTEGER
}

const formatDate = (date: any) => {
  return format(date, APP_CONST.DATE.DATE_FORMAT)
}

const getExpiryTime: IGetExpiryTime = ({ duration }) => {
  const now = new Date()

  if (duration === 'infinity') {
    return timeMap['infinity']
  }

  const match = duration.match(/(\d+)(sec|min|hr|day|mon|yr)/)

  if (!match) {
    throw new Error('Invalid duration format')
  }

  const value = parseInt(match[1])
  const unit = match[2] as keyof typeof timeMap

  if (!timeMap[unit]) {
    throw new Error('Invalid time unit')
  }

  const expiryTime = now.getTime() + value * timeMap[unit]

  return Math.floor(expiryTime / 1000)
}

const getDurationInMilliseconds: IGetExpiryTime = ({ duration }): number => {
  if (duration === 'infinity') {
    return timeMap['infinity']
  }

  const match = duration.match(/(\d+)(sec|min|hr|day|mon|yr)/)

  if (!match) {
    throw new Error('Invalid duration format')
  }

  const value = parseInt(match[1])
  const unit = match[2] as keyof typeof timeMap

  if (!timeMap[unit]) {
    throw new Error('Invalid time unit')
  }

  return value * timeMap[unit]
}

/**
 * Formats a duration in seconds into "Xh Ym" or "Ym Zs".
 *
 * @param seconds - The duration in seconds.
 * @returns The formatted duration string.
 */
function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else {
    return `${minutes}m ${seconds % 60}s`
  }
}

const zeroOutTime = (date: Date) => {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  const isoString = date.toISOString()

  return isoString
}

function isDateString(value: string): boolean {
  return !isNaN(Date.parse(value))
}

export const date = {
  formatDate,
  isDateString,
  formatDuration,
  zeroOutTime,
  getExpiryTime,
  getDurationInMilliseconds
}
