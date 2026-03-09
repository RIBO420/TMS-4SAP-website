import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://themanufacturingsuite.com',
  integrations: [mdx(), sitemap(), react()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl', 'de'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});