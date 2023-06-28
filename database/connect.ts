import { config } from 'dotenv-safe';
import postgres from 'postgres';

// This loads all environment variables from a .env file
// for all code after this line
if (!process.env.FLY_IO && !process.env.POSTGRES_URL) config();

// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  if (!globalThis.postgresSqlClient) {
    globalThis.postgresSqlClient = postgres({
      host: process.env.POSTGRES_HOST || process.env.PG_HOST,
      username: process.env.POSTGRES_USER || process.env.PGUSERNAME,
      password: process.env.POSTGRES_PASSWORD || process.env.PGPASSWORD,
      database: process.env.POSTGRES_DATABASE || process.env.PGDATABASE,
      ssl: !!process.env.POSTGRES_URL,
      transform: {
        ...postgres.camel,
        undefined: null,
      },
    });
  }
  return globalThis.postgresSqlClient;
}

// Connect to PostgreSQL
export const sql = connectOneTimeToDatabase();
