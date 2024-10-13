import { GetSchedulesRes } from '@/types/schedules'
import {
  endOfMonth,
  getDate,
  getMonth,
  isAfter,
  startOfMonth,
  subDays,
} from 'date-fns'

export const calendarScheduleFilter = (
  schedules: GetSchedulesRes,
  currMonth: Date
) => {
  const isSchedules = new Array(32).fill(0)
  const SCHEDULES_LEN = schedules.length

  if (SCHEDULES_LEN === 0) return isSchedules

  const endFlag = subDays(schedules[0].startDate, 1)

  for (let i = 0; i < SCHEDULES_LEN; i++) {
    const curr = schedules[i]

    if (isAfter(endFlag, curr.endDate)) continue

    const startDay =
      getMonth(currMonth) === getMonth(curr.startDate)
        ? Number(getDate(curr.startDate))
        : Number(getDate(startOfMonth(curr.startDate)))
    const endDay =
      getMonth(currMonth) === getMonth(curr.endDate)
        ? Number(getDate(curr.endDate))
        : Number(getDate(endOfMonth(curr.endDate)))

    for (let j = startDay; j <= endDay; j++) {
      if (!isSchedules[j]) isSchedules[j] = 1
    }
  }

  return isSchedules
}
