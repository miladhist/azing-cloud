import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const bulletsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bullets' }),
  schema: z.object({
    id: z.string(),
    asset: z.enum(['XAU', 'XAG', 'BTC', 'ETH']),
    status: z.enum(['CANDIDATE', 'ACTIVE', 'ARCHIVED']),
    wins: z.number().default(0),
    losses: z.number().default(0),
    winRate: z.number().default(0),
    riskReward: z.number().default(0),
    created: z.coerce.date(),
    activated: z.coerce.date().optional(),
    archived: z.coerce.date().optional(),
  }),
});

const logCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/log' }),
  schema: z.object({
    date: z.coerce.date(),
    type: z.enum(['SETUP', 'RESULT', 'DEATH_NOTE', 'MILESTONE', 'SYSTEM']),
    title: z.string(),
    relatedBullet: z.string().optional(),
  }),
});

const sessionsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/sessions' }),
  schema: z.object({
    week: z.string(),
    asianCorrect: z.number(),
    asianTotal: z.number(),
    londonCorrect: z.number(),
    londonTotal: z.number(),
    notes: z.string().optional(),
  }),
});

const walletCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/wallet' }),
  schema: z.object({
    date: z.string(),
    baselineBtc: z.number(),
    currentBtc: z.number(),
    growthPercent: z.number(),
    methodology: z.string(),
    source: z.string(),
  }),
});

export const collections = {
  bullets: bulletsCollection,
  log: logCollection,
  sessions: sessionsCollection,
  wallet: walletCollection,
};
