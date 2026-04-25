# 🤖 AMK AI - Smart AI Assistant

<div align="center">

![AMK AI](https://img.shields.io/badge/AMK_AI-v1.0.0-gold?style=for-the-badge)
![Vue.js](https://img.shields.io/badge/Vue.js-3.3-42b883?style=for-the-badge&logo=vue.js)
![Python](https://img.shields.io/badge/Python-3.9-3776ab?style=for-the-badge&logo=python)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**Professional AI Assistant Application with Mobile-First Design**

[Get Started](https://github.com/amkyawdev/amk-ai) • [Frontend](https://github.com/amkyawdev/amk-ai/tree/main/frontend) • [Backend](https://github.com/amkyawdev/amk-ai/tree/main/backend) • [Docs](https://github.com/amkyawdev/amk-ai#documentation)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🏠 **Get Started** | Beautiful landing page with login/register |
| 💬 **Burme AI Chat** | Smart AI chatbot with streaming responses |
| 🔐 **User Auth** | Login, Register, Password Reset |
| ⚙️ **API Settings** | Groq, Gemini, OpenAI integration |
| 📱 **PWA Ready** | Install on any device, works offline |
| 🎨 **Gold Theme** | Professional dark UI with gold accents |
| 🦜 **Mobile First** | Optimized for mobile devices |
| 🔊 **Voice Support** | Text-to-speech with Whisper |

---

## 📂 Project Structure

```
amk-ai/
├── frontend/           # Vue.js PWA Application
│   └── index.html     # Main SPA (all pages)
├── backend/           # FastAPI Backend
│   ├── main.py        # API Endpoints
│   ├── requirements.txt
│   ├── Dockerfile     # HuggingFace Space
│   └── pyproject.toml
└── README.md          # This file
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

## 📱 PWA Installation

1. Open the app in Chrome/Firefox/Safari
2. Click "Install" or add to home screen
3. Works offline with service worker caching

### PWA Features
- ⚡ Fast loading
- 🔒 Offline support
- 📲 Add to home screen
- 🔔 Push notifications ready

---

## 🌐 Deployment

### Frontend - Vercel

```bash
# Deploy frontend
vercel deploy frontend/ --prod
```

### Backend - HuggingFace Spaces

```bash
# Push backend to HF Space
cd backend
git clone https://huggingface.co/spaces/amkyawdev/amk-ai-backend
cp * amk-ai-backend/
cd amk-ai-backend
git push
```

Or use Docker:
```bash
docker build -t amkyawdev/amk-ai-backend ./backend
docker run -p 7860:7860 -e GROQ_API_KEY=$GROQ_API_KEY amkyawdev/amk-ai-backend
```

---

## 📖 Documentation

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Get Started | `/` | Landing page |
| Login | `login` | User login |
| Register | `register` | New user registration |
| Reset | `reset` | Password reset |
| Main | `main` | Dashboard with tabs |
| Chat | `chat` | Burme AI chatbot |
| API | `api` | API key settings |
| Docs | `docs` | Documentation |
| About | `about` | About page |

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v1/chat/completions` | POST | Chat completion |
| `/v1/completions` | POST | Text completion |
| `/v1/audio/transcriptions` | POST | Whisper STT |
| `/v1/models` | GET | List models |
| `/health` | GET | Health check |

---

## 🔑 Environment Variables

### Backend

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Groq API key | Yes |
| `PORT` | Server port (default: 7860) | No |
| `HOST` | Server host | No |

---

## 🎨 Theme

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Gold | `#d4af37` | Primary accent |
| Gold Light | `#f5d678` | Gradients |
| Dark | `#1a1a1a` | Body background |
| Smoke | `#2d2d2d` | Cards/containers |

---

## 🤝 System Prompt (Burme AI)

```
You are Burme AI - a helpful, polite AI assistant.
Rules:
1. Focus on the user's question
2. Answer accurately and clearly
3. Use markdown formatting
4. Be polite (use greetings like "မင်္ဂလာပါ", "ဟုတ်အကို")
5. Consider user emotions
6. Format SRT files correctly
```

---

## 📄 License

MIT License © 2024 AMK AI

Permission is hereby granted, free of charge, to any person obtaining a copy of this software.

---

<div align="center">

**Built with ❤️ for developers**

</div>