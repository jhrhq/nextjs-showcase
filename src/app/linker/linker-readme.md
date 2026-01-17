**production-grade Next.js 16 authentication system** with enterprise-level architecture. Here's what you get:

## 🏗️ **Architecture Highlights**

### **1. Feature-First Structure**
- Services layer (business logic)
- Actions layer (server actions)
- Components layer (UI with atomic design)
- Clear separation of concerns

### **2. Tech Stack (Latest Versions)**
- ✅ Next.js 16 (App Router)
- ✅ React 19
- ✅ Zod 4.3.2
- ✅ Tailwind CSS 4.1.18
- ✅ shadcn/ui 3.6.3
- ✅ React Hook Form 7.54+
- ✅ Lucide React 0.468+

### **3. Design Patterns**
- **Atomic Design**: Shared components → Feature components → Pages
- **Service Layer**: Separated business logic (auth, session, rate-limit)
- **Error Handling**: Custom error classes with proper typing
- **Type Safety**: End-to-end TypeScript with strict types
- **Barrel Exports**: Clean imports via index files

### **4. Production-Ready Features**
- 🔒 Secure session management
- ⚡ Rate limiting (upgradeable to Redis)
- 🎨 shadcn/ui components (accessible)
- 🔍 Comprehensive error handling
- 📱 Progressive enhancement
- ♿ Full ARIA accessibility
- 🎯 Field-level validation
- 🔄 Loading states
- 🛡️ Middleware protection

## 📁 **File Structure**

```
src/
├── lib/
│   ├── constants/          # Config constants
│   ├── types/              # TypeScript types
│   ├── errors/             # Custom error classes
│   ├── validations/        # Zod schemas
│   ├── services/auth/      # Business logic
│   └── actions/auth/       # Server actions
├── components/
│   ├── ui/                 # shadcn components
│   ├── shared/             # Reusable components
│   └── features/auth/      # Auth-specific components
└── app/
    ├── (auth)/sign-in/     # Auth pages
    └── dashboard/          # Protected pages
```

## 🚀 **Quick Start**

```bash
    pnpm install
    pnpm run dev
    -------------------------------
    npm install
    npm run dev
    -------------------------------
    yarn install
    yarn run dev
```


````md
# Authentication Setup Guide

This guide explains how to set up a production-ready authentication flow using Next.js App Router, Server Actions, React Hook Form, Zod, and shadcn/ui.

---

## 1. Install Dependencies

### Core Dependencies

```bash
npm install zod@4.3.2 react-hook-form@7.54.0 @hookform/resolvers@3.9.1
````

### shadcn/ui Setup

```bash
npx shadcn@3.6.3 init
```

**Recommended options:**

* Style: Default or New York
* Base color: Slate
* CSS variables: Yes

### Add Required Components

```bash
npx shadcn@3.6.3 add button input label card alert
```

### Icons

```bash
npm install lucide-react@0.468.0
```

---

## 2. Create File Structure

```bash
mkdir -p src/lib/{actions/auth,services/auth,validations,errors,types,constants}
mkdir -p src/components/{features/auth,shared}
mkdir -p src/app/\(auth\)/sign-in
mkdir -p src/app/dashboard
```

---

## 3. Copy Files

Copy each provided code section into its corresponding file.
Each code block includes a comment header specifying its intended file path.

---

## 4. shadcn/ui Components

The following files should exist in `src/components/ui/`:

* `button.tsx`
* `input.tsx`
* `label.tsx`
* `card.tsx`
* `alert.tsx`

Utility file:

* `src/lib/utils.ts` (contains the `cn()` helper function)

---

## 5. Environment Variables

Create a `.env.local` file in the project root:

```env
NODE_ENV=development
# Add your database URL, secrets, etc.
```

---

## 6. Production Upgrades

Before deploying to production, replace mock implementations with real services.

### Database (Prisma)

```bash
npm install @prisma/client
npx prisma init
```

### Password Hashing (bcrypt)

```bash
npm install bcrypt @types/bcrypt
```

### Rate Limiting (Redis / Upstash)

```bash
npm install @upstash/redis
```

### Monitoring (Sentry)

```bash
npm install @sentry/nextjs
```

---

## 7. Run & Test the App

Start the development server:

```bash
npm run dev
```

Navigate to:

```
http://localhost:3000/sign-in
```

### Test Credentials

* Email: `test@example.com`
* Password: `password123`

---

## 8. Key Features

* Server Actions with robust error handling
* React Hook Form with Zod schema validation
* `useActionState` for progressive enhancement
* shadcn/ui components (accessible and polished)
* Lucide icons for visual feedback
* Rate limiting (5 attempts per 15 minutes)
* Secure session management
* Middleware-based route protection
* End-to-end type safety
* Atomic design pattern
* Production-ready structure
* Comprehensive error handling
* ARIA accessibility support
* Loading and pending states
* Field-level validation feedback
* Debug mode for development

---

## Done

The application is ready for local development and structured for smooth production scaling.

```
```
