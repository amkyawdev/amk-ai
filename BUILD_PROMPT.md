# 🤖 Amkyawdev-ai - Full-Stack Build Prompt

---

## 📋 Instructions for AI Tools (Claude, GPT, Cursor, Windsurf)

Copy and paste this entire prompt into your preferred AI tool and say **"Build this project"** or **"Generate full code"**.

---

## 🏗️ Project Overview

**Project Name:** Amkyawdev-ai  
**Type:** Mobile-first AI Assistant Website  
**Tech Stack:** Vue 3 (Frontend) + Python FastAPI (Backend)

---

## 🎨 Design Requirements

### Color Palette
| Element | Color | Hex |
|---------|-------|-----|
| Primary | Gold | `#FFD700` |
| Secondary | Dark Gray | `#2C2F33` |
| Background | Smoke Black | `#0A0A0A` |
| Card BG | Charcoal | `#1A1A2E` |
| Input BG | Dark | `#16161A` |

### UI/UX Rules
- ✅ Mobile-first design (responsive down to 320px)
- ✅ Small buttons, small modals, tiny icons
- ✅ Rounded corners (8-12px)
- ✅ Bootstrap Icons CDN
- ✅ Dark theme with gold accents

---

## 📱 Pages to Build

### 1. GetStarted.vue
- Centered logo with gradient circle
- App title: "Amkyawdev AI"
- Tagline: "Your Smart AI Assistant"
- Two buttons: "Get Started" (primary), "Login" (outline)
- Badges: Secure, Fast, Cloud

### 2. Login.vue
- Email & Password inputs
- "Remember me" checkbox
- "Forgot Password?" link
- "Don't have account? Register" link

### 3. Register.vue
- Username, Email, Password, Confirm Password fields
- "Create Account" button

### 4. ResetPassword.vue
- Email input
- "Send Reset Link" button
- "Back to Login" link

### 5. MainPage.vue (Dashboard)
- Header with hamburger menu (☰) + App title + Settings gear (⚙️)
- Usage bar: Tokens (20/20) + TTS (20s/20s)
- 4-grid menu: Chat, API, Docs, About
- Mobile bottom navigation bar (4 icons)

### 6. ChatPage.vue (MOST IMPORTANT)
**Features:**
- Header: Back arrow + "Chat" + Settings
- Chat messages with bubbles (user: gold gradient, assistant: dark)
- Input area: Upload button 📎 + Text input + Send button ➤
- Typing indicator (3 dots animation)
- Token counter decrements on each message
- Streaming text animation

**Logic:**
- 20 tokens/day limit
- System prompt for "Burme AI Bot"
- Markdown rendering (bold, italic, code blocks)
- Burmese greetings: ဟုတ်ကဲ့ပါ, မင်္ဂလာပါဗျာ

### 7. ApiPage.vue
- Groq API Key input (password type)
- Gemini API Key input
- OpenAI API Key input
- "Save Keys" button

### 8. DocsPage.vue
- Getting Started card
- API Reference card
- Quick Tips card

### 9. AboutPage.vue
- App logo
- "Amkyawdev AI" title
- Version 1.0.0
- "View on GitHub" button → https://github.com/amkyawdev/burme

---

## 🔐 Required Dialogs (Must show after login)

### UserInfoDialog.vue
Fields: Username, Email, Phone  
Button: "Save"  
Close button: ✕

### StoragePermissionDialog.vue
Switches:
- Save Chat History (default: ON)
- Voice Data Access (default: OFF)
- File Storage (default: OFF)  
Info text: "Daily: 20 tokens, 20s TTS"  
Button: "Apply"

---

## ⚙️ Components

### MobileNav.vue
Fixed bottom navigation with 4 items: Home, Chat, API, About

### User Store (Pinia)
```javascript
{
  user: { username, email, phone },
  permissions: { chatHistory, voiceData, fileStorage },
  isLoggedIn: boolean,
  tokens: 20,
  tts: 20
}
```

---

## 🎬 Animations Required

| Animation | Trigger |
|-----------|---------|
| Fade in | Page transitions |
| Scale down (0.97) | Button click |
| Pulse | Send button |
| Typing dots | AI thinking |
| Slide in | Mobile menu |

---

## 🐍 Backend (FastAPI)

### Endpoints Required
```
GET  /                  → Welcome message
GET  /health             → Health check
POST /v1/chat/completions → GROQ chat API
GET  /limits            → Token/TTS status
POST /upload            → Whisper transcription
```

### Dockerfile
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 7860
CMD ["python", "main.py"]
```

---

## 📦 Environment Variables

### Frontend (.env)
```
VITE_API_URL=https://your-huggingface-space.hf.space
VITE_GROQ_API_KEY=your_groq_api_key
```

### Backend
```
GROQ_API_KEY=your_groq_api_key
PORT=7860
```

---

## 🚀 Deployment

### Frontend → Vercel
1. Connect GitHub repo to Vercel
2. Add environment variables
3. Deploy

### Backend → HuggingFace Spaces
1. Create new Space (Docker)
2. Push backend code
3. Add GROQ_API_KEY

---

## 📂 Final File Structure

```
amkyawdev-ai/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── GetStarted.vue
│   │   │   ├── Login.vue
│   │   │   ├── Register.vue
│   │   │   ├── ResetPassword.vue
│   │   │   ├── MainPage.vue
│   │   │   ├── ChatPage.vue
│   │   │   ├── ApiPage.vue
│   │   │   ├── DocsPage.vue
│   │   │   └── AboutPage.vue
│   │   ├── components/
│   │   │   ├── UserInfoDialog.vue
│   │   │   ├── StoragePermissionDialog.vue
│   │   │   └── MobileNav.vue
│   │   ├── stores/
│   │   │   ├── user.js
│   │   │   └── chat.js
│   │   ├── router.js
│   │   ├── App.vue
│   │   └── main.js
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── backend/
    ├── main.py
    ├── Dockerfile
    └── requirements.txt
```

---

## ✅ Success Criteria

- [ ] All 9 pages render correctly
- [ ] Login/Register flow works
- [ ] User Info dialog appears after login
- [ ] Permission dialog appears after user info
- [ ] Chat sends messages and shows responses
- [ ] Token counter decrements
- [ ] Mobile navigation works
- [ ] Dark theme with gold accents applied
- [ ] Animations smooth and functional
- [ ] Backend endpoints respond correctly
- [ ] Docker builds successfully

---

## 💡 Pro Tips

1. **For faster development:** Use Vue CLI or Vite
2. **For styling:** Use scoped CSS with CSS variables
3. **For state:** Pinia is already configured
4. **For routing:** Vue Router is set up
5. **For API calls:** Use axios or fetch

---

## 🎯 Quick Start Commands

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
pip install -r requirements.txt
python main.py
```

---

**Prompt generated for:** Amkyawdev-ai Full-Stack Build  
**For:** Claude, GPT, Cursor, Windsurf, or any AI coding assistant