import { CreateScheduleStepEnum } from '@/types/common'
import microphone from '@/assets/imgs/microphone.png'

type Props = {
  moveStep: (step: CreateScheduleStepEnum) => void
}

const AboutAudioStep = ({ moveStep }: Props) => {
  return (
    <div className="flex flex-col items-center gap-y-10">
      <div className="relative">
        <div className="absolute -left-2 h-32 w-32 rounded-full bg-violet-300 blur-xl" />
        <div className="bg-white-400 absolute left-4 top-4 h-20 w-20 rounded-full blur-lg" />
        <img
          src={microphone}
          alt="microphone"
          width={128}
          height={128}
          className="relative"
          onClick={() => moveStep(CreateScheduleStepEnum.UploadMedia)}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-y-4 rounded-lg border-2 p-4 text-center text-sm sm:p-6">
        <p className="mb-3 text-lg font-bold">녹음을 통해 일정을 등록합니다</p>
        <p className="underline underline-offset-2">
          1. 2가지 방법으로 음성을 등록합니다.
        </p>
        <p className="font-bold">방법1) 직접 녹음하기</p>
        <p className="leading-5">
          <strong>녹음 버튼</strong>을 누르고 <br />
          <strong>일자, 시간, 장소</strong>가 명확하게 드러나게 <br /> 일정을
          말씀해주세요.
          <br />
          예시) <span className="text-blue-600">내일</span>{' '}
          <span className="text-yellow-600">두시</span>에{' '}
          <span className="text-red-600">병원</span>가기
        </p>
        <p className="font-bold">방법2) 음성 파일 선택하기</p>
        <p className="underline underline-offset-2">2. 음성을 확인해주세요.</p>
        <p className="underline underline-offset-2">
          3. 음성을 분석해 일정을 추출합니다.
        </p>
        <p>
          준비가 완료되셨으면
          <br />
          <strong>'다음 단계로'</strong> 버튼을 눌러주세요!
        </p>
      </div>
    </div>
    // <div className="flex h-full flex-col">
    //   <div className="flex flex-col items-center justify-center pb-5">
    //     <img
    //       src={MicAbout}
    //       alt="MicOff"
    //       className="relative mx-auto mb-5 mt-10 w-full"
    //       width={240}
    //       height={240}
    //     />
    //     <div
    //       className="mx-auto mb-5 flex h-12 w-full items-center rounded bg-primary-500"
    //       onClick={() => moveStep(CreateScheduleStepEnum.UploadMedia)}
    //     >
    //       <p className="mx-auto text-lg">🍀 목소리로 일정 등록하기</p>
    //     </div>
    //     <div className="flex h-40 w-full flex-col items-center justify-around rounded-lg border-2">
    //       <p className="text-lg">
    //         녹음 시작 버튼을 누르고
    //         <br />
    //         <span className="font-bold">이렇게 말해보세요!</span>
    //       </p>
    //       <p>
    //         🎙️ <span className="text-blue-600">내일</span>{' '}
    //         <span className="text-yellow-600">두시</span>에{' '}
    //         <span className="text-red-600">병원</span>가기
    //       </p>
    //       <p className="text-sm">미리 녹음한 목소리로도 등록할 수 있어요!</p>
    //     </div>
    //   </div>
    // </div>
  )
}

export default AboutAudioStep
