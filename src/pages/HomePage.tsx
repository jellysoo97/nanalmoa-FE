import SideBar from '@/components/common/SideBar'
import CalendarView from '@/components/schedule/CalendarView'
import DailyView from '@/components/schedule/DailyView'
import Tabs from '@/components/schedule/Tabs'
import { useSideBar } from '@/hooks/use-side-bar'
import { TabEnum } from '@/types/common'
import { useState } from 'react'

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<TabEnum>(TabEnum.Daily)
  const tabs = Object.values(TabEnum)
  const { isSidebarOpen, handleSideBar } = useSideBar()

  return (
    <div className="flex flex-1 flex-col gap-y-5">
      <button onClick={handleSideBar}>관리자</button>
      <Tabs<TabEnum>
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />

      {activeTab === TabEnum.Daily && <DailyView />}

      {activeTab === TabEnum.Monthly && <CalendarView />}
      <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={handleSideBar} />
    </div>
  )
}

export default HomePage
