
require('dotenv').config();

module.exports = {
  'migrationDirectory': 'migrations',
  'driver': 'pg',
  'connectionString': process.env.DATABASE_URL,
  'ssl': !!process.env.SSL,  //This coerces the string "true" to the boolean true and empty to false
}

