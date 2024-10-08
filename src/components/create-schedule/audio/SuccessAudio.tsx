import SuccessFace from '@/assets/imgs/SuccessFace.png'
import { Button } from '@/components/common'
import {
  IMediaAnalysisResult,
  IScheduleForm,
  PostSchedulesReq,
  PostSchedulesRes,
  PostUploadAudioFileRes,
} from '@/types/schedules'
import { useState } from 'react'
import MediaAnaysisResultCarousel from '../MediaAnalysisResultCarousel'
import { CreateScheduleStepEnum } from '@/types/common'
import { useModal } from '@/hooks/use-modal'
import EditModal from '../EditModal'
import ScheduleForm from '@/components/common/ScheduleForm/ScheduleForm'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { QUERY_KEYS } from '@/constants/api'
import { postSchedules } from '@/api/schedules/post-schedules'
import { useUserStore } from '@/store/user'

type Props = {
  results: PostUploadAudioFileRes
  createSchedules: (payload: PostSchedulesReq) => void
  moveStep: (step: CreateScheduleStepEnum) => void
}

const SuccessAudio = ({ results, createSchedules, moveStep }: Props) => {
  const { user } = useUserStore()
  const userUuid = user.info?.userUuid

  const [isManualInput, setIsManualInput] = useState<boolean>(false)
  const [selectedResult, setSelectedResult] = useState<IMediaAnalysisResult>(
    results[0]
  )
  const handleSelectedResultChange = (result: IMediaAnalysisResult) => {
    setSelectedResult(result)
  }
  //분석 일정 post
  const handleCreate = () => {
    if (selectedResult) {
      createSchedules({
        userUuid: selectedResult.userUuid,
        categoryId: selectedResult.category.categoryId,
        startDate: selectedResult.startDate,
        endDate: selectedResult.endDate,
        title: selectedResult.title,
        place: selectedResult.place,
        isAllDay: selectedResult.isAllDay,
      })
      moveStep(CreateScheduleStepEnum.RegisterResult)
    }
  }

  //수정한 일정 post
  const mutation = useMutation<PostSchedulesRes, AxiosError, PostSchedulesReq>({
    mutationKey: [QUERY_KEYS.POST_SCHEDULES],
    mutationFn: postSchedules,
    onSuccess: (res) => {
      console.log(res)
    },
    onError: (err) => {
      console.error('err', err)
    },
  })

  const handleSubmit = (data: IScheduleForm) => {
    if (!userUuid) return
    const payload = {
      ...data,
      userUuid,
    } as PostSchedulesReq

    mutation.mutate(payload, {
      onSuccess: (response) => {
        console.log('일정 생성 성공:', response)
        moveStep(CreateScheduleStepEnum.RegisterResult)
      },
      onError: (error) => {
        console.error('일정 생성 실패:', error)
      },
    })
  }

  //모달 핸들러
  const { isModalOpen, openModal, closeModal } = useModal()
  const handleRetry = () => {
    moveStep(CreateScheduleStepEnum.UploadMedia) // 다시 시도하기
  }
  const handleManualInput = () => {
    setIsManualInput(true)
  }
  return (
    <div className="flex h-full flex-col">
      <div className="flex w-full flex-col items-center justify-center pb-5">
        {!isManualInput ? (
          <div>
            <img
              src={SuccessFace}
              alt="SuccessFace"
              className="relative mx-auto mb-5 mt-10 w-1/3"
              width={240}
              height={240}
            />
            <p className="-mt-2 mb-6 text-center text-xl">
              음성 분석에 성공했습니다.
            </p>
            <MediaAnaysisResultCarousel
              results={results}
              selectedResult={selectedResult}
              handleSelectedResultChange={handleSelectedResultChange}
            />
            <div className="mt-6 flex w-full flex-col items-center justify-between">
              <p>이대로 등록할까요?</p>
              <div className="mt-4 flex items-center gap-x-6">
                <Button theme="outline" text="수정하기" onClick={openModal} />
                <Button theme="solid" text="등록하기" onClick={handleCreate} />
              </div>
            </div>
            {isModalOpen && (
              <EditModal
                onClose={closeModal}
                onRetry={handleRetry}
                onManualInput={handleManualInput}
              />
            )}
          </div>
        ) : (
          <ScheduleForm defaultValue={selectedResult} onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  )
}

export default SuccessAudio
