/** @format */

import { RequestHandler } from 'express'
import * as passport from 'passport'

export function BearerStrategy(): RequestHandler {
    return (req, res, next) => {
        passport.authenticate('bearer', { session: false }, (err, user, info) => {
            if (user) {
                req.user = user
            }
            return next()
        })(req, res, next)
    }
}

export const isUser: RequestHandler = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json('You must be a user')
    } else {
        return next()
    }
}

export const isAdmin: RequestHandler = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(401).json('You must be an admin')
    } else {
        return next()
    }
}
