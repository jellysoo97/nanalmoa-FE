import { getScheduleByRange } from '@/api/schedules/get-schedule-by-range'
import { QUERY_KEYS } from '@/constants/api'
import { GetSchedulesRes } from '@/types/schedules'
import { useQuery } from '@tanstack/react-query'

export const useRangeSchedule = (
  userId: number,
  start: string,
  end: string
) => {
  // const { user, isUserLoading } = useUser();

  const { isLoading, data } = useQuery<GetSchedulesRes>({
    queryKey: [QUERY_KEYS.GET_SCHEDULE_BY_RANGE, start],
    queryFn: () => getScheduleByRange(userId, start, end),
    // enabled: !isUserLoading && !!user.info?.userId,
  })

  return { isLoading, data }
}
