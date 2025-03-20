import { defineConfig, type UserConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

/**
 * @see {@link https://vitejs.dev/config/}
 * @see {@link https://ko.vitejs.dev/config/build-options.html#build-rollupoptions} // vite rollup 옵션설정
 * @see {@link https://rollupjs.org/configuration-options/} // rollup 옵션설정
 */
// export default defineConfig({
//     plugins: [react()],
// });
export default defineConfig(async ({ mode }): Promise<UserConfig> => {
    const config: UserConfig = {
        esbuild: {
            drop: mode === 'production' ? ['console', 'debugger'] : [],
        },
        base: '/',
        preview: {
            // 빌드 후 프리뷰 서버 실행(프로덕션 빌드 미리보기)
            port: 8083,
            strictPort: true,
        },
        build: {
            outDir: mode === 'production' ? 'dist' : 'beta',
            assetsDir: 'assets',
            target: 'esnext',
            minify: 'esbuild',
            chunkSizeWarningLimit: 500, // 청크 경고 제한값 (vite default 500kb)
            rollupOptions: {
                // 경고(오류가 아닌 경고) 무시
                onwarn(warning, warn) {
                    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                        return
                    }
                    warn(warning)
                },
                output: {
                    // 청크 분할 설정 (node-modules 모듈 분할)
                    manualChunks: (id) => {
                        if (id.includes('node_modules')) {
                            const module = id.toString().split('node_modules/')[1].split('/')[0].toString()
                            return `vendor/${module}`
                        }
                    },
                },
            },
        },
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: [
                { find: '@', replacement: '/src' },
                { find: '@components', replacement: '/src/components' },
                { find: '@images', replacement: '/src/assets/images' },
                { find: '@pages', replacement: '/src/pages' },
                { find: '@hooks', replacement: '/src/hooks' },
                { find: '@utils', replacement: '/src/utils' },
            ],
        },
        // 빌드 시 설정 추가
    }

    return config
})
