const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    timeout: 30000,
    retries: 0,
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
    },
    reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
    testDir: './tests',
});