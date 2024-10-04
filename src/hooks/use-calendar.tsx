import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { useState } from 'react'

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const dateFormat = 'd'
  const rows = []
  let day = startDate

  const formatDay = (date: Date) => {
    if (isToday(date)) return 'font-bold underline'
    if (date.getDay() === 0) return 'text-red-500'
    if (date.getDay() === 6) return 'text-blue-500'
    return ''
  }

  while (day <= endDate) {
    const days: React.ReactNode[] = []
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          className={`p-2 text-center ${
            !isSameMonth(day, monthStart) ? 'text-gray-300' : formatDay(day)
          }`}
          key={day.toString()}
        >
          {format(day, dateFormat)}
        </div>
      )

      day = addDays(day, 1)
      if (day >= endDate) break
    }
    rows.push(
      <div className="grid grid-cols-7" key={day.toString()}>
        {days}
      </div>
    )
  }

  return { currentDate, setCurrentDate, rows }
}
