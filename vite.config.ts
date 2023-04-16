import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import path from "path";
function pathResolve(_path: string) {
  return path.resolve(__dirname, _path);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
    }),
  ],
  resolve: {
    alias: {
      "@": pathResolve("./"),
      "@components": pathResolve("./src/components"),
      "@store": pathResolve("./src/store"),
      "@assets": pathResolve("./src/assets"),
    },
  },
});
