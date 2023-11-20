import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

function pathResolve(_path: string) {
  return path.resolve(__dirname, _path);
}
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    css: {
      devSourcemap: true,
    },
    plugins: [
      tsconfigPaths(),
      svelte({
        preprocess: sveltePreprocess(),
        onwarn(warning, defaultHandler) {
          if (warning.code === "a11y-click-events-have-key-events") {
            return;
          }
          defaultHandler && defaultHandler(warning);
        },
      }),
    ],
  };
});
