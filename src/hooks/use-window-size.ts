import { useEffect, useMemo, useState } from 'react'

export const useWindowSize = () => {
  const [size, setSize] = useState<[number, number]>([0, 0])

  useEffect(() => {
    const updateSize = () => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 0
      const height = typeof window !== 'undefined' ? window.innerHeight : 0

      setSize([width, height])
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateSize)
      updateSize()
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateSize)
      }
    }
  }, [])

  const memoizedSize = useMemo(() => size, [size])

  return memoizedSize
}
