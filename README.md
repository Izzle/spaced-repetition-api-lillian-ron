# Spaced repetition API!

## Front end Repo

https://github.com/Izzle/spaced-repetition-client-lillian-ron

## Local dev setup

If using user `dunder-mifflin`:

```bash
mv example.env .env
createdb -U dunder-mifflin spaced-repetition
createdb -U dunder-mifflin spaced-repetition-test
```

If your `dunder-mifflin` user has a password be sure to set it in `.env` for all appropriate fields. Or if using a different user, update appropriately.

```bash
npm install
npm run migrate
env MIGRATION_DB_NAME=spaced-repetition-test npm run migrate
```

And `npm test` should work at this point

## Configuring Postgres

For tests involving time to run properly, configure your Postgres database to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
   1. E.g. for an OS X, Homebrew install: `/usr/local/var/postgres/postgresql.conf`
   2. E.g. on Windows, _maybe_: `C:\Program Files\PostgreSQL\11.2\data\postgresql.conf`
   3. E.g  on Ubuntu 18.04 probably: '/etc/postgresql/10/main/postgresql.conf'
2. Find the `timezone` line and set it to `UTC`:

```conf
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests mode `npm test`

Run the migrations up `npm run migrate`

Run the migrations down `npm run migrate -- 0`

## If you are deploying this project
You will need to use these variables

NODE_ENV=development
PORT=8000(change to any port you want)
TZ='UTC'
MIGRATION_DB_HOST=ip-database-host
MIGRATION_DB_PORT=port-of-database
MIGRATION_DB_NAME=your-database-name
MIGRATION_DB_TEST_NAME=your-test-database-name
MIGRATION_DB_USER=your-database-user
MIGRATION_DB_PASS=
DB_URL="postgresql://your-database-user@localhost/your-database-name"
TEST_DB_URL="postgresql://your-database-user@localhost/your-test-database-name"
JWT_SECRET="your-secret"

### To inject our seed data
To inject our Japanese characters into your PSQL server, you need to set the encoding before injection (this is a known issue on Windows)
This can be done with the following.

Connect to your database
```psql -d YOUR_DATABASE_NAME -U YOUR_USER_NAME```
Set the encoding
```SET CLIENT_ENCODING to 'UTF8'```
Inject the seed file (note: this path is assuming your current directory is the project folder itself):
```\i .\seeds\seed.tables.sql```
Or for Windows:
```\i ./seeds/seed.tables.sql``` 
