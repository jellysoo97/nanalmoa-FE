import { path } from '@/routes/path'
import { DateFormatTypeEnum } from '@/types/common'
import { ISchedule } from '@/types/schedules'
import { formatDate } from '@/utils/format-date'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import CategoryTag from '../common/CategoryTag'
import Divider from '../common/Divider'

type Props = {
  schedule: ISchedule
}

const EventItem = ({ schedule }: Props) => {
  const isDurationScheduleInSameDay = useMemo(
    () =>
      schedule.startDate.getDate() === schedule.endDate.getDate() &&
      schedule.startDate.getTime() !== schedule.endDate.getTime(),
    [schedule]
  )

  return (
    <Link
      to={`${path.schedules}/${schedule.scheduleId}`}
      className={`flex w-full items-center gap-x-3 rounded-lg border-2 px-4 py-3 shadow-sm transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-md`}
    >
      <div className="flex flex-col flex-wrap items-center justify-center">
        <h1 className="text-lg font-semibold">
          {formatDate(DateFormatTypeEnum.Time24, schedule.startDate)}
        </h1>
        {isDurationScheduleInSameDay && (
          <h1 className="text-lg font-semibold">-</h1>
        )}
        {isDurationScheduleInSameDay && (
          <h1 className="text-lg font-semibold">
            {formatDate(DateFormatTypeEnum.Time24, schedule.endDate)}
          </h1>
        )}
      </div>

      <Divider direction="vertical" />

      <div className="flex flex-1 flex-col gap-y-1 sm:gap-y-2">
        <p className="text-sm text-neutral-600">
          {formatDate(DateFormatTypeEnum.MonthAndDay, schedule.startDate)} {'>'}{' '}
          {formatDate(DateFormatTypeEnum.MonthAndDay, schedule.endDate)}
        </p>
        <div className="flex items-center gap-x-1">
          <CategoryTag
            className="text-xs sm:text-sm"
            label={schedule?.category?.categoryName || '기타'}
          />
          <h1 className="text-sm font-bold sm:text-base">{schedule.title}</h1>
        </div>
      </div>
      {/* <div className="w-24 px-3 py-2">
        <div className="text-lg font-semibold">
          {formatDate(DateFormatTypeEnum.Time24, schedule.startDate)}
        </div>
      </div> */}

      {/* <span className="w-full border-l px-4 py-2">
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
          <CategoryTag
            className="text-xs sm:text-sm"
            label={schedule?.category?.categoryName || '기타'}
          />
          <span className="p-1 text-sm font-bold sm:text-base">
            {schedule.title}
          </span>
        </div>
        <div className="flex justify-end">
          <span className="rounded-lg bg-gray-200 px-2 py-1 text-xs">
            요양사 최요양
          </span>
        </div>
      </span> */}
    </Link>
  )
}

export default EventItem
