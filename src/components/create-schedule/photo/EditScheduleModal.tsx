import Modal from '@/components/common/Modal'
import ScheduleForm from '@/components/common/schedule-form/ScheduleForm'
import { TModal } from '@/types/common'
import { IMediaAnalysisResult } from '@/types/schedules'

type Props = TModal & {
  defaultValue: IMediaAnalysisResult
  handleCreateSchedule: () => void
}

const EditScheduleModal = ({
  defaultValue,
  onClose,
  handleCreateSchedule,
}: Props) => {
  return (
    <Modal title="일정 수정하기" onClose={onClose}>
      <ScheduleForm
        defaultValue={defaultValue}
        onSubmit={handleCreateSchedule}
        buttonMessage="이대로 등록하기"
      />
    </Modal>
  )
}

export default EditScheduleModal
