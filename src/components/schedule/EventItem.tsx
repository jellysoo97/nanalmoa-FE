import { Link } from 'react-router-dom'
import CategoryTag from '../common/CategoryTag'
import { path } from '@/routes/path'
import { ISchedule } from '@/types/schedules'
import { formatDate } from '@/utils/format-date'
import { DateFormatTypeEnum } from '@/types/common'
import { NextIcon } from '../icons'

type Props = {
  schedule: ISchedule
}

const EventItem = ({ schedule }: Props) => {
  return (
    <Link
      to={`${path.schedules}/${schedule.scheduleId}`}
      className={`mx-6 mb-4 flex cursor-pointer items-start rounded-lg border px-1 py-2 shadow-sm transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-md`}
    >
      <div className="w-24 px-3 py-2">
        <div className="text-lg font-semibold">
          {formatDate(DateFormatTypeEnum.Time24, schedule.startDate)}
        </div>
      </div>

      <span className="w-full border-l px-4 py-2">
        <div className="flex text-xs">
          <span>
            {formatDate(DateFormatTypeEnum.MonthAndDay, schedule.startDate)}
          </span>
          <span>
            <NextIcon className="w-3 pb-2" />
          </span>
          <span>
            {formatDate(DateFormatTypeEnum.MonthAndDay, schedule.endDate)}
          </span>
        </div>
        <div className="mb-1">
          <CategoryTag label={schedule?.category?.categoryName || '기타'} />
          <span className="p-1 text-base">{schedule.title}</span>
        </div>
        {/* <div className="flex justify-end">
          <span className="rounded-lg bg-gray-200 px-2 py-1 text-xs">
            요양사 최요양
          </span>
        </div> */}
      </span>
    </Link>
  )
}

export default EventItem
