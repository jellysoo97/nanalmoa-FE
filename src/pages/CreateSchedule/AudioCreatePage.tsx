import StartAudio from '@/components/audio/StartAudio'
import FailAudio from '@/components/audio/FailAudio'
import SuccessAudio from '@/components/audio/SuccessAudio'
import SuccessPostAudio from '@/components/audio/SuccessPostAudio'
import { useEffect, useState } from 'react'
import LoadingAudioModal from '@/components/create-schedule/LoadingAudioModal'

const AudioCreate = () => {
  const [isStart, setIsStart] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isPost, setIsPost] = useState<boolean>(false)

  // 수정될코드
  useEffect(() => {
    setIsStart(true)
    setIsSuccess(false)
  }, [isStart])

  return (
    <div className="flex h-full flex-col p-5">
      {/* 시작, 종료 */}
      {/* 파일 post 시 로딩처리 */}
      {isStart && <StartAudio setIsLoading={setIsLoading} />}

      {/* 분석중 모달, 완료 시 닫힘 + setIsStart(false) + setIsLoading(false)*/}
      {isLoading && <LoadingAudioModal />}

      {/* 음성 등록의 분석 성공, 실패, api 요청에 따른 setIsSuccess */}
      {!isStart && !isLoading && isSuccess && (
        <SuccessAudio setIsPost={setIsPost} />
      )}
      {!isStart && !isLoading && !isSuccess && <FailAudio />}

      {/* post 등록완료 */}
      {!isStart && isPost && <SuccessPostAudio />}
    </div>
  )
}

export default AudioCreate
