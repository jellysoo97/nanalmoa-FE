import React from 'react'
import { BottomBar, Header } from '.'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="container flex flex-col">
      <Header />
      {children}
      <BottomBar />
    </div>
  )
}

export default Layout
