import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import svgLoader from 'vite-svg-loader';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { ConfigEnv, loadEnv, UserConfig } from 'vite';

import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from "path";

export default ({ mode }: ConfigEnv): UserConfig =>{
  const { VITE_BASE_PORT, VITE_BASE_URL,VITE_API_URL, VITE_API_URL_PREFIX }: Partial<ImportMetaEnv> = loadEnv(mode, process.cwd());
  return {
    base: VITE_BASE_URL,

    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router','pinia'],
        // resolvers: [TDesignResolver({
        //   library: 'vue-next'
        // })],
      }),
      Components({
        resolvers: [TDesignResolver({
          library: 'vue-next'
        })],
      }),
      vueJsx(),
      svgLoader()
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/style/variables.less')}";`,
          },
          math: 'strict',
          javascriptEnabled: true,
        },
      },
    },
    server: {
      port: Number(VITE_BASE_PORT),
      host: '0.0.0.0',
      proxy: {
        [VITE_API_URL_PREFIX]: VITE_API_URL,
      },
    },
    resolve:{
      alias: {
        '@': resolve(__dirname, './src'),
      },
    }
  }
};