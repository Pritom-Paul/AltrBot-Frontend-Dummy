// svelte.config.js

import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		csp: {
      directives: {
        'base-uri': ['none'],
        'connect-src': ['*'],
        // 'default-src': ['self'],
        'img-src': ['*'],
        'object-src': ['none'],
        // 'script-src': ['self', 'static.cloudflareinsights.com'],
        'style-src': ['self', 'unsafe-inline'],
      },
    },
	}
};

export default config;
