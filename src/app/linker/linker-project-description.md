/**
 * ============================================================================
 * NEXT.JS 16 AUTHENTICATION - ENTERPRISE FILE STRUCTURE
 * ============================================================================
 * 
 * Stack:
 * - Next.js 16 (App Router)
 * - React 19
 * - TypeScript 5.7+
 * - Zod 4.3.2
 * - Tailwind CSS 4.1.18
 * - shadcn/ui 3.6.3
 * - React Hook Form 7.54+
 * - Lucide React 0.468+
 * 
 * Architecture:
 * - Atomic Design Pattern
 * - Feature-First Structure
 * - Type-Safe End-to-End
 * - Server Actions + Client Components
 * - Progressive Enhancement
 * 
 * Installation Commands:
 * ```bash
 * # Core dependencies
 * npm install zod@4.3.2 react-hook-form@7.54.0 @hookform/resolvers@3.9.1
 * 
 * # shadcn/ui init
 * npx shadcn@3.6.3 init
 * 
 * # Add required shadcn components
 * npx shadcn@3.6.3 add button input label form card alert
 * 
 * # Icons
 * npm install lucide-react@0.468.0
 * ```
 * 
 * Project Structure:
 * ```
 * src/
 * ├── app/
 * │   ├── (auth)/
 * │   │   └── sign-in/
 * │   │       └── page.tsx
 * │   └── dashboard/
 * │       └── page.tsx
 * ├── components/
 * │   ├── ui/              # shadcn components (auto-generated)
 * │   ├── features/
 * │   │   └── auth/
 * │   │       ├── sign-in-form.tsx
 * │   │       └── sign-in-card.tsx
 * │   └── shared/
 * │       └── form-field-wrapper.tsx
 * ├── lib/
 * │   ├── actions/
 * │   │   └── auth/
 * │   │       ├── sign-in.action.ts
 * │   │       └── index.ts
 * │   ├── validations/
 * │   │   └── auth.validation.ts
 * │   ├── services/
 * │   │   └── auth/
 * │   │       ├── auth.service.ts
 * │   │       ├── session.service.ts
 * │   │       └── rate-limit.service.ts
 * │   ├── errors/
 * │   │   └── auth.error.ts
 * │   ├── types/
 * │   │   ├── auth.types.ts
 * │   │   └── action.types.ts
 * │   ├── constants/
 * │   │   └── auth.constants.ts
 * │   └── utils.ts        # shadcn cn() utility
 * └── middleware.ts
 * ```
 */
