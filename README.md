# 🅰️ Angular Projects

A collection of Angular applications built for learning, practice, and real-world use cases. Each project explores different Angular concepts, APIs, and third-party integrations.

---

## 📁 Projects Overview

| Project | Description | Key Tech |
|---|---|---|
| [auth-routing](#-auth-routing) | Auth guards & route protection demo | Angular Router, Guards |
| [cron-scheduler](#-cron-scheduler) | Cron job scheduler with SSR | Angular SSR, Express |
| [music-search](#-music-search) | Spotify music discovery app | Angular 14, Spotify API |
| [news-hub](#-news-hub) | News aggregator app | Angular, GNews API |
| [portfolio](#-portfolio) | Personal developer portfolio | Angular 17 |
| [pract](#-pract) | Core Angular concepts practice | RxJS, Pipes, Components |
| [practise](#-practise) | Component & service practice | Angular, Bootstrap |
| [softPhone](#-softphone) | WebRTC SIP softphone app | SIP.js, WebRTC, Socket.io |
| [sportify](#-sportify) | Spotify-like music player | Angular SSR, Spotify API |
| [video-gallery](#-video-gallery) | Video & image gallery | Angular, Unsplash API |
| [weather-api](#-weather-api) | Weather dashboard (v1) | Angular, OpenWeather API |
| [weather-pro](#-weather-pro) | Weather dashboard (v2) | Angular 17, Standalone |
| [work-pract](#-work-pract) | Image/video carousel practice | Angular, ng-image-slider |

---

## 🔐 auth-routing

An Angular project demonstrating **authentication-based routing** using route guards and services.

**Features:**
- `AuthGuard` protecting private routes
- `AuthService` with login/logout flow
- `ProductService` for fetching product data
- Route configuration with lazy loading concepts

**Tech Stack:** Angular, Angular Router, Bootstrap

```bash
cd auth-routing
npm install
ng serve
```

---

## ⏱️ cron-scheduler

An Angular application for **scheduling and evaluating cron expressions** with SSR support.

**Features:**
- Cron expression parsing and scheduling
- Server-Side Rendering (SSR) with Angular Universal
- Vercel deployment ready (`vercel.json` included)

**Tech Stack:** Angular, Angular SSR, Express, Vercel

```bash
cd cron-scheduler
npm install
ng serve
```

---

## 🎵 music-search

A **Spotify Music Discovery** app built with Angular 14. Search for tracks, artists, and albums with a beautiful UI.

**Features:**
- Multi-type search (tracks, artists, albums)
- Advanced audio player
- Loading bar with HTTP progress tracking
- Spotify API integration

**Tech Stack:** Angular 14, Spotify API, Bootstrap 5, jQuery, ngx-spinner, ngx-loading-bar

```bash
cd music-search
npm install
ng serve
```

---

## 📰 news-hub

A **news aggregator** application powered by the GNews API with categorized news sections.

**Features:**
- Top Headlines from India
- Category-based news (Technology, Sports, Business)
- HTTP loading bar integration
- Clean card-based UI with Bootstrap

**Tech Stack:** Angular, GNews API, Bootstrap, ngx-loading-bar

```bash
cd news-hub
npm install
ng serve
```

---

## 💼 portfolio

A **personal developer portfolio** website built with Angular 17.

**Features:**
- Modern responsive design
- Sections: About, Skills, Projects, Contact
- Smooth animations and transitions

**Tech Stack:** Angular 17, Angular Animations

> 📌 Source: [github.com/rama7993/portfolio](https://github.com/rama7993/portfolio)

```bash
cd portfolio
npm install
ng serve
```

---

## 🧪 pract

A **core Angular concepts** practice project covering multiple fundamental features.

**Features:**
- Product listing with cart functionality
- Custom Pipes (`filter.pipe`, `shorten.pipe`)
- Todo component
- RxJS observables demo
- Data binding & lifecycle hooks

**Tech Stack:** Angular, Bootstrap, ng-bootstrap, Font Awesome, jQuery, RxJS

```bash
cd pract
npm install
ng serve
```

---

## 🚀 practise

A **component and service practice** project with an image-rich launch pad layout.

**Features:**
- Angular routing setup
- Service injection and HTTP calls
- Bootstrap-based responsive layout
- SVG asset integration

**Tech Stack:** Angular, Bootstrap, jQuery

```bash
cd practise
npm install
ng serve
```

---

## 📞 softPhone

A **modern WebRTC SoftPhone** with full SIP protocol support, call management, and advanced features.

**Features:**
- SIP.js-based VoIP calling
- WebRTC audio/video support
- Jitsi Meet integration component
- Call recording with RecordRTC
- Socket.io real-time signaling
- PWA / Service Worker support
- Toast notifications

**Tech Stack:** Angular, SIP.js, WebRTC, RecordRTC, Socket.io, NgRx Toastr, Moment.js

```bash
cd softPhone
npm install
ng serve
```

---

## 🎧 sportify

A **Spotify-inspired music player** with Angular SSR and Spotify API integration.

**Features:**
- Track playback and preview
- Spotify backend service integration
- Server-Side Rendering for better performance
- Album placeholder assets

**Tech Stack:** Angular 17, Angular SSR, Express, Spotify API, Bootstrap

```bash
cd sportify
npm install
ng serve
```

---

## 🖼️ video-gallery

An **image and video gallery** app powered by the Unsplash API.

**Features:**
- Unsplash image integration
- Video gallery with multiple local videos
- Gallery and Image Gallery components
- SCSS-based styling

**Tech Stack:** Angular, Unsplash API, Bootstrap, Font Awesome, SCSS

```bash
cd video-gallery
npm install
ng serve
```

---

## 🌦️ weather-api

A **weather dashboard (v1)** that fetches real-time weather data.

**Features:**
- City-based weather search
- Info block component for weather details
- Weather model with TypeScript types
- Bootstrap + ngx-bootstrap UI

**Tech Stack:** Angular, OpenWeather API, Bootstrap, ngx-bootstrap, jQuery

```bash
cd weather-api
npm install
ng serve
```

---

## 🌤️ weather-pro

An upgraded **weather dashboard (v2)** built with Angular 17 standalone components.

**Features:**
- Standalone Angular 17 component architecture
- Cleaner weather service with typed models
- Lightweight with no Bootstrap dependency

**Tech Stack:** Angular 17, Standalone Components, RxJS

```bash
cd weather-pro
npm install
ng serve
```

---

## 🎠 work-pract

A **carousel and media practice** project exploring Angular animation and slider libraries.

**Features:**
- Image slider with `ng-image-slider`
- Material carousel integration
- Video gallery with multiple assets
- Unsplash API integration

**Tech Stack:** Angular, ng-image-slider, @ngmodule/material-carousel, Bootstrap

```bash
cd work-pract
npm install
ng serve
```

---

## 🛠️ Prerequisites

Make sure you have the following installed:

```bash
node -v      # Node.js v16+
npm -v       # npm v8+
ng version   # Angular CLI
```

Install Angular CLI globally:

```bash
npm install -g @angular/cli
```

---

## 📂 Repository Structure

```
Angular-Practise/
├── auth-routing/       # Auth guards & routing
├── cron-scheduler/     # Cron expression scheduler
├── music-search/       # Spotify music discovery
├── news-hub/           # GNews news aggregator
├── portfolio/          # Developer portfolio
├── pract/              # Core Angular practice
├── practise/           # Component & service practice
├── softPhone/          # WebRTC SoftPhone
├── sportify/           # Spotify-like music player
├── video-gallery/      # Image & video gallery
├── weather-api/        # Weather dashboard v1
├── weather-pro/        # Weather dashboard v2
└── work-pract/         # Carousel & media practice
```

---

## 👨‍💻 Author

**Rama** — [@rama7993](https://github.com/rama7993)

---

## 📄 License

This repository is for learning and practice purposes.