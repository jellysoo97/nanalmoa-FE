import StartAudio from '@/components/create-schedule/audio/StartAudio'
import FailAudio from '@/components/create-schedule/audio/FailAudio'
import SuccessAudio from '@/components/create-schedule/audio/SuccessAudio'
import { useState } from 'react'
import MediaAnalysisLoadingModal from '@/components/create-schedule/MediaAnalysisLoadingModal'
import { useModal } from '@/hooks/use-modal'
import { path } from '@/routes/path'
import { useNavigate } from 'react-router-dom'
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

const AudioCreate = () => {
  const navigate = useNavigate()
  const { closeModal } = useModal()

  const [results, setResults] = useState<PostUploadAudioFileRes>()

  const mutation = useMutation<
    PostUploadAudioFileRes,
    AxiosError,
    PostUploadAudioFileReq
  >({
    mutationKey: [QUERY_KEYS.POST_AUDIO_FILE],
    mutationFn: postUploadAudioFile,
    onSuccess: (res) => {
      setResults(res)
    },
    onError: (err) => {
      console.error('err', err)
      setResults(undefined)
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
    <div className="flex h-full flex-col p-5">
      {!results && <StartAudio handlePost={uploadAudio} />}
      {mutation.isPending && (
        <MediaAnalysisLoadingModal
          text={`음성 분석 중입니다. \n약 20~30초 정도 소요됩니다.\n 잠시만 기다려주세요.`}
          onClose={() => {
            closeModal()
            navigate(path.createSchedule.audio.about)
          }}
          onLeftButtonClick={() => {
            uploadAudio(mutation.variables?.audio)
          }}
          onRightButtonClick={() => {
            closeModal()
            navigate(path.createSchedule.audio.about)
          }}
        />
      )}
      {mutation.isSuccess && results && !isCreateSchedulesSuccess && (
        <SuccessAudio results={results} createSchedules={createSchedules} />
      )}
      {mutation.isError && !isCreateSchedulesSuccess && <FailAudio />}

      {/* post 등록완료 */}
      {(isCreateSchedulesSuccess || isCreateSchedulesError) && (
        <SuccessPostAudio />
      )}
    </div>
  )
}

export default AudioCreate
