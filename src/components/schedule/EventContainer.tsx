import EventItem from './EventItem'
import { GetSchedulesRes } from '@/types/schedules'

type Props = {
  schedules?: GetSchedulesRes | []
}

const EventContainer = ({ schedules }: Props) => {
  return (
    <>
      {schedules?.map((schedule) => (
        <EventItem key={schedule.scheduleId} schedule={schedule} />
      ))}
    </>
  )
}

export default EventContainer
