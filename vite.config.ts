import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { fileURLToPath, URL } from "node:url";
import { presetAttributify, presetIcons, presetUno } from "unocss";
import unocss from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { ConfigEnv, defineConfig, UserConfigExport } from "vite";
import { viteMockServe } from "vite-plugin-mock";

export default ({ command }: ConfigEnv): UserConfigExport => {
  console.log(command);
  const prodMock = true;
  return defineConfig({
    server: {
      proxy: {
        "/dev": {
          target: "http://localhost:3001/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev/, ""),
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      unocss({
        rules: [
          [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) * 10}px` })],
          ["flex", { display: "flex" }],
          ["pink", { color: "pink" }],
        ],
        shortcuts: {
          flexpink: "pink flex",
        },
        presets: [presetIcons(), presetAttributify(), presetUno()],
      }),
      AutoImport({
        imports: ["vue", {
          'naive-ui': []
        }],
        dts: "src/auto-import.d.ts",
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      }),
      viteMockServe({
        mockPath: "mock", // 设置模拟.ts 文件的存储文件夹
        localEnabled: command === "serve", // 设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
        prodEnabled: command !== "serve" && prodMock, // 设置打包是否启用 mock 功能
        supportTs: true, // 打开后，可以读取 ts ⽂件模块。请注意，打开后将⽆法监视.js ⽂件。
        watchFiles: true, // 监视⽂件更改，并重新加载 mock 数据
        injectCode: `
          import setupProdMockServer from './mockProdServer.js';
          setupProdMockServer();
        `,
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("src", import.meta.url)),
      },
    },
  });
};
