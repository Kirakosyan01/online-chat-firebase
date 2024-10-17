import React, { useEffect, useRef, useState } from "react";
import style from "./ChatPage.module.css";
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
import { useNavigate, useParams } from "react-router-dom";

export default function ChatPage({ signUserOut, setRoom }) {
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);
  const {room} = useParams();
  const navigate = useNavigate();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
  }, [room]);

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
      userImg: auth.currentUser.photoURL,
    });
  };

  const backToRoom = () => {
    setRoom("");
    navigate("/");
  };

  return (
    <div className={style.chatPage}>
      <div className={style.chat_main}>
      <form className={style.ChatInput} onSubmit={handleSubmit}>
        <textarea
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          type="text"
          placeholder="Type your message here..."
          className={style.textArea}
        />
        <button type="submit">Send</button>
      </form>
      <hr />
      <div className={style.chatMessages}>
        {messages.map((message, idx) => {
          return (
            <div key={message.id} className={style.userImgAndMessages}>
              <div className={style.textAndName}>
              <p>{message.user}</p>
              <p>{message.text}</p>
              </div>
              {message.userImg && <img src={message.userImg} alt="" className={style.UserImg} />}
              {idx === messages.length - 1 && (
                <div ref={lastMessageRef} />
              )}
            </div>
          );
        })}
      </div>
        <div className={style.roomName}><span>Room Name: </span> <h3>{room}</h3></div>
      <div className={style.outButtons}>
        <button onClick={signUserOut}>Sign Out</button>
        <button onClick={backToRoom}>Back to Room</button>
      </div>
      </div>
    </div>
  );
}
