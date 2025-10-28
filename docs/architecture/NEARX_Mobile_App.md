# NEARX Mobile Admin Prototype

## Overview
Expo (React Native) application using the shared `@nearx/api-client` package to exercise the Identity service login flow on mobile.

## Running Locally
```bash
npx pnpm install
npx pnpm --filter @nearx/backend start:dev  # start backend stub
npx pnpm --filter @nearx/mobile start       # open Expo dev server
```
- Use Expo Go or an emulator to load the app.
- Default API base URL is `http://localhost:3000/api`; adjust for device/emulator network access (e.g., replace `localhost` with machine IP when testing on physical devices).

## Features Implemented
- Authentication form requesting API base URL, email, and password.
- Calls Identity service through `@nearx/api-client` and displays resulting status/token.
- Responsive styling suitable for small screens; token text is selectable for debugging.

## Validation & Linting
- TypeScript strict checks via `npx tsc --project apps/mobile/tsconfig.json --noEmit`.
- Dedicated lint script TBD; consider integrating `expo-doctor` or `eslint` with React Native presets.

## Next Steps
1. Connect login flow to future global auth context and route guards.
2. Add deep-linking support and secure storage for session token.
3. Implement biometric/OTP enhancements aligned with product requirements.
4. Expand screens for merchant/service onboarding dashboards once backend endpoints mature.
