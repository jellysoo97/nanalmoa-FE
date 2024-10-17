import error from '@/assets/imgs/error.png'
import success from '@/assets/imgs/success.png'
import { CategoryTag } from '@/components/common'
import { repeatTypeLabels } from '@/constants/schedules'
import { useModal } from '@/hooks/use-modal'
import { CreateScheduleStepEnum, DateFormatTypeEnum } from '@/types/common'
import {
  IMediaAnalysisResult,
  PostSchedulesReq,
  PostSchedulesRes,
} from '@/types/schedules'
import { calculateDaysBetween } from '@/utils/calculate-days-between'
import { formatDate } from '@/utils/format-date'
import { UseMutationResult } from '@tanstack/react-query'
import { useMemo } from 'react'
import { SelectOptions } from '.'
import SelectMethodModal from '../SelectMethodModal'
import EditScheduleModal from './EditScheduleModal'

type Props = {
  analysisResult: Array<IMediaAnalysisResult> | null
  createScheduleMutation: UseMutationResult<
    PostSchedulesRes,
    Error,
    PostSchedulesReq,
    unknown
  >
  moveStep: (step: CreateScheduleStepEnum) => void
}

const DEFAULT_DURATION = 7
const DEFAULT_COUNT = 3

const AnalysisResultStep = ({
  analysisResult,
  createScheduleMutation,
  moveStep,
}: Props) => {
  const isAnalysisSuccess = !!analysisResult
  const firstResult = isAnalysisSuccess ? analysisResult[0] : null
  const duration = useMemo(() => {
    if (firstResult && firstResult.isRecurring && firstResult.repeatEndDate) {
      return calculateDaysBetween(
        firstResult.startDate,
        firstResult.repeatEndDate
      )
    }
    return DEFAULT_DURATION
  }, [firstResult])
  const count = analysisResult?.length || DEFAULT_COUNT

  const {
    isModalOpen: isSelectMethodModalOpen,
    openModal: openSelectMethodModal,
    closeModal: closeSelectMethodModal,
  } = useModal()
  const {
    isModalOpen: isEditModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal()

  const handleCreateSchedule = (payload: PostSchedulesReq | null) => {
    if (payload) {
      createScheduleMutation.mutate(payload, {
        onSettled: () => {
          closeEditModal()
        },
      })
    }
  }
  console.log(analysisResult)

  return (
    <>
      <div className="flex flex-col items-center gap-y-10">
        <img
          src={isAnalysisSuccess ? success : error}
          alt={isAnalysisSuccess ? 'success' : 'error'}
          width={128}
          height={128}
        />

        {isAnalysisSuccess ? (
          <div className="flex flex-col items-center gap-y-4">
            <p className="text-center text-lg font-bold">사진 분석 결과</p>
            <div className="flex flex-col items-center gap-y-2 rounded-md border-2 border-neutral-400 p-3">
              <div className="flex items-center gap-x-2">
                <CategoryTag label={'복약'} />
                <p>
                  <strong>{duration}</strong>일동안{' '}
                  <strong>
                    {repeatTypeLabels[analysisResult[0].repeatType]}
                  </strong>
                  에 <strong>{count}</strong>번 복용
                </p>
              </div>
              <p>
                <strong>시작일: </strong>
                {formatDate(
                  DateFormatTypeEnum.DateWithKorean,
                  firstResult?.startDate
                )}
              </p>
              <p>
                <strong>종료일: </strong>
                {formatDate(
                  DateFormatTypeEnum.DateWithKorean,
                  firstResult?.repeatEndDate
                )}
              </p>
            </div>
            <SelectOptions
              title={`분석 결과대로 일정을 등록할까요?`}
              leftButtonText="등록하기"
              rightButtonText="내용 수정하기"
              leftButtonCallback={() => handleCreateSchedule(firstResult)}
              rightButtonCallback={openEditModal}
            />
          </div>
        ) : (
          <SelectOptions
            title="사진 분석에 실패했습니다."
            leftButtonText="다시 시도하기"
            rightButtonText="다른 방법으로 일정 등록하기"
            leftButtonCallback={() => {
              moveStep(CreateScheduleStepEnum.UploadMedia)
            }}
            rightButtonCallback={openSelectMethodModal}
          />
        )}
      </div>

      {isSelectMethodModalOpen && (
        <SelectMethodModal onClose={closeSelectMethodModal} />
      )}
      {isEditModalOpen && firstResult && (
        <EditScheduleModal
          defaultValue={firstResult}
          onClose={closeEditModal}
          handleCreateSchedule={handleCreateSchedule}
        />
      )}
    </>
  )
}

export default AnalysisResultStep
