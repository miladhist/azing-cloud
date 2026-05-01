import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://azing.cloud',
  output: 'static',
  compressHTML: true,
  build: {
    format: 'directory'
  }
});
