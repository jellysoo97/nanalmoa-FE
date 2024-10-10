import EventItem from './EventItem'
import { GetSchedulesRes } from '@/types/schedules'
import CalendarImg from '@/assets/imgs/calendarImg.png'

type Props = {
  schedules: GetSchedulesRes | []
  isLoading?: boolean
}

const EventContainer = ({ schedules, isLoading }: Props) => {
  if (isLoading) {
    return null
  }

  if (!isLoading && !schedules?.length)
    return (
      <div className="pb-10">
        <img
          src={CalendarImg}
          alt="CalendarImg"
          className="mx-auto mb-1 mt-5 w-1/3"
          width={240}
          height={240}
        />
        <div className="mb-1 text-center text-lg font-bold">
          일정이 없습니다!
        </div>
        <div className="text-center text-xs">일정을 등록해보세요!</div>
      </div>
    )

  return (
    <>
      {schedules?.map((schedule) => (
        <EventItem key={schedule.scheduleId} schedule={schedule} />
      ))}
    </>
  )
}

export default EventContainer
