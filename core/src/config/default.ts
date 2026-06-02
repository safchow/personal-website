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

const getIntEnv = (key: string, defaultValue: number): number => {
  const raw = process.env[key];
  if (!raw) return defaultValue;
  const parsed = parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : defaultValue;
};

const config = {
  port: parseInt(process.env.PORT || "8080", 10),
  nodeEnv: getEnv("NODE_ENV", "development"),
  clientUrl: getEnv("CLIENT_URL", "http://localhost:5173"),
  databaseUrl: getEnv("DATABASE_URL"),
  analyticsRetentionDays: getIntEnv("ANALYTICS_RETENTION_DAYS", 730),
};

export default config;
