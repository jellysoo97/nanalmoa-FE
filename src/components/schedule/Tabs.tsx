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
    <div className="flex flex-col items-center">
      <div className="rounded-lg bg-white p-1 shadow-md">
        <div className="relative flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                activeTab === tab
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
          <div
            className={`absolute left-0 top-0 h-full w-1/2 rounded bg-primary-500 transition-transform duration-300 ease-in-out ${
              activeTab === '월간' ? 'translate-x-full transform' : ''
            }`}
          />
        </div>
      </div>
    </div>
  )
}

export default Tabs
