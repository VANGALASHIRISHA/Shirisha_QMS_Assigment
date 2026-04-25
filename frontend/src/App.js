import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState(null);
  const [messages, setMessages] = useState([]);

  const chatRef = useRef(null);

  // Auto scroll to bottom (ChatGPT behavior)
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;

    const userMessage = { type: "user", text };

    setMessages((prev) => [...prev, userMessage]);
    setText("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/parse", {
        text: text,
      });

      setData(res.data);

      const aiMessage = {
        type: "ai",
        text: "Interaction captured successfully ✅",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      alert("Backend error");
    }
  };

  return (
    <div className="app">

      {/* LEFT - FORM */}
      <div className="form-panel">
        <h2>📋 Log Interaction</h2>

        {data ? (
          <div className="card">

            <div className="form-group">
              <input value={data.hcp_name || ""} readOnly placeholder=" " />
              <label>HCP Name</label>
            </div>

            <div className="form-group">
              <input value={data.interaction_type || ""} readOnly placeholder=" " />
              <label>Interaction Type</label>
            </div>

            <div className="grid">
              <div className="form-group">
                <input value={data.date || ""} readOnly placeholder=" " />
                <label>Date</label>
              </div>

              <div className="form-group">
                <input value={data.time || ""} readOnly placeholder=" " />
                <label>Time</label>
              </div>
            </div>

            <div className="form-group">
              <textarea value={data.attendees || ""} readOnly placeholder=" " />
              <label>Attendees</label>
            </div>

            <div className="form-group">
              <textarea value={data.topics_discussed || ""} readOnly placeholder=" " />
              <label>Topics Discussed</label>
            </div>

            <div className="form-group">
              <textarea value={data.materials_shared || ""} readOnly placeholder=" " />
              <label>Materials Shared</label>
            </div>

            <div className="form-group">
              <textarea value={data.samples_distributed || ""} readOnly placeholder=" " />
              <label>Samples Distributed</label>
            </div>

            <div className="form-group">
              <input value={data.hcp_sentiment || ""} readOnly placeholder=" " />
              <label>HCP Sentiment</label>
            </div>

            <div className="form-group">
              <textarea value={data.outcomes || ""} readOnly placeholder=" " />
              <label>Outcomes</label>
            </div>

            <div className="form-group">
              <textarea value={data.follow_up_actions || ""} readOnly placeholder=" " />
              <label>Follow-up Actions</label>
            </div>

            <button className="save-btn">Save Interaction</button>
          </div>
        ) : (
          <p className="empty">No interaction yet...</p>
        )}
      </div>

      {/* RIGHT - CHAT */}
      <div className="chat-panel">
        <h2>🤖 AI Assistant</h2>

        <div className="chat-box" ref={chatRef}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={msg.type === "user" ? "user-msg" : "ai-msg"}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type interaction..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>

    </div>
  );
}

export default App;