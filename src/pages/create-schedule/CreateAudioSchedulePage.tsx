import StartAudio from '@/components/create-schedule/audio/StartAudio'
import FailAudio from '@/components/create-schedule/audio/FailAudio'
import SuccessAudio from '@/components/create-schedule/audio/SuccessAudio'
import { useState } from 'react'
import MediaAnalysisLoadingModal from '@/components/create-schedule/MediaAnalysisLoadingModal'
import { useModal } from '@/hooks/use-modal'
import { useMutation } from '@tanstack/react-query'
import { postUploadAudioFile } from '@/api/schedules/post-upload-audio-file'
import {
  PostSchedulesReq,
  PostSchedulesRes,
  PostUploadAudioFileReq,
  PostUploadAudioFileRes,
} from '@/types/schedules'
import { AxiosError } from 'axios'
import { QUERY_KEYS } from '@/constants/api'
import { postSchedules } from '@/api/schedules/post-schedules'
import SuccessPostAudio from '@/components/create-schedule/audio/SuccessPostAudio'
import { Stepper } from '@/components/common'
import { createAudioScheduleSteps } from '@/constants/schedules'
import { CreateScheduleStepEnum } from '@/types/common'
import MoveStepButtons from '@/components/create-schedule/MoveStepButtons'
import AboutAudioStep from '@/components/create-schedule/audio/AboutAudioStep'
import { toast } from 'react-toastify'
import Toast from '@/components/common/Toast'

const CreateAudioSchdulePage = () => {
  const { closeModal } = useModal()

  const [currentStep, setCurrentStep] = useState<CreateScheduleStepEnum>(
    CreateScheduleStepEnum.Info
  )
  const [results, setResults] = useState<PostUploadAudioFileRes>()
  const [abortController, setAbortController] =
    useState<AbortController | null>(null)

  const moveStep = (step: CreateScheduleStepEnum) => {
    setCurrentStep(step)
  }

  //음성파일 업로드 api
  const mutation = useMutation<
    PostUploadAudioFileRes,
    AxiosError,
    PostUploadAudioFileReq
  >({
    mutationKey: [QUERY_KEYS.POST_AUDIO_FILE],
    mutationFn: async (data: PostUploadAudioFileReq) => {
      // AbortController 로 post 중단
      const controller = new AbortController()
      setAbortController(controller)

      return await postUploadAudioFile(data, controller.signal)
    },
    onSuccess: (res) => {
      setResults(res)
      moveStep(CreateScheduleStepEnum.AnalysisResult)
    },
    onError: (err) => {
      if (err.message === 'canceled') {
        toast.error('요청이 취소되었습니다.')
        moveStep(CreateScheduleStepEnum.Info)
        closeModal()
      } else {
        //서버 500 오류
        setResults(undefined)
        moveStep(CreateScheduleStepEnum.Info)
        toast.error('음성 전사 중 오류가 발생했습니다. 다시 시도해주세요.')
      }
    },
  })

  const handleCancel = () => {
    if (abortController) {
      abortController.abort()
      setAbortController(null)
      closeModal()
      moveStep(CreateScheduleStepEnum.UploadMedia)
    }
  }

  //일정등록 api
  const {
    mutate: createSchedules,
    isSuccess: isCreateSchedulesSuccess,
    isError: isCreateSchedulesError,
    status: createSchedulesStatus,
  } = useMutation<PostSchedulesRes, AxiosError, PostSchedulesReq>({
    mutationKey: [QUERY_KEYS.POST_SCHEDULES],
    mutationFn: postSchedules,
  })

  const uploadAudio = (file: File) => {
    mutation.mutateAsync({
      audio: file,
      currentDateTime: new Date(),
    })
  }

  const isNextDisabled =
    (currentStep === CreateScheduleStepEnum.UploadMedia &&
      mutation.status === 'idle') ||
    (currentStep === CreateScheduleStepEnum.AnalysisResult &&
      createSchedulesStatus === 'idle')

  return (
    <div className="flex h-full flex-col items-center gap-y-8">
      <Stepper steps={createAudioScheduleSteps} currentStep={currentStep} />

      <div className="flex flex-1">
        {currentStep === CreateScheduleStepEnum.Info && (
          <AboutAudioStep moveStep={moveStep} />
        )}
        {currentStep === CreateScheduleStepEnum.UploadMedia && (
          <StartAudio handlePost={uploadAudio} />
        )}
        {mutation.isPending && (
          <MediaAnalysisLoadingModal
            text={`음성 분석 중입니다. \n약 20~30초 정도 소요됩니다.\n 잠시만 기다려주세요.`}
            onClose={handleCancel}
            onLeftButtonClick={() => {
              uploadAudio(mutation.variables?.audio)
            }}
            onRightButtonClick={handleCancel}
          />
        )}

        {currentStep === CreateScheduleStepEnum.AnalysisResult &&
          mutation.isSuccess &&
          results && (
            <SuccessAudio
              results={results}
              createSchedules={createSchedules}
              moveStep={moveStep}
            />
          )}
        {currentStep === CreateScheduleStepEnum.AnalysisResult &&
          mutation.isError &&
          !isCreateSchedulesSuccess && <FailAudio moveStep={moveStep} />}

        {currentStep === CreateScheduleStepEnum.RegisterResult &&
          !mutation.isError &&
          (isCreateSchedulesSuccess || !isCreateSchedulesError) && (
            <SuccessPostAudio />
          )}
        {/* 일정등록 실패화면 */}
        {currentStep === CreateScheduleStepEnum.RegisterResult &&
          !mutation.isError &&
          (!isCreateSchedulesSuccess || isCreateSchedulesError) && (
            <FailAudio moveStep={moveStep} />
          )}
      </div>

      <MoveStepButtons
        currentStep={currentStep}
        disabled={isNextDisabled}
        moveStep={moveStep}
      />
      <Toast />
    </div>
  )
}

export default CreateAudioSchdulePage
