from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import Optional
import os
from datetime import datetime

app = FastAPI(title="Cotton Field Secondary School API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "cotton_field_school")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# ── Models ──────────────────────────────────────────────────────────────────

class ContactSubmission(BaseModel):
    name: str
    email: str
    phone: Optional[str] = ""
    subject: str
    message: str

# ── Routes ──────────────────────────────────────────────────────────────────

@app.get("/")
async def root():
    return {"status": "Cotton Field Secondary School API is running"}

@app.get("/api/announcements")
async def get_announcements():
    items = await db.announcements.find({}, {"_id": 0}).sort("date", -1).to_list(50)
    return items

@app.get("/api/gallery")
async def get_gallery():
    items = await db.gallery.find({}, {"_id": 0}).to_list(100)
    return items

@app.get("/api/programs")
async def get_programs():
    items = await db.programs.find({}, {"_id": 0}).to_list(20)
    return items

@app.get("/api/calendar")
async def get_calendar():
    items = await db.holidays.find({}, {"_id": 0}).sort("id", 1).to_list(50)
    return items

@app.get("/api/student-life")
async def get_student_life():
    items = await db.student_life.find({}, {"_id": 0}).to_list(50)
    return items

@app.post("/api/contact")
async def submit_contact(data: ContactSubmission):
    doc = data.dict()
    doc["submitted_at"] = datetime.utcnow().isoformat()
    await db.contact_submissions.insert_one(doc)
    return {"success": True, "message": "Your message has been received. We will be in touch soon."}

@app.get("/api/health")
async def health():
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat()}
