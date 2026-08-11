# 🎯 Project Overview

**External Websites** [Visit JHR](https://nextjs-showcase-git-portfolio-jhrhq.vercel.app/)

**Overview:** A comprehensive showcase repository demonstrating modern web development patterns using Next.js. This repository serves as a centralized hub hosting multiple applications,including standard Next.js apps and Single Page Application (SPA) implementations—accessible through a single entry point.

**Structure:**

- Single Next.js application (regular setup, not monorepo)
- One deployment pipeline
- Central landing page linking to all sub-applications
- Multiple independent apps with different architectural approaches

---

.husky/pre-commit

```bash
pnpm exec lint-staged
```

.husky/commit-msg

```bash
pnpm exec commitlint --edit $1
```

## 🏗️ Application Architecture

### **App Type 1: SPA-Style Application**

**Rendering Strategy:** Client-Side Rendering (CSR)

**Backend:** Next.js API Routes

**Tech Stack:**

- **Data Fetching:** TanStack Query (React Query) + Axios
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod validation
- **Tables:** TanStack Table

**Authentication Flow:**

- Client-side auth implementation
- Token-based authentication (access + refresh tokens)
- Token storage: Browser localStorage
- Custom auth logic via API routes

**Characteristics:**

- Pure SPA behavior
- All rendering happens client-side
- Backend logic handled through `/api` routes

---

### **App Type 2: Next.js-Native Applications**

**Rendering Strategy:** Hybrid (Server + Client Components)

**Approach:** Follow Next.js 14+ best practices

**Rendering Methods:**

- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR) - optional
- Server Components (default)
- Client Components (when interactivity needed)

**Authentication:**

- Next.js recommended patterns (e.g., middleware, server sessions)
- Potentially using NextAuth.js or similar

**Characteristics:**

- Leverage Server Components for better performance
- Use Client Components selectively
- Optimized data fetching with server-side capabilities

---

## 📁 Project Structure (Standard Next.js App)

```
my-nextjs-app/
├── app/                      # Next.js App Router
│   ├── (home)/              # Landing page (root)
│   │   └── page.tsx
│   ├── spa-app/             # SPA-style application
│   │   ├── dashboard/
│   │   ├── settings/
│   │   └── page.tsx
│   ├── blog/                # Next.js native app (example)
│   │   └── page.tsx
│   ├── docs/                # Another Next.js native app
│   │   └── page.tsx
│   └── api/                 # API routes (mainly for spa-app)
│       ├── auth/
│       ├── users/
│       └── [...other-endpoints]/
├── components/              # Shared components
│   ├── spa-app/            # Components specific to SPA app
│   ├── blog/               # Components for blog app
│   └── shared/             # Truly shared components
├── lib/                     # Shared utilities
├── hooks/                   # Shared React hooks
├── stores/                  # Zustand stores (for SPA app)
├── types/                   # Shared TypeScript types
├── styles/                  # Global styles
├── public/                  # Static assets
└── biome.json              # Biome configuration
```

---

## 🔑 Key Features

### **Single Application Benefits:**

- One `package.json` and dependency tree
- Shared components and utilities across all apps
- Unified configuration with **Biome** for linting and formatting
- Single build and deployment process

### **Multiple App Patterns:**

- Different routing strategies per app section
- Separate auth approaches (client-side vs. server-side)
- Different data fetching patterns by app type

### **Deployment:**

- Single build command: `npm run build`
- One deployment target (Vercel, AWS, etc.)
- All apps under same domain with different routes

---

## 🚀 Routing Structure Example

→ Landing page

```
https://nextjs-showcase-git-portfolio-jhrhq.vercel.app/
```

→ SPA-style app (client-rendered) LINKER

```
https://nextjs-showcase-git-portfolio-jhrhq.vercel.app/linker
```

→ Next.js native app (SSR/SSG)

```
https://nextjs-showcase-git-portfolio-jhrhq.vercel.app/hotel-booking
```

→ Another Next.js app

```
https://nextjs-showcase-git-portfolio-jhrhq.vercel.app/movies
```

→ Another Next.js app

```
https://nextjs-showcase-git-portfolio-jhrhq.vercel.app/blog
```

---

## 🛠️ Development Tools

- **Linting & Formatting:** Biome
- **Type Checking:** TypeScript
- **Package Manager:** npm/yarn/pnpm

---

## ✅ Summary

- **One standard Next.js app** (no monorepo complexity)
- **Multiple application sections** with different architectural patterns
- **SPA section:** Pure client-side with API routes
- **Other sections:** Server/Client Component hybrid
- **Code quality:** Managed by **Biome**
- **Everything managed** from one codebase, one deployment

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deployed on Vercel
