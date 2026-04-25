# 💬 Chat Page Layout - Amkyawdev-ai

## Wireframe (Mobile-First)

```
┌─────────────────────────────────┐
│  🟡 (logo)    Amkyawdev-ai      │  ← Top Bar (fixed, 50px)
│                [⚙️]             │    hamburger + title + settings
├─────────────────────────────────┤
│                                  │
│  ┌──────────────────────────┐   │
│  │  User message bubble     │   │  ← Right aligned
│  │  (gold gradient bg)     │   │    dark gray text
│  └──────────────────────────┘   │
│                                  │
│  ┌──────────────────────────┐   │
│  │ 🤖 Bot message          │   │  ← Left aligned
│  │ with markdown          │   │    #1E1E1E bg
│  │ streaming text...       │   │    gold left border
│  │                       │   │
│  └──────────────────────────┘   │
│                                  │
│  ┌──────────────────────────┐   │
│  │ Typing... ██░░░░░░░░   │   │  ← 3 dots animation
│  └──────────────────────────┘   │
│                                  │
├─────────────────────────────────┤
│ [📎] [ Type a message... ] [➡️] │  ← Input Area (fixed, 50px)
│                          15/20  │    upload + input + send
└─────────────────────────────────┘
│ [🏠] [💬] [🔑] [📄] [👤] │  ← Bottom Nav (fixed, 50px)
└─────────────────────────────────┘
```

---

## Component Details

### Top Bar
| Element | Position | Style |
|---------|----------|-------|
| Hamburger | Left | ☰ icon, 28px, gold |
| Logo | Center | 24px, gold circle |
| Title | Center | "Amkyawdev-ai", gold |
| Settings | Right | ⚙️ icon, gold |

### Message Bubbles
| Type | Align | Background | Border | Text |
|------|-------|------------|--------|------|
| User | Right | Gold gradient | none | Black |
| Bot | Left | #1E1E1E | 3px gold left | White |

### Input Area
| Element | Size | Style |
|---------|------|-------|
| Upload | 32px | 📎 icon, gray |
| Input | flex: 1 | #2C2F33, gold focus, 40px |
| Send | 40px circle | Gold gradient |
| Counter | 12px | Right, gray |

### Bottom Nav
| Icon | Label | Active Color |
|------|-------|-------------|
| 🏠 | Home | Black circle |
| 💬 | Chat | Black circle |
| 🔑 | API | Black circle |
| 📄 | Docs | Black circle |
| 👤 | About | Black circle |

---

## Layout Spacing

```
Top Bar:     fixed, 50px, #2C2F33
Chat Area:   flex: 1, overflow-y: auto, padding: 12px
Input:      fixed bottom, 50px, #2C2F33, padding: 8px
Bottom Nav: fixed, 50px, #FFD700, gap: 8px
```

---

## Responsive Behavior

### Mobile (< 480px)
- Full width
- 8px horizontal padding
- Bottom nav icons only (no labels)

### Tablet (481-768px)
- 80% width
- Nav shows icons + labels

### Desktop (769px+)
- 500px max-width, centered
- More padding
- Larger fonts

---

## Animation Specs

| Action | Animation | Duration |
|--------|-----------|----------|
| Send click | Scale 0.95 + ripple | 0.2s |
| Typing | 3 dots jumping | 0.5s loop |
| Stream | Typewriter | 50ms/char |
| Work done | Gold glow | 0.3s |

---

## Token Counter

```
Position: Right side of input area
Style:    12px, #B0B0B0
Format:   "15/20 tokens"
```

---

## Quick CSS Reference

```css
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.top-bar {
  position: fixed;
  top: 0;
  height: 50px;
  background: #2C2F33;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}

.input-area {
  position: fixed;
  bottom: 50px;
  height: 50px;
  background: #2C2F33;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  height: 50px;
  background: #FFD700;
}
```

---

**Chat Page Layout v1.0**