import "./App.css";
import React, { useState, useRef } from "react";
import AuthPage from './pages/AuthPage/AuthPage';
import ChatPage from './pages/ChatPage/ChatPage'
import {signOut} from 'firebase/auth';
import { auth } from "./firebase-config"

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
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          type="text"
          placeholder="Type your message here..."
        />
        <button type="submit">Send</button>
      </form>
      {console.log(messages)}
      <div>
        {messages.map((message) => {
          return (
            <div key={message.id}>
              <p>{message.text}</p>
            </div>
          );
        })}
      </div>
      
      <div>
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default App;
