import StartAudio from '@/components/create-schedule/audio/StartAudio'
import FailAudio from '@/components/create-schedule/audio/FailAudio'
import SuccessAudio from '@/components/create-schedule/audio/SuccessAudio'
// import SuccessPostAudio from '@/components/create-schedule/audio/SuccessPostAudio'
import { useState } from 'react'
import LoadingAudioModal from '@/components/create-schedule/LoadingAudioModal'
import { useModal } from '@/hooks/use-modal'
import { path } from '@/routes/path'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { postUploadAudioFile } from '@/api/schedules/post-upload-audio-file'
import {
  PostUploadAudioFileReq,
  PostUploadAudioFileRes,
} from '@/types/schedules'
import { AxiosError } from 'axios'
// import { formatDate } from '@/utils/format-date'
// import { DateFormatTypeEnum } from '@/types/common'

const AudioCreate = () => {
  const navigate = useNavigate()
  const { closeModal } = useModal()

  const [isVisible, setIsVisible] = useState(true)

  const mutation = useMutation<
    PostUploadAudioFileRes,
    AxiosError,
    PostUploadAudioFileReq
  >({
    mutationKey: ['postAudioFile'],
    mutationFn: postUploadAudioFile,
    onSuccess: () => {
      console.log('Audio file uploaded successfully:')
      setIsVisible(false)
    },
    onError: (error, requestData) => {
      console.error('Error uploading audio file:')
      if (error.response?.status === 404) {
        console.error('서버문제')
      } else {
        setIsVisible(false)
        console.log('Data sent to server:', requestData)
      }
    },
  })

  const handleUpload = async (audioBlob: Blob) => {
    const requestData: PostUploadAudioFileReq = {
      audio: new File([audioBlob], '나날모아 녹음.wav'),
      currentDateTime: new Date(),
    }
    mutation.mutate(requestData)
  }

  return (
    <div className="flex h-full flex-col p-5">
      {isVisible && <StartAudio handlePost={handleUpload} />}
      {mutation.isPending && (
        <LoadingAudioModal
          onClose={() => {
            closeModal()
            navigate(path.createSchedule.audio.about)
          }}
        />
      )}
      {mutation.isSuccess && <SuccessAudio />}
      {mutation.isError && <FailAudio />}

      {/* post 등록완료 */}
      {/* <SuccessPostAudio /> */}
    </div>
  )
}

export default AudioCreate
