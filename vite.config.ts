import { defineConfig, loadEnv } from "vite";
import { SvelteOptions, svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import tsconfigPaths from "vite-tsconfig-paths";
import progress from "vite-plugin-progress";
import banner from "vite-plugin-banner";
import pkg from "./package.json";
import path from "path";

const filePath = path.dirname(import.meta.url);

function fileBannerText() {
  return banner(
    `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`
  );
}

const scssPrependData = `@import "${filePath}/src/assets/styles/global.scss";`;

const preprocess = sveltePreprocess({
  scss: {
    prependData: scssPrependData,
  },
});

const onwarn: SvelteOptions["onwarn"] = (warning, defaultHandler) => {
  if (warning.code === "a11y-click-events-have-key-events") {
    return;
  }
  defaultHandler && defaultHandler(warning);
};

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      progress(),
      tsconfigPaths(),
      fileBannerText(),
      svelte({
        preprocess,
        onwarn,
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
