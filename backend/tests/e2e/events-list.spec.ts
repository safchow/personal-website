/**
 * API integration tests for GET /api/events (admin event listing).
 *
 * Coverage:
 * - returns events newest-first with string ids and a count
 * - respects the `limit` query param
 *
 * Note: the endpoint is gated by requireAdminKey, which passes through when
 * ADMIN_API_KEY is unset (as it is in the test environment).
 */
import { expect, test } from "@playwright/test";

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

    const res = await request.get("/api/events", { params: { limit: "2" } });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.data.events).toHaveLength(2);
    expect(body.meta.count).toBe(2);
  });
});
