const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://127.0.0.1:4173",
    headless: true
  },
  webServer: {
    command: "npx http-server apps/web -p 4173 -s",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true
  }
});
