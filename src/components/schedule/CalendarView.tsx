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

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)

  const { data: schedules } = useRangeSchedule(
    formatDate(DateFormatTypeEnum.DateWithHypen, monthStart),
    formatDate(DateFormatTypeEnum.DateWithHypen, monthEnd)
  )

  const { rows } = useCalendar({ setCurrentDate, currentMonth })

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
    <>
      <div className="mx-auto mt-2 max-w-md text-black">
        <div className="mb-5 flex items-center justify-between">
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
        {/* <div className="text-gray-400 font-medium pb-2">날짜를 선택해주세요</div> */}
        <div className="mb-2 grid grid-cols-7 gap-2">
          {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
            <div key={day} className="text-center font-bold">
              {day}
            </div>
          ))}
        </div>
        {rows}
      </div>

      <EventContainer schedules={filteredSchedules} />
    </>
  )
}

export default CalendarView
