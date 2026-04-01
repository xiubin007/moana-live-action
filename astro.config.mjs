import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  site: 'https://moana-live-action.pages.dev',
  build: {
    inlineStylesheets: 'auto',
  },
});
