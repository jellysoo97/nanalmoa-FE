import { IconButton } from '@/components/common'
import PrevIcon from '@/components/icons/PrevIcon'
import NextIcon from '@/components/icons/NextIcon'
import MicAbout from '@/assets/imgs/MicAbout.png'
import { HomeIcon } from '@/components/icons'
import { Link } from 'react-router-dom'
import { path } from '@/routes/path'

const AudioAboutPage = () => {
  return (
    <div className="flex h-full flex-col p-5">
      <div className="flex h-10 justify-between">
        <Link to={path.schedules} className="w-20 rounded bg-primary-base pr-2">
          <IconButton
            direction="horizontal"
            icon={<PrevIcon />}
            text="이전"
            className="mx-auto flex h-full items-center justify-center text-white"
          />
        </Link>
        <Link
          to={path.AudioCreate}
          className="h-full w-20 rounded bg-primary-base pl-2"
        >
          <button className="mx-auto flex h-full flex-row items-center justify-center text-white">
            다음
            <NextIcon />
          </button>
        </Link>
      </div>
      <div className="mt-3 flex justify-evenly">
        <div className="flex flex-col items-center justify-center">
          <div className="mx-auto my-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary-base font-bold text-white">
            <p className="mt-1">1</p>
          </div>
          등록안내
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="mx-auto my-1 flex h-7 w-7 items-center justify-center rounded-full bg-gray-400 font-bold text-white">
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
          src={MicAbout}
          alt="MicOff"
          className="relative mx-auto mb-5 mt-10 w-full"
          width={240}
          height={240}
        />
        <Link
          to={path.AudioCreate}
          className="mx-auto -mt-5 mb-2 flex h-12 w-3/4 items-center rounded bg-primary-500"
        >
          <p className="mx-auto text-lg">🍀 목소리로 일정 등록하기</p>
        </Link>
        <div className="flex h-40 w-3/4 flex-col items-center justify-around rounded-lg border-2">
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

      <>
        <Link
          to={path.schedules}
          className="mx-auto w-1/3 rounded bg-gray-300 p-2 font-semibold"
        >
          <IconButton
            direction="horizontal"
            icon={<HomeIcon />}
            text="처음으로"
            className="mx-auto gap-x-1"
          />
        </Link>
      </>
    </div>
  )
}

export default AudioAboutPage
