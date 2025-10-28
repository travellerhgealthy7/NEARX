# NEARX Backend (Identity Service Stub)

Initial NestJS service providing health, registration, and login endpoints for the NEARX platform.

## Prerequisites
- Node.js 20+
- pnpm 9+ (use `npx pnpm` if pnpm is not on your PATH)

## Setup
```bash
# Install dependencies from monorepo root
npx pnpm install
```

## Running the Service
```bash
npx pnpm --filter @nearx/backend start:dev
```
- Service listens on `http://localhost:3000/api` by default.
- Configuration is managed via `@nestjs/config` (environment variables will be wired up in later phases).

## Available Endpoints
| Method | Path                | Description                    |
|--------|---------------------|--------------------------------|
| GET    | `/api/identity/health`   | Basic service health check     |
| POST   | `/api/identity/register` | Stub user registration         |
| POST   | `/api/identity/login`    | Stub login returning fake token |

### Sample Requests
```bash
curl -X POST http://localhost:3000/api/identity/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Amit",
    "email": "amit@example.com",
    "password": "nearx123"
  }'

curl -X POST http://localhost:3000/api/identity/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "amit@example.com",
    "password": "nearx123"
  }'
```
> **Note:** Authentication logic is currently in-memory and for prototyping only. Replace with persistent storage, password hashing, and proper token issuance before production.

## Linting
```bash
npx pnpm --filter @nearx/backend lint
```
(Expect a warning about TypeScript 5.9 not being officially supported by `@typescript-eslint`; this will be addressed when pinning the repo-wide TypeScript version.)
