# Cotton Field Secondary School Website

A modern, professional, mobile-friendly website for Cotton Field Secondary School in Anna Regina, Guyana.

**School Motto:** "Towards Community Development"

---

## 📁 Project Structure

```
cotton-field-school/
├── frontend/          ← React app (deploy to Vercel)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Academics.jsx
│   │   │   ├── StudentLife.jsx
│   │   │   ├── Admissions.jsx
│   │   │   ├── News.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Calendar.jsx
│   │   │   ├── FacebookFeed.jsx
│   │   │   └── Contact.jsx
│   │   ├── mock.js        ← All school data lives here
│   │   ├── App.js
│   │   └── App.css
│   ├── public/
│   │   └── index.html
│   ├── vercel.json        ← Routing config for Vercel
│   ├── .env.example
│   └── package.json
└── backend/           ← FastAPI (deploy to Render)
    ├── server.py
    ├── requirements.txt
    └── .env.example
```

---

## 🚀 Running Locally (on your computer)

### Step 1 — Install Node.js
Download from https://nodejs.org and install (choose the LTS version).

### Step 2 — Install frontend dependencies
Open Command Prompt inside the `frontend` folder and run:
```
npm install
```

### Step 3 — Create the .env file
Inside the `frontend` folder, copy `.env.example` to `.env`:
```
copy .env.example .env
```

### Step 4 — Start the frontend
```
npm start
```
Open your browser at http://localhost:3000 — you should see the website.

---

## 🌐 Deploying to Vercel (free)

1. Push this project to GitHub (see GitHub setup instructions)
2. Go to https://vercel.com and sign in with GitHub
3. Click **New Project** → import your `cotton-field-school` repo
4. Set **Root Directory** to `frontend`
5. Set **Build Command** to `npm run build`
6. Set **Output Directory** to `build`
7. Click **Deploy**

Your website will be live at `https://cotton-field-school.vercel.app` (or similar).

---

## 🖥 Deploying the Backend to Render (free)

1. Go to https://render.com and sign in with GitHub
2. Click **New Web Service** → connect your repo
3. Set **Root Directory** to `backend`
4. Set **Start Command** to: `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. Under **Environment Variables**, add:
   - `MONGO_URL` = your MongoDB Atlas connection string
   - `DB_NAME` = `cotton_field_school`
6. Click **Deploy**

---

## 🍃 Setting Up MongoDB Atlas (free database)

1. Go to https://mongodb.com/atlas and create a free account
2. Create a free cluster (M0 tier)
3. Create a database user (username + password)
4. Under **Network Access**, add IP address `0.0.0.0/0`
5. Click **Connect** → **Connect your application**
6. Copy the connection string — it looks like:
   `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`
7. Paste it as the `MONGO_URL` environment variable in Render

---

## ✏️ Updating School Content

All school information is stored in `frontend/src/mock.js`. You can edit:
- School name, motto, mission, contact details → `schoolInfo`
- News & announcements → `announcements`
- Gallery photos → `galleryImages`
- Academic programs → `programs`
- Student life activities → `studentLife`
- Public holidays → `holidays2026`

---

## 🎨 Design

- **Primary color:** Burgundy `#800020`
- **Accent color:** Seafoam Green `#7fc8be`
- **Heading font:** Merriweather (serif)
- **Body font:** Source Sans 3 (sans-serif)
