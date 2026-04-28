# 🧠 PrepAI — AI-Powered Interview Preparation App

> **Ace your next interview with the power of AI.**  
> Generate personalized Q&A, pin important questions, take notes, and study smarter — all in one place.

<img width="1901" height="930" alt="proj" src="https://github.com/user-attachments/assets/c1676b5e-6e43-405e-a24b-fd1ab989974f" />


---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **JWT Authentication** | Secure register & login with token-based auth |
| 🤖 **AI-Powered Q&A** | Generate 10+ interview questions instantly using Groq (LLaMA 3.3) |
| 🎯 **Role-Based Sessions** | Questions tailored to your job role & experience level |
| 📌 **Pin Questions** | Pin important questions for quick access |
| 💡 **AI Explanations** | Get simple breakdowns of complex answers on demand |
| 📝 **Notes** | Add personal notes to any question |
| 📄 **Export PDF** | Download full Q&A session as a styled PDF |
| 👤 **Profile Page** | Update name and profile picture |
| 🌙 **Dark / Light Mode** | Toggle themes on the landing page |
| 💾 **MongoDB Storage** | All sessions and questions auto-saved |

---

## 🛠️ Tech Stack

### Frontend
- **React.js** — UI framework
- **Tailwind CSS** — Styling
- **React Router DOM** — Navigation
- **Axios** — API calls
- **jsPDF** — PDF export
- **react-scroll** — Smooth scroll navigation

### Backend
- **Node.js + Express.js** — Server & REST API
- **MongoDB + Mongoose** — Database
- **JWT (jsonwebtoken)** — Authentication
- **bcryptjs** — Password hashing
- **Groq SDK** — AI Q&A generation (LLaMA 3.3 70B)

---

## 📁 Project Structure

```
interview-prep-app/
├── backend/
│   ├── config/
│   │   └── gemini.js          # Groq AI integration
│   ├── controllers/
│   │   ├── authController.js
│   │   └── sessionController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Session.js
│   │   └── Question.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── sessionRoutes.js
│   ├── .env
│   └── server.js
│
└── frontend/
    └── src/
        ├── assets/
        ├── components/
        │   └── Navbar.jsx
        ├── context/
        │   └── AuthContext.js
        ├── pages/
        │   ├── LandingPage.jsx
        │   ├── LoginPage.jsx
        │   ├── RegisterPage.jsx
        │   ├── DashboardPage.jsx
        │   ├── SessionPage.jsx
        │   └── ProfilePage.jsx
        ├── utils/
        │   └── axiosInstance.js
        ├── App.js
        └── index.js
```

---

## ⚙️ Getting Started — Run Locally

### Prerequisites
Make sure you have these installed:
- [Node.js](https://nodejs.org) (v18+)
- [MongoDB](https://www.mongodb.com) (local or Atlas)
- [Git](https://git-scm.com)

---

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/interview-prep-app.git
cd interview-prep-app
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/interviewprepdb
JWT_SECRET=your_jwt_secret_key
GROQ_API_KEY=your_groq_api_key
```

> 🔑 Get your free Groq API key at [console.groq.com](https://console.groq.com)

Start the backend:
```bash
npm run dev
```

---

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm start
```

Frontend runs at → `http://localhost:3000`  
Backend runs at → `http://localhost:5000`

---

## 🔑 Environment Variables

### Backend `.env`
| Variable | Description |
|---|---|
| `PORT` | Server port (default: 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `GROQ_API_KEY` | Groq API key for AI generation |

---

## 📸 App Screenshots

### 🌐 Landing Page
> Hero section with full-screen image, dark/light toggle, smooth scroll navigation

### 📋 Dashboard
> View all sessions, create new sessions via modal, delete sessions

### 🎯 Session Page
> Accordion Q&A, pin questions, AI explanations, notes, PDF export

### 👤 Profile Page
> Update name and profile picture

---

## 🌐 Deployment

| Service | Purpose |
|---|---|
| **Render** | Backend hosting (free tier) |
| **Vercel** | Frontend hosting (free tier) |
| **MongoDB Atlas** | Cloud database (free tier) |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Built with ❤️ using MERN Stack + Groq AI

> ⭐ If you found this project helpful, give it a star on GitHub!
