import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setSocket } from './redux/realSlice';
import { setonlineUsers } from './redux/userSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/register',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

function App() {
  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();

  useEffect(  ()=>{
    if(authUser){
      const socketio = io(`http://localhost:8080`, {
          query:{
            userId:authUser._id
          }
      });
      dispatch(setSocket(socketio));

      socketio?.on('getonlineUsers', (onlineUsers)=>{
        dispatch(setonlineUsers(onlineUsers))
      });
      return () => socketio.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }

  },[authUser,]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>

  );
}

export default App;
