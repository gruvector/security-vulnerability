# Examples of Broken Security with Next.js + Postgres.js

Examples of common security mistakes causing broken authentication, broken authorization, secrets exposure, etc.

<img src="2-missing-authentication.png"><br /><br />

<img src="5-secrets-exposure.png"><br /><br />

## Database Setup

Copy the `.env.example` file to a new file called `.env` (ignored from Git) and fill in the necessary information.

To install PostgreSQL on your computer, follow the instructions from the PostgreSQL step in [UpLeveled's System Setup Instructions](https://github.com/upleveled/system-setup/blob/master/readme.md).

Then, connect to the built-in `postgres` database as administrator in order to create the database:

**Windows**

If it asks for a password, use `postgres`.

```bash
psql -U postgres
```

**macOS**

```bash
psql postgres
```

**Linux**

```bash
sudo -u postgres psql
```

Once you have connected, run the following to create the database:

```sql
CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
```

Quit `psql` using the following command:

```bash
\q
```

On Linux, you will also need to create a Linux system user with a name matching the user name you used in the database. It will prompt you to create a password for the user - choose the same password as for the database above.

```bash
sudo adduser <user name>
```

Once you're ready to use the new user, reconnect using the following command.

**Windows and macOS:**

```bash
psql -U <user name> <database name>
```

**Linux:**

```bash
sudo -u <user name> psql -U <user name> <database name>
```

### Running Migrations

To set up the structure and the content of the database, run the migrations using Ley:

```bash
yarn migrate up
```

To reverse the last single migration, run:

```bash
yarn migrate down
```
