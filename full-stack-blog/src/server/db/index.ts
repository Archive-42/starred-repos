/** @format */

import * as knex from 'knex'

// Fine, I relent on the bad punny name
const knextion = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
    },
})

export default knextion
