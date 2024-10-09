import { useRangeSchedule } from '@/hooks/use-range-schedule'
import { DateFormatTypeEnum } from '@/types/common'
import { formatDate } from '@/utils/format-date'
import { addDays, startOfDay } from 'date-fns'
import EventContainer from './EventContainer'

const DailyView = () => {
  const dayStart = startOfDay(new Date())
  const dayEnd = addDays(dayStart, 1)

  const { data: schedules } = useRangeSchedule(
    formatDate(DateFormatTypeEnum.DateWithHypen, dayStart),
    formatDate(DateFormatTypeEnum.DateWithHypen, dayEnd)
  )

  if (!schedules) return <div>일정이 없습니다.</div>

  return (
    <>
      <EventContainer schedules={schedules} />
    </>
  )
}

export default DailyView
