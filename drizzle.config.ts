import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schemas.ts",
  out: "./db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    // ssl: true
    // host: process.env.DB_HOST!,
    // port: parseInt(process.env.DB_PORT!),
    // user: process.env.DB_USER!,
    // password: process.env.DB_PASS!,
    // database: process.env.DB_NAME!,
    // ssl: false,
  },
});
