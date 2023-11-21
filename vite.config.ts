import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import tsconfigPaths from "vite-tsconfig-paths";
import { imagetools } from "vite-imagetools";
import path from "path";
import progress from "vite-plugin-progress";

const filePath = path.dirname(import.meta.url);

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      progress(),
      tsconfigPaths(),
      //处理图片的插件
      imagetools(),
      svelte({
        preprocess: sveltePreprocess({
          scss: {
            prependData: `@import "${filePath}/src/assets/global.scss";`,
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
