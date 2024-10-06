import EventItem from './EventItem'
import { GetSchedulesRes } from '@/types/schedules'

type Props = {
  schedules?: GetSchedulesRes | []
}

const EventContainer = ({ schedules }: Props) => {
  // TODO: useRangeSchedule hook isLoading Prop 연결
  // if (isLoading) return <div>로딩 중...</div>

  if (!schedules?.length) return <div>데이터가 없습니다.</div>

  return (
    <>
      {schedules?.map((schedule) => (
        <EventItem key={schedule.scheduleId} schedule={schedule} />
      ))}
    </>
  )
}

export default EventContainer
