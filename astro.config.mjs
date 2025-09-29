// @ts-check
import { defineConfig } from 'astro/config';

import alpinejs from '@astrojs/alpinejs';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://wakugumi.github.io',
  base: '/anandarisyad.github.io',
  output: 'static',
  integrations: [alpinejs()],

  vite: {
    plugins: [tailwindcss()]
  }
});