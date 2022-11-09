# Examples of Broken Security with Next.js + Postgres.js

Examples of common security mistakes causing broken authentication, broken authorization, secrets exposure, cross-site scripting and more.

<figure>
  <img src="2-missing-authentication.png" alt="" />
  <figcaption>Screenshot of the missing authentication example, where blog post content is incorrectly being shown to a user who is not logged in (all blog post content should be only visible to logged-in users)</figcaption>
</figure>

<br /><br />

<figure>
  <img src="4-missing-authorization.png" alt="" />
  <figcaption>Screenshot of the missing authorization example, where unpublished, private blog post content is incorrectly being exposed in the HTML to a user who is not the owner</figcaption>
</figure>

<br /><br />

<figure>
  <img src="5-secrets-exposure.png" alt="" />
  <figcaption>Screenshot of the secrets exposure example, showing an API key being exposed</figcaption>
</figure>

<br /><br />

<figure>
  <img src="6-cross-site-scripting.png" alt="" />
  <figcaption>Screenshot of cross-site scripting example, showing an alert() triggered from an image with a broken src and an onerror attribute</figcaption>
</figure>

<br /><br />

## Setup

Clone the repo and install the dependencies using Yarn:

```bash
yarn
```

If you are on Windows, you may receive an error about `libpg-query` not being able to be installed. In this case, edit your `package.json` file to remove the 2 lines starting with `"@ts-safeql/eslint-plugin"` and `"libpg-query"` and retry the Yarn installation using the command above.

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

## Running Migrations

To set up the structure and the content of the database, run the migrations using Ley:

```bash
yarn migrate up
```

To reverse the last single migration, run:

```bash
yarn migrate down
```

## Run Dev Server

Run the Next.js dev server with:

```bash
yarn dev
```
