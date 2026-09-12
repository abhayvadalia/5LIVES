# Five Lives membership direction

Implemented 12 September 2026 from the supplied product brief. This release is an honest pre-launch implementation, not a claim that the full paid business is operating.

## Ready

- One homepage with five free-form aspirations, adult confirmation, keyboard-accessible progression, seven-day browser draft, explicit save and one selected beginning.
- Prior browser-saved choices migrate into the new model without being erased. My five shows the active life; the other lives are collapsed. Completion allows choosing the next life.
- Kolkata-only membership and letter pages. Eight concrete planned perks, annual founding/regular prices with 18% GST breakup, no invented member count or reviews.
- Three prioritised experience concepts and other future concepts. Each has a working interest form with a required expected-price range.
- D1-backed pre-launch requests: purpose-specific consent, optional update consent, timestamps/source, adult gating, validation and rate limiting. No emails are sent by this release.
- Private management receipts provide access, email correction, update-consent withdrawal and deletion. Tokens are hashed in D1 and not placed in query strings. Browser and downloadable receipts preserve access.
- Terms, privacy, refunds, grievance and community-guideline pages describe current behaviour and distinguish planned paid policies.
- Old homepage and intake paths permanently redirect. No gifting flows or hard-coded hosting domain in public page links.

## Launch dependencies: do not label these complete

1. Legal entity, address, GSTIN, customer care and named Grievance Officer. The live legal pages disclose that these have not yet been provided.
2. Custom domain. Current Sites hosting remains in use until the owner supplies a domain and DNS access.
3. Email service and verified sending domain. Saving by email, double opt-in, unsubscribe and newsletter reply recording are not enabled. The letter form records an invitation request only.
4. Two actual newsletter issues, named people and consented photographs. No fabricated issues or people.
5. Payment provider account, subscription plans and webhook configuration. No checkout, annual mandate, one-click cancellation implementation or renewal reminder sends exist yet. Public copy marks these as planned.
6. Supported public identity provider independent of ChatGPT. Paid member access, onboarding, circles, private shared threads and mutual-consent contact exchange require this plus paid entitlement checks.
7. Verified coach records and documented checks. The directory is a closed information page; no contacts exist behind a client-side gate.
8. Three real experiences with hosts, dates, venue, access details, group sizes, prices, real photographs, artefact photographs, inclusions and cancellation terms. Booking and member first-access windows are not enabled.
9. Confirmed paid member count. There is no fabricated founding-place counter.
10. Request operations: database-backed interest records are ready, but a dedicated staff workflow and contact owner must be assigned before sending invitations. No public API enumerates requests.

Existing private preview profile/admin APIs remain protected and separate from public interest requests. Browser choices remain device-local as previously requested by the owner.

## Validation

25 automated tests, TypeScript checks and local HTTP checks cover public routes, one active life, stale/corrupt browser data, required consents, price bands, request create/read/correct/delete, incorrect receipt denial, cross-origin denial and 301 redirects. Browser visual QA was not performed in this task.

## References for the later production phase

- [MeitY acts and policies](https://www.meity.gov.in/documents/act-and-policies): confirm applicable DPDP rollout and obligations with current official materials before representing compliance.
- [Razorpay supported subscription payment methods](https://razorpay.com/docs/payments/subscriptions/supported-payment-methods/): confirm merchant account eligibility and mandate support when integrating.

These references do not establish that this pre-launch release is a legally reviewed, fully operational membership service.
