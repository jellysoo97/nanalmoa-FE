import React from 'react'
import { BottomNavigationBar, Header } from '.'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="container relative flex flex-col">
      <Header />
      <div className="flex max-h-[var(--main-max-height)] flex-1 flex-col overflow-y-auto">
        {children}
      </div>
      <BottomNavigationBar />
    </div>
  )
}

export default Layout
