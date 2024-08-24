import React, { useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Button, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  toast  from 'react-hot-toast'; // Import toast and ToastContainer


const Signup = () => {
  // Initialize state as an object
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmpassword: '',
    gender: '',
  });

  const navigate = useNavigate(); // Fix typo: changed 'Navigate' to 'navigate'

  // Handle input changes
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      gender: checked ? id : '',
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form Data:', formData); // Log formData to check its content
    try {
      const response = await  axios.post('http://localhost:8080/user/register', formData,{
        // method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(formData),
        withCredentials:true,
       
      });
      console.log(response);
      
      if (response.data.success) {
        navigate('/login');
        toast.success(response.data.message); // Show success message
      } 
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.'); // Show generic error message
    }

    // Clear form data
    setFormData({
      fullname: '',
      username: '',
      password: '',
      confirmpassword: '',
      gender: '',
    });
  };

  return (
    <div className="bg-gray-900 min-w-96 mx-auto">
      <div className="w-full p-8 bg-slate-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextField
              fullWidth
              id="fullname"
              label="Full Name"
              variant="outlined"
              placeholder="Enter full name"
              value={formData.fullname}
              onChange={handleInputChange}
              className="bg-slate-700 text-white"
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{
                style: { color: 'white' },
                classes: { notchedOutline: 'border-gray-600' },
              }}
            />
          </div>
          <div className="mb-4">
            <TextField
              fullWidth
              id="username"
              label="Username"
              variant="outlined"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleInputChange}
              className="bg-slate-700 text-white"
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{
                style: { color: 'white' },
                classes: { notchedOutline: 'border-gray-600' },
              }}
            />
          </div>
          <div className="mb-4">
            <TextField
              fullWidth
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
              className="bg-slate-700 text-white"
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{
                style: { color: 'white' },
                classes: { notchedOutline: 'border-gray-600' },
              }}
            />
          </div>
          <div className="mb-4">
            <TextField
              fullWidth
              id="confirmpassword"
              type="password"
              label="Confirm Password"
              variant="outlined"
              placeholder="Confirm password"
              value={formData.confirmpassword}
              onChange={handleInputChange}
              className="bg-slate-700 text-white"
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{
                style: { color: 'white' },
                classes: { notchedOutline: 'border-gray-600' },
              }}
            />
          </div>
          <div className="mb-4">
            <div className='flex items-center space-x-4'>
              <FormControlLabel
                control={
                  <Checkbox
                    id="male"
                    checked={formData.gender === 'male'}
                    onChange={handleCheckboxChange}
                    sx={{
                      color: 'white',
                      '&.Mui-checked': {
                        color: 'blue',
                      },
                    }}
                  />
                }
                label="Male"
                className="text-white"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="female"
                    checked={formData.gender === 'female'}
                    onChange={handleCheckboxChange}
                    sx={{
                      color: 'white',
                      '&.Mui-checked': {
                        color: 'blue',
                      },
                    }}
                  />
                }
                label="Female"
                className="text-white"
              />
            </div>
          </div>
          <div className='mb-4'>
            <p className="text-white">
              Already have an account? <Link className='text-blue-400' href='/login'>Login</Link>
            </p>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </Button>
        </form>
      </div>
     
    </div>
  );
};

export default Signup;
