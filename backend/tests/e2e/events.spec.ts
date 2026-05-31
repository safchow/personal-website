import { expect, test } from "@playwright/test";

import { disconnectDb, resetDb, testPrisma } from "./helpers/db.js";

test.beforeEach(async () => {
  await resetDb();
});

test.afterAll(async () => {
  await disconnectDb();
});

test.describe("POST /api/events", () => {
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

    const stored = await testPrisma().event.findMany({
      where: { sessionId: "session_project_click" },
    });
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

    await expect(testPrisma().event.count()).resolves.toBe(0);
  });
});

test.describe("GET /api/events/clicks", () => {
  test("counts stored clicks for a path and target", async ({ request }) => {
    await testPrisma().event.createMany({
      data: [
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
      ],
    });

    const res = await request.get("/api/events/clicks", {
      params: {
        path: "/",
        target: "project:wheresxi",
      },
    });

    expect(res.status()).toBe(200);
    await expect(res.json()).resolves.toEqual({
      data: {
        path: "/",
        target: "project:wheresxi",
        count: 2,
      },
    });
  });
});
