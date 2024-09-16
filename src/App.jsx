import React from 'react'
import { Button } from './components/ui/button'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/app-layout'
import HomePage from './pages/HomePage'
import Dashboard from './pages/dashboard'
import Auth from './pages/auth'
import Link from './pages/link'
import RedirectLink from './pages/redirectLink'


const router  = createBrowserRouter([

  {
    element:<AppLayout/>,
    children:[
      {
        path: '/',
        element: <HomePage/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/auth',
        element: <Auth/>
      },
      {
        path: '/link/:id',
        element: <Link/>
      },
      {
        path: '/:id',
        element: <RedirectLink/>
      },
    ]
  }

])
const App = () => {
  return (
   <RouterProvider router={router} />
  )
}

export default App
