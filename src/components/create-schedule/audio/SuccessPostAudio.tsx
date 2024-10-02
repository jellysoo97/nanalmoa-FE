import PostFace from '@/assets/imgs/PostFace.png'
import { Link } from 'react-router-dom'
import { path } from '@/routes/path'

const SuccessPostAudio = () => {
  return (
    <div className="flex h-full flex-col p-5">
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
          className="mx-auto mb-2 flex h-12 w-2/3 items-center rounded bg-primary-base text-white"
        >
          <p className="mx-auto text-lg">일정 확인하러 가기</p>
        </Link>
      </div>
    </div>
  )
}

export default SuccessPostAudio
