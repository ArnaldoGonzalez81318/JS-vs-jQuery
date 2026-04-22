import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://js-vs-jquery.netlify.app',
  integrations: [sitemap()],
});