import { useWindowSize } from '@/hooks/use-window-size'
import { cn } from '@/utils/cn'
import { addDays, format, isToday, subDays } from 'date-fns'
import { ko } from 'date-fns/locale'
import React, { useCallback, useMemo } from 'react'

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
    <button
      className={cn(
        'flex min-w-12 flex-col items-center justify-center gap-y-1 p-2',
        'rounded-md bg-transparent shadow-md',
        isSelected && 'scale-110 border-none bg-primary-400 text-neutral-50'
      )}
      onClick={() => onClick(date)}
    >
      <span className={cn('text-sm', isWeekend && 'text-red-500')}>
        {dayOfWeek}
      </span>
      <span className={cn('text-lg font-bold', isWeekend && 'text-red-500')}>
        {format(date, 'd')}
      </span>
      {isToday(date) && (
        <div
          className={cn(
            'h-[6px] w-[6px] rounded-full',
            isSelected ? 'bg-white' : 'bg-primary-400'
          )}
        />
      )}
    </button>
  )
}

const WeekdaySelector = ({
  selectedDate,
  setSelectedDate,
}: WeekDaySelectorProps) => {
  const [windowWidth] = useWindowSize()

  const daysToShow = useMemo(() => (windowWidth <= 640 ? 5 : 7), [windowWidth])
  const middleIndex = Math.floor(daysToShow / 2)

  const generateDates = useCallback(() => {
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
  }, [daysToShow, selectedDate])

  const handleDateClick = (date: Date): void => {
    setSelectedDate(date)
  }

  return (
    <div className="flex w-full items-center justify-evenly">
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
