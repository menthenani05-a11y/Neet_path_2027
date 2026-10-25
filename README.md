# NEETPath 2027

A responsive NEET UG preparation workspace built with Next.js App Router, TypeScript and a local-first demo mode. The UI includes an original sample learning set and working browser-persisted learning flows. It does not claim full syllabus coverage or confirmed 2027 exam rules.

## Implementation plan and delivery

1. Scaffold the Next.js app, shared responsive shell and design tokens. **Done.**
2. Add original subject content, lesson experience and reusable question practice. **Done.**
3. Add configurable timed test, scoring, results, paper source directory and analytics. **Done.**
4. Add browser-persisted planner, flashcards, doubts, bookmarks and profile. **Done.**
5. Add Supabase schema/setup guidance and verify build/type checks. **Schema and guidance included; auth/database adapter remains setup work.**

## Run locally

Requires Node.js 22.6+ (the demo seed and unit-test scripts use Node's built-in TypeScript stripping).

```bash
npm install
npm run dev
```

Visit http://localhost:3000. Available checks are `npm run typecheck`, `npm run lint`, `npm test` and `npm run build`. The app has no required API keys for its demo experience.

## Demo mode

Demo progress, preferences, attempts, planner tasks, revision ratings, bookmarks and doubts are stored in `localStorage` on the current browser. There is no real account or server persistence in demo mode. The login/signup screens clearly explain they are previews. Clear browser site data or use Settings → Clear demo data to reset.

Included original content: three substantive sample lessons (Kinematics, Some Basic Concepts in Chemistry, Cell Structure and Function), 30 original practice questions with explanations, flashcards, and a 12-question mixed demo test. The test uses a central provisional configuration (+4/−1/0, 30 minutes). This is demo scoring and not a confirmed NEET UG 2027 pattern. Subject chapter lists are working reference groupings pending official 2027 syllabus confirmation.

Previous-paper page links to the [official NEET portal](https://neet.nta.nic.in/) rather than inventing papers or presenting generated material as official. Current availability and year documents must be checked on NTA's official portal.

## Supabase setup

1. Create a Supabase project and copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (the publishable anon key only).
3. Apply `supabase/migrations/202610250001_initial_schema.sql` with the Supabase CLI or SQL editor.
4. Run `npm run seed:demo` to emit portable JSON for the original sample catalogue, lessons, questions and flashcards; build a reviewed importer before loading it into your project. The demo data is intentionally separate from official questions.
5. Implement and verify Supabase SSR auth/session helpers and replace the preview login/profile adapter before collecting account data. Never use the service-role key in browser code. RLS policies protect user-owned data.

The SQL migration covers profiles, catalogue, questions/options, tests/attempts/answers, bookmarks, planner tasks, lesson progress, flashcards, revision history and doubts. Add a reviewed importer for public educational content; no licensed content is seeded by this project.

## Environment variables

| Variable | Purpose | Required |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | No, demo mode |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable client key | No, demo mode |
| `AI_PROVIDER_API_KEY` | Future server-only doubt provider integration | No |

Never expose Supabase service-role credentials or AI provider keys to client code. No AI endpoint is enabled in this demo; doubts are answered with relevant sample explanations or a transparent setup message.

## Vercel deployment

This project is already deployed at https://neetpath-2027.vercel.app. To deploy updates from a local checkout, install the Vercel CLI, run `vercel login`, link this folder to the existing `neetpath-2027` project with `vercel link --project neetpath-2027`, then run `vercel --prod`. Vercel must have the Next.js preset and Node.js 24 selected. For automatic deployments, connect a Git repository in Vercel and push changes to its production branch.

Before enabling account-backed data, configure the environment variables in Vercel, apply the SQL migration to the intended Supabase project, wire the auth/data adapter (not included yet), and verify RLS with separate student accounts. Deploy a preview first and check routes, mobile layouts and official-source links. Revisit syllabus and exam settings only after official NTA/NMC 2027 materials are published.

## Routes and current scope

Landing, dashboard, login/signup preview, subjects/chapter lists, three sample lessons, practice filters and instant explanations, configurable timed demo test, score/review page, paper source directory, planner/focus timer, flashcards, doubts, analytics, bookmarks, profile, settings, privacy, terms, about and contact pages are implemented in the shared App Router shell. Navigation remains available on mobile via bottom navigation.

## Known limitations / next improvements

- Supabase migration is present, but live auth/session integration and database repositories still need to be wired and security-tested.
- Sample lessons are not complete expert-reviewed syllabus coverage; expand only with verified, attributed content.
- Exam rules and syllabus structure remain provisional pending official NEET UG 2027 notices.
- Paper directory points to NTA and does not host PDFs or question content.
- AI doubt answering and secure file upload are not configured.
- Automated coverage currently includes four score-calculation unit tests. Timer expiry, planner calculations and authentication/RLS still need dedicated automated coverage; live Supabase auth/data persistence is not wired.
