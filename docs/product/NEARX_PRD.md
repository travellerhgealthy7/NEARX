# NEARX Product Requirements Document (PRD)

## 1. Vision & Goals
- **Vision**: Create a unified local commerce and services platform that brings every product and service within a 2 km radius to users, prioritizing proximity, availability, sustainability, and delightful experiences.
- **Tagline**: "NearX: Everything Local, Effortlessly Yours."
- **Principle**: Proximity is the new power — every technical and UX decision should favor nearby, rapidly available options.

### 1.1 Strategic Objectives
1. **Hyper-local fulfillment**: Ensure >85% of orders and bookings are matched within a 2 km radius.
2. **Sustainable operations**: Promote eco-friendly delivery options; target 40% low-emission or walking deliveries for short-distance fulfillment.
3. **Inclusive platform growth**: Onboard diverse local merchants, service providers, and delivery partners with accessible tooling.
4. **Delightful experience**: Deliver addictive UI/UX that fosters trust, repeat engagement, and community loyalty.
5. **Operational excellence**: Build for scalability (1,000 to 1,000,000+ users), security, and reliability (99.9% uptime target).

### 1.2 Success Metrics
- GMV, order volume, and service bookings per geography.
- Customer NPS (target ≥ 60) and repeat usage rate (≥ 45% monthly repeat).
- Merchant/service provider retention rate (>80% after 3 months).
- Delivery completion time (median <25 minutes for food/tea; <60 minutes for on-demand services).
- Eco-friendly delivery adoption (≥40% for applicable radius).
- Dispute resolution time (median <12 hours).
- App performance KPIs: median app launch <3s, interaction latency <100ms, crash-free sessions ≥99.5%.

## 2. User Personas & Needs

### 2.1 Customer
- **Profile**: Urban dwellers, office workers, students, families seeking convenience.
- **Goals**: Quickly find and receive local products and services; manage preferences and schedules; trust platform.
- **Pain points**: Fragmented local options, unreliable delivery, lack of eco choices, limited personalization.
- **Key Needs**:
  - Nearby discovery with distance, price, and sustainability filters.
  - Seamless checkout (digital + COD + wallet).
  - Appointment management (services, trials).
  - Reorder and recommendations.
  - Transparent tracking and support.

### 2.2 Merchant / Shop
- **Profile**: Local retailers, boutiques, grocers, electronics sellers, cafés.
- **Goals**: Digitize inventory, reach nearby customers, manage orders, gain insights.
- **Pain points**: Complex onboarding, inventory sync, limited marketing reach.
- **Key Needs**:
  - Easy registration, verification, and catalog upload.
  - Order and delivery coordination.
  - Promotional tools and analytics.
  - Schedule management for try-before-buy.
  - Compliance support.

### 2.3 Service Provider
- **Profile**: Barbers, plumbers, electricians, tutors, cleaners, mechanics.
- **Goals**: Showcase skills, manage bookings, optimize travel radius, verify credentials.
- **Pain points**: Scheduling conflicts, travel inefficiencies, trust-building.
- **Key Needs**:
  - Live availability toggles and schedule control.
  - Certification uploads and verification status.
  - Service radius and travel mode preferences.
  - Reviews and customer communication.

### 2.4 Delivery Partner / Rider
- **Profile**: Foot couriers, bike riders, EV drivers.
- **Goals**: Maximize earnings, ensure safety, manage routes.
- **Pain points**: Unpredictable demand, unsafe situations, lack of insurance.
- **Key Needs**:
  - Job queue and route optimization.
  - SOS, insurance information, and safety alerts.
  - Earnings dashboard (tips, incentives).
  - Availability toggles and performance insights.

### 2.5 Admin
- **Profile**: Platform operations, compliance, support staff.
- **Goals**: Maintain platform health, manage disputes, ensure compliance.
- **Pain points**: Fraud detection, manual review workload.
- **Key Needs**:
  - Approval workflows for merchants/providers/delivery partners.
  - Analytics dashboards, fraud monitoring.
  - Dispute management tools and audit trails.
  - Content moderation (reviews, media).

## 3. Use Cases & User Journeys

### 3.1 Core Scenarios
1. **Tea Order (Quick Food)**
   - Discover nearby tea stalls within 1 km, add customizations, track delivery, handle fallback pickup when no rider.
2. **On-demand Plumbing Service**
   - Locate available plumber within 1.5 km, confirm emergency or scheduled booking, track arrival and service completion, process post-service payment.
3. **Try-Before-Buy Home Trial**
   - Reserve jacket in specific size for home trial, handle deposit, schedule delivery partner handoff, manage feedback and potential purchase.
4. **Multi-Service Bundle**
   - Order groceries and book a cleaner simultaneously, coordinate deliveries/providers, optimize bundling where possible.
5. **Merchant Promotion Campaign**
   - Merchant launches a discount for eco-friendly delivery customers, monitors uptake via analytics dashboard.
6. **Delivery Partner Safety Incident**
   - Partner triggers SOS, dispatch receives live location, documentation generated for insurance integration.
7. **Admin Fraud Review**
   - Admin receives flag for unusual order pattern, investigates through analytics and decides action.

### 3.2 Detailed User Flow Summaries
- **Customer**: Onboarding → preferences setup (eco-friendly, price sensitivity, favorites) → browse/search by proximity → filter by rating, allergen, sustainability → add to cart → multi-shop checkout with split payments/wallet → live tracking → rate transaction → manage disputes/support.
- **Merchant/Service Provider**: Registration with category selection → KYC & certification upload → inventory/service list setup → availability slots → order/booking acceptance → coordinate delivery or service → view analytics and manage promotions → respond to reviews.
- **Delivery Partner**: Sign-up with vehicle type & documents → toggle availability → receive job matching based on proximity, load, and safety compliance → navigate with optimized routing → capture proof of delivery → monitor earnings and incentives.
- **Admin**: Review pending approvals → track system metrics (orders, cancellations, fraud alerts) → manage disputes via chat/escalation → generate compliance and health reports.

## 4. Feature Requirements

### 4.1 Customer App
- Home feed with personalized, proximity-weighted recommendations.
- Tabbed navigation: Home, Products, Services, Food, Appointments, Profile.
- Offline mode with cached nearby options.
- Voice search, accessibility features (screen reader, high contrast).
- Multi-merchant cart with smart split and distance-based pricing.
- Tea/Food quick order (customizations, allergen filters, group orders).
- Service booking with availability calendar and emergency priority.
- Try-before-buy appointments (in-store and home trial) with deposit handling.
- Real-time order/tracking via WebSockets or Firebase.
- Preferences management (eco-friendly toggle, price sensitivity slider, favorites list).
- Ratings & reviews with photo/video upload; dispute handling.
- Wallet integration, split payments, refund automation.

### 4.2 Merchant / Service Provider App
- Unified React Native experience.
- Dashboard summarizing orders, bookings, cancellations, revenue.
- Inventory/service management with bulk upload and forecasting hints.
- Time-slot management (appointments, trials, service scheduling).
- Live order acceptance with integration to delivery partner assignment.
- Promotion builder (discounts, bundles, ad placements).
- Analytics on trends, inventory forecasts, customer segments.
- Review management (responses, dispute flags).
- Accounting tool integrations (export reports).
- Verification center for licenses/certifications.

### 4.3 Delivery Partner App
- Job queue sorted by proximity, earnings potential, safety.
- Navigation integration (Mapbox/Google Maps) with route optimization.
- Availability toggle and shift planning.
- SOS/emergency workflow with escalation contacts.
- Proof-of-delivery capture (photos, signatures, QR scan).
- Insurance integration info & claims history.
- Earnings dashboard with payouts, tips, incentives.

### 4.4 Admin Console (Web)
- Role-based access (operations, compliance, support).
- Approval queues (merchants, service providers, delivery partners).
- Dispute resolution tools with chat logs and refunds.
- Fraud monitoring (flags, anomaly detection dashboards).
- System health metrics (orders, uptime, errors, eco-delivery rates).
- Content moderation (reviews, media uploads).
- Report generation (platform health, compliance, financial).

### 4.5 Core Platform Features
- **Smart Matching Engine** combining distance, availability, rating, load, price, preferences, and personalization ML.
- **Real-time tracking** for deliveries, services, and try-before-buy logistics.
- **Payment orchestration** supporting digital wallets, cards, COD, split payments, refunds.
- **Notification system** (push, SMS, email) driven by Firebase/FCM and message queues.
- **Customer support suite**: multilingual chat, FAQ bot, escalation handling.
- **Security & privacy**: OTP login, optional KYC, 2FA, privacy settings (mask address until confirmed), GDPR/CCPA compliance.
- **Sustainability layer**: eco-friendly option surfacing, partner categorization, emissions tracking.

## 5. Functional Requirements by Module

| Module | Key Features | Priority |
| --- | --- | --- |
| Discovery & Search | Geo-aware search, filters for distance/rating/price/sustainability/allergens, voice search, offline fallback | P0 |
| Cart & Checkout | Multi-merchant handling, split payments, wallet, COD, refund automation | P0 |
| Matching Engine | Unified scoring, dynamic radius fallback, ML personalization | P0 |
| Order & Booking Management | Real-time status, rerouting, emergency service handling | P0 |
| Try-Before-Buy | Slot booking, deposits, home trial logistics, AR try-on integration | P1 |
| Analytics & Promotions | Dashboards, forecasts, promotions builder | P1 |
| Reviews & Social | Verified reviews, media uploads, merchant responses, social referrals | P1 |
| Support & Disputes | In-app chat, knowledge base, admin escalation | P0 |
| Security & Compliance | OTP, 2FA, KYC, privacy settings, fraud detection | P0 |
| Sustainability | Eco-delivery categorization, user preferences, emissions reporting | P1 |

## 6. Non-Functional Requirements (Summary)
- **Performance**: sub-3s load, <100ms interactions, real-time updates <2s latency.
- **Reliability**: 99.9% uptime, graceful degradation, automated retries.
- **Scalability**: Horizontal scaling via microservices, queue-based decoupling, geo sharding.
- **Security**: Encryption in transit/at rest, strict access control, compliance with GDPR/CCPA, data localization where required.
- **Accessibility**: WCAG 2.1 AA compliance, localization, high contrast mode.
- **Sustainability**: Track eco deliveries and optimize routes for reduced emissions.

## 7. Dependencies & Integrations
- **Maps**: Google Maps / Mapbox for geocoding, routing, live tracking.
- **Payments**: Stripe, Khalti, eSewa, PhonePe, platform wallet.
- **Realtime**: Firebase (FCM) or WebSockets infrastructure.
- **Analytics**: Mixpanel, Google Analytics, Sentry for monitoring.
- **Messaging**: SMS/email providers for OTP and notifications.
- **AR/Virtual Try-on**: Third-party SDKs (e.g., Banuba, Snap AR) for compatible devices.

## 8. Risks & Mitigations
- **Merchant adoption**: Provide streamlined onboarding, multilingual support, and incentives.
- **Service reliability**: Implement fallback matching, proactive notifications, and backup options.
- **Regulatory constraints**: Maintain updated compliance matrix, legal reviews per region.
- **Data privacy**: Robust encryption, privacy controls, regular audits.
- **Scaling logistics**: Early investment in routing optimization and delivery partner engagement.
- **User trust**: Verified reviews, dispute resolution, transparent policies.

## 9. Roadmap (High-Level)
1. **Foundation (Months 0-3)**: Core platform setup, customer/merchant onboarding flows, basic matching, product orders, payment integration.
2. **Services Layer (Months 3-5)**: Service provider booking, live availability, emergency handling.
3. **Delivery Ecosystem (Months 4-6)**: Delivery partner app, routing, SOS, insurance.
4. **Try-Before-Buy & AR (Months 5-7)**: Slot management, deposits, AR try-on pilot.
5. **Analytics & Promotions (Months 6-8)**: Merchant dashboards, promotion tools, ML personalization MVP.
6. **Optimization & Scale (Months 7-12)**: Sustainability analytics, loyalty program, community features, multi-region scaling.

## 10. Approval & Stakeholders
- **Product**: Product Lead, UX Lead.
- **Engineering**: Backend, Frontend (Web and React Native), DevOps.
- **Operations**: Merchant success, delivery partner ops, customer support.
- **Compliance & Legal**: Regional compliance officers.
- **Design**: UI/UX team, brand strategist.

---
_Last updated: 2025-10-28_
