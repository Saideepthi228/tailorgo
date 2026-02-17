import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

let socket;

export default function Chat() {
  const [connected, setConnected] = useState(false);
  const [room, setRoom] = useState("global");
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");
  const [typingUser, setTypingUser] = useState("");

  const messagesRef = useRef();

  // CONNECT SOCKET
  useEffect(() => {
    socket = io(SOCKET_URL, { transports: ["websocket"] });

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("message", (m) => {
      setMsgs(prev => [...prev, m]);
    });

    socket.on("typing", (user) => {
      setTypingUser(user);
      setTimeout(() => setTypingUser(""), 1500);
    });

    socket.on("call_request", ({ type }) => {
      alert(`📞 ${type.toUpperCase()} CALL request received!`);
    });

    return () => socket.disconnect();
  }, []);

  // Auto scroll
  useEffect(() => {
    messagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  function joinRoomNow() {
    socket.emit("join_room", { room });
    setMsgs([]);
    alert(`Joined room: ${room}`);
  }

  function sendMessage() {
    if (!text.trim()) return;

    const m = {
      text,
      from: "customer",
      time: Date.now()
    };

    socket.emit("message", { room, payload: m });
    setMsgs(prev => [...prev, m]);
    setText("");
  }

  function handleTyping() {
    socket.emit("typing", { room, user: "Customer typing..." });
    setText(text);
  }

  function sendCall(type) {
    socket.emit("call_request", { room, type });
    alert(`${type} call request sent.`);
  }

  return (
    <div className="page dark-page">
      <div className="container">
        <div className="chat-top">
          <h2>Chat / Calls</h2>
          <div className={`status ${connected ? "online" : "offline"}`}>
            {connected ? "Online" : "Offline"}
          </div>
        </div>

        <div className="chat-controls">
          <input
            className="input"
            placeholder="Enter tailor ID (room)"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button className="btn small" onClick={joinRoomNow}>Join</button>

          <div className="call-buttons">
            <button className="btn primary" onClick={() => sendCall("audio")}>📞 Call</button>
            <button className="btn accent" onClick={() => sendCall("video")}>🎥 Video</button>
          </div>
        </div>

        <div className="typing-indicator">
          {typingUser && <span>{typingUser}</span>}
        </div>

        <div className="chat-window">
          {msgs.map((m, i) => (
            <div key={i} className={`bubble ${m.from === "customer" ? "mine" : "other"}`}>
              <div className="bubble-text">{m.text}</div>
              <div className="bubble-time">
                {new Date(m.time).toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={messagesRef} />
        </div>

        <div className="chat-input">
          <input
            className="input"
            placeholder="Write a message…"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleTyping();
            }}
          />
          <button className="btn primary" onClick={sendMessage}>Send</button>
        </div>
      </div>

      <div style={{ height: 110 }} />
    </div>
  );
}
