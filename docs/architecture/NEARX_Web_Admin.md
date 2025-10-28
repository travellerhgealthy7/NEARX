# NEARX Web Admin Prototype

## Overview
Initial Next.js 14 app wired to the shared API client to interact with the Identity service for authentication prototyping.

## Running Locally
```bash
# From repository root
npx pnpm install
npx pnpm --filter @nearx/backend start:dev  # start backend stub
npx pnpm --filter @nearx/web dev            # launch Next.js app
```

## Features Implemented
- **Authentication Playground**: `/` route includes a form that:
  - Accepts API base URL, email, and password.
  - Calls the identity service via `@nearx/api-client`.
  - Displays friendly status messages and token responses.
- **Shared Client Package**: `packages/api-client` provides typed helpers using Axios + Zod validation.
- **Linting**: `npx pnpm --filter @nearx/web lint` (Next.js lints pass; expect TypeScript 5.9 warning until repo version is pinned).

## Next Steps
1. Replace in-memory identity logic with persistent store + JWT.
2. Extend admin UI for onboarding status dashboards, merchant approvals, and dispute queues.
3. Add integration tests (Playwright/Cypress) covering login flows and error states.
4. Introduce theming and layout scaffolds aligned with NEARX design guidelines.
5. Wire authentication result to global state and gate future admin pages.
