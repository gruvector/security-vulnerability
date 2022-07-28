import { Sql } from 'postgres';

const users = [
  {
    // id: 1,
    username: 'alice',
    // password: abc
    password_hash:
      '$2b$12$rip3gbockwavRttTaMZa.u5JKY1542MOLBI7YGkRXaj83rtocfl3a',
  },
  {
    // id: 2,
    username: 'bob',
    // password: def
    password_hash:
      '$2b$12$0N14zwm7.gFNB9UriJpo9eHqCBSezv1zdvbLL7ql79KYJM50fvo6q',
  },
];

export async function up(sql: Sql<Record<string, string>>) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(30) NOT NULL UNIQUE,
      password_hash varchar(60) NOT NULL
    );
  `;

  await sql`
    INSERT INTO users ${sql(users, 'username', 'password_hash')}
  `;
}

export async function down(sql: Sql<Record<string, string>>) {
  await sql`
    DROP TABLE users
  `;
}
