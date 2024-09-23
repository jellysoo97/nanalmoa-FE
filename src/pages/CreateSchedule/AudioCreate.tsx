import useAudioRecord from '@/hooks/useAudioRecord'

const AudioCreate = () => {
  const {
    isRecording,
    audioURL,
    startRecording,
    stopRecording,
    downloadAudio,
  } = useAudioRecord()
  return (
    <div>
      <h1>일정 만들기 페이지</h1>
      <h2>음성 녹음기</h2>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? '녹음 중지' : '녹음 시작'}
      </button>
      {audioURL && (
        <div>
          <h3>녹음된 파일:</h3>
          <audio controls src={audioURL} />
          <button onClick={downloadAudio}>다운로드</button>
        </div>
      )}
    </div>
  )
}

export default AudioCreate
