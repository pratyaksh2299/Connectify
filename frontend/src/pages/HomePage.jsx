import React from 'react'
import Sidebar from '../components/Sidebar'
import MessageContainer from '../components/MessageContainer'

const HomePage = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-slate-800'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default HomePage