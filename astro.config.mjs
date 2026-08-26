// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://leifmetcalf.com',
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  },
  fonts: [{
    provider: fontProviders.fontsource(),
    name: "Source Serif 4",
    cssVariable: "--font-source-serif",
  }]
});
