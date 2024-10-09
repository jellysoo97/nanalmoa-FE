import { useRangeSchedule } from '@/hooks/use-range-schedule'
import { DateFormatTypeEnum } from '@/types/common'
import { formatDate } from '@/utils/format-date'
import { addDays, startOfDay } from 'date-fns'
import EventContainer from './EventContainer'
import { useState } from 'react'
import WeekdaySelector from './WeekdaySelector'

const DailyView = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(startOfDay(new Date()))

  const dayEnd = addDays(selectedDate, 1)

  const { data: schedules } = useRangeSchedule(
    formatDate(DateFormatTypeEnum.DateWithHypen, selectedDate),
    formatDate(DateFormatTypeEnum.DateWithHypen, dayEnd)
  )

  return (
    <>
      <div className="mb-3">
        <WeekdaySelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      {!schedules && <div>일정이 없습니다.</div>}
      <EventContainer schedules={schedules} />
    </>
  )
}

export default DailyView
