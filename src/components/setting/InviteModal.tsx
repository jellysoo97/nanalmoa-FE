import { TModal } from '@/types/common'
import { UserWithPhoneNumber } from '@/types/auth'
import Modal from '../common/Modal'
import UserMiniProfile from '../common/UserMiniProfile'
import Divider from '../common/Divider'
import { Button } from '../common'

export type Props = TModal & {
  user: UserWithPhoneNumber
  type: '그룹원' | '관리자'
  title?: string
  onClick?: () => void
}

const InviteModal = ({ onClose, user, type, title = '', onClick }: Props) => {
  return (
    <Modal onClose={onClose} title={title} size="small">
      <div className="px-5">
        <UserMiniProfile user={user} className="py-3" />

        <Divider />
        <div className="pb-5 pt-3">{`${type === '그룹원' ? '그룹원으로 초대하시겠습니까' : '관리자가 되시겠습니까?'}`}</div>

        <Button
          onClick={onClick}
          text={type === '그룹원' ? '초대하기' : '요청하기'}
          className="mx-auto mb-5 flex w-20 text-sm sm:w-24 sm:text-base"
        />
      </div>
    </Modal>
  )
}

export default InviteModal
