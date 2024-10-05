import React, { useState } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { IoMdSearch } from "react-icons/io";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { setauthUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate =useNavigate();
  const dispatch=useDispatch();
  const logoutHandler= async () =>{
    try {
      axios.defaults.withCredentials = true;
      const res=await axios.get('http://localhost:8080/user/logout');
      navigate('/login');
      toast.success(res.data.message);
      dispatch(setauthUser(null));
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Search term:', searchTerm);
    // Add logic to handle the search here
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg border-r flex flex-col gap-3">
      <div>
            <h1>Chats</h1>
         </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        {/* <TextField
        
          variant="outlined"
          size="small"
          id="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
          InputProps={{
            classes: {
              root: 'bg-slate-700 text-white rounded-lg',
              notchedOutline: 'border-gray-600',
            },
          }}
          InputLabelProps={{
            style: { color: 'white' },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="ml-2 py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <IoMdSearch size="24px" />
        </Button> */}
      </form>
      <div className='divider'></div>
      <OtherUsers/>
      <div className='mt-4'>
      <Button
        onClick={logoutHandler}
          type="submit"
          variant="contained"
          color="primary"
          className="ml-2 py-2 px-1 rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
