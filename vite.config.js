/// <reference types="vitest/config" />
import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        include: [
            './test/unit/*.test.js',
            './test/integration/*.test.js',
        ]
    },
})
