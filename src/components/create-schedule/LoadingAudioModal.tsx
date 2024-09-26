import { Link } from 'react-router-dom'
import { path } from '@/routes/path'
import { IconButton } from '../common'
import { HomeIcon } from '../icons'
import Modal from '../common/Modal'
import { ModalProps } from '@/types/common'

type Props = ModalProps

const LoadingAudioModal = ({ onClose }: Props) => {
  return (
    <Modal title="음성 분석 중" hasHelp onClose={onClose}>
      <div className="flex flex-col items-center justify-end p-3">
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
    </Modal>
  )
}

export default LoadingAudioModal
