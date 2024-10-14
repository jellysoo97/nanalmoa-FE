import { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
}

const SettingSection = ({ title, children }: Props) => {
  return (
    <div className="py-3">
      <div className="px-2 py-3 text-lg font-medium">{title}</div>
      {children}
    </div>
  )
}

export default SettingSection
