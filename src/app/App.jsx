import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className='bg-black text-white min-h-screen w-full'>
      <Outlet />
    </div>
  )
}

export default App