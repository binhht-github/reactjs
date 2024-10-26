import React, { useEffect, useState } from 'react';
import './App.css';
import Admin from './layout/Admin';
import { useSearchParams } from 'react-router-dom';
// import * as io from "socket.io-client";
import Login from './components/login/Login';
import { getCurrentUser } from './api/UserApi';
import { ACCESS_TOKEN } from './api/config';
import { Bounce, Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MyForm } from './components/socket/MyForm';
import { ConnectionState } from './components/socket/ConnectionState';
import { Events } from './components/socket/Events';
import { ConnectionManager } from './components/socket/ConnectionManager';
import { socket } from './components/socket/socket';
import TestSocket from './components/netty-socket/TestSocket';
import { Message } from './components/netty-socket/Message';
import { LoginSk } from './components/netty-socket/LoginSk';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/configureStore';
import { setCurrentUser } from './redux/reducer/currentUser/slide';



function App() {
  const [authenticated, setAuthenticated] = useState(false); //!localStorage.getItem(ACCESS_TOKEN) ? false : true
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch()

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token + "");
      window.location.href = '/'
    }
    getCurrentUser().then((res: any) => {
      setAuthenticated(localStorage.getItem(ACCESS_TOKEN) == null || localStorage.getItem(ACCESS_TOKEN) == "" ? false : true);
      sessionStorage.setItem("currentUser", JSON.stringify(res.data))
      dispatch(setCurrentUser(res.data))
    })
      .catch((e: any) => {
        setAuthenticated(false);
        sessionStorage.clear()
      })
  }, [])

  // socket HTTP
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [fooEvents, setFooEvents] = useState([]);
  // const makeAPICall = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8000/', { mode: 'no-cors' });
  //     const data = await response.json();
  //     console.log({ data })
  //   }
  //   catch (e) {
  //     console.log(e)
  //   }
  // }

  // useEffect(() => {

  //   // makeAPICall();

  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   function onFooEvent(value: any) {
  //     console.log("event function");

  //     // setFooEvents(previous => [...previous, value]);
  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);
  //   socket.on('foo', onFooEvent);

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //     socket.off('foo', onFooEvent);
  //   };
  // }, []);



  /// netty socket

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);



  return (

    // <div className="App">
    //   <ConnectionState isConnected={isConnected} />
    //   {/* <Events events={fooEvents} /> */}
    //   <ConnectionManager />
    //   <MyForm />
    // </div>

    // <TestSocket></TestSocket>
    //netty socket
    // <div>
    //   {!isLoggedIn ? (
    //     <LoginSk
    //       username={username}
    //       setUsername={setUsername}
    //       room={room}
    //       setRoom={setRoom}
    //       setLoggedIn={setLoggedIn}
    //     />
    //   ) : (
    //     <Message room={room} username={username} />
    //   )}
    // </div>


    <div className="h-screen w-full bg-[#EFF2F4]">

      {authenticated ? (
        <Admin />
      ) : (
        <Login />
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce} />
    </div>
  );
}

export default App;
