import React from "react";
import style from "./RoomPage.module.css";

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
        <p>Enter Room Name:</p>
        <form>
          <input
            ref={roomInputRef}
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Enter room"
          />
          <button type="submit" onClick={handleEnterChat}>
            Enter Chat
          </button>
        </form>
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </div>
  );
}
