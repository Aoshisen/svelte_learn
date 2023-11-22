import { defineConfig, loadEnv } from "vite";
import { SvelteOptions, svelte } from "@sveltejs/vite-plugin-svelte";
import { enhancedImages } from "@sveltejs/enhanced-img";
import sveltePreprocess from "svelte-preprocess";
import tsconfigPaths from "vite-tsconfig-paths";
import progress from "vite-plugin-progress";
import banner from "vite-plugin-banner";
import pkg from "./package.json";
import path from "path";
import { linearPreprocess, cssModules } from "svelte-preprocess-cssmodules";

const filePath = path.dirname(import.meta.url);

function fileBannerText() {
  return banner(
    `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`
  );
}

const scssPrependData = `@import "${filePath}/src/assets/styles/global.scss";`;

const preprocess = linearPreprocess([
  sveltePreprocess({
    scss: {
      prependData: scssPrependData,
    },
  }),
  cssModules({}),
]);

const onwarn: SvelteOptions["onwarn"] = (warning, defaultHandler) => {
  if (warning.code === "a11y-click-events-have-key-events") {
    return;
  }
  defaultHandler && defaultHandler(warning);
};
const compilerOptions: SvelteOptions["compilerOptions"] = {
  cssHash: ({ css, hash }) => {
    return `ass-${hash(css)}`;
  },
};

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      progress(),
      tsconfigPaths(),
      fileBannerText(),
      // https://github.com/JonasKruckenberg/imagetools/blob/main/docs/directives.md
      enhancedImages(),
      svelte({
        preprocess,
        onwarn,
        compilerOptions,
        //开启这个属性 会在打包的时候多一个css 文件,但是在浏览器除了原本的css选择器会再多一个额外的css 选择器,
        emitCss: true,
      }),
    ],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    build: {
      sourcemap: mode === "development",
    },
  };
});
