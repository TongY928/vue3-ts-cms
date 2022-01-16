let BASE_URL = ''
const TIME_OUT = 5000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = ''
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = ''
} else {
  BASE_URL = ''
}
export { BASE_URL, TIME_OUT }
