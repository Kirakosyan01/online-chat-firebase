import React, { useState, useRef } from "react";
import AuthPage from '../pages/AuthPage/AuthPage';
import ChatPage from '../pages/ChatPage/ChatPage'
import {signOut} from 'firebase/auth';
import { auth } from "../firebase-config"

import Cookies from "universal-cookie";
import { Route, Routes, useNavigate } from "react-router-dom";
import RoomPage from "../pages/RoomPage/RoomPage";
const cookies = new Cookies();

export default function AppRoutes() {
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const [room, setRoom] = useState(null);
    const roomInputRef = useRef(null);
    const navigate = useNavigate();
  
    if (!isAuth) {
      return (
          <AuthPage setIsAuth={setIsAuth}/>
      );
    }
    
    const signUserOut = async () => {
      await signOut(auth);
      cookies.remove("auth-token");
      setIsAuth(false);
      setRoom(null)
      navigate("/"); 
    }

    const handleEnterChat = () => {
        if (room !== "") {
          navigate("/chat");
        }
      };

  return (
    <Routes>
        <Route
          path="/"
          element={
            !isAuth ? (
              <AuthPage setIsAuth={setIsAuth} />
            ) : (
                <RoomPage roomInputRef={roomInputRef} setRoom={setRoom} room={room} handleEnterChat={handleEnterChat} signUserOut={signUserOut}/>
            )
          }
        />
        <Route
          path="/chat"
          element={<ChatPage room={room} signUserOut={signUserOut} />}
        />
    </Routes>
  );
}
