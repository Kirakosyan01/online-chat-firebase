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

export default function ChatPage({ room, signUserOut }) {
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);

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
      text: messageToSend,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
    });
    
  };


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
