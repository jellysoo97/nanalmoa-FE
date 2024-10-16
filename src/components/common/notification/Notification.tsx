import { getInvitationsUser } from '@/api/invitations/get-invitations-user'
import { QUERY_KEYS } from '@/constants/api'
import { GetInvitationsUserRes } from '@/types/invitations'
import { cn } from '@/utils/cn'
import { getAccessToken } from '@/utils/handle-token'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { IconButton } from '..'
import { NotificationIcon } from '../../icons'
import Toast from '../Toast'
import NotificationItem from './NotificationItem'

const Notification = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { data: invitations } = useQuery<GetInvitationsUserRes, AxiosError>({
    queryKey: [QUERY_KEYS.GET_INVITATIONS_USER, getAccessToken()],
    queryFn: getInvitationsUser,
  })

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      <div className="relative">
        <IconButton
          direction="vertical"
          icon={<NotificationIcon />}
          text="알림"
          onClick={handleToggle}
        />

        {isOpen && invitations && (
          <div
            className={cn(
              'absolute right-0 top-12 z-50',
              'flex max-h-80 min-h-24 w-60 flex-col overflow-hidden overflow-y-auto rounded-md border border-neutral-300 bg-neutral-100'
            )}
          >
            {invitations.length === 0 ? (
              <p className="mt-10 text-center text-sm">알림이 없습니다.</p>
            ) : (
              <>
                {invitations?.map((invitation) => (
                  <NotificationItem
                    key={invitation.id}
                    notification={invitation}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </div>

      <Toast />
    </>
  )
}

export default Notification
