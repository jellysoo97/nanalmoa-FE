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

type InfoItemProps = {
  label: string
  content: string
}

const InfoItem = ({ label, content }: InfoItemProps) => (
  <div
    className="mb-5 flex flex-col sm:flex-row sm:items-center"
    aria-label={`${label}: ${content}`}
  >
    <div className="mr-4 w-24 text-left font-bold">{label}</div>
    <div>{content}</div>
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

  return (
    <div className="px-5">
      <div className="flex justify-between py-2">
        <Link
          to={path.schedules}
          className="w-25 flex rounded border-gray-700 py-2"
        >
          <PrevIcon className="mt-1 h-5" />
          <div className="text-base text-gray-600 hover:text-gray-900">
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

      <div className="px-7 py-5">
        <InfoItem label="제목" content={data.title} />
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center">
          <div className="mr-4 w-24 text-left font-bold">카테고리</div>
          <div>
            <CategoryTag label={data.category.categoryName} />
          </div>
        </div>
        <InfoItem
          label="날짜 및 시간"
          content={formatDate(
            DateFormatTypeEnum.FullDateTimeKR,
            data.startDate
          )}
        />
      </div>
    </div>
  )
}

export default ScheduleDetailPage
