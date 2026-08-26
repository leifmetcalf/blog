// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { satteriTemml } from './src/plugins/satteri-temml.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://leifmetcalf.com',
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    },
    processor: satteri({
      features: { math: true },
      mdastPlugins: [satteriTemml()],
    }),
  },
  fonts: [{
    provider: fontProviders.fontsource(),
    name: "Source Serif 4",
    cssVariable: "--font-source-serif",
  }]
});
