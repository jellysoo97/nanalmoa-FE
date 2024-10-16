import { useCallback, useState } from 'react'

export const useSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSideBar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev)
  }, [])

  return { isSidebarOpen, handleSideBar }
}
