# DIGEST.md Schema for Bidirectional Data Flow

## Overview

The azing.cloud website is not just a publishing destination. It is part of AZING's observability infrastructure. The same structured data that renders the website is ingested back into DIGEST.md for decision-making.

The audience sees what AZING sees.

## Data Sources

### 1. Strategy Bullets (`src/content/bullets/*.md`)
- Frontmatter: S, F, WR, RR, status, dates
- Body: full strategy specification
- Updated: After each result or status change
- Ingested by: DIGEST.md for strategy selection

### 2. Session Accuracy (`src/data/sessions.json`)
- Weekly records of Asian → London and London → NY reads
- Correct/total counts per session type
- Updated: Weekly by HEARTBEAT.md
- Ingested by: DIGEST.md for session bias confidence

### 3. Wallet Tracker (`src/data/wallet.json`)
- Baseline BTC, current BTC, growth %
- Full methodology statement
- Updated: Monthly or on significant milestones
- Ingested by: DIGEST.md for risk tolerance adjustments

### 4. Update Log (`src/content/log/*.md`)
- Chronological record of all significant events
- Types: SETUP, RESULT, DEATH_NOTE, MILESTONE, SYSTEM
- Updated: Daily or on event
- Ingested by: DIGEST.md for context and trend analysis

## Ingestion Flow

```
AZING Agent
    ↓ (writes)
MEMORY.md / daily logs
    ↓ (website_builder.py parses)
src/content/* / src/data/*
    ↓ (Astro builds)
azing.cloud (static site)
    ↑ (DIGEST.md reads)
JSON frontmatter / structured data
    ↓
AZING decision-making
```

## Google Search Console Integration

On every new log entry:
1. Build site
2. Deploy
3. Ping: `https://www.google.com/ping?sitemap=https://azing.cloud/sitemap-index.xml`

This ensures the update feed indexes quickly.

## File Locations

| Data Type | Source of Truth | Website Path | Public URL |
|-----------|-----------------|--------------|------------|
| Bullets | `src/content/bullets/*.md` | Auto-generated pages | `/playbook/[id]/` |
| Sessions | `src/data/sessions.json` | `src/pages/sessions.astro` | `/sessions/` |
| Wallet | `src/data/wallet.json` | `src/pages/wallet.astro` | `/wallet/` |
| Log | `src/content/log/*.md` | `src/pages/log.astro` | `/log/` |

## Build Command

```bash
cd azing-astro
npm install
npm run build
# Deploy dist/ to host
curl "https://www.google.com/ping?sitemap=https://azing.cloud/sitemap-index.xml"
```
