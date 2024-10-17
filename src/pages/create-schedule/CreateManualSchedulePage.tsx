import { postSchedules } from '@/api/schedules/post-schedules'
import { Stepper } from '@/components/common'
import SuccessPostAudio from '@/components/create-schedule/audio/SuccessPostAudio'
import ScheduleForm from '@/components/common/schedule-form/ScheduleForm'
import { QUERY_KEYS } from '@/constants/api'
import { createManualScheduleSteps } from '@/constants/schedules'
import { useUser } from '@/hooks/use-user'
import { CreateScheduleStepEnum } from '@/types/common'
import {
  IPartialScheduleForm,
  PostSchedulesReq,
  PostSchedulesRes,
} from '@/types/schedules'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useEffect, useRef, useState } from 'react'

const CreateManualSchedulePage = () => {
  const { user } = useUser()

  const [currentStep, setCurrentStep] = useState(CreateScheduleStepEnum.Info)

  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentStep === CreateScheduleStepEnum.UploadMedia && topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentStep])

  const mutation = useMutation<PostSchedulesRes, AxiosError, PostSchedulesReq>({
    mutationKey: [QUERY_KEYS.POST_SCHEDULES],
    mutationFn: postSchedules,
  })

  const handleSubmit = (data: IPartialScheduleForm) => {
    if (!user?.info?.userUuid) return

    const payload = {
      ...data,
    } as PostSchedulesReq

    mutation.mutate(payload, {
      onSuccess: (response) => {
        console.log('일정 생성 성공:', response)
        setCurrentStep(CreateScheduleStepEnum.UploadMedia)
      },
      onError: (error) => {
        console.error('일정 생성 실패:', error)
      },
    })
  }

  return (
    <div ref={topRef} className="py-5">
      <div className="flex justify-center">
        <Stepper steps={createManualScheduleSteps} currentStep={currentStep} />
      </div>

      {currentStep === CreateScheduleStepEnum.UploadMedia && (
        <SuccessPostAudio />
      )}
      {currentStep === CreateScheduleStepEnum.Info && (
        <ScheduleForm onSubmit={handleSubmit} />
      )}
    </div>
  )
}

export default CreateManualSchedulePage
