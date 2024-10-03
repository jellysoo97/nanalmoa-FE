import MicAbout from '@/assets/imgs/MicAbout.png'
import { CreateScheduleStepEnum } from '@/types/common'

type Props = {
  moveStep: (step: CreateScheduleStepEnum) => void
}

const AboutAudioStep = ({ moveStep }: Props) => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col items-center justify-center pb-5">
        <img
          src={MicAbout}
          alt="MicOff"
          className="relative mx-auto mb-5 mt-10 w-full"
          width={240}
          height={240}
        />
        <div
          className="mx-auto mb-5 flex h-12 w-full items-center rounded bg-primary-500"
          onClick={() => moveStep(CreateScheduleStepEnum.UploadMedia)}
        >
          <p className="mx-auto text-lg">🍀 목소리로 일정 등록하기</p>
        </div>
        <div className="flex h-40 w-full flex-col items-center justify-around rounded-lg border-2">
          <p className="text-lg">
            녹음 시작 버튼을 누르고
            <br />
            <span className="font-bold">이렇게 말해보세요!</span>
          </p>
          <p>
            🎙️ <span className="text-blue-600">내일</span>{' '}
            <span className="text-yellow-600">두시</span>에{' '}
            <span className="text-red-600">병원</span>가기
          </p>
          <p className="text-sm">미리 녹음한 목소리로도 등록할 수 있어요!</p>
        </div>
      </div>
    </div>
  )
}

export default AboutAudioStep
