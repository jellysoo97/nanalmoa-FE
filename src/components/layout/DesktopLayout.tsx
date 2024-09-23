import { LandingPage } from '@/pages'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const DesktopLayout = ({ children }: Props) => {
  return (
    <div className="layout">
      <LandingPage />
      {children}
    </div>
  )
}

export default DesktopLayout
