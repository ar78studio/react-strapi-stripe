import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		sourcemap: 'true', // 'hidden' will generate source maps without adding the reference comment to the files. Use `true` if you want the reference comment.
	},
});
