import { format, addMonths, subMonths } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useCalendar } from '@/hooks/use-calendar'

const CalendarView = () => {
  const { currentDate, setCurrentDate, rows } = useCalendar()

  return (
    <div className="mx-auto mt-10 max-w-md text-black">
      <div className="mb-4 flex items-center justify-between">
        <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
          이전 달
        </button>
        <h2 className="text-xl font-bold">
          {format(currentDate, 'yyyy년 MM월', { locale: ko })}
        </h2>
        <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
          다음 달
        </button>
      </div>
      <div className="mb-2 grid grid-cols-7 gap-2">
        {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
      </div>
      {rows}
    </div>
  )
}

export default CalendarView
