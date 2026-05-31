import { defineConfig } from "@playwright/test";

const PORT = 3334;
const HOST = "localhost";

export const TEST_DB_URL =
  "mongodb://localhost:27017/website_test?directConnection=true";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [["list"]],
  timeout: 30_000,

  use: {
    baseURL: `http://${HOST}:${PORT}`,
    extraHTTPHeaders: {
      accept: "application/json",
    },
  },

  webServer: {
    // cross-env sets DATABASE_URL before tsx loads dotenv/dev defaults (wheresxi pattern).
    command: [
      "cross-env",
      "NODE_ENV=test",
      `PORT=${PORT}`,
      `HOST=${HOST}`,
      "LOG_LEVEL=warn",
      `DATABASE_URL=${TEST_DB_URL}`,
      "CLIENT_URL=http://localhost:5173",
      "tsx src/server.ts",
    ].join(" "),
    url: `http://${HOST}:${PORT}/health`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    stdout: "ignore",
    stderr: "pipe",
  },

  projects: [
    {
      name: "api",
      testMatch: /.*\.spec\.ts$/,
    },
  ],
});
