import React from 'react'
import OtherUser from './OtherUser'
import GetOtherusers from '../Hooks/GetOtherusers'
import { useSelector } from 'react-redux';
import store from '../redux/store';

const OtherUsers = () => {
  GetOtherusers();
  const {otherUsers}= useSelector(store=>store.user);
  
  if(!otherUsers) return ;

  return (
    <div className='m-3 overflow-auto flex-1'>
        {
          otherUsers.map((otheruser) =>{
            return (<OtherUser key={otheruser._id} user={otheruser}/>);
          })
        }

    </div>
  )
}

export default OtherUsers