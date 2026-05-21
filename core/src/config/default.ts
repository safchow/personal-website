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
  const value = Number.parseInt(process.env[key] || "", 10);
  return Number.isFinite(value) ? value : defaultValue;
};

const config = {
  port: getIntEnv("PORT", 8080),
  nodeEnv: getEnv("NODE_ENV", "development"),
  clientUrl: getEnv("CLIENT_URL", "http://localhost:5173"),
  databaseUrl: getEnv("DATABASE_URL"),
  adminApiKey: getEnv("ADMIN_API_KEY"),
  analyticsWriteLimitPerMinute: getIntEnv(
    "ANALYTICS_WRITE_LIMIT_PER_MINUTE",
    60
  ),
  analyticsReadLimitPerMinute: getIntEnv("ANALYTICS_READ_LIMIT_PER_MINUTE", 30),
};

export default config;
