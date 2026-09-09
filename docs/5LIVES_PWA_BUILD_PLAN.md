# 5lives — complete PWA build plan for Codex

Date: 9 September 2026  
Status: implementation specification and proposed delivery sequence; no application implementation or deployment is represented as complete.  
Working directory: `/Users/abhay/Desktop/5LIVES`

## 1. Objective and authority

Build Five Lives, referred to here as **5lives**, as an inviting, mobile-first, installable progressive web app. Help people choose five specific experiences they have deferred, start with one, join a suitable hosted group, complete a real experience, and keep tangible evidence of it.

Lead with: **“Finally make room for this part of yourself.”**

Use these sources in order:

1. The user's latest instructions, including the explicit PWA requirement.
2. `docs/PROJECT_CONTEXT.md`, which records accepted product and design decisions.
3. `five-lives-concept-brief.md`, which supplies the underlying concept and pilot hypotheses.
4. This plan's proposed implementation defaults. Change these when evidence or subsequent user decisions require it.

The PWA request supersedes the handoff's earlier exclusion of installability. The product remains inclusive across adult generations; “20–120” is an expression of inclusion, not a date-of-birth validation rule. Do not introduce an arbitrary upper age limit.

This request authorizes writing the plan. Implementing, registering infrastructure, sending communications, charging customers, and publishing are future execution work.

## 2. Product rules that implementation must preserve

- There are exactly five categories: **Sports, Art, Health, Travel, Tech**.
- A completed intake records one response per category: a specific option or “Nothing here yet.”
- At most one non-empty choice is the user's current starting point. The five are a list of possibilities, not five simultaneous commitments.
- Every offered experience has an achievable endpoint, an audience or witness opportunity, and a tangible artifact or record.
- All five categories appear from the first release. Only operationally ready experiences can accept bookings.
- Discovery, intake, matching, and group membership are free. Charge for a defined experience with a date and delivery plan.
- WhatsApp remains the group conversation channel. 5lives handles formation, scheduling, booking, hosting, and outcomes.
- Public copy is hopeful and specific. Avoid regret-heavy assumptions, professional-success promises, career-change framing, clinical claims, and pressure to purchase.
- Use a spacious, minimal interface with restrained motion. No game map, levels, streaks, lives counter, XP, or competitive completion badges.
- Treat city choice, pricing, demand, referral behaviour, and the commercial assertions in the brief as hypotheses.

## 3. Release boundaries

Build the platform in usable releases. The manual pilot informs the product rather than becoming a reason to withhold the requested PWA.

| Release | Included | Exit condition |
| --- | --- | --- |
| R0: foundation and feasibility | Verify scaffold, public identity path, runtime, PWA serving, persistence, and payment integration assumptions; establish visual tokens | A documented architecture decision and a working technical slice, with unresolved infrastructure dependencies explicit |
| R1: discovery and pilot intake | All categories, five-choice intake, account save/resume, one active choice, interest requests, participant home, basic admin, installability and safe offline fallback | A participant can save choices and request a real pilot; an operator can review and follow up manually |
| R2: paid pilot platform | Real dated events, capacity, checkout, bookings, cancellations/refunds, cohort access, host attendance, artifacts and physical fulfillment tracking | A paid cricket experience can be operated end to end, including failures and refunds |
| R3: gifting and repeat participation | Gift purchase/claim, optional artifact sharing, repeat and cross-category journeys, richer reporting | Gift and repeat flows work without changing the core model |
| Later, evidence-led | More cities and categories, optional reminders via push, partner portal, localization, child-participation experiment | Pilot evidence and delivery capacity justify each addition |

R1 is an intake release, not the completed transactional platform. R2 is the first end-to-end operating platform. R3 completes the planned gifting layer. Do not label the whole plan finished after building a landing page or a frontend with mock data.

Exclude native iOS/Android apps, app-store packaging, social feeds, in-app chat, subscriptions, AI matching, AI coaching, course libraries, a marketplace payout engine, wearable integrations, and clinical health records from R1–R3.

## 4. Roles and access

| Role | Access |
| --- | --- |
| Visitor | Public categories and events, local intake draft, public help and policies |
| Participant | Their saved five, interest requests, bookings, cohort details, artifacts, preferences, and account requests |
| Gift buyer | Their purchases and gift delivery/claim status; no access to the recipient's private profile or scene |
| Host | Only assigned events/cohorts, necessary roster information, attendance, completion and artifact upload tasks |
| Operator/admin | Catalog, city availability, participants, matching, events, bookings, refunds, fulfillment, support and operational reports |
| Owner | Admin assignment, provider configuration and sensitive access controls |

Enforce permissions in every server operation and file download. Hiding navigation is not authorization. Bootstrap the first owner through a secure operator procedure; never make the first public registrant an admin. Audit role changes and privileged writes.

## 5. User journeys and required behaviour

### 5.1 Discover and choose five

1. Open a fast public page with the product premise and a visible action to choose five.
2. Show all categories with specific examples and honest availability labels.
3. Present one category at a time on phones, with named steps, back navigation, and accessible selection cards using radio controls.
4. Include “Nothing here yet” as a real answer for each category. Do not preselect an experience.
5. After five responses, ask “Which one would you like to start with?” Show only non-empty selections.
6. Ask “What's the one scene you picture?” as one optional, private text field. Explain that a host may use it to prepare their experience; do not imply marketing permission.
7. Show the five together for review. Make the single starting choice visually clear without presenting a progress score.
8. Offer sign-in to save across devices. Explain local draft status before sign-in and server-saved status afterwards.
9. Ask for city and practical availability when the user requests a match. Collect phone/contact preference only when needed for coordination.

Edge cases:

- If all five responses are “Nothing here yet,” permit saving the list with no active choice; offer browsing rather than a forced match.
- If only one response is non-empty, still confirm it as the starting choice.
- Changing a choice does not cancel a booking or remove existing cohort membership. Explain existing commitments separately.
- If an option is retired, preserve its historical label and booking evidence, then offer replacement for future matching.
- Persist anonymous drafts locally with a schema version and a 7-day product retention default; omit the scene from persistent anonymous storage unless explicitly saved by the user.
- If a server profile and a local draft both exist, show a review before replacing either. Use optimistic version checks to prevent silent cross-device overwrites.
- Saved profile state must be authoritative on the server; local storage alone does not satisfy save/resume.

### 5.2 Find a suitable experience

Match by specific option, city or remote delivery, relevant availability, and stated cohort preferences. Do not match only on category. Use transparent filters and operator review initially; no opaque ranking model is needed.

An experience page shows:

- The complete outcome, the artifact, and what the participant will actually do.
- Date/time/time zone, location and access information, duration, host, prerequisites, group format and available capacity.
- What is included, what participants bring, and how family or friends can witness the outcome.
- Full price and applicable charges before checkout, cancellation terms, contact/support route, and accessibility information.
- Actual state: available, full, waitlist, coming soon, cancelled, or completed.

Distinguish an option (a wish), an experience offering (a delivery format), an event (a dated occurrence), and a cohort (a hosted group). Selecting a wish never reserves or purchases an event.

If no suitable event exists, allow one deduplicated interest request per participant/option/city. Confirm that it is an expression of interest and does not guarantee a date. Offer a way to withdraw it.

### 5.3 Book and pay

1. Select a real published event and review eligibility, inclusions, cancellation terms, and total price.
2. Sign in and complete only necessary contact, consent, and event-specific readiness fields.
3. Server creates a short-lived seat hold and payment order using authoritative price/currency.
4. Open provider-hosted checkout; use supported payment methods enabled for the merchant account.
5. Return to a booking status page. If confirmation is delayed, show “Checking payment” with safe refresh/retry guidance.
6. Confirm booking only from authenticated provider evidence and successful seat allocation.
7. Display receipt/payment reference, schedule, preparation checklist, calendar download, witness invitation information, and support.
8. Reveal WhatsApp joining instructions only after the participant meets the cohort's admission requirements.

Store money as integer paise with currency `INR`. Snapshot the charged price, cancellation policy version, and purchased event details. Never trust browser-submitted amounts. A browser success callback alone cannot establish payment success; use signed verification and server reconciliation. See [Razorpay's webhook documentation](https://razorpay.com/docs/webhooks/) and [security checklist](https://security.razorpay.com/security/checklist/).

### 5.4 Participate, finish, and keep evidence

Participant home prioritizes the next meaningful action: choose a starting point, await a match, prepare for a booked event, or view a completed outcome. Show the five below this action.

For a booked experience, show schedule updates, preparation steps, host contact, calendar export and the next session where applicable. Display last-updated information when appropriate; online data governs cancellations and changes.

Host marks attendance and completion separately. A paid booking or an uploaded photo does not imply completion. Record participant withdrawal, no-show, cancellation, and incomplete outcomes without shaming language.

For the cricket pilot, support named scorecards, event photographs/video, a witnessed match, and **printed scorecard fulfillment**. An artifact record contains type, owner, event, file or result reference, delivery status, and publication consent. Track physical production, collection/shipping where offered, and exceptions; a digital gallery is not a substitute for the promised physical artifact.

After completion, offer a low-pressure reflection and the next experience in the same or another category. Keep the scene and reflection private. Sharing is a separate opt-in action.

### 5.5 Gift an experience — R3

Start with gifts for a specific published offering and a defined claim window; defer general cash balances and gift-wallet accounting.

- Buyer selects a gift-eligible offering, pays, and receives a gift link/card to share themselves by default.
- Recipient signs in, claims a single-use token and chooses an available date under the stated terms.
- Purchase does not silently create a recipient account, enroll them, reserve an unspecified date, or subscribe them to messages.
- Show whether a dated seat is reserved or whether the gift is an entitlement to choose a future date. Prefer the latter only when operations can reliably supply it.
- Support unclaimed, claimed, redeemed, expired, cancelled and refunded states; define who receives refunds.
- Hash claim tokens at rest; rate-limit claims; enforce one-time atomic redemption.
- Publish operator-approved expiry, availability, cancellation and refund terms before enabling sales. If suitable inventory is unavailable, stop sales or offer an explicit refund path.

## 6. Screens and navigation

Use these routes as an implementation map; adjust route syntax to the verified framework.

| Area | Routes | Key purpose |
| --- | --- | --- |
| Public | `/`, `/categories/[slug]`, `/experiences`, `/experiences/[slug]` | Understand the product, explore five categories, inspect real offerings |
| Intake | `/choose`, `/choose/review` | Five responses, starting choice, scene, save |
| Identity | `/sign-in` and verified provider routes | Accessible sign-in and safe return to the intended page |
| Participant | `/app`, `/app/my-five`, `/app/interests` | Next action, edit five, matching status |
| Booking | `/checkout/[eventId]`, `/app/bookings`, `/app/bookings/[id]` | Purchase and manage participation |
| Cohorts | `/app/cohorts/[id]` | Schedule, host, controlled WhatsApp access |
| Evidence | `/app/artifacts`, `/app/artifacts/[id]` | View/download outcomes and fulfillment status |
| Account | `/app/settings` | Contact preferences, privacy choices, sign-out, export/deletion requests |
| Gift, R3 | `/gifts`, `/gifts/claim/[token]`, `/app/gifts` | Buy, claim, and track gifts |
| Shared artifact, R3 | `/share/[token]` | Explicitly published limited artifact view with revocable access |
| Operations | `/admin` plus catalog, events, interests, cohorts, bookings, artifacts, reports and support views | Operate actual experiences |
| Host | `/host/events/[id]` | Assigned roster, attendance and completion |
| Support/system | `/help`, `/privacy`, `/terms`, `/cancellations`, `/offline` | Trust, support and graceful failures |

Phone navigation: four stable tabs after sign-in — **Home, My five, Experiences, Account**. Bookings and artifacts are prominent from Home and Account. Use desktop top/side navigation with the same information hierarchy. Separate admin navigation; do not crowd the participant interface with operational controls.

Every relevant screen needs loading, empty, validation, unavailable, permission-denied, expired-session, success, and offline states. Preserve form data after recoverable errors. Avoid endless skeletons or error messages that only say “Something went wrong.”

## 7. Visual and responsive specification

Visual thesis: **a calm, contemporary space where a specific possibility feels close enough to begin**.

Proposed starting tokens, subject to contrast checks and visual refinement:

- White surfaces, near-black ink, deep blue as the primary action color, and restrained category accents. Do not rely on color to distinguish categories or status.
- Use the existing Geist sans family initially; introduce another font only if it materially improves the design and performance budget.
- Body text 16–18px, regular labels at least 14px, comfortable line height, and readable form controls. Use relative sizing.
- A consistent 4/8px spacing rhythm, clear content groupings, restrained borders/shadows and moderate rounding.
- Use 150–250ms opacity/transform transitions for feedback. Avoid scroll hijacking, long intro sequences, autoplay audio, and background motion that competes with reading.
- Respect reduced-motion preferences and make every state understandable without animation.
- Use authentic, licensed or supplied imagery showing adults across generations and backgrounds. Do not portray generated people as real customers or fabricate testimonials.
- Do not use `public/five-lives-map.png` as the interface: it is superseded exploratory art.

Responsive requirements:

- Start at 320px; verify representative 360/390px phones, 768px tablets, 1024px layouts and 1440px desktop.
- Single-column phone intake; wider layouts can show a persistent summary alongside the current step.
- Keep primary controls within reach, with a product target of 44×44 CSS-pixel touch areas. Sticky actions must not obscure errors, focused fields, safe areas, or the software keyboard.
- Reflow content without page-level horizontal scrolling. Admin tables may use clearly bounded, labeled horizontal scrolling where necessary, with priority columns or a mobile detail view.
- Support keyboard navigation, visible focus, semantic headings/landmarks, labeled fields, accessible dialogs, live save/payment status announcements, and 200% text zoom.
- Aim for WCAG 2.2 AA, including contrast and focus visibility; 44px controls are our design target, not a claim that WCAG AA requires that exact size. See [WCAG 2.2](https://www.w3.org/TR/wcag/) and [target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

## 8. Architecture and feasibility decisions

### 8.1 Preserve and verify the existing scaffold

Local inspection found React 19.2.6, TypeScript, Vinext 1.0.0-beta.5, Tailwind, an existing UI component catalog, a Cloudflare Vite integration, and Sites configuration. `app/page.tsx` is absent; the layout and theme are starter defaults. No successful build has been established. `.openai/hosting.json` has no project ID and has null database/object-store bindings.

Start from this project. Preserve its lockfile and existing components. Do not run a new initializer over it or rewrite the stack simply because a different framework is familiar.

Proposed deployment architecture:

| Concern | Proposed approach | Verification needed |
| --- | --- | --- |
| UI and routing | Existing React/Vinext/TypeScript scaffold; server rendering for public content and protected pages | Installed version's routing, response headers, build and Worker compatibility |
| Hosting | Sites-managed Cloudflare Worker and assets | Public access, stable production origin, callbacks and service-worker scope |
| Structured data | D1 with versioned schema and generated migrations | Atomic capacity/reservation operations and migration flow |
| Files | Private R2 objects with authorized server access | Upload limits, streaming and expiring/revocable delivery |
| Identity | Provider-neutral server identity boundary; consumer-compatible managed sign-in after feasibility check | Supported public auth path on this Sites environment |
| Payments | Hosted Razorpay checkout as the proposed India-first provider | Merchant setup, account methods, sandbox, public webhooks and SDK/HTTP compatibility |
| Communications | Manual WhatsApp coordination in pilot; transactional email through an HTTP provider when configured | Delivery credentials, consent/preferences, retries and sender configuration |
| Background work | Durable outbox plus supported scheduler/worker runner | Sites runtime support; explicit manual reconciliation fallback for pilot |
| Analytics | Small first-party event schema plus operational SQL reports | Data minimization, consent decisions and retention |

Razorpay is a proposed integration, not a claim that an account exists or a quote for fees. Do not buy services or configure live payments as part of planning.

### 8.2 Public sign-in is an early architecture gate

The installed Sites authentication guidance supports workspace identity and dispatch-owned Sign in with ChatGPT. It specifically requires confirming the current platform path before adding app-owned public sign-in or external OAuth.

5lives serves ordinary consumers. Do not silently require every participant to have a ChatGPT account. In R0:

1. Verify whether the current hosting path supports the chosen consumer identity provider, server-verified sessions, callbacks, sign-out and account lifecycle.
2. Target accessible email verification or phone OTP, chosen after availability/delivery checks; do not implement both in the first slice.
3. Record the verified option, session threat model, costs/dependencies and integration steps in `docs/ARCHITECTURE.md`.
4. If consumer identity cannot be supported on this host, present a concrete hosting/auth adjustment with migration impact. Continue public UI and domain logic independently; do not misrepresent mocked sign-in as a resolved dependency.

Use a stable provider subject mapped to an internal user ID. Session/auth secrets stay server-side. Local preview identities must be explicitly development-only and unavailable in deployed production code.

### 8.3 Keep the application a modular monolith

Use one deployable application with clear modules for catalog, intake, matching, booking/payment, participation, evidence, gifts and operations. Avoid microservices and speculative generic abstractions.

Suggested layout:

```text
app/                    Public, participant, host, admin pages and HTTP handlers
components/five-lives/  Product components composed from existing UI primitives
lib/server/             Identity, authorization, database, storage, payments
lib/domain/             Validation and explicit lifecycle rules
lib/pwa/                Registration, connectivity and update coordination
db/schema.ts            Schema source
drizzle/                Generated, reviewed migrations
public/                 Icons, manifest, offline document and public assets
tests/                  Critical domain, integration and browser flows
docs/                   Architecture, decisions, runbook and implementation status
```

Use the installed Sites persistence/migration workflow at implementation time. Keep runtime capabilities and logical bindings in the hosting manifest, secrets in managed runtime configuration, and application data in storage. No raw TCP dependencies or reliance on Node filesystem persistence in the hosted Worker.

## 9. Data model and invariants

Use opaque IDs, UTC timestamps, explicit status values, created/updated timestamps, ownership fields and indexed foreign keys. Store event time zones separately for accurate display. Proposed entities:

| Entity | Essential data and constraints |
| --- | --- |
| `users` / `roles` | Provider subject, display/contact data, account status; privileged assignments separate and audited |
| `categories` | Stable five keys, order, display copy |
| `options` | Category, specific outcome, artifact description, active/retired version; do not delete used options |
| `profiles` / `life_choices` | City when supplied, revision; unique user/category response with option or explicit none |
| `active_choices` | At most one per user; references that user's non-empty saved choice |
| `private_scenes` | User-owned bounded text, explicit authorized-host access, excluded from analytics |
| `offerings` | Option, format, inclusions, outcome, prerequisites, evidence and fulfillment promise |
| `events` / `sessions` | Offering, city/venue or remote, time zone, dates, capacity, price snapshot inputs, publication state |
| `interests` | User, option, city, availability, cohort preferences, status; active duplicate prevention |
| `cohorts` / `memberships` | Option/city, host, event relations, access criteria, invite reference and member state |
| `reservations` | Event/user, quantity (one in initial checkout), expiry, payment order and allocated/released state |
| `bookings` | User/event, unique reference, financial snapshot, participation state, policy acceptance |
| `payment_attempts` / `payment_events` | Provider order/payment/event IDs, amount/currency, status, idempotency and processing result |
| `refunds` | Booking/payment, amount, reason, initiator, provider reference, pending/success/failure; cumulative refund ceiling |
| `attendance` / `completions` | Booking/session, host confirmation, outcome, timestamps and correction audit |
| `artifacts` / `fulfillments` | Owner, event, private object key, type, consent, print/delivery state and limited shipping details |
| `gifts` / `gift_redemptions`, R3 | Buyer, offering/entitlement snapshot, payment, hashed claim token, recipient, expiry and atomic redemption |
| `share_links`, R3 | Artifact, hashed token, publication scope, expiry/revocation |
| `consents` / `support_requests` | Versioned policy/media/contact choices; support type/status and authorized access |
| `outbox` / `audit_log` | Durable work items with deduplication/retry state; privileged action records with redacted details |
| `analytics_events` | Allowlisted non-sensitive event properties, source event ID and timestamp |

Required invariants enforced server-side and, where possible, by database constraints:

- A completed intake has five category responses; drafts may be incomplete. None is distinguishable from unanswered.
- An option belongs to the category recorded in its choice. Active choice belongs to the same user.
- Publishing requires operational fields and a valid price/capacity; unpublished events cannot be booked through direct API calls.
- Confirmed allocations plus live holds never exceed event capacity. Avoid read-then-write capacity checks without atomic protection.
- One provider event is processed once; repeat delivery is safe. One payment cannot confirm multiple unrelated bookings.
- Financial and participation states are distinct. A refund does not erase historical attendance or accounting records.
- Gift redemption, seat allocation and booking creation cannot partially succeed.
- Retiring catalog content does not rewrite purchased descriptions or completed evidence.

Choose D1-compatible atomic statements/transactions only after testing their actual behaviour. Use conditional writes, uniqueness constraints and atomic batches where suitable; do not assume a generic ORM transaction callback works on this runtime.

## 10. Service contracts and transaction handling

Define typed, validated contracts before wiring screens. Use server-derived identity, bounded inputs, consistent error codes, authorization, rate limits and safe pagination.

| Operation | Contract expectations |
| --- | --- |
| Read catalog/events | Public published data only; filter by option/city/date; separate availability freshness |
| Save intake | Authenticated `PUT`; all choices validated together; expected revision; return saved revision |
| Submit/withdraw interest | Authenticated, duplicate-safe mutation; owned record only |
| Create reservation/order | Idempotency key; authoritative event/price; atomic capacity; short expiry; return safe checkout data |
| Read booking status | Owner/authorized operator only; returns pending, confirmed or actionable failure |
| Receive provider webhook | Publicly reachable server endpoint; raw-body signature verification; unique event persistence; no browser session dependency |
| Cancel/request refund | Validate policy snapshot and financial state; idempotent; track provider acknowledgment separately |
| Admit cohort member | Operator/host permission and eligibility check; protect WhatsApp invite |
| Mark attendance/completion | Assigned host or operator; auditable corrections |
| Upload/download artifact | Enforce ownership/assignment, allowlisted MIME, limits, validation and private storage |
| Claim gift | Signed-in recipient; hashed token lookup; atomic claim; no replay |
| Export/delete account | Verify requester; tracked completion; honor accounting retention policy without retaining unnecessary profile data |

Use `401/403` for authentication/authorization, `409` for conflicts such as a stale revision or unavailable seat, and clear validation/unavailable responses. Do not return private object keys, secrets, roster data or provider payloads to unrelated clients.

Booking sequence must handle interruptions:

1. Atomically create or recover a live hold using an idempotency key. Default hold duration: 10 minutes, configurable after provider testing.
2. Persist order-creation intent; call the payment provider server-side. If the result is ambiguous, reconcile by stable reference before retrying creation.
3. Persist the provider order and expose only checkout-safe fields.
4. Verify returned payment evidence server-side; accept webhooks even if the browser closes. A verified capture or equivalent final paid state is required by the configured payment model.
5. In one protected operation, allocate the held seat and confirm the booking, then enqueue a single confirmation work item.
6. If payment succeeds after the hold expires, atomically allocate a remaining seat if available. If full, flag paid-without-seat, inform support, and initiate the configured refund path. Never silently oversell or show ordinary confirmation.
7. Reconcile pending orders, missing webhooks, unresolved captures and refunds through a durable runner. If scheduling is unavailable, provide an explicit operator reconciliation action with visibility and a runbook before accepting live payments.

Webhook handlers should validate authenticity, persist receipt durably, and process idempotently. Handle duplicate and out-of-order events without regressing a final paid/refunded state. Acknowledge only after safe persistence; retry transient work through the outbox. Payment, refund, booking and notification transitions need separate status records.

Cancellation flow: quote the refund based on the policy accepted at purchase, request cancellation, release eligibility/capacity atomically as policy requires, initiate refund, and show pending status until provider confirmation. An operator cancelling an event must stop sales immediately, identify affected bookings and track each refund/notification. Do not report “refunded” at request time.

## 11. PWA specification

Installation is progressive enhancement: every core flow must also work in an ordinary browser. Provide HTTPS, a linked manifest with stable app ID, `name: Five Lives`, `short_name: 5lives`, `start_url: /app`, `scope: /`, standalone display, theme/background colors, 192px and 512px icons, a maskable icon and an Apple touch icon. Feature-detect installation UI; offer platform-appropriate instructions when no install prompt is available. iOS does not support `beforeinstallprompt`. See [MDN's installability guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable).

Do not prompt on first page load. Offer installation after choices are saved or a booking is confirmed, allow dismissal, and hide it when already installed. A denied or unavailable install prompt never blocks use.

The following caching rules are 5lives design decisions. Service workers enable controlled offline behaviour, but are not a universal installation prerequisite. See [MDN's caching guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Caching).

| Resource/action | Policy |
| --- | --- |
| Versioned JS/CSS/fonts/icons | Precache/cache-first for a bounded allowlist; remove obsolete caches after safe update |
| Anonymous category descriptions | Network-first with explicitly public offline snapshots and a saved-at label |
| Public event editorial content | Cache only if separated from live price, seats, schedule changes and personalized responses |
| Protected HTML, API responses, account data | Network-only and `private, no-store`; exclude from service-worker and CDN caching |
| Payment/checkout, callbacks, admin, signed file URLs | Never cache or queue; network required |
| Navigation without network | Neutral static offline document with retry and permitted public content; no fabricated account dashboard |
| Anonymous intake draft | Device-local draft only, explicit saved-on-device message and retention/version rules |
| Saved-profile edits while offline | Keep current edits in memory; explain unsaved state and retry after connection; no silent write replay |
| Artifacts | Explicit user download when online; no automatic caching of private photographs/files |

Additional engineering requirements:

- Serve the service worker at root scope with appropriate update headers; disable registration during normal development unless explicitly testing it.
- Cache by an explicit public URL/content-type allowlist. Never broadly cache every GET, framework data request, auth redirect, `Set-Cookie` response or cross-origin response.
- Handle first-ever offline launch honestly: previously unvisited content may not exist locally.
- Keep checkout, booking, cancellation, gift claim and consent changes online-only. Do not queue financial actions through background sync.
- Show a connection status without treating `navigator.onLine` as proof of server reachability; actual request failures determine availability.
- New worker waits until an appropriate update moment. Show “Update available” and avoid forced reload during intake or payment. Define old-asset retention so active tabs do not break immediately after deployment.
- Clear app-managed personal/local draft state on sign-out and account switching; inform the user that explicitly downloaded files remain on their device.
- Use safe-area insets and dynamic viewport handling in standalone mode; verify back navigation, deep links, sign-in return and payment return on physical phones.
- Push notifications are later and opt-in. Installation does not grant notification consent, and support must be checked by browser/platform before adding it.

## 12. Operations, trust, and data protection

The minimum operator console is required product scope. It must let a small team:

- Create/retire options and publish only ready offerings/events.
- Review interest by exact option/city, inspect consented practical preferences and make manual matches.
- Create cohorts, assign hosts, control admission and rotate leaked WhatsApp invite links.
- Review bookings, payment exceptions, refunds, cancellations and waitlists.
- Track attendance, completion, artifacts and physical fulfillment.
- Handle access needs, participant support, incident reports and account requests with restricted access.
- See a work queue for payment exceptions, upcoming events missing logistics, undelivered artifacts and unresolved support requests.

Pilot event publication checklist: operator-confirmed ground/venue, host, umpire where relevant, equipment/inclusions, times, actual capacity, price, cancellation/weather process, witness arrangements, photography choices, scorecard process and support contact. Store confirmed facts; do not invent venues, providers, reviews or availability for production.

Safety and privacy product requirements:

- Provide a code of conduct and report/help route. Clearly distinguish routine platform support from local emergency assistance.
- Use a documented verification/admission workflow appropriate to offline meetings. Store the verification result/reference by default, not raw identity-document scans.
- Support operator-configured women-only cohorts and accessibility preferences where operationally available; do not infer gender or promise availability without a real cohort.
- Keep Health options capability-based. Any event readiness/safety process must be designed with qualified operational input; the draft brief's claim that particular activities are “safe” is not a safety determination.
- Explain that joining a WhatsApp group may expose contact/profile information to other members. Allow coordination alternatives where operations can provide them.
- Separate necessary booking/policy acceptance from optional marketing, photo publication and artifact sharing consent. Record version/time/source and support withdrawal.
- Limit hosts to assigned participants and the minimum contact/readiness information they need. Private scene access should be purpose-bound and removed when no longer needed.
- Use server-side input validation, output escaping, CSRF/origin defenses appropriate to sessions, restricted redirects, upload validation, request limits, CSP and secure transport/cookies as applicable.
- Do not accept arbitrary executable/HTML/SVG uploads as participant artifacts. Use allowlisted raster images/PDF/media with verified content type, size limits, malware scanning where available, and safe content disposition.
- Keep secrets and personal data out of client bundles, logs and analytics. Use redacted errors and trace IDs.
- Make original uploaded media private. Sharing creates an explicitly selected derivative/view; do not expose an entire event album by default.

Create an approved retention schedule before launch for draft intake, interest records, contact data, media, support/incident records and financial records. Implement export/deletion requests and retain only justified records under that schedule. Have appropriate India-specific policy, payment, tax and experience-delivery requirements reviewed before taking live payments; this plan does not determine those obligations or invent tax rates.

## 13. Content, discovery and measurement

Seed all five categories and a small curated option set using the source brief. Rewrite option wording as editable draft content. For example: a named cricket scorecard; one recorded song; a witnessed swimming capability appropriate to the participant; a first trip with parents; a working tool used by real people. Do not invent a price or live date for these examples.

Use clearly marked synthetic records only in development/staging. Production should distinguish “Express interest” from “Book this date.” Public pages need accurate titles/descriptions, canonical URLs and a sitemap containing only public published routes. Exclude account/admin/checkout/token routes from indexing; authorization remains necessary because robots directives are not security. Only use event structured data for real published events with accurate fields.

Instrument the real funnel with deduplicated, non-sensitive events: intake started/completed, starting choice selected, interest created, event viewed, checkout started, booking confirmed, attended, completed, artifact delivered, artifact explicitly shared, repeat booking and gift redeemed. Do not send scene text, names, phones, addresses, private URLs or payment payloads to analytics.

| Metric | Definition |
| --- | --- |
| Intake completion | Saved complete five-response intakes / intake starts in the same defined cohort/window |
| Match conversion | Participants receiving an actionable event match / eligible active interest requests |
| Booking conversion | Confirmed paid bookings / distinct eligible event viewers, with time window documented |
| Experience completion | Participants completing / confirmed participants expected to attend, excluding operator-cancelled events; report no-shows separately |
| Repeat participation | Participants booking another experience within 90 days of first completion / participants with a full 90-day observation window |
| Cross-category movement | Participants completing a second category / first-time completers with the selected follow-up window |
| Referral | Self-reported referred bookings; identify reporting limits rather than inferring from shared contacts |
| Group survival | Host-recorded 8-week check of participant activity; do not scrape WhatsApp |
| Artifact fulfillment/retention | Delivery within promised window; voluntary download/share and follow-up response as separate proxies |
| Unit economics | Event revenue minus recorded direct delivery costs, fees and refunds; actual inputs only |

Use operational reports first. Add analytics vendors only when necessary and approved. Review the three match-day pilot with participants and hosts; measure whether experiences felt worthwhile, not only whether users converted.

## 14. Performance and quality targets

Target public and participant route performance at the 75th percentile: LCP ≤2.5 seconds, INP ≤200ms, CLS ≤0.1. These are field targets; laboratory checks before launch are proxies until sufficient real-user data exists. See [Web Vitals](https://web.dev/articles/vitals?hl=en).

Proposed engineering budgets: public/intake initial route JavaScript ≤250KB gzip excluding optional third-party checkout loaded only when needed; initial phone page transfer around 1MB or less; responsive modern-format images; lazy-loaded below-fold media and admin/reporting code. Measure the scaffold before locking budgets and document any evidence-based exception.

Use meaningful tests for critical behaviour rather than snapshots of every component:

| Layer | Required checks |
| --- | --- |
| Domain | Five-response invariants, all-none case, active choice ownership, price calculation, lifecycle transitions, refund ceiling |
| Database/integration | Capacity contention, duplicate order/webhook processing, gift redemption race, profile revision conflict, migration from prior schema |
| Authorization | Cross-user profile/booking/file denial, unassigned host denial, direct admin mutation denial, revoked share/invite handling |
| Payments | Successful, failed, abandoned, duplicate and late payment; missing/out-of-order webhook; full event after expired hold; refund pending/failure/success |
| Product journeys | Anonymous draft → sign-in → server save → match → booking → cohort → completion → artifact; gift purchase → recipient claim in R3 |
| PWA | Manifest/icons, install and standalone launch, offline navigation, no private cache, safe update, account switching, deep links and payment return |
| Accessibility/responsive | Keyboard and screen-reader checks, reduced motion, 200% zoom, phone/tablet/desktop reflow and focused-field visibility |
| Operations | Publish readiness, cancellation of an event, artifact print/delivery exceptions, support request and reconciliation queue |

Future implementation should include explicit browser testing as part of its execution brief. Test Android Chrome and iPhone Safari on physical devices for install/auth/payment; desktop Chrome, Safari and Firefox for normal browsing; use automation for reproducible regressions. Record unavailable devices as verification gaps, never as passes.

Require dependency install, typecheck, lint and production build. Add test commands only when the corresponding meaningful suites exist. Review dependency vulnerabilities and resolve actual applicable issues; do not blindly apply breaking audit fixes. No successful command or preview is claimed by this document.

## 15. Ordered implementation work packages

Each package ends with a working slice, relevant checks and a short update in `docs/IMPLEMENTATION_STATUS.md`: completed work, evidence, known limitations and next package. Estimate only after R0; do not promise a release date from this plan alone.

### P0 — verify the foundation (R0)

Read current instructions and context; restore dependencies using the Sites environment workflow; inspect existing package versions; establish a working root route and production build. Verify D1/R2, public auth, scheduler, webhook reachability and root service-worker serving. Write architecture decisions and `.env.example` names without secrets. Preserve unrelated documents and the pending concept handoff.

**Done when:** the selected consumer/auth/hosting path is demonstrated or its precise external blocker is recorded; build/runtime constraints are known; a real schema migration and persistence read/write work in the selected test environment. Continue independent UI/domain work if a provider dependency is pending, but do not pass dependent release gates.

### P1 — product shell and design system (R1)

Implement brand metadata, shared tokens, responsive navigation and purposeful page structure. Create all-five-category public content, real catalog models and availability labels. Use existing UI primitives; replace starter presentation. Add minimal branded app icons and install metadata.

**Done when:** phones and desktops present the accepted visual direction; visitors can begin choosing five immediately; unavailable experiences never imply bookability.

### P2 — intake, identity and saved home (R1)

Implement the five-step flow, none states, starting choice, private scene, anonymous drafts, verified sign-in, server save/resume, conflict handling and participant home. Enforce ownership and account lifecycle boundaries.

**Done when:** a user can save on one device and resume on another; all-none and stale-edit cases work; a second user cannot access the first user's choices.

### P3 — pilot intake and operations (R1)

Implement interest requests, city/availability preferences, manual matching, basic catalog/cohort administration and support. Configure private access for operators and auditable assignment. Keep communication manual unless the user has authorized a configured sender.

**Done when:** an operator can move a genuine interest request through review and matching with visible history, and the participant sees an accurate status.

### P4 — robust PWA and R1 release checks (R1)

Implement allowlisted caching, neutral offline document, network failure messages, local draft expiration, update flow and install guidance. Verify private cache exclusion and account switching. Complete the requested browser/device checks.

**Done when:** installation/standalone launch works on tested supported devices, normal browser use remains complete, and offline operation never exposes another account or falsely claims a save/booking. R1 can now be released as the clearly labeled pilot-intake platform.

### P5 — published events, inventory and payments (R2)

Build offering/event/session management, publication validation, seat holds, checkout, confirmation, cancellation/refund, webhook handling, outbox and reconciliation. Use sandbox money first. Configure actual operator-approved prices/policies only when provided.

**Done when:** the entire payment failure matrix passes, capacity races do not oversell, and cancelled/refunded states reconcile with the provider. Live sales remain disabled until merchant and operational readiness are complete.

### P6 — participation and tangible outcomes (R2)

Add booked-event preparation, calendar export, cohort admission/WhatsApp access, assigned-host roster, attendance/completion, private artifact uploads/downloads and physical scorecard fulfillment. Add clear work queues for exceptions.

**Done when:** an operator can run a full test match day from published event through printed-scorecard handoff, including a no-show, cancellation and missed delivery.

### P7 — launch hardening and paid pilot (R2)

Complete accessibility/performance/security checks, account export/deletion workflow, policy/content review, operational runbook, backup/restore rehearsal, monitoring and staged release. Run the three match days as a real operational pilot when the business is ready; record feedback and costs rather than fabricating success.

**Done when:** release criteria below pass and the platform supports real operations. Actual pilot outcomes remain external evidence to collect, not software acceptance results that Codex can invent.

### P8 — gifts, sharing and repeat journey (R3)

Implement the gift lifecycle, optional artifact publication/revocation, next-experience prompts and outcome reports. Test recipient privacy, double claims, insufficient inventory and refund handling. Refine option wording and availability from pilot evidence.

**Done when:** a buyer and a separate recipient complete the supported gift flow safely, sharing is explicit/revocable, and repeat/cross-category measurement uses real participation data.

## 16. Release, monitoring and recovery

Use separate development/staging and production data, secrets and payment modes. Keep synthetic users/events out of production. Start with a private preview; do not open public paid sales until the configured audience, identity, policies, catalog and operational readiness agree.

For a Sites deployment, the implementing owner must use the current Sites build/hosting workflow, reuse the project ID once registered, validate the exact source/version, include reviewed migrations, and verify terminal deployment success. Apply the hosting workflow's audience/approval requirements at publication time using the user's actual authorization. This plan neither registers nor publishes a Site.

Release flags: public interest intake, paid bookings, gifts, public artifact sharing and push. Keep unready features hidden or explicitly unavailable; never show a working-looking CTA backed only by a mock.

Monitor server errors, elevated checkout failure, webhook processing delay, paid-without-seat exceptions, stuck refunds, exhausted capacity inconsistencies, failed notifications and overdue artifact delivery. Show redacted correlation IDs for diagnosis and assign operational owners/response procedures.

Use supported backups/exports for structured data and an object retention strategy; test restoring a representative booking and its artifact references. Proposed launch objectives: recover service within one business day and lose no confirmed financial transaction after reconciliation. Validate achievable backup frequency before promising a formal SLA.

Migrations must be additive where feasible. Preserve applied migration history. Keep the previous application version available, but verify schema compatibility before rollback; a code rollback does not reverse an applied database migration. Include service-worker cache/update recovery in deployment rollback planning.

## 17. Decisions and dependencies to resolve without stalling independent work

| Decision/input | Working default | Must resolve before |
| --- | --- | --- |
| Pilot city | Configurable; Pune and Bengaluru remain candidates, neither is confirmed | Publishing a real event |
| Experience dates, venues, hosts and capacity | Development fixtures only until confirmed | Enabling live booking |
| Price, fees/taxes, refunds and cancellation terms | No invented production amount or tax logic | Checkout launch |
| Consumer identity | Verify managed email/phone sign-in supported by host | R1 cross-device account release |
| Payment provider and merchant account | Razorpay proposed; use sandbox only during implementation | Live charges/refunds |
| Sender/support contacts | Manual coordination and visible support workflow | Contact collection and transactional delivery |
| Brand assets | Proposed typography/color direction; historical map excluded | Visual release review |
| Verification and cohort safety process | Operator-managed, minimized data | Stranger-group admission |
| Privacy/retention and media policy | Private by default; explicit sharing consent | Personal-data/media collection in production |
| Physical artifact fulfillment | Printed scorecard for cricket; explicit handoff tracking | Publishing the relevant promise |
| Gift terms and supply | Offering-specific gifts, no stored-value wallet | R3 sales |
| Budget and date | Scope by releases; estimate after feasibility | Committing to delivery/cost expectations |

Configure these as content/settings where appropriate. Do not hardcode a speculative city, invent credentials or deploy fake inventory. Ask only for inputs that cannot be verified or safely defaulted, while continuing work that does not depend on them.

## 18. Definition of complete

The planned platform is complete when:

- All five categories and the exact intake rules work; choices persist across verified sessions/devices.
- Participants can identify real availability, request a match, book/pay, prepare, join an admitted cohort, complete the experience and receive the promised evidence.
- Operators can deliver those workflows, including cancellations, payment exceptions, support and physical artifacts.
- Gifts and explicit sharing work at R3; deferred features are clearly documented.
- Installability, mobile/tablet/desktop use, offline boundaries, updates, accessibility and critical transactions have recorded verification evidence.
- Authorization and private data/file boundaries have been tested; real policies, prices and provider configuration are ready for the released features.
- The deployment is verified at the intended access level, with monitoring, backup/recovery and an operator runbook.
- The README, architecture decisions, implementation status, environment documentation and test instructions reflect the actual delivered state.

## 19. Copy-ready implementation instruction

Use the following in a subsequent Codex task when ready to authorize implementation:

> Build 5lives in `/Users/abhay/Desktop/5LIVES` using `docs/5LIVES_PWA_BUILD_PLAN.md`, `docs/PROJECT_CONTEXT.md` and `five-lives-concept-brief.md`. Implement the complete mobile-responsive PWA through R3 in the ordered work packages, preserving the accepted hopeful, minimal visual direction and the existing scaffold where compatible. Start by verifying the consumer sign-in and hosting path, then deliver working vertical slices with durable data. Include browser testing at phone, tablet and desktop widths, physical-device verification where available, accessibility checks, PWA install/offline/update checks and payment/authorization failure tests. Use sandbox payments and clearly labeled development fixtures until actual business settings are available. Do not invent live events, credentials, policies or pilot outcomes. Keep `docs/IMPLEMENTATION_STATUS.md` current and continue independent work when an external dependency is pending. Surface any required input with a concrete explanation and completed reviewable work. Follow the Sites workflow for validated hosting and the authorized publication audience. Do not stop at a marketing page, mock dashboard or unverified build.
