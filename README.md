# Adusa — College Networking Platform

> LinkedIn for college students - focused, familiar, and built for campus life.

**Live:** [adusa.vercel.app](https://adusa.vercel.app) · **API:** [adusa-backend.onrender.com](https://adusa-backend.onrender.com)


> **[Architecture decisions and tradeoffs ->](./DECISIONS.md)**
> Pagination, feed monopolization, N+1 fix, optimistic updates — what was
> chosen, what was rejected, and why.

---

## About

Adusa is a full-stack MERN application where college students connect, collaborate, and network with peers across their campus.

Not for professionals — built specifically for student life: finding peers by branch and batch, sharing campus updates, and collaborating on projects.

---

## Features

**Live**
- JWT-based authentication with bcrypt password hashing (10 salt rounds)
- Protected routes via `verifyToken` middleware
- Create posts with server-side rate limiting (5 posts/hour -> HTTP 429)
- Paginated feed using skip/limit, returning `{ posts, page, total, hasMore }`
- Idempotent like toggle using MongoDB `$addToSet` / `$pull`
- Global error handling with React Error Boundaries
- Axios request/response interceptors for automatic token attachment

**In progress**
- Like button UI on post cards
- Profile page with bio editing

**Planned**
- Comments - model, routes, and UI
- Discover - filter students by branch,batch,and skills
- Real-time 1-on-1 chat (Socket.io, with Pusher fallback for offline delivery)
- Image uploads via Cloudinary
- Skeleton loading screens
- AI-assisted bio generation (Gemini API)
- Production hardening — Joi validation, Helmet, refresh tokens, HttpOnly cookies

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, React Router v7, Tailwind CSS v4, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT, bcrypt |
| Deployment | Vercel (frontend), Render (backend) |
| Tools | Postman, Git, VS Code |

---

## Architecture

Monorepo with two independently deployed services.

```
adusa/
├── adusa-backend/          → deployed to Render
│   ├── models/             → User, Post
│   ├── routes/             → auth, posts
│   ├── controllers/        → route logic (MVC separation)
│   ├── middleware/         → verifyToken
│   └── server.js
│
└── adusa-frontend/         → deployed to Vercel
    └── src/
        ├── api/            → axios instance + interceptors
        ├── context/        → AuthProvider
        ├── features/       → feature-based modules
        ├── components/     → shared UI (Input, Button, Navbar)
        └── utils/          → timeAgo, getInitials
```

Backend routes are refactored into controllers so route files declare endpoints and controllers hold the logic - keeps route files readable as the API grows.

---

## API Reference

**Auth**

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/users/login` | Public |
| GET | `/api/auth/users` | Public |
| GET | `/api/auth/users/:id` | Protected |
| PUT | `/api/auth/users/:id` | Protected |
| DELETE | `/api/auth/users/:id` | Protected |

**Posts**

| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/posts` | Public — paginated |
| POST | `/api/posts` | Protected — rate limited |
| POST | `/api/posts/:id/like` | Protected — toggle |

---

## Setup

**Backend**

```bash
cd adusa-backend
npm install
npm start
```

`.env`:
```
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret
```

**Frontend**

```bash
cd adusa-frontend
npm install
npm run dev
```

`.env`:
```
VITE_API_URL=http://localhost:3000/api
```

Note: only variables prefixed with `VITE_` are exposed to the browser bundle. Never place secrets in frontend environment files — they are inlined at build time and readable by anyone.

---

## Engineering Notes

**Feed ordering.** The feed is currently chronological, which means a single active author can dominate it. Rate limiting slows this but does not solve it. The correct fix is an aggregation pipeline using `$setWindowFields` with `$documentNumber` to cap posts per author, combined with a ranking score weighing likes, comments, and recency. This was deliberately deferred - with a small user base the chronological feed is adequate, and the aggregation work was not worth blocking deployment.

**CORS.** Origins are explicitly whitelisted rather than using a wildcard. A wildcard is incompatible with credentialed requests, which will be needed when auth moves from `localStorage` to HttpOnly cookies.

**Cold starts.** The backend runs on Render's free tier and sleeps after 15 minutes of inactivity. The first request after sleep can take up to 50 seconds. Skeleton screens are planned partly to make this delay less jarring.

---

## Developer

**Ashish Kumar Shukla**
MCA - Kristu Jayanti University, Bengaluru
BCA Gold Medalist · MERN Stack Developer

[GitHub](https://github.com/ashish8112) · [LinkedIn](https://www.linkedin.com/in/ashish-shukla81/) · ashishkrshukla.dev@gmail.com