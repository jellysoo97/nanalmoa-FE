import { format, Locale } from 'date-fns'

import { DateFormatTypeEnum } from '@/types/common'

export function formatDate(
  type: DateFormatTypeEnum,
  date?: string | Date | null,
  options: { locale?: Locale } = {}
) {
  if (!date) return '-'

  return format(new Date(date), type as string, options)
}
