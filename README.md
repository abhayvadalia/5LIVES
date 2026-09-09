# Five Lives

Make room for a part of yourself. A mobile-first PWA for five specific possibilities in Sports, Art, Health, Travel and Tech, beginning with one.

The first implementation provides discovery, a complete five-choice intake, local drafts, private-preview account saving, interest requests and a restricted operator review queue. It does **not** complete the planned transactional platform. See [implementation status](docs/IMPLEMENTATION_STATUS.md) and [architecture](docs/ARCHITECTURE.md).

## Development

Requires Node 22.13+ and npm. The lockfile is preserved.

```sh
npm ci
WRANGLER_WRITE_LOGS=false npx wrangler d1 migrations apply DB --local --config wrangler.local.json
npm run dev
```

The Sites plugin supplies a synthetic loopback-only ChatGPT sign-in for local development. It is not a real public email/phone identity integration. Use synthetic data locally. Hosted identity must run behind the Sites dispatcher.

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run db:generate
```

Production delivery uses the installed Sites build/hosting scripts and generated D1 migrations. `.openai/hosting.json` holds the registered project and logical binding only. No credentials are required in `.env` for this slice. Future provider settings are not active.

## Product references

- [PWA build plan](docs/5LIVES_PWA_BUILD_PLAN.md)
- [Accepted product context](docs/PROJECT_CONTEXT.md)
- [Concept brief](five-lives-concept-brief.md)

The earlier map in `public/five-lives-map.png` is preserved historical exploratory art and is not used as the interface. The separate concept document handoff described in project context remains unchanged; no in-progress source documents were moved.

## Operator bootstrap

No account automatically receives privileged access. Before using `/admin`, the Site owner must identify a verified Site user ID, explicitly authorize it, and add it to `operators` through trusted administration. No operator assignment screen, public API or production fixture is supplied. Role change auditing and a full operator lifecycle are required before public launch. The existing review action itself checks role server-side and writes an audit entry.

## Test limits

The application lint task excludes unchanged vendored UI primitives and the starter mobile hook; application code and meaningful tests remain checked. Actual browser/device, hosted multi-user authorization, WebMCP, event/payment and gifting acceptance tests are still required. See architecture for the remaining dependency advisory review.
