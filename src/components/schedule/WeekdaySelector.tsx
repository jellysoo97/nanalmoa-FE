import React from 'react'
import { format, addDays, subDays, isToday } from 'date-fns'
import { ko } from 'date-fns/locale'

type DayProps = {
  date: Date
  isSelected: boolean
  onClick: (date: Date) => void
}

type WeekDaySelectorProps = {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

// TODO: 스타일 다듬기
const Day: React.FC<DayProps> = ({ date, isSelected, onClick }) => {
  const dayOfWeek = format(date, 'E', { locale: ko })
  const isWeekend = dayOfWeek === '토' || dayOfWeek === '일'

  return (
    <div
      className={`flex w-10 cursor-pointer flex-col items-center border border-gray-200 bg-gray-200 p-2 sm:w-12 ${
        isSelected ? 'bg-primary-500 text-white' : ''
      } ${isToday(date) ? 'border-b-2 border-b-primary-800' : ''}`}
      onClick={() => onClick(date)}
    >
      <div className={`text-sm ${isWeekend ? 'text-red-500' : ''}`}>
        {dayOfWeek}
      </div>
      <div className={`text-lg font-bold ${isWeekend ? 'text-red-500' : ''}`}>
        {format(date, 'd')}
      </div>
    </div>
  )
}

const WeekdaySelector = ({
  selectedDate,
  setSelectedDate,
}: WeekDaySelectorProps) => {
  const daysToShow = 7
  const middleIndex = Math.floor(daysToShow / 2)

  const generateDates = (): Date[] => {
    const dates: Date[] = []
    for (let i = -middleIndex; i <= middleIndex; i++) {
      dates.push(
        i === 0
          ? selectedDate
          : i < 0
            ? subDays(selectedDate, Math.abs(i))
            : addDays(selectedDate, i)
      )
    }
    return dates
  }

  const handleDateClick = (date: Date): void => {
    setSelectedDate(date)
  }

  return (
    <div className="flex justify-center space-x-1 border-b px-2 pt-2">
      {generateDates().map((date, index) => (
        <Day
          key={date.toISOString()}
          date={date}
          isSelected={index === middleIndex}
          onClick={handleDateClick}
        />
      ))}
    </div>
  )
}

export default WeekdaySelector
