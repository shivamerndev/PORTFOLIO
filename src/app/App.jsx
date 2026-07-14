import { Outlet } from 'react-router-dom'
import CustomCursor from '../components/CustomCursor'

const App = () => {
  return (
    <div className='bg-black text-white h-screen w-full'>
      <CustomCursor />
      <Outlet />
    </div>
  )
}

export default App