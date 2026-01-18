![Welcome](Assets/gif1.gif)


# Design and Development of web-based Campus Connect Directory : incase AASTU
## 🚀 Live Demo: https://dancing-cupcake-342928.netlify.app/

## ✨ Overview
A lightweight, client‑side web app for exploring student clubs and campus events. Add new clubs/events, filter by topics, search fast, and switch between dark/light themes with persistence.

- Fast, static setup (no backend)
- Persistent data via `localStorage` + versioned defaults
- Split pages for clarity: Home, Clubs, Events
- Polished UI with smooth transitions and accessible focus states


## 🧭 Navigation
- Home: intro and CTAs to jump into Clubs/Events
- Clubs: browse, filter by topic, view details, add clubs
- Events: browse upcoming events, view details, add events

## 🎯 Core Features
- Topic filtering for clubs with clear active state in light/dark mode
- Global search on Clubs/Events pages
- Add Club/Event via modal; immediately renders and persists
- Detail modals for rich info and external links
- Theme toggle with `localStorage` persistence across pages
- Smooth fade‑in page transitions and consistent button styling

## 🗂️ Project Structure
```
.
├── README.md                # Project overview and documentation
├── assets/
│   └── css/
│       └── style.css        # Visual styling and themes
├── scripts/
│   └── script.js            # Logic, data, and interactivity
└── structure/               # Core HTML layout files
    ├── index.html           # Main Entry Point
    ├── clubs.html           # Clubs View
    └── events.html          # Events View
```

## 🌓 Theme Persistence
- Default: Dark mode on first visit
- Your choice persists across pages via `localStorage:key` → `campus_theme`
- Toggle button updates icon (`moon`/`sun`) automatically


## 🔎 Search & Filter
- Clubs/Events pages include a search box (Home intentionally has none)
- Clubs have topic chips; the active chip is visually highlighted in both themes

## 🧪 See Your JS Changes
If edits don’t appear immediately:
- Hard refresh: `Ctrl+F5` (or enable DevTools Network → Disable cache)
- Clear or re‑seed data if you changed defaults:
  ```js
  resetData();
  // or
  localStorage.clear(); location.reload();
  ```
- Optional cache‑busting in HTML:
  ```html
  <script src="script.js?v=20260119"></script>
  ```

### **Project Information**

| Course | Section | Submission Date |
|--------|---------|-----------------|
| Internet Programming I | B | January 19, 2026 |

**Project Title:**  
*Design and Development of web-based Campus Connect Directory : incase AASTU*

**Submitted to:** Mr. Jerusalem Fetene

---

### **Team Members**

| Name | ID Number |
|------|-----------|
| **Edom Getahun** | ETS0442/16 |
| **Eden Alemayehu** | ETS0433/16 |
| **Eden Mengste** | ETS0436/16 |
| **Ephratah Girma** | ETS0480/16 |
| **Enas Atham** | ETS0473/16 |
| **Kalkidan Fikadu** | ETS0777/16 |

---



## 🤝 Contributing
- Fork → Branch → PR
- Keep changes focused; include brief notes in PR description

---
<img src="https://capsule-render.vercel.app/api?type=wave&color=0:0a0e1a,100:00D4FF&height=120&section=footer&text=%20&fontSize=0" alt="animated footer" />
