import { TabEnum } from '@/types/common'

interface TabsProps<T extends string> {
  activeTab: T
  setActiveTab: (tab: T) => void
  tabs: T[]
}

const Tabs = <T extends string>({
  activeTab,
  setActiveTab,
  tabs,
}: TabsProps<T>) => {
  return (
    <div className="rounded-lg bg-white p-1 shadow-md">
      <div className="relative grid grid-cols-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`z-10 py-2 text-sm font-medium transition-colors duration-300 ${
              activeTab === tab
                ? 'text-white'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {tab}
          </button>
        ))}
        <div
          className={`absolute left-0 top-0 h-full w-1/2 rounded-lg bg-primary-500 transition-transform duration-300 ease-in-out ${
            activeTab === TabEnum.Monthly ? 'translate-x-full transform' : ''
          }`}
        />
      </div>
    </div>
  )
}

export default Tabs
