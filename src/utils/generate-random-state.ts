export const generateRandomState = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const STATE_LENGTH = 10
  let state = ''

  for (let i = 0; i < STATE_LENGTH; i++) {
    state += characters.charAt(Math.floor(Math.random() * STATE_LENGTH))
  }

  return state
}
