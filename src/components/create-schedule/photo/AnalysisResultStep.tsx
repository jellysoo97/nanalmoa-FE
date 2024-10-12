import {
  IMediaAnalysisResult,
  PostSchedulesReq,
  PostSchedulesRes,
} from '@/types/schedules'
import { UseMutationResult } from '@tanstack/react-query'
import success from '@/assets/imgs/success.png'
import error from '@/assets/imgs/error.png'
import { SelectOptions } from '.'
import { useModal } from '@/hooks/use-modal'
import SelectMethodModal from '../SelectMethodModal'
import { CreateScheduleStepEnum } from '@/types/common'
import MediaAnaysisResultCarousel from '../MediaAnalysisResultCarousel'
import { useState } from 'react'
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

const AnalysisResultStep = ({
  analysisResult,
  // createScheduleMutation,
  moveStep,
}: Props) => {
  const isAnalysisSuccess = !!analysisResult
  const [selectedResult, setSelectedResult] =
    useState<IMediaAnalysisResult | null>(
      analysisResult ? analysisResult[0] : null
    )
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

  const handleSelectedResultChange = (result: IMediaAnalysisResult) => {
    setSelectedResult(result)
  }
  const handleCreateSchedule = () => {
    // createScheduleMutation.mutate({})
  }

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
          <div className="flex flex-col items-center gap-y-6">
            <p className="text-center text-lg font-bold">음성 분석 결과</p>
            <MediaAnaysisResultCarousel
              results={analysisResult}
              selectedResult={selectedResult}
              handleSelectedResultChange={handleSelectedResultChange}
            />
            <SelectOptions
              title="선택하신 분석 결과대로 일정을 등록할까요?"
              leftButtonText="등록하기"
              rightButtonText="내용 수정하기"
              leftButtonCallback={handleCreateSchedule}
              rightButtonCallback={openEditModal}
            />
          </div>
        ) : (
          <SelectOptions
            title="음성 분석에 실패했습니다."
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
      {isEditModalOpen && selectedResult && (
        <EditScheduleModal
          defaultValue={selectedResult}
          onClose={closeEditModal}
          handleCreateSchedule={handleCreateSchedule}
        />
      )}
    </>
  )
}

export default AnalysisResultStep
