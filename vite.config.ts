import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import tsconfigPaths from "vite-tsconfig-paths";
import progress from "vite-plugin-progress";
import banner from "vite-plugin-banner";
import pkg from "./package.json";
import path from "path";

const filePath = path.dirname(import.meta.url);
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      progress(),
      tsconfigPaths(),
      banner(
        `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`
      ),
      svelte({
        preprocess: sveltePreprocess({
          scss: {
            prependData: `@import "${filePath}/src/assets/styles/global.scss";`,
          },
        }),
        onwarn(warning, defaultHandler) {
          if (warning.code === "a11y-click-events-have-key-events") {
            return;
          }
          defaultHandler && defaultHandler(warning);
        },
      }),
    ],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    css: {
      devSourcemap: true,
    },
  };
});
