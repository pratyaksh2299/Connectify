import './App.css'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Imports functions for creating and providing the router in React.
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
    path: '/', // Defines the path for the home page.
    element: <HomePage />, // Specifies the component to render for the home page.
  },
  {
    path: '/register', // Defines the path for the signup page.
    element: <Signup />, // Specifies the component to render for the signup page.
  },
  {
    path: '/login', // Defines the path for the login page.
    element: <Login />, // Specifies the component to render for the login page.
  },
]);

function App() {
  const { authUser } = useSelector(store => store.user); // Selects the `authUser` from the Redux store.
  const { socket } = useSelector(store => store.socket); // Selects the `socket` from the Redux store.
  const dispatch = useDispatch(); // Gets the dispatch function for dispatching actions to the Redux store.

  useEffect(() => { // Defines a side effect to manage the Socket.IO connection.
    if (authUser) { // Checks if a user is authenticated.
      const socketio = io(`http://localhost:8080`, { // Creates a new Socket.IO client connection to the server.
        query: {
          userId: authUser._id // Sends the authenticated user's ID as a query parameter.
        }
      });
      dispatch(setSocket(socketio)); // Dispatches the action to store the socket instance in Redux.

      socketio?.on('getonlineUsers', (onlineUsers) => { // Listens for the 'getonlineUsers' event from the server.
        dispatch(setonlineUsers(onlineUsers)) // Dispatches the action to update the online users in Redux store.
      });
      return () => socketio.close(); // Cleans up the socket connection when the component unmounts or dependencies change.
    } else { // If no user is authenticated.
      if (socket) { // Checks if there is an existing socket connection.
        socket.close(); // Closes the existing socket connection.
        dispatch(setSocket(null)); // Dispatches the action to clear the socket instance from Redux store.
      }
    }

  }, [authUser]); // Dependency array, effect will run when `authUser` changes.

  return (
    <div className="p-4 h-screen flex items-center justify-center"> {/* Applies styling and centers the content. */}
      <RouterProvider router={router} /> {/* Provides the router to the application. */}
    </div>

  );
}

export default App; // Exports the App component as the default export of the module.
