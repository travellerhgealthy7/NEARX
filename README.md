# NEARX Platform Monorepo

Unified codebase for **NEARX — The Local Everything Platform**, delivering hyper-local products, on-demand services, and try-before-buy experiences across Android, iOS, and Web.

## Repository Structure
```
NEARX/
├── apps/                # Application entry points (backend services, web, mobile)
├── packages/            # Shared libraries and tooling (utilities, configs, SDKs)
├── docs/                # Product, design, and architecture documentation
├── scripts/             # Automation scripts (CI, tooling, migrations)
└── README.md
```

## Getting Started
1. **Install Prerequisites**
   - Node.js 20+
   - pnpm 9+
   - Python 3.11 (for tooling/scripts)
   - Docker & Docker Compose

2. **Clone & Bootstrap**
```bash
pnpm install
```
_(Detailed setup steps will be added as services/apps are introduced.)_

## Documentation
Key documents live under `docs/`:
- Product requirements: `docs/product/NEARX_PRD.md`
- UX & visual system: `docs/design/NEARX_UX_Design.md`
- Architecture & data design: `docs/architecture/`

## Roadmap & Status
Implementation follows the phased roadmap defined in `docs/architecture/NEARX_NFR_and_Roadmap.md`. Active development tasks will be tracked via project management tooling (TBD).

## Guiding Principle
> **Proximity is the new power.**
Every feature should prioritize nearby, available, and sustainable options for our users.
