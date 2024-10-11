import EventItem from './EventItem'
import { GetSchedulesRes } from '@/types/schedules'
import CalendarImg from '@/assets/imgs/calendarImg.png'
import { LoadingSpinner } from '../common'
import { cn } from '@/utils/cn'

type Props = {
  schedules: GetSchedulesRes | []
  isLoading?: boolean
}

const EventContainer = ({ schedules, isLoading }: Props) => {
  return (
    <div
      className={cn(
        'flex w-full flex-1 flex-col',
        (isLoading || schedules.length === 0) && 'items-center justify-center'
      )}
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && schedules && schedules.length === 0 && (
        <div className="flex flex-col items-center gap-y-2">
          <img src={CalendarImg} alt="CalendarImg" width={120} height={120} />
          <p className="mb-1 text-center text-lg font-bold">일정이 없습니다!</p>
          <p className="text-center text-xs">일정을 등록해보세요!</p>
        </div>
      )}
      {!isLoading && schedules && schedules.length > 0 && (
        <div className="flex w-full flex-col gap-y-4 px-2 sm:px-4">
          {schedules?.map((schedule) => (
            <EventItem key={schedule.scheduleId} schedule={schedule} />
          ))}
        </div>
      )}
    </div>
  )
}

export default EventContainer
