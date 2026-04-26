import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState(null);
  const [messages, setMessages] = useState([]);

  const chatRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // 🔹 PARSE
  const handleSend = async () => {
    if (!text.trim()) return;

    const userMessage = { type: "user", text };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("http://127.0.0.1:8000/parse", {
        text: text,
      });

      setData(res.data);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "I have extracted the interaction details. Please review and save.",
        },
      ]);

      setText("");
    } catch (err) {
      alert("Backend error");
    }
  };

  // 🔹 SAVE
 const handleSave = async () => {
  console.log("SAVE CLICKED ✅");

  if (!data) {
    alert("No data to save ❌");
    return;
  }

  // 🔥 CLEAN DATA (VERY IMPORTANT for 422 fix)
const payload = {
  hcp_name: data.hcp_name || "",
  interaction_type: data.interaction_type || "",
  date: data.date || "",
  time: data.time || "",

  attendees: Array.isArray(data.attendees)
    ? data.attendees.join(", ")
    : data.attendees || "",

  // ✅ FIX ALL THESE
  topics_discussed: Array.isArray(data.topics_discussed)
    ? data.topics_discussed.join(", ")
    : data.topics_discussed || "",

  materials_shared: Array.isArray(data.materials_shared)
    ? data.materials_shared.join(", ")
    : data.materials_shared || "",

  samples_distributed: Array.isArray(data.samples_distributed)
    ? data.samples_distributed.join(", ")
    : data.samples_distributed || "",

  follow_up_actions: Array.isArray(data.follow_up_actions)
    ? data.follow_up_actions.join(", ")
    : data.follow_up_actions || "",

  hcp_sentiment: data.hcp_sentiment || "",
  outcomes: data.outcomes || ""
};



  console.log("PAYLOAD:", payload);

  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/save",
      payload
    );

    console.log("SUCCESS:", res.data);

    alert("Saved to database ✅");
    setData({
  hcp_name: "",
  interaction_type: "",
  date: "",
  time: "",
  attendees: "",
  topics_discussed: "",
  materials_shared: "",
  samples_distributed: "",
  hcp_sentiment: "",
  outcomes: "",
  follow_up_actions: ""
});

    

    // optional chat message
    setMessages((prev) => [
      ...prev,
      { type: "ai", text: "Data saved successfully 💾" }
    ]);

  } catch (err) {
  console.log("FULL ERROR OBJECT:", err);

  if (err.response) {
    console.log("STATUS:", err.response.status);
    console.log("HEADERS:", err.response.headers);
    console.log("BACKEND ERROR:", JSON.stringify(err.response.data, null, 2));
  } else {
    console.log("ERROR MESSAGE:", err.message);
  }

  alert("Save failed ❌");
}

};
  return (
    <div className="app">

      {/* LEFT PANEL */}
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

            <button className="save-btn" onClick={handleSave}>
              Save Interaction
            </button>

          </div>
        ) : (
          <p className="empty">No interaction yet...</p>
        )}
      </div>

      {/* RIGHT PANEL */}
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
