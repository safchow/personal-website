/**
 * API integration tests for GET /api/events (event listing).
 *
 * Coverage:
 * - returns events newest-first with string ids and a count
 * - respects the `limit` query param
 * - admin-password gate: rejects missing/wrong password, accepts correct one
 *
 * The test server boots with ANALYTICS_ADMIN_PASSWORD_HASH set (see
 * playwright.config.ts), and the default request context sends the matching
 * `x-admin-password` header. Gate tests override that header per request.
 */
import { expect, test } from "@playwright/test";

import { TEST_ADMIN_PASSWORD } from "../../playwright.config.js";
import { disconnectDb, insertEvents, resetDb } from "./helpers/db.js";

test.beforeEach(async () => {
  await resetDb();
});

test.afterAll(async () => {
  await disconnectDb();
});

test.describe("GET /api/events", () => {
  test("returns events newest-first with string ids", async ({ request }) => {
    await insertEvents([
      {
        sessionId: "oldest",
        type: "pageview",
        path: "/",
        timestamp: new Date("2024-01-01T00:00:00.000Z"),
      },
      {
        sessionId: "newest",
        type: "pageview",
        path: "/",
        timestamp: new Date("2024-03-01T00:00:00.000Z"),
      },
      {
        sessionId: "middle",
        type: "pageview",
        path: "/",
        timestamp: new Date("2024-02-01T00:00:00.000Z"),
      },
    ]);

    const res = await request.get("/api/events");

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.meta.count).toBe(3);
    expect(
      body.data.events.map((event: { sessionId: string }) => event.sessionId),
    ).toEqual(["newest", "middle", "oldest"]);
    expect(body.data.events[0].id).toEqual(expect.any(String));
  });

  test("respects the limit query param", async ({ request }) => {
    await insertEvents([
      { sessionId: "a", type: "pageview", path: "/" },
      { sessionId: "b", type: "pageview", path: "/" },
      { sessionId: "c", type: "pageview", path: "/" },
    ]);

    const res = await request.get("/api/events", {
      params: { limit: "2" },
    });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.data.events).toHaveLength(2);
    expect(body.meta.count).toBe(2);
  });
});

test.describe("analytics admin-password gate", () => {
  test("rejects GET /api/events with a missing or wrong password", async ({
    request,
  }) => {
    const missing = await request.get("/api/events", {
      headers: { "x-admin-password": "" },
    });
    expect(missing.status()).toBe(401);

    const wrong = await request.get("/api/events", {
      headers: { "x-admin-password": "not-the-password" },
    });
    expect(wrong.status()).toBe(401);
  });

  test("rejects GET /api/events/stats with a wrong password", async ({
    request,
  }) => {
    const res = await request.get("/api/events/stats", {
      params: { path: "/" },
      headers: { "x-admin-password": "not-the-password" },
    });
    expect(res.status()).toBe(401);
  });

  test("accepts the correct password via header and ?password=", async ({
    request,
  }) => {
    const viaHeader = await request.get("/api/events", {
      headers: { "x-admin-password": TEST_ADMIN_PASSWORD },
    });
    expect(viaHeader.status()).toBe(200);

    const viaQuery = await request.get("/api/events", {
      params: { password: TEST_ADMIN_PASSWORD },
      headers: { "x-admin-password": "" },
    });
    expect(viaQuery.status()).toBe(200);
  });
});
