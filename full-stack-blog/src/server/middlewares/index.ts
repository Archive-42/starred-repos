/** @format */

import * as passport from 'passport'
import './bearerstrategy'
import './localstrategy'

passport.deserializeUser((user, done) => done(null, user))
passport.serializeUser((user, done) => done(null, user))
