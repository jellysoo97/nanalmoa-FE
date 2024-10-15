import { getScheduleById } from '@/api/schedules/get-schedule-by-id'
import CategoryTag from '@/components/common/CategoryTag'
import PrevIcon from '@/components/icons/PrevIcon'
import { QUERY_KEYS } from '@/constants/api'
import { path } from '@/routes/path'
import { DateFormatTypeEnum } from '@/types/common'
import {
  ISchedule,
  IScheduleForm,
  UpdateScheduleReq,
  UpdateScheduleRes,
} from '@/types/schedules'
import { formatDate } from '@/utils/format-date'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { ko } from 'date-fns/locale'
import { NextIcon } from '@/components/icons'
import Divider from '@/components/common/Divider'
import { deleteSchedule } from '@/api/schedules/delete-schedule'
import Modal from '@/components/common/Modal'
import PostUpdateIcon from '@/components/icons/PostUpdateIcon'
import TrashCanIcon from '@/components/icons/TrashCanIcon'
import { useModal } from '@/hooks/use-modal'
import { useState } from 'react'
import ScheduleForm from '@/components/common/schedule-form/ScheduleForm'
import { AxiosError } from 'axios'
import { updateSchedule } from '@/api/schedules/patch-schedule-update'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Toast from '@/components/common/Toast'

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
    className="my-5 flex flex-col sm:flex-row sm:items-center"
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
        {formatDate(
          !modal
            ? DateFormatTypeEnum.DateWithKorean
            : DateFormatTypeEnum.DateWithSlash,
          date
        )}
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

  const mutation = useMutation<
    UpdateScheduleRes,
    AxiosError,
    UpdateScheduleReq & { scheduleId: number }
  >({
    mutationKey: [QUERY_KEYS.UPDATE_SCHEDULES],
    mutationFn: updateSchedule,
  })

  const [isUpdate, setIsUpdate] = useState<boolean>(false)

  const { isLoading, data } = useQuery<ISchedule>({
    queryKey: [QUERY_KEYS.GET_SCHEDULE_BY_ID, isUpdate],
    queryFn: () => getScheduleById(id as string),
  })

  if (isLoading) return <div>로딩 중...</div>
  if (!data) return <div>데이터가 없습니다.</div>

  const handleDeleteSchedule = () => {
    deleteSchedule(Number(id))
    window.location.href = `${path.schedules}`
  }

  const handleUpdateSchedule = (res: IScheduleForm) => {
    const payload = {
      ...res,
      scheduleId: data.scheduleId,
    } as UpdateScheduleReq & { scheduleId: number }

    mutation.mutate(payload, {
      onSuccess: (response) => {
        console.log('일정 수정 성공:', response)
        setIsUpdate(false)
        toast.success('일정 수정에 성공했습니다!')
      },
      onError: (error) => {
        console.error('일정 수정 실패:', error)
      },
    })
  }

  return (
    <>
      {!isUpdate && (
        <div className="px-5">
          <div className="flex justify-between px-4">
            <Link to={path.schedules} className="w-25 flex py-6">
              <PrevIcon className="mt-1 h-4" />
              <div className="text-lg text-neutral-600 hover:text-neutral-900">
                돌아가기
              </div>
            </Link>

            <div className="flex p-2">
              <button
                onClick={() => setIsUpdate(true)}
                className="w-12 hover:font-bold"
              >
                <PostUpdateIcon className="mx-auto w-7 sm:w-8" />
                <div>수정</div>
              </button>

              <button onClick={openModal} className="w-12">
                <TrashCanIcon className="mx-auto w-7 sm:w-8" />
                <div className="hover:font-bold">삭제</div>
              </button>

              {isModalOpen && (
                <Modal onClose={closeModal}>
                  <div className="px-6">
                    <div className="mx-auto py-3">
                      <div className="mb-3 flex justify-center gap-1">
                        <CategoryTag
                          className="h-6 text-sm sm:h-7 sm:text-base"
                          label={data.category.categoryName}
                        />
                        <div className="text-base sm:text-lg">{data.title}</div>
                      </div>
                      <div className="flex justify-center text-center">
                        <DateItem date={data.startDate} modal={true} />
                        <NextIcon className="w-5 sm:w-8" />
                        <DateItem date={data.endDate} modal={true} />
                      </div>
                    </div>
                    <Divider />
                    <div className="py-4 text-center text-lg">
                      일정을 정말 삭제하시겠습니까?
                    </div>
                    <button
                      onClick={handleDeleteSchedule}
                      className="mx-auto flex gap-2 rounded bg-primary-500 px-3 text-white"
                    >
                      <TrashCanIcon className="mx-auto w-6" />
                      <div className="py-2 font-medium">삭제하기</div>
                    </button>
                  </div>
                </Modal>
              )}
            </div>
          </div>

          <div>
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

              <InfoItem
                label="장소"
                content={data.place === '' ? '-' : data.place}
              />

              {data.memo !== '' &&
                data.memo
                  .split('\n')
                  .map((line) => <InfoItem label="메모" content={line} />)}
              {data.memo === '' && <InfoItem label="메모" content="-" />}
            </div>
          </div>
        </div>
      )}

      {isUpdate && (
        <div className="px-2 py-3">
          <div className="flex justify-between">
            <h1 className="mb-3 pt-2 text-base font-bold sm:text-lg">
              일정 수정
            </h1>
            <button
              onClick={() => setIsUpdate(false)}
              className="mb-5 flex rounded bg-primary-500 px-1 pr-2 pt-1 text-white"
            >
              <div className="px-2 pb-1 text-base sm:text-lg">수정 취소</div>
            </button>
          </div>
          <Divider className="mb-3" />
          <ScheduleForm
            defaultValue={data}
            onSubmit={handleUpdateSchedule}
            buttonMessage="수정하기"
          />
        </div>
      )}

      <Toast />
    </>
  )
}

export default ScheduleDetailPage
