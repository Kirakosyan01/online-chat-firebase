import React from 'react'

export default function RoomPage({ roomInputRef, setRoom, room, handleEnterChat, signUserOut }) {
  return (
    <div>
    <label>Enter Room Name:</label>
    <input
      ref={roomInputRef}
      value={room}
      onChange={(e) => setRoom(e.target.value)}
      placeholder="Enter room"
    />
    <button onClick={handleEnterChat}>Enter Chat</button>
    <button onClick={signUserOut}>Sign Out</button>
  </div>
  )
}
