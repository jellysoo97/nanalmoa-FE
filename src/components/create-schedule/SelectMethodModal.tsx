import { TModal } from '@/types/common'
import Modal from '../common/Modal'
import { Link } from 'react-router-dom'
import { path } from '@/routes/path'

type Props = TModal

const SelectMethodModal = ({ onClose }: Props) => {
  return (
    <Modal title="일정 등록 방법 선택" hasHelp onClose={onClose}>
      <div className="flex flex-1 flex-col items-center gap-y-2 p-4">
        <div className="grid w-full grid-cols-2 gap-x-2">
          <Link to={path.createSchedule.audio} onClick={onClose} reloadDocument>
            <div className="flex flex-col items-center justify-center gap-y-1 rounded-xl bg-primary-coral py-6">
              <span className="text-2xl">🎙️</span>
              <span>자동 음성 등록</span>
            </div>
          </Link>
          <Link to={path.createSchedule.photo} onClick={onClose} reloadDocument>
            <div className="flex flex-col items-center justify-center gap-y-1 rounded-xl bg-primary-yellow py-6">
              <span className="text-2xl">📷</span>
              <span>자동 사진 등록</span>
            </div>
          </Link>
        </div>
        <Link
          to={path.createSchedule.manual}
          className="flex w-full items-center justify-center rounded-xl bg-primary-400 py-6"
          reloadDocument
          onClick={onClose}
        >
          <span className="mr-2 text-2xl">📝</span>
          직접 입력하기
        </Link>
      </div>
    </Modal>
  )
}

export default SelectMethodModal
