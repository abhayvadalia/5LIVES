# Five Lives architecture — first implementation

Decision date: 9 September 2026.

## Current delivery boundary

This is an owner-private, working discovery/intake slice, not the full R1–R3 platform. The latest user instruction to start building authorizes implementation. Historical planning-only text and the copy-ready instruction quoted in the build plan are reference material, not new independent user instructions.

## Runtime and data

Preserved React, Vinext, TypeScript, Tailwind, existing Base UI/Shadcn primitives, Sites and Cloudflare Workers. Targeted compatible updates address the detected React RSC and Vinext advisories. The current lockfile is authoritative.

`DB` is a Sites-managed D1 database. Schema is in `db/schema.ts`; reviewed generated migrations are in `drizzle/`. Profiles use the trusted Site identity as their key. Prepared SQL executes every read and write. Profile creation uses conflict-do-nothing; updates condition on a revision and increment it atomically, returning 409 for a stale edit. The UI compares local and server copies before replacement. Anonymous drafts are versioned and expire in seven days. Scenes are excluded from local drafts unless explicitly requested. Signed-in edits are not automatically copied into persistent browser storage.

Interest requests are unique by user, option and normalized city. The server verifies the option belongs to the user's saved five. The same request can be updated or reactivated; withdrawal is owned by the requesting participant. Operators can move requested interests into review through a transaction that also records an audit entry. A withdrawn request cannot be moved back by that action. No matching, event reservation, communications or payment is implied by review.

## Identity and trust boundary

The private preview uses dispatch-owned ChatGPT sign-in and the bundled helper. Sites strips and supplies verified `oai-authenticated-user-*` headers at its trust boundary. Do not serve the production Worker directly on another origin that allows callers to supply these headers. Local development uses the bundled Sites loopback-only synthetic account `local_seedy`; the plugin strips spoofed identity headers and does not represent a real consumer identity check.

The current skill documents ChatGPT sign-in, but does not establish a supported public email/phone identity path. This is an explicit R1 consumer release blocker. Do not build an unreviewed password/OTP stack or call the public consumer identity gate complete. Multi-account hosted identity and cross-device physical-browser tests remain unverified.

All mutation endpoints require same-origin JSON requests, bounded input and authenticated identity. API responses and account/choose/admin pages are no-store. Operator assignment is never automatic. The owner must explicitly provision known operator identity rows using trusted database administration; assignment UI and audit for role changes are not implemented. There is no operator role or test identity seeded into production.

## PWA

A root manifest supplies 192/512 PNG monogram icons and standalone app launch. The production-only service worker pre-caches just `/offline.html` and the two icons. All navigation goes to the network and falls back to a neutral document only on network failure. APIs, account content, authenticated pages, scenes and writes are never cached. Worker activation waits for user choice; update UI asks the user to save first. Normal browser use does not depend on installation. Device installation, standalone authentication, update and account-switch behavior still require physical-device verification.

## Availability and operations

All ten options across all five categories are editable source catalog records marked in development. There are no invented cities, dates, hosts, prices, capacity, live inventory, public support contacts or operational outcomes. Interest collection is private-preview only. Payments, gift sales, WhatsApp admission and artifact storage are unavailable. R2 will need real event models, inventory, payment reconciliation, refunds and private artifacts; R3 adds gifts and explicit sharing. R2/R3 are not implemented by this slice.

## Verification scope

Domain tests cover intake invariants, drafts and scene consent. SQLite integration tests apply the actual migration and check identity uniqueness, revision races, deduplication and no automatic admin. Service-worker contract tests inspect the executed install/fetch handlers. Local HTTP checks exercise successful routes, spoof rejection, save/read, 409 conflict, origin rejection, interest deduplication/withdrawal and admin denial. These do not substitute for two real hosted accounts or browser/device testing.

WebMCP exposes one optional staging tool backed by the visible intake validator. No supported WebMCP runtime was exercised, so it is not verified. Browser screenshots, interaction QA and physical-device tests were not performed in this first slice. Responsive CSS includes phone/tablet/desktop layouts and reduced motion, but visual/a11y conformance is not claimed.

## Dependency advisory review

Targeted security updates moved React/RSC to 19.2.8, Vinext to beta.9, Vite to 8.2.2 and Cloudflare tooling to compatible versions. After updates, npm audit reports 8 transitive/toolchain entries: 4 moderate through the migration tool's old esbuild loader and 4 high through local Miniflare/Sharp image decoding. This app does not expose uploaded images or a remote image decoding endpoint, and does not run the old esbuild development server. Do not blindly downgrade the framework/toolchain as suggested by audit force. Revisit these development dependencies before public launch; the preview remains private. No zero-vulnerability claim is made.

## Remaining release work

Public identity feasibility, real two-account authorization tests, operator bootstrap and role auditing, interest-to-match operations, public support and retention/export/deletion, CSP/rate limiting and security hardening, browser/accessibility/performance checks, device install/offline/update tests, and all R2/R3 workflows. R2 requires merchant/sandbox access and operator-confirmed event data. R3 requires approved gift terms and deliverable inventory. No real communications or charges have occurred.
