import useAudioRecord from '@/hooks/use-audio-record'
import { IconButton } from '../common'
import { InfoIcon } from '../icons'
import PrevIcon from '../icons/PrevIcon'
import MicOff from '@/assets/imgs/MicOff.svg'
import MicOn from '@/assets/imgs/MicOn.svg'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { path } from '@/routes/path'

const StartAudio = ({
  setIsLoading,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { isRecording, audioURL, startRecording, stopRecording } =
    useAudioRecord()

  //파일업로드
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log('Uploaded file:', file)
    }
  }

  //파일 post, setIsLoading true, 성공 시 setIsLoading false
  useEffect(() => {
    setIsLoading(true)
  })

  return (
    <div>
      <div className="flex h-10 justify-between">
        <Link
          to={path.AudioAbout}
          className="w-20 rounded bg-primary-base pr-2"
        >
          <IconButton
            direction="horizontal"
            icon={<PrevIcon />}
            text="이전"
            className="mx-auto flex h-full items-center justify-center text-white"
          />
        </Link>
        <div className="flex items-center text-red-500">
          <InfoIcon />
          <p>도움말</p>
        </div>
      </div>
      <div className="-mt-5 flex flex-col items-center justify-center border-b-8 pb-5">
        {audioURL ? (
          <audio controls src={audioURL} />
        ) : (
          <img
            src={isRecording ? MicOn : MicOff}
            alt="MicOff"
            className="relative mx-auto mb-5 mt-10 w-5/6"
            width={240}
            height={240}
          />
        )}
        <div>
          <p className="strong text-xl">이렇게 말해보세요!</p>
          <p>
            🎙️ <span className="text-blue-600">내일</span>{' '}
            <span className="text-yellow-600">두시</span>에{' '}
            <span className="text-red-600">병원</span>가기
          </p>
          <p>
            🎙️ <span className="text-blue-600">금요일</span>{' '}
            <span className="text-yellow-600">저녁 여섯시</span>에{' '}
            <span className="text-red-600">드라마</span> 보기
          </p>
        </div>
      </div>
      {audioURL ? (
        <div className="mb-10 flex w-full flex-col items-center justify-between pt-5">
          <p>해당 음성이 맞나요?</p>
          <div className="flex w-3/4">
            <button className="mx-auto h-10 w-28 rounded border-2 border-primary-base bg-white text-lg">
              재녹음
            </button>
            <button className="mx-auto h-10 w-28 rounded bg-primary-base text-lg text-white">
              네, 맞아요
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`mx-auto mt-5 flex h-20 w-20 transform items-center justify-center rounded-full text-xl text-white transition duration-300 ${isRecording ? 'bg-primary-800' : 'bg-primary-base'} `}
        >
          {isRecording ? '종료' : '시작'}
        </button>
      )}
      <div className="flex">
        <button
          onClick={handleFileUpload}
          className="mx-auto mt-3 w-1/2 rounded bg-primary-300 p-2 font-semibold"
        >
          🗣️ 음성 가져오기
        </button>
        <input
          type="file"
          accept="audio/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  )
}

export default StartAudio
