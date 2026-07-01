import React from 'react'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className='bg-gray-700 text-white h-screen w-full flex flex-col items-center gap-5'>
      <Outlet />
    </div>
  )
}

export default App