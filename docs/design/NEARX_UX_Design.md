# NEARX UX & Visual Experience Guide

## 1. Experience Principles
1. **Proximity-first**: Surface nearby, available options with clear distance cues.
2. **Effortless clarity**: Minimal steps, contextual helpers, progressive disclosure.
3. **Addictive delight**: Micro-interactions, tactile feedback, warm color accents.
4. **Inclusive and accessible**: WCAG 2.1 AA compliance, multilingual, high-contrast mode.
5. **Trust & safety**: Prominent verification, reviews, and eco badges.

## 2. Information Architecture

### 2.1 Customer App (React Native)
1. **Home**
   - Hero search (text + voice).
   - Quick chips: Products, Services, Food, Eco, Deals.
   - Nearby spotlight carousels (tea, trending services, favorites).
   - Smart suggestions ("Tea in 5 min", "Barber nearby open now").
2. **Products**
   - Category tabs, filters (distance, price, rating, eco, availability).
   - Map/List toggle with real-time inventory indicators.
3. **Services**
   - Map of live providers, status badges (Available, Busy, Offline).
   - Emergency CTA (highlighted) for urgent services.
4. **Food**
   - Quick reorder list, group order CTA, allergen filter chips.
   - "Tea Cart" live queue within 1 km.
5. **Appointments**
   - Calendar view for upcoming services/trials.
   - Reschedule/cancel controls, deposit status.
6. **Profile**
   - Preferences (eco-friendly toggle, price sensitivity slider, favorites manager).
   - Addresses, payment methods, wallet balance.
   - Order history, support tickets, privacy settings.

### 2.2 Merchant / Service Provider App
1. **Dashboard**: Overview cards (today's orders, revenue, ratings), alerts.
2. **Catalog / Services**: Inventory list, bulk upload, forecast hints.
3. **Slots & Calendar**: Appointment grid, availability blocks, try-before-buy slots.
4. **Orders / Requests**: Queue with proximity, ETA, delivery partner assignment status.
5. **Promotions & Analytics**: Campaign builder, KPIs, segment insights.
6. **Settings**: Profile, certifications, compliance, payout info.

### 2.3 Delivery Partner App
1. **Jobs**: Live queue, job details (pickup, drop, distance), accept/decline.
2. **Map/Navigation**: Turn-by-turn guidance, alternate route suggestions.
3. **Earnings**: Daily/weekly summaries, tips, incentives, withdrawals.
4. **Profile & Safety**: SOS, insurance info, support chat, shift planner.

### 2.4 Admin Console (Web)
- **Overview**: Platform metrics, alerts, fraud heatmaps.
- **Approvals**: Pending merchants/providers/riders, document review.
- **Operations**: Order/service monitoring, reroute controls, escalations.
- **Support**: Ticket queues, dispute chat, resolution templates.
- **Reports**: Compliance exports, financial summaries, sustainability metrics.

## 3. User Flow Highlights

### 3.1 Customer Tea Order (Quick Flow)
1. Launch app → Home quick suggestion (Tea nearby).
2. Tap suggestion → Pre-filtered list within 1 km.
3. Select vendor → customize (sugar, milk) → add to cart.
4. Checkout → choose delivery (default eco/walking if available) → confirm payment.
5. Track rider → receive order → rate vendor & rider.

### 3.2 Emergency Plumber Booking
1. Services tab → Emergency toggle.
2. Map highlights nearest available plumbers (with certification badge).
3. Choose provider → immediate slot suggestion → confirm with deposit hold.
4. Real-time tracking with ETA countdown → completion confirmation.
5. Post-service feedback + option to rebook.

### 3.3 Try-Before-Buy Home Trial
1. Product search → "Try Before Buy" filter.
2. Select product → choose trial type (home/store), slot picker.
3. Deposit authorization → merchant confirmation.
4. Delivery partner assigned → home trial occurs → convert to purchase or return.
5. Deposit adjusted → feedback on fit/experience.

### 3.4 Merchant Promotion Setup
1. Dashboard → Promotions → New Campaign.
2. Select goal (increase eco orders) → choose discount/offer format.
3. Define audience radius, schedule, budget.
4. Preview UI placement → launch.
5. Analytics screen tracks performance, conversion.

### 3.5 Delivery Partner SOS
1. During route, partner taps SOS.
2. Confirmation prompt → dispatch + emergency contacts notified.
3. Live location pinned → incident log created.
4. Post-event report flow with insurance linkage.

## 4. Visual Design System

### 4.1 Branding & Color Palette
- **Primary**: NearX Teal (#00B8A9) – energy, freshness.
- **Secondary**: Warm Coral (#FF6F61) for call-to-action accent.
- **Support**: Midnight Navy (#1B2A4B), Soft Gray (#F4F6F8), Eco Green (#6AB547) for sustainability badges.
- **Status Colors**: Success (#22C55E), Warning (#F59E0B), Danger (#EF4444), Info (#3B82F6).
- **Gradients**: Teal-to-Coral diagonal for hero banners.

### 4.2 Typography
- **Primary Font**: "Inter" (system fallback: Roboto/SF Pro).
- **Display**: Bold weights for headers, 24-36pt.
- **Body**: Regular 16-18pt; high contrast.
- **Numerics**: Tabular lining for metrics.

### 4.3 Components & Patterns
- Rounded cards with soft shadows for content modules.
- Floating action button (FAB) for quick actions (e.g., emergency, reorder).
- Micro interactions: subtle scale on tap, haptic feedback on confirmations.
- Skeleton loaders for data fetch states.
- Empty states with community illustrations; encourage action.

### 4.4 Accessibility & Inclusivity
- Color contrast ratios ≥ 4.5:1 for text.<br>
- Dynamic text resizing support up to 200%.
- Screen reader labels for key actions.
- Multilingual support (English, Nepali, Hindi) with RTL readiness.
- High-contrast mode toggle using Midnight Navy background and Teal accents.

## 5. Screen Blueprint Summary

### Customer App Key Screens
1. **Onboarding & Preferences**: Progressive setup for eco toggle, price sensitivity, favorite categories.
2. **Home Feed**: Search bar, personalized carousels, eco badges.
3. **Search Results (Products/Services)**: Map/list toggle, filter drawer, rating chips.
4. **Product Detail**: Inventory status, distance, delivery options, try-before-buy CTA.
5. **Service Detail**: Provider bio, certifications, schedule, travel radius.
6. **Cart & Checkout**: Multi-merchant breakdown, split payments, deposit info.
7. **Tracking**: Real-time map, status timeline, contact options.
8. **Appointments**: Calendar with color-coded status; reschedule flow.
9. **Support Center**: FAQ, chat, escalate button, multilingual toggle.

### Merchant / Provider Screens
1. **Analytics Dashboard**: Metrics cards, trend charts, eco-impact stats.
2. **Inventory Editor**: List with inline edits, stock alerts.
3. **Order Queue**: Proximity indicator, assign delivery partner.
4. **Calendar**: Drag-and-drop availability adjustments.
5. **Promotion Creator**: Wizard with preview.
6. **Reviews Manager**: Filter by rating, respond with templates.

### Delivery Partner Screens
1. **Job Details**: Pickup/drop map, distance, earnings, safety notes.
2. **Navigation View**: Turn-by-turn, hazard alerts, eco-route suggestions.
3. **Earnings Dashboard**: Goals, badges, daily breakdown.
4. **Safety & Support**: SOS, insurance claims, training resources.

### Admin Console Screens
1. **Platform Overview**: KPI cards, incident feed, map heatmap.
2. **Approval Queue**: Document viewer, risk score.
3. **Dispute Desk**: Conversation timeline, resolution controls.
4. **Fraud Analytics**: Suspicious patterns, machine learning alerts.
5. **Compliance Reports**: Export templates, localization settings.

## 6. Interactions & Motion Guidelines
- **Motion style**: Fast (150-250ms), easing-out transitions.
- **Loading states**: Animated dots or distance radial progress.
- **Achievement badges**: Confetti animation for milestones (eco deliveries, top-rated providers).
- **AR Try-on prompt**: Smooth overlay transition with camera fade-in.

## 7. Content & Tone
- **Voice**: Friendly, empowering, community-centric.
- **Copy cues**: Highlight proximity and sustainability (“2 minutes away”, “Delivered via Foot Courier”).
- **Empty states**: Encourage local discovery (“No results within 2 km — expand or invite a neighbor shop!”).
- **Notifications**: Contextual and actionable (“An eco rider accepted your order. Track now”).

## 8. Design Deliverables Checklist
- [ ] High-fidelity mobile mockups (Dark & Light mode).
- [ ] Component library in Figma (buttons, cards, modals, badges).
- [ ] Interactive prototypes for key flows (ordering, booking, tracking).
- [ ] UX writing guidelines and localization samples.
- [ ] Accessibility audit checklist.
- [ ] Usability testing plan for beta rollout.

---
_Last updated: 2025-10-28_
