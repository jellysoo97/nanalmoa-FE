export const calculateDaysBetween = (startDate: Date, endDate: Date) => {
  const diffInMs = new Date(endDate).getTime() - new Date(startDate).getTime()
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

  return Math.ceil(diffInDays)
}
