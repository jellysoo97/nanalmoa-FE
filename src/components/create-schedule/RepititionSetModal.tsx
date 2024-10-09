import Modal from '../common/Modal'
import { TModal } from '@/types/common'

const RepititionSetModal = ({ onClose }: TModal) => {
  return (
    <Modal onClose={onClose} title="일정 반복 설정">
      <div className="p-4">
        <div>
          <div>반복 주기</div>
        </div>

        <div>횟수</div>
      </div>
    </Modal>
  )
}

export default RepititionSetModal
