import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { useMemo } from 'react'

type Props = {
  setCurrentDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  currentMonth: Date
  isSchedule?: number[]
}

export const useCalendar = ({
  setCurrentDate,
  currentMonth,
  isSchedule,
}: Props) => {
  const rows = useMemo(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

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
        const isCurrentMonth = isSameMonth(day, monthStart)
        const currentDay = new Date(day)
        const scheduleClass =
          isCurrentMonth &&
          isSchedule?.[Number(getDate(currentDay))] &&
          'rounded-full bg-primary-500'

        days.push(
          <div
            className={`relative flex w-10 items-center justify-center py-2 text-center sm:w-12 ${
              !isSameMonth(day, monthStart) ? 'text-gray-300' : formatDay(day)
            }`}
            key={currentDay.toISOString()}
          >
            <button
              onClick={() => setCurrentDate(currentDay)}
              className={`z-50 flex h-9 w-9 items-center justify-center text-base hover:font-bold sm:h-10 sm:w-10 sm:text-lg ${!isCurrentMonth && 'text-gray-400'} ${scheduleClass} `}
            >
              {format(day, dateFormat)}
            </button>
          </div>
        )

        day = addDays(day, 1)
        if (day > endDate) break
      }
      rows.push(
        <div className="flex justify-between px-6" key={day.toString()}>
          {days}
        </div>
      )
    }

    return rows
  }, [currentMonth, setCurrentDate, isSchedule])

  return { rows }
}
