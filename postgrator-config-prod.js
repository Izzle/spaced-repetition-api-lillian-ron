
require('dotenv').config();
// this file will only be run for production. its a little hacky, but
// it was the quickest solution in the meantime
module.exports = {
  'migrationDirectory': 'migrations',
  'driver': 'pg',
  'connectionString': process.env.DB_URL,
  'ssl': !!process.env.SSL, 
}

