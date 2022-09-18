import {defineConfig} from "vite";
import dtsPlugin from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        dtsPlugin({
            insertTypesEntry: true
        })
    ],
    esbuild:{
        format: 'esm'
    },
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'vHttp',
            formats: ['es']
        }
    }
})
