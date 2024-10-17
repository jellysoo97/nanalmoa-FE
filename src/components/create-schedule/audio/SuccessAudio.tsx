import { postSchedules } from '@/api/schedules/post-schedules'
import success from '@/assets/imgs/success.png'
import { Button } from '@/components/common'
import ScheduleForm from '@/components/common/schedule-form/ScheduleForm'
import { QUERY_KEYS } from '@/constants/api'
import { useModal } from '@/hooks/use-modal'
import { useUser } from '@/hooks/use-user'
import { CreateScheduleStepEnum } from '@/types/common'
import {
  IMediaAnalysisResult,
  IPartialScheduleForm,
  PostSchedulesReq,
  PostSchedulesRes,
  PostUploadAudioFileRes,
} from '@/types/schedules'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import EditModal from '../EditModal'
import MediaAnaysisResultCarousel from '../MediaAnalysisResultCarousel'

type Props = {
  results: PostUploadAudioFileRes
  createSchedules: (payload: PostSchedulesReq) => void
  moveStep: (step: CreateScheduleStepEnum) => void
}

const SuccessAudio = ({ results, createSchedules, moveStep }: Props) => {
  const { user } = useUser()
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
        ...selectedResult,
        isRecurring: false,
      })
      moveStep(CreateScheduleStepEnum.RegisterResult)
    }
  }

  //수정한 일정 post
  const mutation = useMutation<PostSchedulesRes, AxiosError, PostSchedulesReq>({
    mutationKey: [QUERY_KEYS.POST_SCHEDULES],
    mutationFn: postSchedules,
    onError: (err) => {
      console.error('err', err)
    },
  })

  const handleSubmit = (data: IPartialScheduleForm) => {
    if (!userUuid) return
    const payload = {
      ...data,
      // userUuid,
    } as PostSchedulesReq

    mutation.mutate(payload, {
      onSuccess: () => {
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
    <>
      <div className="flex flex-col items-center gap-y-10">
        {!isManualInput && (
          <>
            <img src={success} alt="success" />

            <div className="flex flex-col items-center gap-y-6">
              <p className="text-center text-lg font-bold">
                음성 분석에 성공했습니다.
              </p>
              <MediaAnaysisResultCarousel
                results={results}
                selectedResult={selectedResult}
                handleSelectedResultChange={handleSelectedResultChange}
              />
              <div className="flex flex-col items-center gap-y-4">
                <p>이대로 등록할까요?</p>
                <div className="flex items-center gap-x-6">
                  <Button theme="outline" text="수정하기" onClick={openModal} />
                  <Button
                    theme="solid"
                    text="등록하기"
                    onClick={handleCreate}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {isManualInput && (
          <ScheduleForm defaultValue={selectedResult} onSubmit={handleSubmit} />
        )}
      </div>

      {isModalOpen && (
        <EditModal
          onClose={closeModal}
          onRetry={handleRetry}
          onManualInput={handleManualInput}
        />
      )}
    </>

    // <div className="flex flex-col h-full">
    //   <div className="flex flex-col items-center justify-center w-full pb-5">
    //     {!isManualInput ? (
    //       <div>
    //         <img
    //           src={success}
    //           alt="success"
    //           className="relative w-1/3 mx-auto mt-10 mb-5"
    //           width={240}
    //           height={240}
    //         />
    //         <p className="mb-6 -mt-2 text-xl text-center">
    //           음성 분석에 성공했습니다.
    //         </p>
    //         <MediaAnaysisResultCarousel
    //           results={results}
    //           selectedResult={selectedResult}
    //           handleSelectedResultChange={handleSelectedResultChange}
    //         />
    //         <div className="flex flex-col items-center justify-between w-full mt-6">
    //           <p>이대로 등록할까요?</p>
    //           <div className="flex items-center mt-4 gap-x-6">
    //             <Button theme="outline" text="수정하기" onClick={openModal} />
    //             <Button theme="solid" text="등록하기" onClick={handleCreate} />
    //           </div>
    //         </div>
    //         {isModalOpen && (
    //           <EditModal
    //             onClose={closeModal}
    //             onRetry={handleRetry}
    //             onManualInput={handleManualInput}
    //           />
    //         )}
    //       </div>
    //     ) : (
    //       <ScheduleForm defaultValue={selectedResult} onSubmit={handleSubmit} />
    //     )}
    //   </div>
    // </div>
  )
}

export default SuccessAudio
