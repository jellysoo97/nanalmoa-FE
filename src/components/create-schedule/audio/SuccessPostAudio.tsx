import { IconButton } from '@/components/common'
import PostFace from '@/assets/imgs/PostFace.png'
import { HomeIcon, InfoIcon } from '@/components/icons'
import { Link } from 'react-router-dom'
import { path } from '@/routes/path'

const SuccessPostAudio = () => {
  return (
    <div className="flex h-full flex-col p-5">
      <div className="ml-auto flex h-10 items-center text-red-500">
        <InfoIcon />
        <p>도움말</p>
      </div>
      <div className="mt-3 flex justify-evenly">
        <div className="flex flex-col items-center justify-center">
          <div className="mx-auto my-1 flex h-7 w-7 items-center justify-center rounded-full bg-gray-400 font-bold text-white">
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
          <div className="mx-auto my-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary-base font-bold text-white">
            <p className="mt-1">3</p>
          </div>
          등록완료
        </div>
      </div>

      <div className="-mt-10 flex flex-col items-center justify-center pb-5">
        <img
          src={PostFace}
          alt="PostFace"
          className="relative mx-auto mb-10 mt-20 w-1/3"
          width={240}
          height={240}
        />
        <p className="mb-8 text-xl">일정 등록에 성공했습니다!</p>
        <Link
          to={path.schedules}
          className="mx-auto mb-2 flex h-12 w-32 items-center rounded bg-primary-base text-white"
        >
          <p className="mx-auto text-lg">일정 확인</p>
        </Link>
      </div>
      <Link
        to={path.schedules}
        className="mx-auto mb-8 mt-auto w-1/3 rounded bg-gray-300 p-2 font-semibold"
      >
        <IconButton
          direction="horizontal"
          icon={<HomeIcon />}
          text="처음으로"
          className="mx-auto gap-x-1"
        />
      </Link>
    </div>
  )
}

export default SuccessPostAudio
