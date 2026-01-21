## 📁 Project Structure (Based on Flowchart)

```
src/
├── app/
│   ├── (spa)/
│   │   └── linker/
│   │       ├── layout.tsx                    # Root layout with providers
│   │       ├── page.tsx                      # Redirect to dashboard/sign-in
│   │       ├── (auth)/
│   │       │   ├── sign-in/
│   │       │   │   └── page.tsx
│   │       │   └── sign-up/
│   │       │       └── page.tsx
│   │       └── (dashboard)/
│   │           ├── layout.tsx                # Dashboard layout with sidebar
│   │           ├── dashboard/
│   │           │   └── page.tsx              # Main dashboard
│   │           ├── projects/
│   │           │   ├── page.tsx              # Projects list
│   │           │   └── [id]/
│   │           │       ├── page.tsx          # Project tools
│   │           │       ├── inbound/
│   │           │       │   └── page.tsx
│   │           │       ├── silo/
│   │           │       │   └── page.tsx
│   │           │       ├── links-report/
│   │           │       │   └── page.tsx
│   │           │       └── site-report/
│   │           │           └── page.tsx
│   │           └── account/
│   │               ├── page.tsx              # Account settings
│   │               ├── update-password/
│   │               │   └── page.tsx
│   │               └── active-plans/
│   │                   └── page.tsx
│   └── api/
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
│           │       ├── silo/route.ts
│           │       ├── links-report/route.ts
│           │       └── site-report/route.ts
│           └── account/
│               ├── route.ts
│               ├── password/route.ts
│               └── plans/route.ts
├── components/
│   └── linker/
│       ├── auth/
│       │   ├── sign-in-form.tsx
│       │   └── sign-up-form.tsx
│       ├── layout/
│       │   ├── sidebar.tsx
│       │   ├── navbar.tsx
│       │   └── mobile-nav.tsx
│       ├── projects/
│       │   ├── project-card.tsx
│       │   ├── project-form.tsx
│       │   └── project-table.tsx
│       ├── tools/
│       │   ├── inbound-table.tsx
│       │   ├── silo-structure.tsx
│       │   ├── links-report-table.tsx
│       │   └── site-report-chart.tsx
│       ├── account/
│       │   ├── password-form.tsx
│       │   └── plans-card.tsx
│       └── dashboard/
│           └── stats-card.tsx
├── lib/
│   └── linker/
│       ├── api/
│       │   ├── axios-instance.ts
│       │   ├── auth.ts
│       │   ├── projects.ts
│       │   └── account.ts
│       └── validations/
│           └── schemas.ts
├── stores/
│   └── linker/
│       ├── auth-store.ts
│       ├── projects-store.ts
│       └── ui-store.ts
├── hooks/
│   └── linker/
│       ├── use-auth.ts
│       ├── use-projects.ts
│       └── use-account.ts
└── types/
    └── linker/
        ├── auth.ts
        ├── project.ts
        └── account.ts
```
