import '@/styles/global.css'
import { RouterProvider } from 'react-router-dom'
import AppRouter from './routes/AppRouter'

function App() {
  return <RouterProvider router={AppRouter} />
}

export default App
