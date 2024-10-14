import { getScheduleByMonth } from '@/api/schedules/get-schedule-by-month'
import { QUERY_KEYS } from '@/constants/api'
import { useUser } from '@/hooks/use-user'
import { DateFormatTypeEnum } from '@/types/common'
import { GetSchedulesRes } from '@/types/schedules'
import { formatDate } from '@/utils/format-date'
import { useQuery } from '@tanstack/react-query'
import {
  addMonths,
  endOfDay,
  getMonth,
  getYear,
  isWithinInterval,
  startOfDay,
} from 'date-fns'
import { useState } from 'react'
import EventContainer from './EventContainer'
import WeekdaySelector from './WeekdaySelector'

const DailyView = () => {
  const { user, isUserLoading } = useUser()

  const [selectedDate, setSelectedDate] = useState<Date>(startOfDay(new Date()))
  const selectedMonth = getMonth(addMonths(selectedDate, 1))

  const { isLoading, data } = useQuery<GetSchedulesRes>({
    queryKey: [QUERY_KEYS.GET_SCHEDULE_BY_RANGE, selectedMonth],
    queryFn: () => getScheduleByMonth(getYear(selectedDate), selectedMonth),
    enabled: !isUserLoading && !!user.info?.userUuid,
  })

  const schedules = data
    ? data.filter((schedule) => {
        return isWithinInterval(selectedDate, {
          start: startOfDay(schedule.startDate),
          end: endOfDay(schedule.endDate),
        })
      })
    : []

  return (
    <div className="flex h-full flex-col items-center gap-y-5">
      <div className="flex w-full flex-col items-center gap-y-3">
        <h1 className="text-lg font-bold sm:text-xl">
          {formatDate(DateFormatTypeEnum.YearAndMonthKo, selectedDate)}
        </h1>
        <WeekdaySelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <EventContainer schedules={schedules} isLoading={isLoading} />
    </div>
  )
}

export default DailyView
