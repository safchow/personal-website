/**
 * API integration tests for the analytics events endpoints.
 *
 * Coverage:
 * - POST /api/events: valid click payloads return 201 and persist to Mongo
 * - POST /api/events: invalid payloads return 400 and write nothing
 * - GET /api/events/stats: aggregates events by path + type + target
 *
 * Each test hits the real Express app (see playwright.config.ts) and asserts
 * persistence through the mongodb driver, with the events collection wiped
 * before every case.
 */
import { expect, test } from "@playwright/test";

import {
  countEvents,
  disconnectDb,
  findEvents,
  insertEvents,
  resetDb,
} from "./helpers/db.js";

test.beforeEach(async () => {
  await resetDb();
});

test.afterAll(async () => {
  await disconnectDb();
});

test.describe("POST /api/events", () => {
  // Happy path: API response matches what landed in the database.
  test("stores a click event and returns the created row", async ({
    request,
  }) => {
    const res = await request.post("/api/events", {
      data: {
        sessionId: "session_project_click",
        type: "click",
        target: "project:opulus",
        path: "/",
        metadata: JSON.stringify({
          destination: "https://github.com/OpulusProject/opulus-mono",
        }),
      },
    });

    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.data.event).toMatchObject({
      sessionId: "session_project_click",
      type: "click",
      target: "project:opulus",
      path: "/",
      metadata: JSON.stringify({
        destination: "https://github.com/OpulusProject/opulus-mono",
      }),
    });
    expect(body.data.event.id).toEqual(expect.any(String));

    const stored = await findEvents({ sessionId: "session_project_click" });
    expect(stored).toHaveLength(1);
    expect(stored[0]).toMatchObject({
      sessionId: "session_project_click",
      type: "click",
      target: "project:opulus",
      path: "/",
      metadata: JSON.stringify({
        destination: "https://github.com/OpulusProject/opulus-mono",
      }),
    });
  });

  // Pageview is the other supported event type; verify it persists too.
  test("stores a pageview event and returns the created row", async ({
    request,
  }) => {
    const res = await request.post("/api/events", {
      data: {
        sessionId: "session_pageview",
        type: "pageview",
        path: "/",
      },
    });

    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.data.event).toMatchObject({
      sessionId: "session_pageview",
      type: "pageview",
      path: "/",
    });
    expect(body.data.event.id).toEqual(expect.any(String));

    const stored = await findEvents({ sessionId: "session_pageview" });
    expect(stored).toHaveLength(1);
    expect(stored[0]).toMatchObject({ type: "pageview", path: "/" });
  });

  // Guardrail: Zod validation failures must not create partial rows.
  test("rejects invalid payloads without storing an event", async ({
    request,
  }) => {
    const res = await request.post("/api/events", {
      data: {
        sessionId: "",
        type: "download",
        path: "/",
      },
    });

    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Validation failed");
    expect(body.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: "sessionId" }),
        expect.objectContaining({ field: "type" }),
      ]),
    );

    await expect(countEvents()).resolves.toBe(0);
  });
});

test.describe("GET /api/events/stats", () => {
  // Read path used by dashboards; seeds data directly to isolate counting logic.
  test("counts events for a path filtered by type and target", async ({
    request,
  }) => {
    await insertEvents([
      {
        sessionId: "session_a",
        type: "click",
        target: "project:wheresxi",
        path: "/",
      },
      {
        sessionId: "session_b",
        type: "click",
        target: "project:wheresxi",
        path: "/",
      },
      {
        sessionId: "session_c",
        type: "click",
        target: "project:opulus",
        path: "/",
      },
    ]);

    const res = await request.get("/api/events/stats", {
      params: {
        path: "/",
        type: "click",
        target: "project:wheresxi",
      },
    });

    expect(res.status()).toBe(200);
    await expect(res.json()).resolves.toEqual({
      data: {
        path: "/",
        type: "click",
        target: "project:wheresxi",
        count: 2,
        uniqueSessions: 2,
      },
    });
  });
});
