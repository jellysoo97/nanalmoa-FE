import { postSchedules } from '@/api/schedules/post-schedules'
import { postUploadAudioFile } from '@/api/schedules/post-upload-audio-file'
import MediaAnalysisLoadingModal from '@/components/create-schedule/MediaAnalysisLoadingModal'
import StartAudio from '@/components/create-schedule/audio/StartAudio'
import SuccessAudio from '@/components/create-schedule/audio/SuccessAudio'
import SuccessPostAudio from '@/components/create-schedule/audio/SuccessPostAudio'
import { QUERY_KEYS } from '@/constants/api'
import { useModal } from '@/hooks/use-modal'
import { path } from '@/routes/path'
import {
  IMediaAnalysisResult,
  PostSchedulesReq,
  PostSchedulesRes,
  PostUploadAudioFileReq,
  PostUploadAudioFileRes,
} from '@/types/schedules'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DUMMY_DATA: PostUploadAudioFileRes = [
  {
    userId: 2,
    startDate: new Date(),
    endDate: new Date(),
    title: '동창의 모임',
    place: '강남 쪽 식당',
    isAllDay: false,
    // category: {
    //   categoryId: 7,
    //   categoryName: '기타',
    // },
  },
]

const AudioCreate = () => {
  const navigate = useNavigate()
  const { closeModal } = useModal()

  const [results, setResults] = useState<PostUploadAudioFileRes>()
  const [isOpen, setIsOpen] = useState<boolean>(false)

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
      setResults([{} as IMediaAnalysisResult])
    },
  })
  const { mutate: createSchedules, isSuccess: isCreateSchedulesSuccess } =
    useMutation<PostSchedulesRes, AxiosError, PostSchedulesReq>({
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
      {mutation.isPending && !isOpen && (
        <MediaAnalysisLoadingModal
          text={`음성 분석 중입니다. \n약 20~30초 정도 소요됩니다.\n 잠시만 기다려주세요.`}
          onClose={() => {
            closeModal()
            // navigate(path.createSchedule.audio.about)
            setIsOpen(true)
            setResults(DUMMY_DATA)
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
      {isOpen && results && (
        <SuccessAudio results={results} createSchedules={createSchedules} />
      )}
      {/* {mutation.isError && !isCreateSchedulesSuccess && <FailAudio />} */}

      {/* post 등록완료 */}
      {isCreateSchedulesSuccess && <SuccessPostAudio />}
    </div>
  )
}

export default AudioCreate
