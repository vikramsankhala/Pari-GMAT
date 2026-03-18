# Pari's MBA Coach

A full-stack AI-powered personal assistant for Pari Sankhala, a GMAT aspirant preparing for MBA college applications and financial aid. Built with React, Express, and Anthropic Claude API.

## Features

- **GMAT Coach** — Concept explanations, practice quizzes, time management tips, weak area tracking
- **College Apps** — SOP/essay drafting, program suggestions, application reminders
- **Financial Aid** — Scholarship info, appeal letter drafting, funding comparison
- **Study Planner** — Weekly schedules, daily goals, homework reminders

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **AI:** Anthropic Claude (claude-sonnet-4-20250514)

## Local Setup

### Prerequisites

- Node.js 18+
- [Anthropic API key](https://console.anthropic.com/)

### 1. Clone and install

```bash
git clone <your-repo-url>
cd PariGMAT
```

### 2. Backend (server)

```bash
cd server
npm install
cp ../.env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
npm run dev
```

Server runs at `http://localhost:3001`.

### 3. Frontend (client)

```bash
cd client
npm install
# For local dev, VITE_API_URL defaults to '' (uses Vite proxy to localhost:3001)
npm run dev
```

Client runs at `http://localhost:5173`.

## Deployment

### Backend → Render

1. Push your repo to GitHub.
2. Go to [Render](https://render.com) → New → Web Service.
3. Connect your repo and set:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add **Environment Variable:**
   - `ANTHROPIC_API_KEY` = your Anthropic API key
5. Deploy. Note your service URL (e.g. `https://paris-mba-coach-api.onrender.com`).

### Frontend → Netlify

1. Go to [Netlify](https://netlify.com) → Add new site → Import from Git.
2. Connect your repo and set:
   - **Base directory:** `client`
   - **Build command:** `npm run build`
   - **Publish directory:** `client/dist`
3. Add **Environment Variable:**
   - `VITE_API_URL` = your Render backend URL (e.g. `https://paris-mba-coach-api.onrender.com`)
4. Deploy.

### CORS

The backend enables CORS for all origins. For production, consider restricting `Access-Control-Allow-Origin` to your Netlify domain.

## Project Structure

```
PariGMAT/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── api/
│   │   ├── data/
│   │   └── types.ts
│   └── ...
├── server/                 # Express API
│   ├── index.js
│   └── package.json
├── .env.example
└── README.md
```

## License

Private project for Pari Sankhala.
