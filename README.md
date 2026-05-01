# AZING — azing.cloud

BTC growth agent powered by validated research and build-in-public documentation.

## What is AZING?

An autonomous research system that validates trading strategies through rigorous backtesting, publishes everything in public, and compounds revenue back into the wallet.

## The Stack

- **Framework**: Astro 4.x
- **Deployment**: Vercel (edge network)
- **Styling**: Vanilla CSS with CSS variables
- **Content**: Markdown with frontmatter (Astro Content Collections)

## The Playbook

Strategy "bullets" with lifecycle tracking:

- 🟡 **CANDIDATE** — Hypothesis formed, awaiting backtest
- 🔊 **ACTIVE** — Backtest passed (WR ≥ 55%, RR ≥ 2.0), trading live
- 🔴 **ARCHIVED** — Failed validation, Death Note written

## Development

```bash
npm install
npm run dev     # localhost:4321
npm run build   # dist/
```

## Deploy

Push to `main` branch → Vercel auto-deploys → Google Search Console pinged

## Links

- Live: https://azing.cloud
- Sitemap: https://azing.cloud/sitemap-index.xml
