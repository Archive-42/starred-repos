/** @format */

import * as express from 'express'
import * as helmet from 'helmet'
import * as cors from 'cors'
import * as path from 'path'
import * as passport from 'passport'

import './middlewares'
import routes from './routes'
import morgan = require('morgan')

if (!process.env.LOADED) {
    throw Error('".env" file not found! Please edit the dev.env or prod.env file in /config/')
}

const app = express()
app.use(helmet())
app.use(express.json())
app.use(cors())
app.use(passport.initialize())

app.use(
    morgan('dev', {
        skip: (req, res) => req.originalUrl.match(/\/api\/tags\/findlike\/[a-b0-9]+/) !== null,
    }),
)

app.use(express.static('public'))
app.use(routes)

app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, '../public/index.html')))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening on port: ${port}`))
