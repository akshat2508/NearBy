import "dotenv/config";

function required(key, fallback) {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 4000),
  clientUrl: required("CLIENT_URL", "http://localhost:5173"),
  databaseUrl: required("DATABASE_URL"),
  clerkSecretKey: required("CLERK_SECRET_KEY"),
  clerkPublishableKey: required("CLERK_PUBLISHABLE_KEY"),
};
