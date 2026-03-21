from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime

app = FastAPI(title="Cotton Field Secondary School API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "cotton_field_school")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

@app.get("/")
async def root():
    return {"status": "Cotton Field Secondary School API is running"}

@app.get("/api/health")
async def health():
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat()}

# ── ANNOUNCEMENTS ─────────────────────────────────────────────────────────────

@app.get("/api/announcements")
async def get_announcements():
    items = await db.announcements.find({}, {"_id": 0}).to_list(100)
    return items

@app.post("/api/announcements")
async def add_announcement(data: dict):
    data["submitted_at"] = datetime.utcnow().isoformat()
    await db.announcements.insert_one(data)
    data.pop("_id", None)
    return data

@app.put("/api/announcements/{item_id}")
async def update_announcement(item_id: str, data: dict):
    await db.announcements.update_one({"id": int(item_id)}, {"$set": data})
    return {"success": True}

@app.delete("/api/announcements/{item_id}")
async def delete_announcement(item_id: str):
    await db.announcements.delete_one({"id": int(item_id)})
    return {"success": True}

# ── GALLERY ───────────────────────────────────────────────────────────────────

@app.get("/api/gallery")
async def get_gallery():
    items = await db.gallery.find({}, {"_id": 0}).to_list(200)
    return items

@app.post("/api/gallery")
async def add_gallery(data: dict):
    await db.gallery.insert_one(data)
    data.pop("_id", None)
    return data

@app.put("/api/gallery/{item_id}")
async def update_gallery(item_id: str, data: dict):
    await db.gallery.update_one({"id": int(item_id)}, {"$set": data})
    return {"success": True}

@app.delete("/api/gallery/{item_id}")
async def delete_gallery(item_id: str):
    await db.gallery.delete_one({"id": int(item_id)})
    return {"success": True}

# ── MOE POSTS ─────────────────────────────────────────────────────────────────

@app.get("/api/moe")
async def get_moe():
    items = await db.moe_posts.find({}, {"_id": 0}).to_list(50)
    return items

@app.post("/api/moe")
async def add_moe(data: dict):
    data["submitted_at"] = datetime.utcnow().isoformat()
    await db.moe_posts.insert_one(data)
    data.pop("_id", None)
    return data

@app.put("/api/moe/{item_id}")
async def update_moe(item_id: str, data: dict):
    await db.moe_posts.update_one({"id": int(item_id)}, {"$set": data})
    return {"success": True}

@app.delete("/api/moe/{item_id}")
async def delete_moe(item_id: str):
    await db.moe_posts.delete_one({"id": int(item_id)})
    return {"success": True}

# ── CONTACT ───────────────────────────────────────────────────────────────────

@app.post("/api/contact")
async def submit_contact(data: dict):
    data["submitted_at"] = datetime.utcnow().isoformat()
    await db.contact_submissions.insert_one(data)
    return {"success": True, "message": "Your message has been received."}
