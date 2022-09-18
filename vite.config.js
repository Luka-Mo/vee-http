import {defineConfig} from "vite";

export default defineConfig({
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
