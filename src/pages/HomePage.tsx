import CalendarView from '@/components/schedule/CalendarView'
import DailyView from '@/components/schedule/DailyView'
import Tabs from '@/components/schedule/Tabs'
import { useState } from 'react'

type Schedule = '일간' | '월간'

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<Schedule>('일간')
  const tabs: Schedule[] = ['일간', '월간']

  return (
    <>
      <div className="py-5">
        <Tabs<Schedule>
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />
      </div>

      {activeTab === '일간' && <DailyView />}

      {activeTab === '월간' && <CalendarView />}
    </>
  )
}

export default HomePage
