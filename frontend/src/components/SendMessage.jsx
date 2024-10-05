import React, { useState } from 'react';
import { IoMdSend } from "react-icons/io";
import { Button } from '@mui/material';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice';

const SendMessage = () => {
  const [message, setmessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(store => store.user);
  const { messages } = useSelector(store => store.message);

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/message/send/${selectedUser?._id}`, { message }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      dispatch(setMessages([...messages, res?.data]));
    } catch (error) {
      console.log(error);
    }
    setmessage("");
  }

  return (
    <div>
      <form onSubmit={onsubmitHandler} className='px-4 my-4'>
        <div className='flex '>
          <input 
            type="text"
            onChange={(e) => setmessage(e.target.value)}
            value={message}
            placeholder='Type something....'
            className=' flex-1 w-full pr-10 text-sm rounded-lg block p-3 text-white bg-slate-600 border-none focus:outline-none'
          />
          <Button
            type='submit'
            className=' bg-slate-700 text-white'
          >
            <IoMdSend size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendMessage;
