import { TModal } from '@/types/common'
import { Button, LoadingSpinner } from '../common'
import Divider from '../common/Divider'
import Modal from '../common/Modal'

type Props = {
  text: string
  onLeftButtonClick?: () => void
  onRightButtonClick?: () => void
} & TModal

const MediaAnalysisLoadingModal = ({
  text,
  onClose,
  onLeftButtonClick,
  onRightButtonClick,
}: Props) => {
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-center gap-y-4 p-4">
        <LoadingSpinner className="h-12 w-12" />
        <p className="whitespace-pre-wrap text-center">{text}</p>
        <Divider />
        <div className="flex flex-col items-center gap-y-2">
          <p className="text-red-500">너무 오래 걸리나요?</p>
          <div className="flex items-center gap-x-4">
            <Button
              text="재요청하기"
              theme="outline"
              onClick={onLeftButtonClick}
            />
            <Button text="처음으로" onClick={onRightButtonClick} />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default MediaAnalysisLoadingModal
