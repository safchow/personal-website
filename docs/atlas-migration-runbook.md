# MongoDB Atlas Migration Runbook

Manual steps to move the analytics database (`events` collection) from the
self-hosted `mongodb_replica` setup to MongoDB Atlas. The repo changes (TTL
retention, startup wiring, docs) are already in place; this covers the
provisioning and cutover that must be done outside the codebase.

## 1. Provision Atlas

1. Create an Atlas project and the smallest cluster (M0 free tier is sufficient).
2. Create a database user scoped to the `website` database with read/write only.
3. Network access:
   - Railway egress IPs are not static on all plans. If you cannot pin them,
     allow `0.0.0.0/0` and rely on database-user auth + a strong password.
   - For local development, add your current IP.
4. Copy the SRV connection string:
   `mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/website?retryWrites=true&w=majority`

## 2. Configure secrets

- Local: set `DATABASE_URL` in `backend/.env` to the Atlas SRV string.
- Railway: set `DATABASE_URL` to the same Atlas SRV string.
- Optionally set `ANALYTICS_RETENTION_DAYS` (defaults to 730).

## 3. Create the collection + indexes

No manual migration step. The backend uses the official `mongodb` Node driver,
and `ensureAnalyticsStorage()` (see `backend/src/services/analyticsStorage.ts`)
creates the `events` collection indexes on every boot:

- `sessionId` lookup index
- `timestamp` TTL index with `expireAfterSeconds` from `ANALYTICS_RETENTION_DAYS`

The collection itself is created lazily on the first inserted event. Index
creation is idempotent and self-healing — a changed retention value is applied
in place via `collMod` on the next restart.

## 4. Validate connectivity

1. Boot the backend against Atlas: `pnpm --filter @website/backend dev`.
2. Confirm `GET /ready` returns `status: ready` / `database: connected`.
   (Atlas is a replica set, so Prisma transactions work — this satisfies the
   constraint that originally forced the local single-node replica set.)
3. Write + read back one event:
   ```bash
   curl -X POST http://localhost:8080/api/events \
     -H 'content-type: application/json' \
     -d '{"sessionId":"smoke","type":"click","target":"smoke","path":"/"}'
   curl 'http://localhost:8080/api/events/clicks?path=/&target=smoke'   # count: 1
   ```
4. In Atlas, confirm the `events` collection has indexes on `sessionId`,
   `timestamp` (with `expireAfterSeconds`), and `_id`.

## 5. Data migration decision

- Start fresh: nothing to do — new events accumulate in Atlas.
- Preserve history: `mongodump` the old `events` collection and `mongorestore`
  into the Atlas `website` database.

## 6. Cutover & cleanup

1. Switch production `DATABASE_URL` on Railway to the Atlas string; redeploy.
2. Verify `/ready` and a real event write in production.
3. Keep the previous `DATABASE_URL` value handy for rollback until verified.
4. Remove any Railway Mongo replica service from production.
5. `docker-compose.yml`'s `mongodb` service now exists only for the local e2e
   test suite — leave it for `pnpm test:backend:e2e`.

## Acceptance check

- Production backend connects to Atlas; `/ready` is green.
- `POST /api/events` persists; `GET /api/events/clicks` and `/pageviews` read correctly.
- `events` has `sessionId` and `timestamp` indexes; TTL is set on `timestamp`.
- Production no longer needs the self-hosted `mongodb_replica` service.
