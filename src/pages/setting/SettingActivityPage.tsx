import {
  getActivityRoutine,
  putActivityRoutine,
} from '@/api/mypage/get-activity-routine'
import { Button } from '@/components/common'
import SelectTime from '@/components/common/SelectTime'
import { QUERY_KEYS } from '@/constants/api'
import { path } from '@/routes/path'
import { cn } from '@/utils/cn'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Time = {
  label: string
  period: string
  hour: string
  minute: string
}

// 12시간 표기 변환 함수
const convertTo12HourFormat = (
  time: string
): { hour: string; minute: string; period: string } => {
  const [hour, minute] = time.split(':').map(Number)
  const period = hour < 12 ? '오전' : '오후'
  const adjustedHour = hour % 12 === 0 ? '12' : (hour % 12).toString() // 12시를 12로, 0시를 12로 처리
  return { hour: adjustedHour, minute: String(minute).padStart(2, '0'), period }
}

// 24시간 표기 변환 함수
const convertTo24HourFormat = (
  hour: string,
  minute: string,
  period: string
): string => {
  let hour24 = Number(hour)
  if (period === '오후' && hour24 < 12) {
    hour24 += 12
  } else if (period === '오전' && hour24 === 12) {
    hour24 = 0
  }
  return `${String(hour24).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

const SettingActivityPage = () => {
  const [times, setTimes] = useState<Time[]>([]) // 초기 상태를 빈 배열로 설정
  const navigate = useNavigate()

  // 활동시간 받아오기
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.GET_ROUTINE],
    queryFn: getActivityRoutine,
  })

  // 활동시간 수정하기
  const mutation = useMutation({
    mutationKey: [QUERY_KEYS.PUT_ROUTINE],
    mutationFn: putActivityRoutine,
  })

  useEffect(() => {
    console.log(data)
    if (data) {
      const formattedTimes: Time[] = [
        {
          label: '기상 시간',
          ...convertTo12HourFormat(data.wakeUpTime),
        },
        {
          label: '아침 먹는 시간',
          ...convertTo12HourFormat(data.breakfastTime),
        },
        {
          label: '점심 먹는 시간',
          ...convertTo12HourFormat(data.lunchTime),
        },
        {
          label: '저녁 먹는 시간',
          ...convertTo12HourFormat(data.dinnerTime),
        },
        {
          label: '취침 시간',
          ...convertTo12HourFormat(data.bedTime),
        },
      ]
      setTimes(formattedTimes)
    }
  }, [data])

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

  const handleSubmit = () => {
    const timeData = {
      wakeUpTime: convertTo24HourFormat(
        times[0].hour,
        times[0].minute,
        times[0].period
      ),
      breakfastTime: convertTo24HourFormat(
        times[1].hour,
        times[1].minute,
        times[1].period
      ),
      lunchTime: convertTo24HourFormat(
        times[2].hour,
        times[2].minute,
        times[2].period
      ),
      dinnerTime: convertTo24HourFormat(
        times[3].hour,
        times[3].minute,
        times[3].period
      ),
      bedTime: convertTo24HourFormat(
        times[4].hour,
        times[4].minute,
        times[4].period
      ),
    }

    mutation.mutate(timeData)
  }

  return (
    <div className="mx-auto w-full p-5">
      <Button
        text="이전으로"
        onClick={() => {
          navigate(path.settings.base)
        }}
      />
      <p className="my-4 text-center text-xl">내 활동시간 정하기</p>
      <div className="mx-auto w-72">
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
      <Button text="저장하기" onClick={handleSubmit} />
    </div>
  )
}

export default SettingActivityPage
