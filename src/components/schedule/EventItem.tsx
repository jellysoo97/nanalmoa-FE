import CategoryTag from '../common/CategoryTag'

const EventItem = () => {
  return (
    <div
      onClick={() => {}}
      className={`mx-6 mb-4 flex cursor-pointer items-start rounded-lg border px-1 py-2 shadow-sm transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-md`}
    >
      <span className="px-3 py-2 text-lg font-semibold">15:00</span>

      <span className="w-full border-l px-4 py-2">
        <div className="mb-1">
          <CategoryTag label="병원" />
          <span className="p-1 text-base">정형외과 물리치료</span>
        </div>
        <div className="flex justify-end">
          <span className="rounded-lg bg-gray-200 px-2 py-1 text-xs">
            요양사 최요양
          </span>
        </div>
      </span>
    </div>
  )
}

export default EventItem
