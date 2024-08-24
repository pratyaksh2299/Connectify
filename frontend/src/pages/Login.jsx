import React, { useState } from 'react';
import { Button, Link } from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setauthUser } from '../redux/userSlice';
const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate(); // Correct use of navigate
  const dispatch=useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('Form Data:', formData);
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      // console.log(response); 
      const result = await response.json();
      // console.log(result); // Convert response to JSON
      if(response.ok){
      toast.success('login successfully');
        navigate('/'); // Navigate to home or dashboard
        dispatch(setauthUser(result));
      }
      else{
        toast.error(result.message);
      }
      // Show success message
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.'); // Show generic error message
    }

    setFormData({
      username: '',
      password: '',
    });
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="bg-gray-900 min-w-96 mx-auto">
      <div className="w-full p-8 bg-slate-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-lg text-white mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-6 py-3 bg-slate-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              placeholder="Enter username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-lg text-white mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-6 py-3 bg-slate-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              placeholder="Enter password"
            />
          </div>
          <div className='mb-4'>
            <p className="text-white">
              Not have an account? <Link className='text-blue-400' href='/register'>Signup</Link>
            </p>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
