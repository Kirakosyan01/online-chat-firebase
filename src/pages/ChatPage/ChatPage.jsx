import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

export default function ChatPage({ room, signUserOut, setRoom }) {
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsuscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newMessage === "") return;
    const messageToSend = newMessage;
    setNewMessage("");
    
    await addDoc(messagesRef, {
      room: room,
      text: messageToSend,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      userImg: auth.currentUser.photoURL
    });
    
  };

  const backToRoom = () => {
    setRoom('');
    navigate('/');
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
              {message.userImg && <img src={message.userImg} alt=""/>}
            </div>
          );
        })}
      </div>
      
      <div>
        <button onClick={signUserOut}>Sign Out</button>
        <button onClick={backToRoom}>Back to Room</button>
      </div>
    </div>
  );
}
