from fastapi import FastAPI
from pydantic import BaseModel
import os, json
from dotenv import load_dotenv
from prompt import PROMPT_TEMPLATE
from db import get_db
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class InputText(BaseModel):
    text: str

@app.post("/parse")
def parse_text(data: InputText):
    prompt = PROMPT_TEMPLATE.format(input_text=data.text)

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}]
        )

        result = response.choices[0].message.content.strip()
        result = result.replace("```json", "").replace("```", "").strip()

        parsed = json.loads(result)

    except Exception as e:
        return {"error": "AI parsing failed", "details": str(e)}

    try:
        db = get_db()
        cursor = db.cursor()

        query = """
        INSERT INTO hcp_logs 
        (hcp_name, interaction_type, date, time, attendees, topics_discussed, materials_shared, samples_distributed, hcp_sentiment, outcomes, follow_up_actions)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        cursor.execute(query, (
            parsed.get("hcp_name"),
            parsed.get("interaction_type"),
            parsed.get("date"),
            parsed.get("time"),
            json.dumps(parsed.get("attendees")),
            parsed.get("topics_discussed"),
            parsed.get("materials_shared"),
            parsed.get("samples_distributed"),
            parsed.get("hcp_sentiment"),
            parsed.get("outcomes"),
            parsed.get("follow_up_actions")
        ))

        db.commit()
        cursor.close()
        db.close()

    except Exception as e:
        return {"error": "Database error", "details": str(e)}

    return parsed