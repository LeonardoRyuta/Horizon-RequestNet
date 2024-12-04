import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"
// import { viteStaticCopy } from 'vite-plugin-static-copy';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: 'public/manifest.json',
    //       dest: '.',
    //     }
    //   ],
    // }),
    NodeGlobalsPolyfillPlugin({
      buffer: true
    }),
    nodePolyfills(),
    crx({ manifest })
  ],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: './index.html',
        contentScript: './src/contentScript.js',
        injectedScript: './src/injectedScript.js',
        background: './src/background.js',
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
  esbuild: {
    charset: 'utf8',
  },
  define: {
    global: {},
  },
  optimizeDeps: {
    esbuildOptions: {
        define: {
            global: 'globalThis'
        },
        plugins: [
            NodeGlobalsPolyfillPlugin({
                buffer: true
            })
        ]
    }
}
});