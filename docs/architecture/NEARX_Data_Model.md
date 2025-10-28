# NEARX Data Model & Schema Design

## 1. Database Overview
- **Primary DB**: PostgreSQL 15 with PostGIS extension for geospatial queries.
- **Partitioning Strategy**: Geographic partitioning (city/region) using table inheritance or Citus for distributed scaling.
- **Naming Convention**: snake_case table and column names, pluralized table names.
- **Key Types**: UUID primary keys (generated via `uuid_generate_v4()`); timestamps in UTC.
- **Indexes**: B-tree for standard queries; GIST/GIN for geospatial and JSONB fields.

## 2. Core Tables

### 2.1 Users & Profiles
- `users`
  - id (uuid, pk)
  - phone_number (varchar, unique)
  - email (varchar, unique, nullable)
  - role (enum: customer, merchant, provider, rider, admin)
  - status (enum: active, suspended, pending)
  - last_login_at (timestamptz)
  - created_at, updated_at
- `user_profiles`
  - user_id (uuid, pk, fk users)
  - first_name, last_name
  - avatar_url
  - language_preference (enum)
  - date_of_birth (date, nullable)
  - gender (enum, optional)
- `addresses`
  - id (uuid, pk)
  - user_id (uuid, fk users)
  - label (home/work/other)
  - street, city, state, postal_code, country
  - location (geography(Point, 4326))
  - is_primary (boolean)

### 2.2 Preferences & Settings
- `preferences`
  - user_id (uuid, pk)
  - eco_friendly (boolean)
  - price_sensitivity (smallint 0-10)
  - favorites (uuid[] referencing shops/providers)
  - notification_settings (jsonb)

### 2.3 Merchant & Provider Entities
- `shops`
  - id (uuid, pk)
  - owner_id (uuid, fk users)
  - name, description
  - category (enum: retail, food, service, mixed)
  - location (geography(Point, 4326))
  - service_radius_meters (int)
  - rating_avg (numeric)
  - rating_count (int)
  - status (enum: pending, active, suspended)
  - verification_status (enum: unverified, pending, verified)
- `service_providers`
  - id (uuid, pk)
  - user_id (uuid, fk users)
  - primary_shop_id (uuid, fk shops, nullable)
  - skills (text[])
  - certifications (jsonb)
  - rating_avg, rating_count
  - travel_modes (text[]: foot, bike, car)
  - service_radius_meters
  - availability_status (enum: online, offline, busy)

### 2.4 Inventory & Services
- `product_categories`
  - id (uuid, pk)
  - parent_id (uuid, fk self, nullable)
  - name, slug
- `products`
  - id (uuid, pk)
  - shop_id (uuid, fk shops)
  - name, description
  - base_price (numeric)
  - sku, barcode (nullable)
  - images (text[])
  - try_before_buy_enabled (boolean)
  - ar_model_url (text, nullable)
  - status (enum: active, inactive)
- `product_inventory`
  - id (uuid, pk)
  - product_id (uuid, fk products)
  - quantity (int)
  - updated_at (timestamptz)
  - restock_threshold (int)
  - dynamic_pricing_meta (jsonb)
- `services`
  - id (uuid, pk)
  - provider_id (uuid, fk service_providers)
  - name, description
  - base_price (numeric)
  - category_id (uuid, fk product_categories or service_categories)
  - duration_minutes (int)
  - emergency_available (boolean)
  - certifications_required (text[])

### 2.5 Food & Tea Specific
- `food_items`
  - id (uuid, pk)
  - shop_id (uuid, fk shops)
  - name, description
  - price (numeric)
  - stock (int)
  - prep_time_minutes (int)
  - allergens (text[])
  - customization_options (jsonb)
- `tea_orders`
  - id (uuid, pk)
  - user_id (uuid, fk users)
  - shop_id (uuid, fk shops)
  - quantity (int)
  - status (enum: pending, preparing, ready, delivered, cancelled)
  - pickup_time (timestamptz)
  - customization (jsonb)

### 2.6 Orders & Bookings
- `carts`
  - id (uuid, pk)
  - user_id (uuid, fk users)
  - status (enum: open, checked_out, abandoned)
  - created_at, updated_at
- `cart_items`
  - id (uuid, pk)
  - cart_id (uuid, fk carts)
  - item_type (enum: product, food_item, service)
  - item_id (uuid)
  - quantity (int)
  - price_snapshot (numeric)
  - metadata (jsonb)
- `orders`
  - id (uuid, pk)
  - user_id (uuid, fk users)
  - total_amount (numeric)
  - payment_status (enum: pending, authorized, captured, refunded, failed)
  - fulfillment_type (enum: delivery, pickup, in_store)
  - status (enum: created, accepted, in_progress, completed, cancelled)
  - eco_delivery (boolean)
  - created_at, updated_at
- `order_items`
  - id (uuid, pk)
  - order_id (uuid, fk orders)
  - shop_id (uuid)
  - item_type (enum)
  - item_id (uuid)
  - quantity
  - price
  - status (enum: pending, fulfilled, cancelled)
- `appointments`
  - id (uuid, pk)
  - provider_id (uuid)
  - user_id (uuid)
  - service_id (uuid)
  - scheduled_at (timestamptz)
  - status (enum: pending, confirmed, in_progress, completed, cancelled)
  - emergency_flag (boolean)
  - deposit_amount (numeric)
- `trials`
  - id (uuid, pk)
  - product_id (uuid)
  - shop_id (uuid)
  - user_id (uuid)
  - slot_time (timestamptz)
  - type (enum: in_store, home_trial)
  - status (enum: requested, confirmed, in_transit, completed, cancelled)
  - deposit_amount (numeric)
  - return_condition (enum: pending, ok, damaged)

### 2.7 Delivery & Logistics
- `delivery_partners`
  - id (uuid, pk)
  - user_id (uuid, fk users)
  - vehicle_type (enum: foot, bike, scooter, car, EV)
  - availability_status (enum: online, offline, on_trip)
  - rating_avg, rating_count
  - insurance_policy (jsonb)
- `deliveries`
  - id (uuid, pk)
  - order_id (uuid, fk orders)
  - partner_id (uuid, fk delivery_partners)
  - status (enum: assigned, picked_up, en_route, delivered, cancelled)
  - eta (timestamptz)
  - distance_meters (int)
  - tracking_url (text)
  - route_polyline (text)
  - proof_of_delivery (jsonb)
- `delivery_events`
  - id (bigserial, pk)
  - delivery_id (uuid, fk deliveries)
  - event_type (enum: status_change, location_update, sos_triggered)
  - payload (jsonb)
  - recorded_at (timestamptz)

### 2.8 Reviews & Feedback
- `reviews`
  - id (uuid, pk)
  - transaction_id (uuid)
  - transaction_type (enum: order, service, delivery, trial)
  - reviewer_id (uuid, fk users)
  - target_id (uuid) // shop, provider, partner
  - rating (smallint 1-5)
  - comment (text)
  - media_urls (text[])
  - status (enum: pending_moderation, published, flagged)
  - created_at
- `review_responses`
  - id (uuid, pk)
  - review_id (uuid, fk reviews)
  - responder_id (uuid)
  - comment
  - created_at

### 2.9 Payments & Wallet
- `payment_methods`
  - id (uuid, pk)
  - user_id (uuid)
  - provider (enum: stripe, khalti, esewa, phonepe, wallet)
  - token (text encrypted)
  - last4 (varchar)
  - is_default (boolean)
- `payment_transactions`
  - id (uuid, pk)
  - order_id (uuid)
  - type (enum: authorization, capture, refund, payout)
  - amount (numeric)
  - status (enum: pending, succeeded, failed)
  - gateway_reference (text)
  - metadata (jsonb)
  - processed_at
- `wallet_accounts`
  - user_id (uuid, pk)
  - balance (numeric)
  - currency (varchar)
- `wallet_transactions`
  - id (uuid, pk)
  - wallet_user_id (uuid)
  - type (enum: credit, debit, cashback)
  - amount
  - description
  - related_order_id (uuid, nullable)
  - created_at

### 2.10 Support & Compliance
- `support_tickets`
  - id (uuid, pk)
  - user_id (uuid)
  - subject, description
  - status (enum: open, in_progress, resolved, escalated)
  - priority (enum: low, medium, high, urgent)
  - assigned_to (uuid, fk admin user)
- `disputes`
  - id (uuid, pk)
  - transaction_id (uuid)
  - reason (enum)
  - status (enum: open, investigating, resolved, refunded)
  - resolution_notes
- `compliance_documents`
  - id (uuid, pk)
  - entity_type (shop, provider, rider)
  - entity_id (uuid)
  - document_type (license, insurance, id_proof)
  - file_url
  - status (enum: pending_review, approved, rejected)
  - verified_by (uuid, admin)
  - verified_at

## 3. Data Relationships Diagram (Textual)
```
users --< addresses
users --1 preferences
users --< shops
users --< service_providers
shops --< products --1 product_inventory
shops --< food_items
service_providers --< services
users --< carts --< cart_items
users --< orders --< order_items
orders --1 deliveries --< delivery_events
orders --< payment_transactions
users --< appointments
products --< trials
orders/services/deliveries --< reviews --< review_responses
users --< support_tickets
transactions --< disputes
```

## 4. Geospatial & Matching Considerations
- Use `ST_DWithin` for 2 km radius matching; index `location` columns with GIST.
- Pre-compute `geo_hash` using H3 (resolution 9-10) for fast approximate lookup.
- Store travel modes to determine effective radius and routing type.
- Maintain `availability_slots` in JSONB with time windows; consider separate table if high write volume.

## 5. Analytics & ML Data Pipelines
- Capture events via Kafka topics (`orders.events`, `deliveries.events`, `reviews.events`).
- Stream into data warehouse via ETL (Fivetran/DBT) for aggregation.
- Feature store tables for personalization (user preferences history, order frequency, average ticket size).
- Sustainability metrics table capturing emission savings per delivery.

## 6. Data Governance
- PII stored in encrypted columns; access via service accounts with row-level security where needed.
- GDPR compliance: data deletion requests propagate to dependent tables via soft-delete flag + async purge.
- Audit tables capturing changes to critical entities (shops, providers, payouts).

---
_Last updated: 2025-10-28_
