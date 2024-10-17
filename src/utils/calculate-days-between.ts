export const calculateDaysBetween = (startDate: Date, endDate: Date) => {
  const diffInMs = endDate.getTime() - startDate.getTime()
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

  return Math.ceil(diffInDays)
}
