import React from 'react'
import WelcomeContainer from './_component/WelcomeContainer'
import CreateOptions from './_component/CreateOptions'
import LatestInterviewList from './_component/LatestInterviewList'

function Dashboard() {
  return (
    <div>
      {/* <WelcomeContainer/> */}
    <h2 className='my-3 font-bold text-2xl'>Dashboard</h2>
    <CreateOptions/>
    <LatestInterviewList/>
    </div>
  )
}

export default Dashboard