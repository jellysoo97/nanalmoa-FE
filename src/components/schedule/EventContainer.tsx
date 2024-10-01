import { useQuery } from '@tanstack/react-query'
import EventItem from './EventItem'
import { QUERY_KEYS } from '@/constants/api'
import { getSchedules } from '@/api/schedules/get-schedules'
import { ISchedule } from '@/types/schedules'

const EventContainer = () => {
  const { isLoading, data } = useQuery<ISchedule[]>({
    queryKey: [QUERY_KEYS.GET_SCHEDULES],
    queryFn: () => getSchedules(1),
  })

  if (isLoading) return <div>로딩 중...</div>
  if (!data) return <div>데이터가 없습니다.</div>

  return (
    <>
      {data.map((schedule) => (
        <EventItem key={schedule.scheduleId} schedule={schedule} />
      ))}
    </>
  )
}

export default EventContainer
