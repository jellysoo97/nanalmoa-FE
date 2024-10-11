import { postSchedules } from '@/api/schedules/post-schedules'
import ScheduleForm from '@/components/common/ScheduleForm/ScheduleForm'
import { QUERY_KEYS } from '@/constants/api'
import { useUser } from '@/hooks/use-user'
import {
  IScheduleForm,
  PostSchedulesReq,
  PostSchedulesRes,
} from '@/types/schedules'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

const CreateManualSchedulePage = () => {
  const { user } = useUser()

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
    if (!user?.info?.userUuid) return

    if (data) {
      const payload = {
        ...data,
        userUuid: user.info.userUuid,
      } as PostSchedulesReq

      mutation.mutate(payload)
    }
  }

  return (
    <>
      <ScheduleForm onSubmit={handleSubmit} />
    </>
  )
}

export default CreateManualSchedulePage
