import StartAudio from '@/components/create-schedule/audio/StartAudio'
import FailAudio from '@/components/create-schedule/audio/FailAudio'
import SuccessAudio from '@/components/create-schedule/audio/SuccessAudio'
// import SuccessPostAudio from '@/components/create-schedule/audio/SuccessPostAudio'
import { useState } from 'react'
import MediaAnalysisLoadingModal from '@/components/create-schedule/MediaAnalysisLoadingModal'
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

const AudioCreate = () => {
  const navigate = useNavigate()
  const { closeModal } = useModal()

  const [result, setResult] = useState<PostUploadAudioFileRes>()

  const mutation = useMutation<
    PostUploadAudioFileRes,
    AxiosError,
    PostUploadAudioFileReq
  >({
    mutationKey: ['postAudioFile'],
    mutationFn: postUploadAudioFile,
    onSuccess: (res) => {
      setResult(res)
    },
    onError: (err) => {
      console.error('err', err)
      setResult(undefined)
    },
  })

  const uploadAudio = (file: File) => {
    mutation.mutateAsync({
      audio: file,
      currentDateTime: new Date(),
    })
  }

  return (
    <div className="flex h-full flex-col p-5">
      {!result && <StartAudio handlePost={uploadAudio} />}
      {mutation.isPending && (
        <MediaAnalysisLoadingModal
          text={`음성 분석 중입니다. \n잠시만 기다려주세요.`}
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
      {mutation.isSuccess && <SuccessAudio />}
      {mutation.isError && <FailAudio />}

      {/* post 등록완료 */}
      {/* <SuccessPostAudio /> */}
    </div>
  )
}

export default AudioCreate
