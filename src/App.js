import "./App.css";
import React, { useState, useRef } from "react";
import AuthPage from './pages/AuthPage/AuthPage';
import ChatPage from './pages/ChatPage/ChatPage'
import {signOut} from 'firebase/auth';
import { auth } from "./firebase-config";

import Cookies from "universal-cookie";
const cookies = new Cookies();


function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  if (!isAuth) {
    return (
      <div className="App">
        <AuthPage setIsAuth={setIsAuth}/>
      </div>
    );
  }
  
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auto-token");
    setIsAuth(false);
    setRoom(null)
  }
  
  return (
    <div>
      {room ? (
        <ChatPage room={room} signUserOut={signUserOut}/>
      ) : (
        <div>
          <label>Enter Room Name:</label>
          <input ref={roomInputRef}/>
          <button onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div>
      )}
    </div>
  );
}

export default App;
