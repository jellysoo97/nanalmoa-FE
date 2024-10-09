import EventItem from './EventItem'
import { GetSchedulesRes } from '@/types/schedules'

type Props = {
  schedules?: GetSchedulesRes | []
}

const EventContainer = ({ schedules }: Props) => {
  // TODO: 일정 없을때 메세지 다듬기
  if (!schedules?.length) return <div>일정이 없습니다.</div>

  return (
    <>
      {schedules?.map((schedule) => (
        <EventItem key={schedule.scheduleId} schedule={schedule} />
      ))}
    </>
  )
}

export default EventContainer
