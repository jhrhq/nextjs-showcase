## 📁 Folder Structure


Key ideas:

* Domain-first (linker / blog / docs / portfolio)
* Clear infra vs app logic separation
* No generic `features` directory
* Shared UI + domain UI clearly separated

```
src/
├── app/                                 # Routing layer (Next.js App Router)
│   ├── (home)/                          # Landing pages
│   │   └── page.tsx
│   ├── (spa)/                            # Multiple SPAs
│   │   ├── linker/                       # SPA 1
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── (auth)/                  # Sign-in / Sign-up pages
│   │   │   └── (dashboard)/             # Dashboard pages
│   │   │       ├── projects/
│   │   │       │   ├── page.tsx
│   │   │       │   └── [id]/
│   │   │       │       ├── page.tsx
│   │   │       │       ├── inbound/page.tsx
│   │   │       │       ├── custom-network/page.tsx
│   │   │       │       ├── anchor-manager/page.tsx
│   │   │       │       └── site-report/page.tsx
│   │   │       └── account/
│   │   │           ├── page.tsx
│   │   │           ├── update-password/page.tsx
│   │   │           └── active-plans/page.tsx
│   │   ├── dashboard/                   # SPA 2
│   │   └── admin/                       # SPA 3
│   │
│   ├── (nextjs)/                        # Conventional Next.js apps
│   │   ├── blog/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── docs/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── [...slug]/page.tsx
│   │   └── portfolio/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       └── [project]/page.tsx
│   │
│   └── api/                             # External/public API routes
│       └── linker/
│           ├── auth/
│           │   ├── sign-in/route.ts
│           │   ├── sign-up/route.ts
│           │   ├── refresh/route.ts
│           │   └── logout/route.ts
│           ├── projects/
│           │   ├── route.ts
│           │   └── [id]/
│           │       ├── route.ts
│           │       ├── inbound/route.ts
│           │       ├── custom-network/route.ts
│           │       ├── anchor-manager/route.ts
│           │       └── site-report/route.ts
│           └── account/
│               ├── route.ts
│               └── plans/route.ts
│
├── components/                                   # Only to maintain Shadcn
│   └── ui/                                       # Shadcn primitives
│
│
├── ui/                                    # Global UI layer
│   ├── shared/                            # Cross-domain UI components
│   └── providers/                         # ThemeProvider, QueryProvider, Toaster
│
├── domains/                               # Domain-driven design
│   ├── linker/
│   │   ├── ui/                             # Domain-specific UI
│   │   ├── actions/                        # Business actions
│   │   ├── services/                       # Services (call domain API client)
│   │   ├── hooks/                          # Domain hooks
│   │   ├── stores/                         # Domain state (AuthProvider)
│   │   ├── api/                            # Domain-specific HTTP client
│   │   │   └── client.ts
│   │   ├── validations/                    # Zod/Yup schemas
│   │   ├── types/                          # Domain types
│   │   └── constants.ts
│   │
│   ├── blog/
│   │   ├── ui/
│   │   ├── actions/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── api/client.ts
│   │   ├── validations/
│   │   ├── types/
│   │   └── constants.ts
│   │
│   ├── docs/
│   │   ├── ui/
│   │   ├── actions/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── api/client.ts
│   │   ├── validations/
│   │   ├── types/
│   │   └── constants.ts
│   │
│   └── portfolio/
│       ├── ui/
│       ├── actions/
│       ├── services/
│       ├── hooks/
│       ├── stores/
│       ├── api/client.ts
│       ├── validations/
│       ├── types/
│       └── constants.ts
│
├── infra/                                 # Low-level reusable infrastructure
│   ├── http/                              # Optional shared utilities for Axios/fetch
│   │   └── client.ts
│   ├── logger.ts
│   ├── env.ts
│   ├── cache.ts
│   └── utils.ts
│
├── hooks/                                  # Truly shared hooks
│   └── shared/
│
├── actions/                                # Truly shared actions
│
│
├── lib/                                    # Only to maintain Shadcn utils
│    └── utils.ts
├── stores/                                 # Truly shared stores/state
│
├── types/                                  # Cross-domain shared types
│   └── shared/
│
├── config/                                 # Runtime & feature configs
│
├── styles/
│   └── globals.css
│
└── proxy.ts
```

This keeps:

* **UI global**
* **Domains isolated**
* **Infra boring and reusable**
* **Routing thin**

---

## 2️⃣ Folder Rules (README-style)

### 🧭 High-level principles

* **Routing has no logic**
* **UI has no business rules**
* **Actions express intent**
* **Services talk to the outside world**
* **Infra never depends on domains**

---

### `app/`

**What goes here**

* Routes
* Layouts
* Metadata
* Loading / error boundaries

**Rules**

* ❌ No business logic
* ❌ No data fetching logic
* ✅ Can call actions

---

### `ui/`

**What goes here**

* shadcn primitives
* shared UI (buttons, loaders, wrappers)
* providers

**Rules**

* ❌ No domain logic
* ❌ No API calls
* ❌ No actions
* ✅ Pure presentation

---

### `domains/*`

Each domain is **self-contained**.

#### `domains/<domain>/ui`

* Domain-specific UI
* Can call hooks
* Can trigger actions

#### `domains/<domain>/actions`

* Server Actions
* Business workflows
* Orchestration layer

Rules:

* ❌ No JSX
* ❌ No direct fetch
* ✅ Calls services

#### `domains/<domain>/services`

* External calls
* Database / API logic
* Side effects

Rules:

* ❌ No React
* ❌ No UI concerns
* ✅ Uses infra/http

#### `domains/<domain>/hooks`

* Compose UI + actions
* Handle loading / errors
* Client orchestration

#### `domains/<domain>/stores`

* Client-side state only
* Zustand / Jotai / Redux

---

### `infra/`

**What goes here**

* HTTP clients
* env parsing
* logging
* caching
* utilities

**Rules**

* ❌ No domain knowledge
* ❌ No React
* ❌ No business rules

---

## 3️⃣ Data Flow: UI → Action → Service → API

### Example: Sign In (Linker)

```
[UI]
domains/linker/ui/sign-in-form.tsx
        ↓
[Hook]
domains/linker/hooks/use-auth.ts
        ↓
[Action]
domains/linker/actions/auth.ts
        ↓
[Service]
domains/linker/services/auth.service.ts
        ↓
[Infra]
infra/http/client.ts
        ↓
[API]
app/api/auth/sign-in/route.ts
```

### Responsibilities at each step

#### UI

* Collect input
* Trigger hook
* Render states

#### Hook

* Manage loading / error
* Call action
* Update store

#### Action

* Validate intent
* Orchestrate services
* Enforce business rules

#### Service

* Talk to external systems
* Transform data
* Handle retries / failures

#### API Route

* Auth
* Rate limiting
* External contract

---
