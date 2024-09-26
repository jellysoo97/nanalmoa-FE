import StartAudio from '@/components/audio/StartAudio'
import FailAudio from '@/components/audio/FailAudio'
import SuccessAudio from '@/components/audio/SuccessAudio'
// import SuccessPostAudio from '@/components/audio/SuccessPostAudio'
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
import { useState } from 'react'
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
    // const formData= new FormData()
    // formData.append('audio', new File([audioBlob], '나날모아 녹음.wav'))
    // formData.append('currentDateTime', new Date().toISOString())
    const requestData: PostUploadAudioFileReq = {
      audio: new File([audioBlob], '나날모아 녹음.wav'),
      currentDateTime: new Date(),
    }
    mutation.mutate(requestData)
  }

  return (
    <div className="flex h-full flex-col p-5">
      {/* 시작, 종료 */}
      {isVisible && <StartAudio handlePost={handleUpload} />}
      {mutation.isPending && (
        <LoadingAudioModal
          onClose={() => {
            closeModal()
            navigate(path.AudioAbout)
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
