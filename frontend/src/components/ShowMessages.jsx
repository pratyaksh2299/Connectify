import React from 'react'
import Message from './Message'
import GetOtherusers from '../Hooks/GetOtherusers'
import { useSelector } from 'react-redux'
import store from '../redux/store'
import useGetMessages from '../Hooks/useGetmessages'
import useGetRealTimeMessage from '../Hooks/useGetRealTimeMessage'

const ShowMessages = () => {
  useGetMessages();
    useGetRealTimeMessage();
  const {messages}=useSelector(store => store.message);
  if(!messages){
    return;
  }
  return (
    <div className='pixel-4 flex-1 overflow-auto'>
     {
               messages && messages?.map((message) => {
                    return (
                        <Message key={message._id} message={message} />
                    )
                })
            }

        
    </div>
  )
}

export default ShowMessages