import { TModal } from '@/types/common'
import Modal from '../common/Modal'
import { Button } from '../common'

type Props = TModal

const CreateGroupModal = ({ onClose }: Props) => {
  return (
    <Modal hasHelp onClose={onClose}>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-3">
        <p>새 그룹 만들기</p>
        <div className="flex h-full flex-col justify-center">
          <input type="text" placeholder="그룹 이릅" />
          <Button text="직접 입력하기" onClick={() => {}} />
        </div>
      </div>
    </Modal>
  )
}

export default CreateGroupModal
