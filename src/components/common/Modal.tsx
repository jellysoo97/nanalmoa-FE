import { cn } from '@/utils/cn'
import ReactDom from 'react-dom'
import { IconButton } from '.'
import { CloseIcon, InfoIcon } from '../icons'

type Props = {
  children: React.ReactNode
  title?: string
  hasHelp?: boolean
  onClose: () => void
}

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const root = document.getElementById('modal-root')!
  return ReactDom.createPortal(children, root)
}

const Modal = ({ children, title = '', hasHelp, onClose }: Props) => {
  return (
    <ModalPortal>
      <div
        className={cn(
          'absolute left-0 top-0 z-50 h-full w-full bg-black bg-opacity-30',
          'flex items-center justify-center'
        )}
      >
        <div className="flex min-h-80 min-w-80 flex-col rounded-xl bg-white md:min-w-96">
          <div className="flex items-center justify-between p-3">
            <h2 className="text-lg font-bold">{title}</h2>
            <div className="flex items-center gap-x-2">
              {hasHelp && (
                <IconButton direction="horizontal" icon={<InfoIcon />} />
              )}
              <IconButton
                direction="horizontal"
                icon={<CloseIcon />}
                onClick={onClose}
              />
            </div>
          </div>
          {children}
        </div>
      </div>
    </ModalPortal>
  )
}

export default Modal
