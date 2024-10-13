import { getScheduleByRange } from '@/api/schedules/get-schedule-by-range'
import { QUERY_KEYS } from '@/constants/api'
import { GetSchedulesRes } from '@/types/schedules'
import { useQuery } from '@tanstack/react-query'
import { useUser } from './use-user'
import { calendarScheduleFilter } from '@/utils/calendar-schedule-filter'

export const useRangeSchedule = (start: string, end: string) => {
  const { user, isUserLoading } = useUser()

  const { isLoading, data } = useQuery<GetSchedulesRes>({
    queryKey: [QUERY_KEYS.GET_SCHEDULE_BY_RANGE, start],
    queryFn: () => getScheduleByRange(user.info!.userUuid, start, end),
    enabled: !isUserLoading && !!user.info?.userUuid,
  })

  const isSchedule = data?.length
    ? calendarScheduleFilter(data, new Date(start))
    : []

  return { isLoading, data, isSchedule }
}
