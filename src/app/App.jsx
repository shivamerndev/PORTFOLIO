import { Outlet } from 'react-router-dom'
import CustomCursor from '../components/CustomCursor'
import useTheme from '../hooks/useTheme'

const App = () => {
  const { isDark } = useTheme()

  return (
    <div className={`h-screen w-full transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* <CustomCursor /> */}
      <Outlet />
    </div>
  )
}

export default App