// Update with your config settings.

module.exports = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL ||
  {
    database: 'tasks',
    user: 'postgres',
    password: 'Postgre123'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}
