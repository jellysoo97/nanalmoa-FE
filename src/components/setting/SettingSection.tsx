import { ReactNode } from 'react'
import Divider from '../common/Divider'

type Props = {
  title: string
  children: ReactNode
}

const SettingSection = ({ title, children }: Props) => {
  return (
    <div className="py-3">
      <div className="px-1 py-3 text-lg font-medium">{title}</div>
      <Divider />
      {children}
    </div>
  )
}

export default SettingSection
