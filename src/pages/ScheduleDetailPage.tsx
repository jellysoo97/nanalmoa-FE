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
import { deleteSchedule } from '@/api/schedules/delete-schedule'
import Modal from '@/components/common/Modal'
import PostUpdateIcon from '@/components/icons/PostUpdateIcon'
import TrashCanIcon from '@/components/icons/TrashCanIcon'
import { useModal } from '@/hooks/use-modal'

type InfoItemProps = {
  label: string
  content: string
}

type dateItemProp = {
  date: Date
  modal?: boolean
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

const DateItem = ({ date, modal }: dateItemProp) => (
  <div>
    <div>
      <span className="text-xs sm:text-base">
        {formatDate(!modal ? DateFormatTypeEnum.DateWithKorean : DateFormatTypeEnum.DateWithSlash, date)}
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
  const { isModalOpen, openModal, closeModal } = useModal()

  const { isLoading, data } = useQuery<ISchedule>({
    queryKey: [QUERY_KEYS.GET_SCHEDULE_BY_ID],
    queryFn: () => getScheduleById(id as string),
  })

  if (isLoading) return <div>로딩 중...</div>
  if (!data) return <div>데이터가 없습니다.</div>

  const handleDeleteSchedule = () => {
    deleteSchedule(Number(id));
  }

  return (
    <div className="px-5">
      <div className="flex justify-between py-2 px-4">
        <Link
          to={path.schedules}
          className="w-25 flex py-6"
        >
          <PrevIcon className="mt-1 h-5" />
          <div className="text-lg text-gray-600 hover:text-gray-900">
            돌아가기
          </div>
        </Link>

        <div className="flex p-2 text-base">
          <button className="w-12 hover:font-bold">
            <PostUpdateIcon className="w-8 mx-auto" />
            <div>수정</div>
          </button>

          <button onClick={openModal} className="w-12 hover:font-bold">
            <TrashCanIcon className="w-8 mx-auto" />
            <div>삭제</div>
          </button>

          {isModalOpen && (
            <Modal onClose={closeModal}>
              <div className="px-6">
                <div className="mx-auto py-3">
                  <div className="flex justify-center mb-3 gap-1">
                    <CategoryTag className="text-base h-7" label={data.category.categoryName}/>
                    <div className="text-lg">{data.title}</div>
                  </div>
                  <div className="flex justify-center text-center">
                    <DateItem date={data.startDate} modal={true} />
                    <NextIcon />
                    <DateItem date={data.endDate} modal={true} />
                  </div>
                </div>
                <Divider />
                <div className="text-lg text-center py-4">일정을 정말 삭제하시겠습니까?</div>
                <button onClick={handleDeleteSchedule} className="flex gap-2 px-3 bg-primary-500 rounded mx-auto">
                  <TrashCanIcon className="w-6 mx-auto" />
                  <div className="py-2 font-medium">삭제하기</div>
                </button>
              </div>
            </Modal>
          )}
        </div>
      </div>

      <div className="px-7 py-5">
        <InfoItem label="제목" content={data.title} />
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center">
          <div className="mr-4 w-24 text-left font-bold">카테고리</div>
          <div>
            <CategoryTag label={data?.category?.categoryName || '기타'} />
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
