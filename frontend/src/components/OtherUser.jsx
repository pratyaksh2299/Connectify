import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {setselectedUser} from '../redux/userSlice'
import store from '../redux/store';
const OtherUser = (props) => {
    const users=props.user;
    //  console.log(users);
    const dispatch = useDispatch();
    const {selectedUser,onlineUsers} = useSelector(store=>store.user);
    const isOnline= onlineUsers?.includes(users._id);
    const selectedUserhandler = (user) =>{
        // console.log(user);
        dispatch(setselectedUser(user));
    }
  return (
    <>
    <div  onClick={()=>selectedUserhandler(users)}  className={` ${selectedUser?._id === users?._id ? 'bg-zinc-200 text-black' : ''} flex gap-2 hover:text-black items-center hover:bg-zinc-200 rounded p-2 cursor-pointer`}>
        <div className='flex gap-3 items-center'>
    <div className={`avatar ${isOnline ? 'online' : '' }`}>
        <div className='w-12 rounded-full'>
            <img src={users?.profilephoto
} alt="" />
        </div>
    </div>
    <div className='flex flex-col  flex-1'>
        <div className='flex flex-col justify-between gap-2 flex-1'>
            <p>{users?.fullname}</p>
        </div>
    </div>
</div>
</div></>
  )
}

export default OtherUser