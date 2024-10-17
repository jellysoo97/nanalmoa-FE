import { useModal } from '@/hooks/use-modal'
import { usePhoto } from '@/hooks/use-photo'
import { PostAnalyzeImageReq, PostAnalyzeImageRes } from '@/types/schedules'
import { UseMutationResult } from '@tanstack/react-query'
import { ChangeEvent, useEffect, useRef } from 'react'
import MediaAnalysisLoadingModal from '../MediaAnalysisLoadingModal'

import { GalleryIcon } from '@/components/icons'
import { CreateScheduleStepEnum } from '@/types/common'
import { SelectOptions } from '.'

type Props = {
  analyzeImageMutation: UseMutationResult<
    PostAnalyzeImageRes,
    Error,
    PostAnalyzeImageReq,
    unknown
  >
  moveStep: (step: CreateScheduleStepEnum) => void
}

const UploadPhotoStep = ({ analyzeImageMutation, moveStep }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const photoRef = useRef<HTMLCanvasElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const {
    isModalOpen: isLoadingModalOpen,
    openModal: openLoadingModal,
    closeModal: closeLoadingModal,
  } = useModal()
  const { photo, setPhoto, takePhoto } = usePhoto({
    videoRef,
    photoRef,
  })

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const url = URL.createObjectURL(file)
      setPhoto({ url, file })
    }
  }
  const handleAnalyze = () => {
    if (photo) {
      analyzeImageMutation.mutate({
        image: photo.file,
        currentDateTime: new Date(),
      })
      openLoadingModal()
    }
  }

  useEffect(() => {
    if (analyzeImageMutation.isSuccess || analyzeImageMutation.isError) {
      closeLoadingModal()
    }
  }, [analyzeImageMutation.isSuccess, analyzeImageMutation.isError])

  return (
    <>
      {!photo && (
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="max-h-80 w-full"
          />
          <div className="flex items-center justify-between bg-neutral-200 px-3 py-4">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100"
              onClick={() => inputRef.current?.click()}
            >
              <GalleryIcon className="h-5 w-5" />
            </button>
            <button className="relative flex h-10 w-10" onClick={takePhoto}>
              <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-100 opacity-75" />
              <div className="relative inline-flex h-10 w-10 rounded-full bg-white">
                <div className="absolute left-1 top-1 h-8 w-8 rounded-full border-2 border-neutral-400 bg-transparent" />
              </div>
            </button>
            <div className="h-10 w-10" />
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileInput}
            onClick={(e) => {
              const input = e.target as HTMLInputElement
              input.value = ''
            }}
          />
          <canvas ref={photoRef} hidden />
        </div>
      )}

      {photo && (
        <div className="flex w-full flex-col gap-y-5">
          <img src={photo.url} alt="photo" width={400} height={300} />

          <SelectOptions
            title="원하시는 사진이 맞나요?"
            description={
              <p className="text-center text-sm text-neutral-600">
                선택하신 사진이 일정 분석에 사용됩니다
              </p>
            }
            leftButtonText="네, 맞습니다"
            rightButtonText="아니요, 재촬영하겠습니다"
            leftButtonCallback={handleAnalyze}
            rightButtonCallback={() => {
              setPhoto(null)
            }}
          />
        </div>
      )}

      {isLoadingModalOpen && (
        <MediaAnalysisLoadingModal
          text={`사진 분석 중입니다. \n잠시만 기다려주세요.`}
          onLeftButtonClick={() => {}}
          onRightButtonClick={() => {
            closeLoadingModal()
            moveStep(CreateScheduleStepEnum.Info)
          }}
          onClose={closeLoadingModal}
        />
      )}
    </>
  )
}

export default UploadPhotoStep
