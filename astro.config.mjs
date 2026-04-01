import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  site: 'https://moana-live-action.online',
  build: {
    inlineStylesheets: 'auto',
  },
});
