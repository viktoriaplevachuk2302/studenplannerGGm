import { format, parseISO, isToday, isThisWeek } from 'date-fns'
import { uk } from 'date-fns/locale'

export function formatDate(date) {
  if (!date) return ''
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  return format(parsedDate, 'd MMMM yyyy', { locale: uk })
}

export function formatDateTime(date) {
  if (!date) return ''
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  return format(parsedDate, 'd MMMM - HH:mm', { locale: uk })
}

export function formatTimeRange(startTime, endTime) {
  if (!startTime || !endTime) return ''
  return `${startTime} - ${endTime}`
}

export function filterTasksByTimeframe(tasks, timeframe) {
  if (!tasks) return []
  
  switch (timeframe) {
    case 'today':
      return tasks.filter(task => isToday(parseISO(task.date)))
    case 'thisWeek':
      return tasks.filter(task => isThisWeek(parseISO(task.date)))
    case 'completed':
      return tasks.filter(task => task.completed)
    default:
      return tasks
  }
}

export function getWeekDays() {
  return [
    { short: 'Пн', full: 'Понеділок' },
    { short: 'Вт', full: 'Вівторок' },
    { short: 'Ср', full: 'Середа' },
    { short: 'Чт', full: 'Четвер' },
    { short: 'Пт', full: 'П\'ятниця' },
    { short: 'Сб', full: 'Субота' },
    { short: 'Нд', full: 'Неділя' },
  ]
}