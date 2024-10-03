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

const CreateAudioSchdulePage = () => {
  const { closeModal } = useModal()

  const [currentStep, setCurrentStep] = useState<CreateScheduleStepEnum>(
    CreateScheduleStepEnum.Info
  )
  const [results, setResults] = useState<PostUploadAudioFileRes>()

  const moveStep = (step: CreateScheduleStepEnum) => {
    setCurrentStep(step)
  }

  const mutation = useMutation<
    PostUploadAudioFileRes,
    AxiosError,
    PostUploadAudioFileReq
  >({
    mutationKey: [QUERY_KEYS.POST_AUDIO_FILE],
    mutationFn: postUploadAudioFile,
    onSuccess: (res) => {
      setResults(res)
      moveStep(CreateScheduleStepEnum.AnalysisResult)
    },
    onError: (err) => {
      console.error('err', err)
      setResults(undefined)
      moveStep(CreateScheduleStepEnum.UploadMedia)
      alert('음성 전사 중 오류가 발생했습니다. 다시 시도해주세요.')
    },
  })

  const {
    mutate: createSchedules,
    isSuccess: isCreateSchedulesSuccess,
    isError: isCreateSchedulesError,
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

  return (
    <div className="flex h-full flex-col items-center px-2 py-4">
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
            onClose={() => {
              closeModal()
              moveStep(CreateScheduleStepEnum.UploadMedia)
              //post 중단
            }}
            onLeftButtonClick={() => {
              uploadAudio(mutation.variables?.audio)
            }}
            onRightButtonClick={() => {
              closeModal()
              moveStep(CreateScheduleStepEnum.UploadMedia)
              // post 중단
            }}
          />
        )}
        {currentStep === CreateScheduleStepEnum.AnalysisResult &&
          mutation.isSuccess &&
          results &&
          !isCreateSchedulesSuccess && (
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
          (isCreateSchedulesSuccess || isCreateSchedulesError) && (
            <SuccessPostAudio />
          )}
      </div>
      <MoveStepButtons currentStep={currentStep} moveStep={moveStep} />
    </div>
  )
}

export default CreateAudioSchdulePage
