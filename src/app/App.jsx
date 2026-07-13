import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className='bg-black text-white h-screen w-full'>
      <Outlet />
    </div>
  )
}

export default App