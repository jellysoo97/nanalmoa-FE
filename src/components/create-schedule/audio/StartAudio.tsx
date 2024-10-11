import microphone from '@/assets/imgs/microphone.png'
import { Button } from '@/components/common'
import useAudioRecord from '@/hooks/use-audio-record'
import { useEffect, useMemo, useRef, useState } from 'react'

interface StartAudioProps {
  handlePost: (audioFile: File) => void
}

type TMethod = 'manual' | 'file' | null

const StartAudio = ({ handlePost }: StartAudioProps) => {
  const [method, setMethod] = useState<TMethod>(null)
  const [audio, setAudio] = useState<File | string | null>(null)
  const { isRecording, audioURL, startRecording, stopRecording } =
    useAudioRecord()
  const isUrl = useMemo(() => typeof audio === 'string', [audio])

  useEffect(() => {
    if (audioURL) {
      setAudio(audioURL)
    }
  }, [audioURL])

  const handleFilePost = async () => {
    if (audio) {
      let data = audio
      if (isUrl) {
        const response = await fetch(audio as string)
        const blob = await response.blob()
        data = new File([blob], 'test.wav', { type: blob.type })
      }
      console.dir(data)
      handlePost(data as File)
    } else {
      console.error('No audio recorded')
    }
  }

  //파일업로드
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files
    if (file) {
      setAudio(file[0])
    }
  }

  return (
    <div className="flex flex-col items-center gap-y-16">
      {!audio && (
        <>
          <div className="relative">
            <div className="absolute -left-2 h-32 w-32 rounded-full bg-violet-300 blur-xl" />
            <div className="bg-white-400 absolute left-4 top-4 h-20 w-20 rounded-full blur-lg" />
            <img
              src={microphone}
              alt="microphone"
              width={128}
              height={128}
              className="relative"
            />
          </div>
          {!method && (
            <div className="flex flex-col items-center gap-y-4">
              <p className="text-lg font-bold">어떤 방법을 선택하실건가요?</p>
              <div className="flex w-full flex-col gap-y-4">
                <Button
                  text="직접 녹음하기"
                  theme="solid"
                  className="py-3"
                  onClick={() => setMethod('manual')}
                />
                <Button
                  text="녹음 파일 가져오기"
                  theme="outline"
                  className="py-3"
                  onClick={() => setMethod('file')}
                />
              </div>
            </div>
          )}
          {method === 'manual' && (
            <div className="flex flex-col items-center gap-y-4">
              <p className="text-center text-lg font-bold">
                녹음 시작 버튼을 누르고 <br />
                이렇게 말해보세요!
              </p>
              <div className="flex flex-col">
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
              <div className="flex w-full flex-col gap-y-4">
                <Button
                  text={isRecording ? '녹음 종료' : '녹음 시작'}
                  className="py-3"
                  onClick={isRecording ? stopRecording : startRecording}
                />
                <Button
                  text="방법 다시 선택하기"
                  theme="outline"
                  className="py-3"
                  onClick={() => setMethod(null)}
                />
              </div>
            </div>
          )}
          {method === 'file' && (
            <div className="flex flex-col items-center gap-y-4">
              <p className="text-center text-lg font-bold">
                음성 파일 가져오기 버튼을 누르고 <br />
                파일을 선택해주세요!
              </p>
              <div className="flex w-full flex-col gap-y-4">
                <Button
                  text="음성 파일 가져오기"
                  theme="solid"
                  className="py-3"
                  onClick={handleFileUpload}
                />
                <Button
                  text="방법 다시 선택하기"
                  theme="outline"
                  className="py-3"
                  onClick={() => setMethod(null)}
                />
                <input
                  type="file"
                  accept="audio/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          )}
        </>
      )}

      {audio && (
        <div className="flex flex-col gap-y-5">
          <audio
            controls
            src={isUrl ? (audio as string) : URL.createObjectURL(audio as File)}
          />
          <div className="flex flex-col items-center gap-y-5">
            <p className="text-center text-lg font-bold">해당 음성이 맞나요?</p>
            <div className="flex w-full flex-col gap-y-4">
              <Button
                text="네, 맞아요"
                theme="solid"
                className="py-3"
                onClick={handleFilePost}
              />
              <Button
                text="아니요, 재녹음할래요"
                theme="outline"
                className="py-3"
                onClick={() => {
                  setAudio(null)
                  setMethod('manual')
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
    // <div>
    //   <div className="flex flex-col items-center justify-center pb-5">
    //     {audio ? (
    //       <div>
    //         <div className="flex h-80 flex-col items-center justify-evenly">
    //           <audio
    //             controls
    //             src={
    //               isUrl ? (audio as string) : URL.createObjectURL(audio as File)
    //             }
    //           />
    //           <p className="strong text-xl">음성을 재생해 확인해보세요!</p>
    //         </div>
    //         <div className="mb-10 flex w-full flex-col items-center justify-between pt-5">
    //           <p>해당 음성이 맞나요?</p>
    //           <div className="mt-5 flex w-full">
    //             <button
    //               className="mx-auto h-10 w-28 rounded border-2 border-primary-base bg-white text-lg"
    //               onClick={() => window.location.reload()}
    //             >
    //               재녹음
    //             </button>
    //             <button
    //               className="mx-auto h-10 w-28 rounded bg-primary-base text-lg text-white"
    //               onClick={handleFilePost}
    //             >
    //               네, 맞아요
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     ) : (
    //       <div>
    //         <div>
    //           <img
    //             src={isRecording ? MicOn : MicOff}
    //             alt="MicOff"
    //             className="relative mx-auto mb-5 mt-10 w-[90%]"
    //             width={240}
    //             height={240}
    //           />
    //           <div className="border-b-8 pb-5">
    //             <p className="strong text-xl">이렇게 말해보세요!</p>
    //             <p>
    //               🎙️ <span className="text-blue-600">내일</span>{' '}
    //               <span className="text-yellow-600">두시</span>에{' '}
    //               <span className="text-red-600">병원</span>가기
    //             </p>
    //             <p>
    //               🎙️ <span className="text-blue-600">금요일</span>{' '}
    //               <span className="text-yellow-600">저녁 여섯시</span>에{' '}
    //               <span className="text-red-600">드라마</span> 보기
    //             </p>
    //           </div>
    //         </div>
    //         <button
    //           onClick={isRecording ? stopRecording : startRecording}
    //           className={`mx-auto mt-5 flex h-20 w-20 transform items-center justify-center rounded-full text-xl text-white transition duration-300 ${isRecording ? 'bg-primary-800' : 'bg-primary-base'} `}
    //         >
    //           {isRecording ? '종료' : '시작'}
    //         </button>
    //         <div className="flex">
    //           <button
    //             onClick={handleFileUpload}
    //             className="mx-auto mt-3 w-1/2 rounded bg-primary-300 p-2 font-semibold"
    //           >
    //             🗣️ 음성 가져오기
    //           </button>
    //           <input
    //             type="file"
    //             accept="audio/*"
    //             ref={fileInputRef}
    //             onChange={handleFileChange}
    //             className="hidden"
    //           />
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
  )
}

export default StartAudio
