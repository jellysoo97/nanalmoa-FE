import { Button } from '@/components/common'
import Modal from '@/components/common/Modal'
import { TModal } from '@/types/common'

type Props = TModal

const PermissionModal = ({ onClose }: Props) => {
  return (
    <Modal onClose={onClose}>
      <div className="mb-4 flex flex-col items-center gap-y-2">
        <p className="mb-2 whitespace-pre-wrap text-center">
          카메라와 마이크를 사용하려면{'\n'}
          <strong>권한</strong>이 필요합니다.
        </p>
        <p className="font-bold">1. 휴대폰으로 접속하신 경우</p>
        <div className="mb-2 flex flex-col items-center text-sm">
          <p>화면에 나타나는 권한 요청 창에서</p>
          <p>'허용'을 선택해주세요.</p>
        </div>
        <p className="font-bold">2. 컴퓨터로 접속하신 경우</p>
        <div className="mb-2 flex flex-col items-center text-sm">
          <p>주소창 옆에 나타나는 권한 요청 창에서</p>
          <p>'허용'을 선택해주세요.</p>
        </div>
        <p>
          허용 후에 <strong>새로고침</strong> 버튼을 눌러주세요.
        </p>
        <Button text="새로고침" onClick={() => window.location.reload()} />
      </div>
    </Modal>
  )
}

export default PermissionModal
