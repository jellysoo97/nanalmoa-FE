import camera from '@/assets/imgs/camera.png'
import { useModal } from '@/hooks/use-modal'
import { usePhoto } from '@/hooks/use-photo'
import { useEffect, useRef } from 'react'
import PermissionModal from './PermissionModal'

const InfoStep = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const photoRef = useRef<HTMLCanvasElement | null>(null)
  const {
    isModalOpen: isPermissionModalOpen,
    openModal: openPermissionModal,
    closeModal: closePermissionModal,
  } = useModal()
  const { isDeviceAllowed } = usePhoto({
    videoRef,
    photoRef,
  })

  useEffect(() => {
    if (!isDeviceAllowed) {
      openPermissionModal()
      return
    }

    closePermissionModal()
  }, [isDeviceAllowed])

  return (
    <>
      <div className="flex flex-col items-center gap-y-10">
        <div className="relative">
          <div className="absolute -left-2 h-32 w-32 rounded-full bg-blue-300 blur-xl" />
          <div className="bg-white-400 absolute left-4 top-4 h-20 w-20 rounded-full blur-lg" />
          <img src={camera} alt="camera" className="relative" />
        </div>
        <div className="flex flex-col items-center justify-center gap-y-4 rounded-lg border-2 p-4 text-center text-sm sm:p-6">
          <p className="mb-3 text-lg font-bold">
            사진을 통해 일정을 등록합니다
          </p>
          <p className="underline underline-offset-2">
            1. 2가지 방법으로 사진을 등록합니다.
          </p>
          <div className="flex flex-col gap-y-2">
            <p>사진 예시: 처방전, 약봉투</p>
            <p className="font-bold">방법1) 직접 촬영하기</p>
            <p className="font-bold">방법2) 사진 파일 선택하기</p>
          </div>

          <p className="underline underline-offset-2">
            2. 사진을 확인해주세요.
          </p>
          <p className="underline underline-offset-2">
            3. 사진을 분석해 일정을 추출합니다.
          </p>
          <p>
            준비가 완료되셨으면
            <br />
            <strong>'다음 단계로'</strong> 버튼을 눌러주세요!
          </p>
        </div>

        <video ref={videoRef} autoPlay className="hidden max-h-80 w-full" />
        <canvas ref={photoRef} hidden />
      </div>

      {isPermissionModalOpen && (
        <PermissionModal onClose={closePermissionModal} />
      )}
    </>
  )
}

export default InfoStep
