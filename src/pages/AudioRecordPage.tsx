import { useState, useRef } from 'react'

const AudioRecorderPage = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)

      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/mp3',
        })
        const url = URL.createObjectURL(audioBlob)
        setAudioURL(url)
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone: ', error)
    }
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
  }

  const downloadAudio = () => {
    if (audioURL) {
      const link = document.createElement('a')
      link.href = audioURL
      link.download = 'recording.mp3'
      link.click()
    }
  }

  return (
    <div>
      <h1>음성 녹음기</h1>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? '녹음 중지' : '녹음 시작'}
      </button>
      {audioURL && (
        <div>
          <h2>녹음된 파일:</h2>
          <audio controls src={audioURL} />
          <button onClick={downloadAudio}>다운로드</button>
        </div>
      )}
    </div>
  )
}

export default AudioRecorderPage
