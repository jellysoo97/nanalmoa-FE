import { getMySubordinates } from '@/api/manager/get-my-subordinates'
import { QUERY_KEYS } from '@/constants/api'
import useManagerStore from '@/store/manager'
import { IGetMySubordinatesRes } from '@/types/manager'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useManager = () => {
  const { mySubordinates, hasSubordinates, setMySubordinates } =
    useManagerStore()

  const { data: MySubordinates } = useQuery<IGetMySubordinatesRes>({
    queryKey: [QUERY_KEYS.GET_MANAGER_SUBORDINATES],
    queryFn: () => getMySubordinates(),
  })

  useEffect(() => {
    if (MySubordinates) {
      setMySubordinates(MySubordinates)
    }
  }, [MySubordinates, setMySubordinates])

  return { mySubordinates, hasSubordinates }
}
