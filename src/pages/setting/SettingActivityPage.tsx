import SelectTime from '@/components/common/SelectTime'
import { cn } from '@/utils/cn'
import { useState } from 'react'

const SettingActivityPage = () => {
  const initialTimes = [
    { label: '아침 먹는 시간', period: '오전', hour: '09', minute: '00' },
    { label: '점심 먹는 시간', period: '오후', hour: '01', minute: '00' },
    { label: '저녁 먹는 시간', period: '오후', hour: '07', minute: '00' },
    { label: '기상 시간', period: '오전', hour: '07', minute: '00' },
    { label: '취침 시간', period: '오후', hour: '10', minute: '00' },
  ]

  const [times, setTimes] = useState(initialTimes)

  const handleChange = (
    index: number,
    field: 'period' | 'hour' | 'minute',
    value: string
  ) => {
    setTimes((prevTimes) => {
      const newTimes = [...prevTimes]
      newTimes[index] = { ...newTimes[index], [field]: value }
      return newTimes
    })
  }

  return (
    <div className="mx-auto w-full p-5">
      <p className="mb-8 text-center text-xl">내 활동시간 정하기</p>
      <div className="mx-auto w-80">
        {times.map((time, index) => (
          <div
            className={cn(
              'mb-5',
              time.label === '기상 시간' && 'border-t-2 pt-4'
            )}
            key={index}
          >
            <p className="mb-3 text-lg">{time.label}</p>
            <SelectTime
              period={time.period}
              hour={time.hour}
              minute={time.minute}
              onPeriodChange={(e) =>
                handleChange(index, 'period', e.target.value)
              }
              onHourChange={(e) => handleChange(index, 'hour', e.target.value)}
              onMinuteChange={(e) =>
                handleChange(index, 'minute', e.target.value)
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SettingActivityPage
