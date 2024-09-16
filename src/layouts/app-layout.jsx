import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
      <main className='min-h-screen container'>
      <Outlet/>
      </main>
      <div className='p-10 text-center bg-gray-800 mt-10 '>
        Made with ❤️ By Me
      </div>
    </div>
  )
}

export default AppLayout
