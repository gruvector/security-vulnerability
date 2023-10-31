import { Sql } from 'postgres';

export async function up(sql: Sql<Record<string, string>>) {
  await sql`
    CREATE TABLE
      sessions (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        token VARCHAR(90) UNIQUE NOT NULL,
        expiry_timestamp TIMESTAMP NOT NULL DEFAULT now () + INTERVAL '24 hours',
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE
      );
  `;
}

export async function down(sql: Sql<Record<string, string>>) {
  await sql`DROP TABLE sessions`;
}
