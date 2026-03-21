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

# ── SEED ─────────────────────────────────────────────────────────────────────

@app.post("/api/seed")
async def seed_database():
    announcements = [
        {"id": 1, "title": "2026 CSEC Examination Schedule Released", "date": "March 10, 2026", "category": "Examinations", "excerpt": "The Caribbean Examinations Council has released the official CSEC examination timetable for May/June 2026. Students are advised to collect their personal timetables from the examination office.", "important": True},
        {"id": 2, "title": "Inter-School Sports Day — Region 2", "date": "March 5, 2026", "category": "Sports", "excerpt": "Cotton Field Secondary School will host the annual Region 2 inter-school sports competition on March 28, 2026. Students interested in participating should register with their Physical Education teacher.", "important": False},
        {"id": 3, "title": "New Computer Lab Now Open", "date": "February 28, 2026", "category": "Facilities", "excerpt": "We are pleased to announce the opening of our upgraded computer laboratory, equipped with 40 new desktop computers and high-speed internet access for all students.", "important": True},
        {"id": 4, "title": "Parent-Teacher Conference — Term 2", "date": "February 20, 2026", "category": "Events", "excerpt": "The Term 2 Parent-Teacher Conference is scheduled for April 4, 2026. Parents are encouraged to attend to discuss their child's academic progress.", "important": False},
        {"id": 5, "title": "School Uniform Policy Reminder", "date": "February 14, 2026", "category": "Administration", "excerpt": "A reminder that all students must adhere to the school uniform policy. Students found in breach of the policy will be sent home to change. Please ensure compliance.", "important": False},
        {"id": 6, "title": "Mathematics Olympiad Registration Open", "date": "February 8, 2026", "category": "Academic", "excerpt": "Registration is now open for the 2026 Guyana Mathematics Olympiad. Top performers may qualify for regional and national competitions. See your Mathematics teacher for details.", "important": False},
        {"id": 7, "title": "School Feeding Programme Update", "date": "January 30, 2026", "category": "Administration", "excerpt": "The Ministry of Education School Feeding Programme continues for all enrolled students. Meals are served daily during the lunch break. No cost to students.", "important": False},
        {"id": 8, "title": "Cultural Week 2026 — Theme Announced", "date": "January 22, 2026", "category": "Events", "excerpt": "This year's Cultural Week theme is 'Unity in Diversity — Celebrating Guyana's Heritage'. Activities will take place the week of May 4-8, 2026. More details to follow.", "important": False},
    ]

    gallery = [
        {"id": 1, "url": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=75", "category": "Campus", "caption": "School main building"},
        {"id": 2, "url": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=75", "category": "Academic", "caption": "Students in class"},
        {"id": 3, "url": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=75", "category": "Academic", "caption": "Library reading session"},
        {"id": 4, "url": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=75", "category": "Science", "caption": "Science laboratory"},
        {"id": 5, "url": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=75", "category": "Sports", "caption": "Sports day activities"},
        {"id": 6, "url": "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=75", "category": "Events", "caption": "Cultural week performance"},
        {"id": 7, "url": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=75", "category": "Graduation", "caption": "Graduation ceremony 2025"},
        {"id": 8, "url": "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=75", "category": "Academic", "caption": "Mathematics class"},
        {"id": 9, "url": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=75", "category": "Campus", "caption": "School library"},
        {"id": 10, "url": "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&q=75", "category": "Sports", "caption": "Football practice"},
        {"id": 11, "url": "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=75", "category": "Events", "caption": "Award ceremony"},
        {"id": 12, "url": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=75", "category": "Academic", "caption": "Group study session"},
        {"id": 13, "url": "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800&q=75", "category": "Science", "caption": "Chemistry experiment"},
        {"id": 14, "url": "https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&q=75", "category": "Events", "caption": "School assembly"},
    ]

    # Clear existing data first
    await db.announcements.delete_many({})
    await db.gallery.delete_many({})

    # Insert fresh data
    await db.announcements.insert_many(announcements)
    await db.gallery.insert_many(gallery)

    return {
        "success": True,
        "message": "Database seeded successfully!",
        "announcements": len(announcements),
        "gallery": len(gallery)
    }

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
