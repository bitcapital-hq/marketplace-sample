export default {
    type: "postgres",
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT || "5432", 10),
    username: process.env.DATABASE_USER || "marketplace",
    password: process.env.DATABASE_PASSWORD || "marketplace",
    database: process.env.DATABASE_NAME || "marketplace_sample",
    synchronize: false,
    logging: ["error"],
  
    // IMPORTANT: Path should be relative to root
    entities: ["./api/models/**.ts"],
    migrations: ["./api/migrations/**.ts"],
    cli: {
      // IMPORTANT: Path should be relative to root
      entitiesDir: "./api/models",
      migrationsDir: "./api/migrations"
    }
  };