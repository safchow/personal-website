ARG MONGO_VERSION=7

FROM mongo:${MONGO_VERSION}

ENV MONGO_REPLICA_HOST=127.0.0.1
ENV MONGO_REPLICA_PORT=27017

# Start mongod in replica set mode, then init rs0 with a single node
ENTRYPOINT mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip 0.0.0.0 & MONGOD_PID=$!; \
INIT_REPL_CMD="rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: '$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT' }] })"; \
until (mongosh admin --port $MONGO_REPLICA_PORT --eval "$INIT_REPL_CMD"); do sleep 1; done; \
echo "REPLICA SET ONLINE"; wait $MONGOD_PID;
