import StartAudio from '@/components/audio/StartAudio'

const AudioCreate = () => {
  return (
    <div className="flex h-full flex-col p-5">
      {/* 시작, 종료 */}
      <StartAudio />
      {/* 분석중 모달 */}
      {/* 음성 등록의 분석 성공, 실패 */}
    </div>
  )
}

export default AudioCreate
