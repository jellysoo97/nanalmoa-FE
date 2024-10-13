import React from 'react'
import { BottomNavigationBar, Header } from '.'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div id="modal-root" className="container relative flex flex-col">
      <Header />
      <main className="mb-3 flex flex-1 flex-col overflow-y-auto px-3 py-4">
        {children}
      </main>
      <BottomNavigationBar />
    </div>
  )
}

export default Layout
