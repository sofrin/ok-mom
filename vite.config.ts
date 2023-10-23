import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			entities: path.resolve(__dirname, 'src/entities'),
			widgets: path.resolve(__dirname, 'src/widgets'),
			features: path.resolve(__dirname, 'src/features'),
			shared: path.resolve(__dirname, 'src/shared'),
			app: path.resolve(__dirname, 'src/app'),
			pages: path.resolve(__dirname, 'src/pages'),
		},
	},
});
