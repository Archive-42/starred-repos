/** @format */

import * as passport from 'passport'
import * as BearerStrategy from 'passport-http-bearer'

import knextion from '../db'
import { ValidateToken } from '../utils/security/tokens'

passport.use(
    new BearerStrategy.Strategy(async (token, done) => {
        try {
            let payload = await ValidateToken(token)
            let [author] = await knextion('authors')
                .where({ id: payload.authorid })
                .select<IAuthor[]>()
            if (author) {
                done(null, author)
            } else {
                done(null, false)
            }
        } catch (err) {
            console.error(err)
            return done(err)
        }
    }),
)
