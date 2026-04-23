import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://js-vs-jquery.netlify.app',
  devToolbar: { enabled: false },
  integrations: [sitemap()],
});