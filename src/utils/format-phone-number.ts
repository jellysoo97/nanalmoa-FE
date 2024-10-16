export const formatPhoneNumber = (phoneNumber: string): string => {
  if (phoneNumber.length !== 11) {
    return phoneNumber
  }

  const area = phoneNumber.slice(0, 3)
  const front = phoneNumber.slice(3, 7)
  const back = phoneNumber.slice(7)

  return `${area}-${front}-${back}`
}
