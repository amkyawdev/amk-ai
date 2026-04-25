# 🤖 Amkyawdev AI - Smart AI Assistant

<div align="center">

![Amkyawdev AI](https://img.shields.io/badge/Amkyawdev_AI-v1.0.0-gold?style=for-the-badge)
![Vue.js](https://img.shields.io/badge/Vue.js-3.3-42b883?style=for-the-badge&logo=vue.js)
![Python](https://img.shields.io/badge/Python-3.9-3776ab?style=for-the-badge&logo=python)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**Mobile-First AI Assistant with Gold Theme**

[Get Started](https://github.com/amkyawdev/amk-ai) • [Frontend](https://github.com/amkyawdev/amk-ai/tree/main/frontend) • [Backend](https://github.com/amkyawdev/amk-ai/tree/main/backend) • [Docs](https://github.com/amkyawdev/amk-ai#documentation)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🏠 **Get Started** | Beautiful landing page leading to Register |
| 💬 **Chat** | Smart AI chatbot with streaming responses |
| 🔐 **Auth** | Login, Register, Reset Password |
| 👤 **User Dialog** | User info dialog before entering chat |
| 🔒 **Permissions** | Storage permission dialog |
| ⚙️ **Settings** | API keys, Docs, About pages |
| 📱 **Mobile First** | Hamburger menu, small modal size |
| 🎨 **Gold Theme** | Smoke Black (#0f0f0f) + Gold (#FFD700) |
| 🔊 **TTS** | Whisper voice support |
| 🦜 **PWA Ready** | Install on any device |

---

## 📂 Project Structure

```
amkyawdev-ai/
├── frontend/           # Vue.js PWA Application
│   ├── index.html     # Main SPA (all pages)
│   ├── manifest.json # PWA manifest
│   └── service-worker.js
├── backend/           # FastAPI Backend
│   ├── main.py       # API Endpoints
│   ├── requirements.txt
│   ├── Dockerfile   # HuggingFace Space
│   └── pyproject.toml
└── README.md        # This file
```

---

## 🚀 Quick Start

### Frontend (Local)

```bash
# Using Python
cd frontend
python3 -m http.server 8000

# Using Node.js
npx serve .
```

### Backend (Local)

```bash
cd backend
pip install -r requirements.txt
python main.py
# Server runs at http://localhost:7860
```

---

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Get Started | `/` | Entry point with Get Started button |
| Login | `login` | User login |
| Register | `register` | Registration |
| Reset | `reset` | Password reset |
| Main | `main` | Dashboard with hamburger menu |
| Chat | `chat` | AI chatbot |
| API | `api` | API key settings |
| Docs | `docs` | Documentation |
| About | `about` | About page |

---

## 🔑 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v1/chat/completions` | POST | Chat completion |
| `/v1/completions` | POST | Text completion |
| `/v1/audio/transcriptions` | POST | Whisper STT |
| `/v1/models` | GET | List models |
| `/limits` | GET | Rate limits |
| `/health` | GET | Health check |

---

## 🔑 Environment Variables

### Backend

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Groq API key (Vercel) | Yes |
| `AmkyawDev_Kay` | Alternative key | No |
| `PORT` | Server port (default: 7860) | No |
| `HOST` | Server host | No |

---

## 🎨 Theme

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Gold | `#FFD700` | Primary accent |
| Gold Light | `#FFE55C` | Gradients |
| Smoke Black | `#0f0f0f` | Body background |
| Dark | `#1a1a1a` | Headers |
| Card | `#252525` | Cards/containers |

---

## 🤝 System Prompt (Amkyawdev AI)

```
You are Amkyawdev AI - a helpful, polite AI assistant.
Rules:
1. Focus on the user's question accurately
2. Answer clearly with precision
3. Use markdown formatting for code
4. Be polite (use Burmese greetings like "ဟုတ်ကဲ့ပါ အစ်ကို", "ဟုတ်အကို", "ဟုတ်ကဲ့ပါ", "ခဏစောင့်ပေးပါနော်")
5. Consider user emotions
6. Format SRT files correctly
7. Keep responses concise
8. Focus on accurate code and projects
```

---

## 📊 Rate Limits

- **Tokens**: 20/day
- **TTS**: 20s/day total, max 6s per clip

---

## 📄 License

MIT License © 2024 Amkyawdev AI

Permission is hereby granted, free of charge, to any person obtaining a copy of this software.

---

<div align="center">

**Built with ❤️ for developers**

</div>
