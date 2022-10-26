import { Sql } from 'postgres';

export async function up(sql: Sql<Record<string, string>>) {
  await sql`
    CREATE TABLE sessions (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      token varchar(90) UNIQUE NOT NULL,
      expiry_timestamp timestamp NOT NULL DEFAULT now() + interval '24 hours',
      user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE
    );
  `;
}

export async function down(sql: Sql<Record<string, string>>) {
  await sql`
    DROP TABLE sessions
  `;
}
