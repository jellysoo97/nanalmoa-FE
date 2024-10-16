import { useEffect, useState } from 'react'

type Props = {
  timeLimit: number
  isStart: boolean
  isDone: boolean
}

export const INTERVAL = 1000
export const SEC_IN_MIN = 60

export const useTimer = ({ timeLimit, isStart, isDone }: Props) => {
  const [leftTime, setLeftTime] = useState<number>(timeLimit)

  useEffect(() => {
    if (isStart) {
      const intervalId = setInterval(() => {
        setLeftTime((prev) => prev - INTERVAL)
      }, INTERVAL)

      if (leftTime <= 0 || isDone) {
        clearInterval(intervalId)
      }

      return () => clearInterval(intervalId)
    }
  }, [leftTime, isStart])

  useEffect(() => {
    if (isDone) {
      setLeftTime(timeLimit)
    }
  }, [isDone])

  return {
    minutes: String(
      Math.floor((leftTime / (INTERVAL * SEC_IN_MIN)) % SEC_IN_MIN)
    ).padStart(2, '0'),
    seconds: String(Math.floor((leftTime / INTERVAL) % SEC_IN_MIN)).padStart(
      2,
      '0'
    ),
  }
}
