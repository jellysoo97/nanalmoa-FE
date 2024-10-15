import success from '@/assets/imgs/success.png'
import error from '@/assets/imgs/error.png'
import { SelectOptions } from '.'
import { path } from '@/routes/path'
import { UseMutationResult } from '@tanstack/react-query'
import { PostSchedulesReq, PostSchedulesRes } from '@/types/schedules'
import { CreateScheduleStepEnum } from '@/types/common'

type Props = {
  isSuccess: boolean
  createScheduleMutation: UseMutationResult<
    PostSchedulesRes,
    Error,
    PostSchedulesReq,
    unknown
  >
  moveStep: (step: CreateScheduleStepEnum) => void
}

const RegisterResultStep = ({
  isSuccess,
  createScheduleMutation,
  moveStep,
}: Props) => {
  const handleCallback = () => {
    if (isSuccess && createScheduleMutation.data) {
      const scheduleId = createScheduleMutation.data.scheduleId

      window.location.href = `${path.schedules}/${scheduleId}`
      return
    }

    moveStep(CreateScheduleStepEnum.UploadMedia)
  }

  return (
    <div className="flex flex-col items-center gap-y-10">
      <img
        src={isSuccess ? success : error}
        alt={isSuccess ? 'success' : 'error'}
        width={128}
        height={128}
      />
      <SelectOptions
        title={
          isSuccess ? '일정 등록에 성공했습니다!' : '일정 등록을 실패했습니다.'
        }
        leftButtonText={isSuccess ? '일정 확인하기' : '다시 시도하기'}
        rightButtonText="처음으로"
        leftButtonCallback={handleCallback}
        rightButtonCallback={() => (window.location.href = path.schedules)}
      />
    </div>
  )
}

export default RegisterResultStep
