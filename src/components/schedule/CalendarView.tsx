import {
  format,
  addMonths,
  subMonths,
  isWithinInterval,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
} from 'date-fns'
import { ko } from 'date-fns/locale'
import { useCalendar } from '@/hooks/use-calendar'
import { NextIcon, PrevIcon } from '../icons'
import EventContainer from './EventContainer'
import { useState } from 'react'
import { formatDate } from '@/utils/format-date'
import { DateFormatTypeEnum } from '@/types/common'
import { useRangeSchedule } from '@/hooks/use-range-schedule'
import Divider from '../common/Divider'

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)

  const { data: schedules, isSchedule } = useRangeSchedule(
    formatDate(DateFormatTypeEnum.DateWithHypen, monthStart),
    formatDate(DateFormatTypeEnum.DateWithHypen, monthEnd)
  )

  const { rows } = useCalendar({ setCurrentDate, currentMonth, isSchedule })

  const filteredSchedules = schedules
    ? currentDate
      ? schedules.filter((schedule) => {
          return isWithinInterval(currentDate, {
            start: startOfDay(schedule.startDate),
            end: endOfDay(schedule.endDate),
          })
        })
      : schedules
    : []

  return (
    <div>
      <div className="mx-auto mt-2 max-w-md text-black">
        <div className="mb-5 flex items-center justify-between px-8">
          <button
            onClick={() => {
              setCurrentMonth(subMonths(currentMonth, 1))
              setCurrentDate(undefined)
            }}
          >
            <PrevIcon />
          </button>
          <button className="text-xl font-bold">
            {format(currentMonth, 'yyyy년 MM월', { locale: ko })}
          </button>
          <button
            onClick={() => {
              setCurrentMonth(addMonths(currentMonth, 1))
              setCurrentDate(undefined)
            }}
          >
            <NextIcon />
          </button>
        </div>
        <div>
          <div className="mb-2 flex justify-between px-6 text-base sm:text-lg">
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div key={day} className="w-10 text-center font-bold sm:w-12">
                {day}
              </div>
            ))}
          </div>
          <div className="py-2">{rows}</div>
        </div>
      </div>

      <Divider />

      <div className="py-4">
        <div className="pb-4 pl-6 pt-2 text-lg font-bold sm:text-xl">
          {currentDate ? (
            <div>
              {formatDate(DateFormatTypeEnum.MonthAndDayKo, currentDate)} 일정
            </div>
          ) : (
            <div>
              {formatDate(DateFormatTypeEnum.MonthKo, currentMonth)} 전체 일정
            </div>
          )}
        </div>
        <EventContainer schedules={filteredSchedules} />
      </div>
    </div>
  )
}

export default CalendarView
