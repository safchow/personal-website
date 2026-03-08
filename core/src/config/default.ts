const getEnv = (key: string, defaultValue = ""): string => {
  const value = process.env[key] || defaultValue;
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
};

function buildDatabaseUrl(): string {
  const url = getEnv("DATABASE_URL");
  if (url) return url;

  const host = getEnv("MONGO_HOST");
  const user = getEnv("MONGO_USER");
  const password = getEnv("MONGO_PASSWORD");
  if (!host || !user || !password) return "";

  const port = getEnv("MONGO_PORT", "27017");
  const database = getEnv("MONGO_DATABASE", "website");
  const authSource = getEnv("MONGO_AUTH_SOURCE");
  const encodedPassword = encodeURIComponent(password);
  const params = authSource ? `?authSource=${authSource}` : "";

  return `mongodb://${user}:${encodedPassword}@${host}:${port}/${database}${params}`;
}

const databaseUrl = buildDatabaseUrl();
if (databaseUrl) {
  process.env.DATABASE_URL = databaseUrl;
}

const config = {
  port: parseInt(process.env.PORT || "8080", 10),
  nodeEnv: getEnv("NODE_ENV", "development"),
  clientUrl: getEnv("CLIENT_URL", "http://localhost:5173"),
  databaseUrl,
};

export default config;
