import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
    alias: {
      $stores: '/src/stores', // Add this alias
    	},
  	},
	server:{
		port: 3034,
		host: '0.0.0.0',
	}
});
