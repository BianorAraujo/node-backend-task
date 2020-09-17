const myPostgreConfig = require('../knexfile')

const config = myPostgreConfig[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

knex.migrate.latest([config])
module.exports= knex
