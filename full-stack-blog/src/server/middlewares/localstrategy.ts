/** @format */

import * as passport from 'passport'
import * as localStategy from 'passport-local'
import knextion from '../db'
import { ComparePassword } from '../utils/security/passwords'

passport.use(
    new localStategy.Strategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false,
        },
        async (email, password, done) => {
            try {
                if (!email) {
                    return done(null, false)
                }
                let [user] = await knextion('authors')
                    .where({ email })
                    .select<IAuthor[]>()
                if (user && ComparePassword(password, user.hash)) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (err) {
                done(err)
            }
        },
    ),
)
