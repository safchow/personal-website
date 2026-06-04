/**
 * API integration tests for query-parameter validation.
 *
 * Controllers validate query params with schema.parse(); a failure must surface
 * as a 400 (via the error handler's ZodError branch), not a 500.
 */
import { expect, test } from "@playwright/test";

test.describe("query validation", () => {
  test("GET /api/events/stats without a path returns 400", async ({
    request,
  }) => {
    const res = await request.get("/api/events/stats");

    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Validation failed");
    expect(body.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: "path" })]),
    );
  });

  test("GET /api/events/stats with an invalid type returns 400", async ({
    request,
  }) => {
    const res = await request.get("/api/events/stats", {
      params: { path: "/", type: "download" },
    });

    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Validation failed");
    expect(body.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: "type" })]),
    );
  });
});
