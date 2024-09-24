import { Link } from 'react-router-dom'
import { path } from '@/routes/path'
import { IconButton } from '../common'
import { HomeIcon } from '../icons'
import { cn } from '@/utils/cn'
import { ModalPortal } from '../common/Modal'

const LoadingAudioModal = () => {
  return (
    <ModalPortal>
      <div
        className={cn(
          'absolute left-0 top-0 z-50 h-full w-full bg-black bg-opacity-30',
          'flex items-center justify-center'
        )}
      >
        <div className="flex min-h-80 min-w-80 flex-col items-center justify-end rounded-xl bg-white md:min-w-96">
          <div className="mb-auto mt-8">
            <p>음성 분석 중입니다.</p>
            <p>잠시만 기다려주세요.</p>
          </div>
          <p className="mt-auto text-red-500">너무 오래 걸리나요?</p>
          <Link
            to={path.schedules}
            className="mx-auto mb-8 w-1/3 rounded bg-gray-300 p-2 font-semibold"
          >
            <IconButton
              direction="horizontal"
              icon={<HomeIcon />}
              text="처음으로"
              className="mx-auto gap-x-1"
            />
          </Link>
        </div>
      </div>
    </ModalPortal>
  )
}

export default LoadingAudioModal
