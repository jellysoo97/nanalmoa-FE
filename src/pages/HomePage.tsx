import CalendarView from '@/components/schedule/CalendarView'
import DailyView from '@/components/schedule/DailyView'
import Tabs from '@/components/schedule/Tabs'
import { TabEnum } from '@/types/common'
import { useState } from 'react'

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<TabEnum>(TabEnum.Daily)
  const tabs = Object.values(TabEnum)

  return (
    <div className="flex flex-1 flex-col gap-y-5">
      <Tabs<TabEnum>
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />

      {activeTab === TabEnum.Daily && <DailyView />}

      {activeTab === TabEnum.Monthly && <CalendarView />}
    </div>
  )
}

export default HomePage
