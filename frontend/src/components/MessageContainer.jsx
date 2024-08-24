import React from 'react';
import SendMessage from './SendMessage';
import ShowMessages from './ShowMessages';
import { useSelector } from 'react-redux';

const MessageContainer = () => {
  const { selectedUser,authUser } = useSelector(store => store.user);

  return (
    <>
      {selectedUser !== null ? (
        <div className='md:min-w-[550px] flex flex-col'>
          {/* Header section with user avatar and name */}
          <div className='flex gap-3 items-center bg-slate-900 p-4'>
            {/* Avatar section */}
            <div className='avatar online'>
              <div className='w-12 rounded-full'>
                <img
                  src={selectedUser?.profilephoto}
                  alt="User Avatar"
                />
              </div>
            </div>
            <div className='flex flex-col flex-1'>
              <div className='flex flex-col justify-between gap-2 flex-1'>
                <p>{selectedUser?.fullname}</p>
              </div>
            </div>
          </div>
          <ShowMessages />
          <SendMessage />
        </div>
      ) : (
        <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
          <h1 className='text-4xl text-white font-bold'>Hi, {authUser?.fullname}</h1>
          <h1 className='text-2xl text-white'>Let's start conversation</h1>
        </div>
      )}
    </>
  );
}

export default MessageContainer;
