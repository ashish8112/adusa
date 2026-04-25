# Adusa — College Networking Platform

> LinkedIn for college students — focused, familiar, and built for campus life.

## 🚀 Live Demo
Coming soon — deployment in progress.

## 💡 About
Adusa is a full-stack MERN application where college students can 
connect, collaborate, and network with peers across their campus.

Not for professionals — built specifically for student life.

## ✨ Features (Current)
- ✅ User Registration with bcrypt password hashing
- ✅ JWT-based Authentication & Authorization
- ✅ Protected routes with verifyToken middleware
- ✅ Full CRUD API — register, login, update, delete
- ✅ React frontend with useState & useEffect hooks
- 🔄 React Router & form handling (in progress)
- ⏳ CORS + Frontend-Backend integration (upcoming)
- ⏳ Real-time chat — Socket.io / Pusher
- ⏳ Image uploads — Cloudinary
- ⏳ Deployment — Render (backend) + Vercel (frontend)

## 🛠️ Tech Stack
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt  
**Frontend:** React, Vite  
**Database:** MongoDB Atlas  
**Tools:** Postman, VS Code, Git

## 📁 Project Structure
```
adusa-backend/
├── models/
│   └── User.js
├── routes/
│   └── auth.js
├── middleware/
│   └── verifyToken.js
├── .env
└── server.js

adusa-frontend/
├── src/
│   ├── App.jsx
│   ├── component/
│   └── practice/
└── vite.config.js
```

## ⚙️ Setup & Run

### Backend
```bash
cd adusa-backend
npm install
# Add .env file with PORT, MONGO_URI and JWT_SECRET
node server.js
```

### Frontend
```bash
cd adusa-frontend
npm install
npm run dev
```

## 👨‍💻 Developer
**Ashish Kumar Shukla**  
MCA Student — Kristu Jayanti University, Bengaluru  
BCA Gold Medalist | MERN Stack Developer

- GitHub: https://github.com/ashish8112
- LinkedIn: https://www.linkedin.com/in/ashish-shukla8112/
- Email: ashishkrshukla.dev@gmail.com
