import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
const Message = ({message}) => {
  const scroll = useRef();
  const {authUser,selectedUser} = useSelector(store=>store.user);
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:"smooth"});
},[message]);
  return (
    <div><div  ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img
          alt="Tailwind CSS chat bubble component"
          src={message?.senderId === authUser?._id ? authUser?.profilephoto  : selectedUser?.profilephoto } />
      </div>
    </div>
    <div className="chat-header">
       
      <time className="text-xs opacity-50">{}</time>
    </div>
    <div className="chat-bubble">{message?.message}</div>
    <div className="chat-footer opacity-50">Delivered</div>
  </div>
  </div>
  )
}

export default Message