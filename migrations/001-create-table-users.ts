import { Sql } from 'postgres';

const users = [
  {
    // id: 1,
    username: 'alice',
    // password: abc
    passwordHash:
      '$2b$12$rip3gbockwavRttTaMZa.u5JKY1542MOLBI7YGkRXaj83rtocfl3a',
  },
  {
    // id: 2,
    username: 'bob',
    // password: def
    passwordHash:
      '$2b$12$0N14zwm7.gFNB9UriJpo9eHqCBSezv1zdvbLL7ql79KYJM50fvo6q',
  },
];

export async function up(sql: Sql<Record<string, string>>) {
  await sql`
    CREATE TABLE
      users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(30) NOT NULL UNIQUE,
        password_hash VARCHAR(60) NOT NULL
      );
  `;

  for (const user of users) {
    await sql`
      INSERT INTO
        users (
          username,
          password_hash
        )
      VALUES
        (
          ${user.username},
          ${user.passwordHash}
        )
    `;
  }
}

export async function down(sql: Sql<Record<string, string>>) {
  await sql`DROP TABLE users`;
}
