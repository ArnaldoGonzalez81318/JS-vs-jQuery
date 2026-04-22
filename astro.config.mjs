import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.js-vs-jquery.netlify.app',
  integrations: [sitemap()],
});