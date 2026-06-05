import { defineConfig } from "@playwright/test";

const PORT = 3334;
const HOST = "localhost";

export const TEST_DB_URL =
  "mongodb://localhost:27017/website_test?directConnection=true";

// Admin password used by the analytics read endpoints in the e2e suite.
// The server is booted with the SHA-256 hex of this value (see webServer env).
export const TEST_ADMIN_PASSWORD = "test-admin-password";
const TEST_ADMIN_PASSWORD_HASH =
  "f7a03f48c0e2aa2d5e55ca186c20032ddbf53b7f5f93fce387d65c3f83433e8d";

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
      // Authenticate the admin read endpoints by default; tests that exercise
      // the auth gate override or omit this per-request.
      "x-admin-password": TEST_ADMIN_PASSWORD,
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
      `ANALYTICS_ADMIN_PASSWORD_HASH=${TEST_ADMIN_PASSWORD_HASH}`,
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
