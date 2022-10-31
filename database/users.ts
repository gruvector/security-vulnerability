import { sql } from './connect';

export type User = {
  id: number;
  username: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export async function getUsers() {
  const users = await sql<User[]>`
    SELECT
      id,
      username
    FROM
      users
  `;
  return users;
}

export async function getUsersWithPasswordHash() {
  const users = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
  `;
  return users;
}

export async function getUserById(id: number) {
  const [user] = await sql<User[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user;
}

export async function getUserByValidSessionToken(token: string | undefined) {
  if (!token) return undefined;
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.username
    FROM
      users,
      sessions
    WHERE
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
  `;
  return user;
}

export async function getUserByUsername(username: string) {
  const [user] = await sql<Pick<User, 'id'>[]>`
    SELECT
      id
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user;
}

export async function getUserWithPasswordHashByUsername(username: string) {
  const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      id,
      username,
      password_hash
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user;
}

export async function createUser(username: string, passwordHash: string) {
  const [user] = await sql<User[]>`
    INSERT INTO users
      (username, password_hash)
    VALUES
      (${username}, ${passwordHash})
    RETURNING
      id,
      username
  `;
  return user!;
}
