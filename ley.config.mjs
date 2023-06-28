const options = {};

if (process.env.POSTGRES_URL) {
  options.ssl = true;

  // Set standard environment variables
  process.env.PGHOST = process.env.POSTGRES_HOST;
  process.env.PGDATABASE = process.env.POSTGRES_DATABASE;
  process.env.PGUSERNAME = process.env.POSTGRES_USER;
  process.env.PGPASSWORD = process.env.POSTGRES_PASSWORD;
}

export default options;
