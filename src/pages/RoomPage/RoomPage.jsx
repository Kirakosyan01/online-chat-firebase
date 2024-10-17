import React from "react";
import style from "./RoomPage.module.css";
import { FaStaylinked } from "react-icons/fa6";

export default function RoomPage({
  roomInputRef,
  setRoom,
  room,
  handleEnterChat,
  signUserOut,
}) {
  return (
    <div className={style.roomPage_div}>
      <div className={style.roomPage}>
      <h2><FaStaylinked className={style.echoLink_logo}/><span>Echo</span>Link</h2>
      <div>
        <p className={style.enterEcho}>Enter <span>Room</span> Name:</p>
        <form className={style.roomForm}>
          <input
            ref={roomInputRef}
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Echo"
          />
          <button type="submit" onClick={handleEnterChat}>
            Enter Room
          </button>
        </form>
      </div>
        <button className={style.SignOutBtn} onClick={signUserOut}>Sign Out</button>
      </div>
    </div>
  );
}
