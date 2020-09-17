const express = require('express')
const app = express()
const db = require('./config/db')
const consign = require('consign')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');

const port = process.env.PORT || 3000

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.db = db

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port , () => {
    console.log('Backend executando...')
})