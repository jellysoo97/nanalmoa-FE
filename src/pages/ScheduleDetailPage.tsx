import { getScheduleById } from '@/api/schedules/get-schedule-by-id'
import CategoryTag from '@/components/common/CategoryTag'
import PrevIcon from '@/components/icons/PrevIcon'
import { QUERY_KEYS } from '@/constants/api'
import { path } from '@/routes/path'
import { DateFormatTypeEnum } from '@/types/common'
import { ISchedule } from '@/types/schedules'
import { formatDate } from '@/utils/format-date'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { ko } from 'date-fns/locale'
import { NextIcon } from '@/components/icons'
import Divider from '@/components/common/Divider'

type InfoItemProps = {
  label: string
  content: string
}

type dateItemProp = {
  date: Date
}

const InfoItem = ({ label, content }: InfoItemProps) => (
  <div
    className="my-5 flex flex-col sm:flex-row sm:items-center"
    aria-label={`${label}: ${content}`}
  >
    <div className="mr-4 w-24 text-left font-bold">{label}</div>
    <div>{content}</div>
  </div>
)

const DateItem = ({ date }: dateItemProp) => (
  <div>
    <div>
      <span className="text-xs sm:text-base">
        {formatDate(DateFormatTypeEnum.DateWithKorean, date)}
      </span>

      <span className="ml-1 hidden sm:inline sm:text-base">
        ({formatDate(DateFormatTypeEnum.DayOfTheWeek, date, { locale: ko })[0]})
      </span>
    </div>

    <span className="text-base font-bold sm:text-xl">
      {formatDate(DateFormatTypeEnum.Time24, date)}
    </span>
  </div>
)

const ScheduleDetailPage = () => {
  const { id } = useParams()

  const { isLoading, data } = useQuery<ISchedule>({
    queryKey: [QUERY_KEYS.GET_SCHEDULE_BY_ID],
    queryFn: () => getScheduleById(id as string),
  })

  if (isLoading) return <div>로딩 중...</div>
  if (!data) return <div>데이터가 없습니다.</div>

  console.log(data)

  return (
    <div className="px-4 sm:px-5">
      <div className="flex justify-between py-3">
        <Link
          to={path.schedules}
          className="w-25 flex rounded border-neutral-700 py-2"
        >
          <PrevIcon className="mt-1 h-5" />
          <div className="text-base text-neutral-600 hover:text-neutral-900">
            돌아가기
          </div>
        </Link>

        <div className="flex p-2 text-base">
          <button>
            <div>수정</div>
          </button>

          <button>
            <div>삭제</div>
          </button>
        </div>
      </div>

      <div className="px-7 py-2">
        <CategoryTag
          className="my-1 inline-block h-6"
          label={data?.category?.categoryName || '기타'}
        />
        <div className="mb-3 text-xl font-bold">{data.title}</div>

        <Divider />

        <div className="flex py-4">
          <DateItem date={data.startDate} />
          <NextIcon className="w-5 sm:w-10" />
          <DateItem date={data.endDate} />
        </div>

        <Divider />

        <InfoItem label="장소" content={data.place === '' ? '-' : data.place} />

        {data.memo !== '' &&
          data.memo
            .split('\n')
            .map((line) => <InfoItem label="메모" content={line} />)}
        {data.memo === '' && <InfoItem label="메모" content="-" />}
      </div>
    </div>
  )
}

export default ScheduleDetailPage
