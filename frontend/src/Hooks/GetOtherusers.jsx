import React, { useEffect } from 'react';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setotherUsers } from '../redux/userSlice';
const GetOtherusers = () => {
    const dispatch=useDispatch();
    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials=true;
                const response = await  axios.get('http://localhost:8080/user/');
                // console.log(response);
                //store the data in rdux
                dispatch(setotherUsers(response.data));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchOtherUsers();
    }, []); 
};

export default GetOtherusers;
