🧠 AI-Powered HCP Interaction Logger (CRM Module)

📌 Project Overview

This project is an AI-first CRM module designed to help pharmaceutical field representatives log interactions with Healthcare Professionals (HCPs).

It converts unstructured text input (doctor interaction notes) into structured data using LLMs and stores it in a database.

---

🚀 Key Features

- 📝 Convert natural language interaction notes into structured data
- 🤖 AI-powered extraction using Groq LLM
- ⚡ FastAPI backend for processing requests
- 🛢️ MySQL database for persistent storage
- ⚛️ React frontend for user interaction
- 📊 Auto-populated structured output fields

---

🏗️ Architecture

1️⃣ Frontend (React)

- User enters interaction notes
- Sends request to backend API
- Displays structured data returned from AI

---

2️⃣ Backend (FastAPI)

- Receives text input
- Sends prompt to LLM (Groq API)
- Extracts structured JSON
- Stores data in MySQL database

---

3️⃣ Database (MySQL)

- Stores HCP interaction records
- Enables future analytics and reporting

---

🔄 End-to-End Workflow

1. User enters interaction paragraph in UI
2. React sends POST request to backend
3. FastAPI receives and processes request
4. Backend sends text to LLM (Groq)
5. LLM returns structured JSON
6. Data stored in MySQL database
7. Response sent back to frontend
8. Structured output displayed to user

---

🛢️ Database Schema

CREATE TABLE hcp_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hcp_name VARCHAR(100),
    interaction_type VARCHAR(50),
    date VARCHAR(50),
    time VARCHAR(50),
    attendees TEXT,
    topics_discussed TEXT,
    materials_shared TEXT,
    samples_distributed TEXT,
    hcp_sentiment VARCHAR(20),
    outcomes TEXT,
    follow_up_actions TEXT
);

---

⚙️ Tech Stack

- Frontend: React.js
- Backend: FastAPI (Python)
- AI Model: Groq LLM (LLaMA / Gemma)
- Database: MySQL
- API Communication: Axios / Fetch

---

📁 Project Structure

Ai_Assignment/
│
├── backend/
│   ├── main.py
│   ├── prompt.py
│   ├── db.py
│   ├── requirements.txt
│   └── .env
│
└── frontend/
    ├── package.json
    └── src/
        ├── App.js
        └── index.js

---

⚙️ Setup Instructions

🔹 Backend Setup

cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

Create ".env" file:

GROQ_API_KEY=your_api_key_here

Run backend:

uvicorn main:app --reload

---

🔹 Frontend Setup

cd frontend
npm install
npm start

---

🧪 Sample Input

Met Dr. Ramesh on 25 April 2026 at 10:30 AM in Apollo Hospital...

---

✅ Sample Output

- HCP Name: Dr. Ramesh
- Date: 25 April 2026
- Time: 10:30 AM
- Sentiment: Positive
- Follow-up: Next week

---

⚠️ Challenges Faced

- Handling unstructured text variability
- Ensuring consistent JSON output from LLM
- Fixing frontend-backend communication issues (CORS)
- Managing API errors

---

🚀 Future Enhancements

- Chat-based interaction logging (AI-first CRM)
- Redux state management
- Interaction history dashboard
- Edit/Delete interaction features
- LangGraph agent integration

---

🎯 Conclusion

This project demonstrates how AI can automate CRM workflows by transforming unstructured interaction data into structured, actionable insights.

---

👩‍💻 Author
Shirisha V

---
