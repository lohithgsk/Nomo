# Nomo

Nomo is a gamified restaurant discovery platform that turns eating out into an ongoing journey rather than a series of disconnected restaurant searches — combining personalized recommendations, location-based exploration, gamification, and rewards.

**Core loop:** Discover → Visit → Complete → Earn → Unlock → Explore Further

---

## Repository structure

```
nomo/
├── apps/
│   ├── api/              # Backend service(s)
│   ├── mobile/           # Mobile client
│   └── web/               # Web client
├── packages/
│   ├── shared/            # Shared types, constants, utils
│   └── design-system/     # Shared UI components/tokens
├── infra/                 # IaC, deployment configs
├── docs/                  # Architecture docs, ADRs
└── .github/                # Workflows, issue/PR templates
```

Each app has its own README with setup instructions:
- [`apps/api/README.md`](./apps/api/README.md)
- [`apps/mobile/README.md`](./apps/mobile/README.md)
- [`apps/web/README.md`](./apps/web/README.md)

## Getting started

```bash
git clone https://github.com/stardust-skye/nomo.git
cd nomo
npm install
cp .env.example .env   # repeat inside each app directory as needed
```

Then follow the relevant app's README to run it locally.

## Contributing

Before opening a PR, read [`CONTRIBUTING.md`](./CONTRIBUTING.md) — it covers branching strategy, commit conventions, PR process, and CI/CD.

## Documentation

- [Contributing guide](./CONTRIBUTING.md)
- [Architecture Decision Records](./docs/adr)

## License

<!-- Add your license here -->