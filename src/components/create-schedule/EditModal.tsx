import { TModal } from '@/types/common'
import Modal from '../common/Modal'
import { Button } from '../common'

type Props = TModal

const EditModal = ({ onClose, onRetry, onManualInput }: Props) => {
  return (
    <Modal hasHelp onClose={onClose}>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-3">
        <span className="text-2xl">📝</span>
        <p>어떻게 수정할까요?</p>
        <div className="flex w-full justify-center gap-2">
          <Button
            text="다시 시도하기"
            theme="outline"
            onClick={() => {
              if (onRetry) {
                onRetry()
              }
              onClose()
            }}
          />
          <Button
            text="직접 입력하기"
            onClick={() => {
              if (onManualInput) {
                onManualInput()
              }
              onClose()
            }}
          />
        </div>
      </div>
    </Modal>
  )
}

export default EditModal
