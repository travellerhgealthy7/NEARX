# NEARX API, Integration & Realtime Specification

## 1. API Strategy Overview
- **Gateway**: Single API gateway exposing REST and GraphQL endpoints; supports rate limiting, JWT validation, request tracing.
- **Versioning**: URI-based versioning for REST (`/v1/...`); schema-mediated evolution for GraphQL.
- **Standards**: JSON payloads, UTF-8, camelCase fields. Use gRPC for inter-service comms where low latency is required.
- **Auth**: OAuth2 + JWT for customers, merchants, providers, riders; admin via SSO + RBAC. Refresh tokens managed securely.
- **Error Format**:
```
{
  "error": {
    "code": "string",
    "message": "human readable",
    "details": [ { "field": "name", "issue": "required" } ]
  }
}
```

## 2. Core REST Endpoints (Representative)

### 2.1 Authentication & Users
- `POST /v1/auth/otp/request`
- `POST /v1/auth/otp/verify`
- `POST /v1/auth/token/refresh`
- `GET /v1/users/me`
- `PATCH /v1/users/me` (update profile/preferences)

### 2.2 Discovery & Search
- `GET /v1/search/products` (params: lat, lon, radius, filters)
- `GET /v1/search/services`
- `GET /v1/search/food`
- `GET /v1/recommendations/home`

### 2.3 Catalog & Inventory
- `GET /v1/shops/{shopId}`
- `GET /v1/shops/{shopId}/products`
- `POST /v1/shops/{shopId}/products` (merchant authenticated)
- `PATCH /v1/products/{productId}`
- `GET /v1/providers/{providerId}/services`

### 2.4 Cart & Orders
- `POST /v1/carts/current/items`
- `PATCH /v1/carts/current/items/{itemId}`
- `POST /v1/carts/current/checkout`
- `POST /v1/orders` (creates order from cart)
- `GET /v1/orders/{orderId}`
- `POST /v1/orders/{orderId}/cancel`

### 2.5 Services & Appointments
- `GET /v1/services/{serviceId}/availability`
- `POST /v1/appointments`
- `PATCH /v1/appointments/{appointmentId}`
- `POST /v1/appointments/{appointmentId}/complete`

### 2.6 Try-Before-Buy
- `GET /v1/products/{productId}/trial-options`
- `POST /v1/trials`
- `PATCH /v1/trials/{trialId}` (status updates)

### 2.7 Delivery Logistics
- `POST /v1/deliveries/assign`
- `GET /v1/deliveries/{deliveryId}`
- `POST /v1/deliveries/{deliveryId}/events`
- `POST /v1/deliveries/{deliveryId}/sos`

### 2.8 Payments & Wallet
- `POST /v1/payments/payment-intent`
- `POST /v1/payments/{paymentId}/confirm`
- `POST /v1/payments/{paymentId}/refund`
- `GET /v1/wallet`
- `POST /v1/wallet/withdraw`

### 2.9 Reviews & Support
- `POST /v1/reviews`
- `GET /v1/reviews?targetId=`
- `POST /v1/reviews/{reviewId}/responses`
- `POST /v1/support/tickets`
- `PATCH /v1/support/tickets/{ticketId}`

### 2.10 Admin APIs
- `GET /v1/admin/approvals?status=pending`
- `POST /v1/admin/approvals/{entityId}/decision`
- `GET /v1/admin/fraud/alerts`
- `POST /v1/admin/disputes/{disputeId}/resolve`

## 3. GraphQL Schema Highlights
- **Query**: `nearbyProducts`, `nearbyServices`, `teaCart`, `userPreferences`, `order(id)`.
- **Mutation**: `createOrder`, `bookService`, `scheduleTrial`, `updatePreference`, `submitReview`.
- Use data loaders to batch DB calls; apply complexity limits per request.

## 4. WebSocket & Realtime Channels
- **Channels**:
  - `order.{orderId}`: status updates, ETA, delivery partner location.
  - `delivery.{deliveryId}`: route updates, SOS alerts.
  - `support.ticket.{ticketId}`: live chat messages.
  - `admin.alerts`: fraud/emergency feeds.
- **Protocol**: Socket.IO or native WebSocket + JWT handshake.
- **Fallbacks**: SSE for browsers without WebSocket support.

## 5. Third-Party Integrations
- **Maps (Google/Mapbox)**:
  - Geocoding API → standardized addresses.
  - Distance Matrix API → travel time estimates.
  - Directions API → delivery routing.
- **Payments**:
  - Stripe: card processing, subscription billing for merchants.
  - Khalti/eSewa/PhonePe: local wallets; use webhooks for status updates.
- **Messaging**: Twilio/Sinch for SMS OTP; SendGrid/Mailgun for email.
- **Push Notifications**: Firebase Cloud Messaging (FCM) for Android/web, APNs for iOS.
- **AR Try-on**: Integrate SDK (e.g., Banuba) via native modules; ensure device compatibility checks.
- **Analytics & Monitoring**: Mixpanel, GA4, Sentry (DSN integration), Prometheus exporters.

## 6. Event Contracts (Kafka/RabbitMQ)
- `order.created`
```
{
  "orderId": "uuid",
  "userId": "uuid",
  "items": [ { "shopId": "uuid", "type": "product", "itemId": "uuid", "quantity": 2 } ],
  "totalAmount": 58.50,
  "ecoDelivery": true,
  "timestamp": "2025-10-28T08:30:00Z"
}
```
- `delivery.assigned`
- `delivery.sos_triggered`
- `appointment.confirmed`
- `trial.requested`
- `review.submitted`
- `payment.refunded`
- `fraud.alert`

Include schema registry (Confluent/Redpanda) for version control.

## 7. Webhooks
- **Merchant Order Webhook**: Notify merchants using external POS/EPR.
  - Event: `order_assigned`, `order_cancelled`.
  - Signature: HMAC SHA256 with shared secret; include `X-NearX-Signature` header.
- **Delivery Partner Providers**: For third-party fleets; events `delivery_created`, `delivery_cancelled`.
- **Admin Integrations**: Compliance bodies (e.g., data export to regulators) via secure SFTP.

## 8. Security Considerations
- Enforce OAuth scopes per role (customer, merchant, rider, admin).
- Input validation with centralized library; sanitize user-generated content.
- Rate limits per IP/user; dynamic throttling for abusive patterns.
- Audit logging for admin and financial actions.
- Webhooks verified via signature & replay protection (timestamp check).

## 9. Performance & Reliability
- Use CDN for static assets (Next.js pre-rendered pages, images).
- Apply circuit breakers and retries with exponential backoff for outbound integrations.
- Cache frequent reads (e.g., shop details) with Redis + cache invalidation via events.
- API latency targets: P95 < 300ms for read endpoints, < 500ms for write.

## 10. Testing & Documentation
- Contract tests using Pact (consumer-driven) for each service integration.
- API documentation via OpenAPI 3.1 (Swagger UI) and GraphQL schema docs.
- Load tests on critical endpoints (checkout, matching) using Locust/K6.
- Smoke tests for webhooks and realtime channels in staging before production deploy.

---
_Last updated: 2025-10-28_
