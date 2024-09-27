import SuccessFace from '@/assets/imgs/SuccessFace.png'
import { Button } from '@/components/common'
import {
  IMediaAnalysisResult,
  PostSchedulesReq,
  PostUploadAudioFileRes,
} from '@/types/schedules'
import { useState } from 'react'
import MediaAnaysisResultCarousel from '../MediaAnalysisResultCarousel'

type Props = {
  results: PostUploadAudioFileRes
  createSchedules: (payload: PostSchedulesReq) => void
}

const SuccessAudio = ({ results, createSchedules }: Props) => {
  const [selectedResult, setSelectedResult] = useState<IMediaAnalysisResult>(
    results[0]
  )

  const handleSelectedResultChange = (result: IMediaAnalysisResult) => {
    setSelectedResult(result)
  }
  const handleCreate = () => {
    if (selectedResult) {
      createSchedules({
        ...selectedResult,
        userId: 2,
      })
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* TODO: 중간발표 보류 */}
      {/* <div className="ml-auto flex h-10 items-center text-red-500">
        <InfoIcon />
        <p>도움말</p>
      </div> */}
      <div className="mt-3 flex justify-evenly">
        <div className="flex flex-col items-center justify-center">
          <div className="mx-auto my-1 flex h-7 w-7 items-center justify-center rounded-full bg-gray-400 font-bold text-white">
            <p className="mt-1">1</p>
          </div>
          등록안내
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="mx-auto my-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary-base font-bold text-white">
            <p className="mt-1">2</p>
          </div>
          음성등록
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="mx-auto my-1 flex h-7 w-7 items-center justify-center rounded-full bg-gray-400 font-bold text-white">
            <p className="mt-1">3</p>
          </div>
          등록완료
        </div>
      </div>

      <div className="-mt-10 flex flex-col items-center justify-center pb-5">
        <img
          src={SuccessFace}
          alt="SuccessFace"
          className="relative mx-auto mb-5 mt-10 w-1/3"
          width={240}
          height={240}
        />
        <p className="-mt-2 mb-6 text-xl">음성 분석에 성공했습니다.</p>
        <MediaAnaysisResultCarousel
          results={results}
          selectedResult={selectedResult}
          handleSelectedResultChange={handleSelectedResultChange}
        />
        {/* <div className="flex h-28 w-3/4 flex-col items-center justify-center rounded-lg border-2 text-lg">
          <p>2024년 12월 14일</p>
          <div className="flex w-full flex-row items-center justify-center">
            <p className="rounded bg-primary-blue text-white">경조사</p>
            <p>막내 결혼식</p>
          </div>
        </div> */}
        <div className="mt-6 flex w-full flex-col items-center justify-between">
          <p>이대로 등록할까요?</p>
          <div className="mt-4 flex items-center gap-x-6">
            <Button
              theme="outline"
              text="수정하기"
              onClick={() => {
                alert('준비 중입니다.')
              }}
            />
            <Button theme="solid" text="등록하기" onClick={handleCreate} />
          </div>
        </div>
      </div>

      {/* TODO: 중간발표 보류 */}
      {/* <Link
        to={path.schedules}
        className="mx-auto mb-8 mt-auto w-1/3 rounded bg-gray-300 p-2 font-semibold"
      >
        <IconButton
          direction="horizontal"
          icon={<HomeIcon />}
          text="처음으로"
          className="mx-auto gap-x-1"
        />
      </Link> */}
    </div>
  )
}

export default SuccessAudio
