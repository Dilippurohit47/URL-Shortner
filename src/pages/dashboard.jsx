import React from 'react'
import { BarLoader } from 'react-spinners'

const Dashboard = () => {
  return (
    <div>
{   true &&  <BarLoader width={"100%"} color="blue" />}
    </div>
  )
}

export default Dashboard
